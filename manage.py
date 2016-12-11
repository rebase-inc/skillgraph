#!/usr/bin/env python3
import os
import re
import cmd
import copy
import argparse
import subprocess

BUILD_TYPES = [ composefile.replace('.yml', '') for composefile in os.listdir('layouts/') if re.match('[a-z]+\.yml', composefile) ]
CONTAINERS = [ container.decode() for container in subprocess.run(['docker', 'ps', '--format', '{{.Names}}'], stdout = subprocess.PIPE).stdout.split() ]
QUOTED_ENV_VAR_RE = re.compile('\${([A-Z,0-9,_]*)}')
PASSTHROUGH_ENV_VAR_RE = re.compile('^\s*([A-Z,0-9,_]+):\s*$', re.MULTILINE)
VM_NAME = subprocess.run(['docker-machine', 'ls', '--quiet'], stdout = subprocess.PIPE).stdout.decode().strip()
DOCKER_HOST_IP = subprocess.run(['docker-machine', 'ip', VM_NAME], stdout = subprocess.PIPE).stdout.decode().strip()
ALREADY_SET_ENV = os.environ.copy()

# Put any non-sensitive defaults here
DEFAULTS = {
        'PYPI_SERVER_HOST': DOCKER_HOST_IP,
        'PYPI_SERVER_PORT': '8080',
        'PYPI_SERVER_SCHEME': 'http://',
        }

def env_var_prompt(name):
    user_readable_name = ' '.join(name.split('_')).title()
    guessed_value = DEFAULTS[name] if name in DEFAULTS else '../' + name.replace('_REPO', '').replace('_', '-').lower()
    if 'REPO' in name:
        return os.path.abspath(input('{} location [{}]: '.format(user_readable_name, guessed_value)) or guessed_value)
    else:
        return input('{} value [{}]: '.format(user_readable_name, guessed_value)) or guessed_value

def set_environment_variables(composefile):
    env_vars = set()
    with open(composefile) as f:
        text = f.read()
        env_vars.update(re.findall(QUOTED_ENV_VAR_RE, text))
        env_vars.update(re.findall(PASSTHROUGH_ENV_VAR_RE, text))
    with open(os.path.join(os.path.dirname(composefile), 'common.yml')) as f:
        text = f.read()
        env_vars.update(re.findall(QUOTED_ENV_VAR_RE, text))
        env_vars.update(re.findall(PASSTHROUGH_ENV_VAR_RE, text))

    # check to see if the env vars in our compose file are defined
    for env_var in env_vars:
        os.environ[env_var] = os.environ[env_var] if env_var in os.environ else env_var_prompt(env_var)

    # check linked composefiles
    linked_env_vars = set()
    for env_var in env_vars:
        path = os.environ[env_var]
        if os.path.isdir(path):
            linked_env_vars.update(set_environment_variables(os.path.join(path, 'layouts', os.path.basename(composefile))))


    env_vars.update(linked_env_vars)

    return env_vars.difference(ALREADY_SET_ENV)


def compose(buildtype, extra, stdout = None):
    composefile = 'layouts/{}.yml'.format(buildtype)
    env_vars = set_environment_variables(composefile)
    subprocess.run(["docker-compose", "-f", composefile] + extra)
    if env_vars:
        print('')
        print('To not have to deal with environment variables again, run the following (or add to sourceable bash file):')
        for env_var in sorted(env_vars):
            print('export {}=\'{}\';'.format(env_var, os.environ[env_var]))

def build(buildtype, extra):
    args = [arg for arg in extra if ' {} '.format(arg) in str(subprocess.run(['docker-compose', 'build', '--help'], stdout = subprocess.PIPE).stdout)]
    compose(buildtype, ['build'] + args)

def up(buildtype, extra):
    args = [arg for arg in extra if ' {} '.format(arg) in str(subprocess.run(['docker-compose', 'up', '--help'], stdout = subprocess.PIPE).stdout)]
    compose(buildtype, ['up'] + args)

def stop(buildtype, extra):
    args = [arg for arg in extra if ' {} '.format(arg) in str(subprocess.run(['docker-compose', 'stop', '--help'], stdout = subprocess.PIPE).stdout)]
    compose(buildtype, ['stop'] + args)

def start(buildtype, extra):
    build(buildtype, extra)
    up(buildtype, extra)

def execute(container, command):
    subprocess.run(['docker', 'exec', '-t', container] + command)

def setenv(vm_name):
    try:
        subprocess.run(['$(docker-machine env {})'.format(vm_name)], check = True)
    except subprocess.CalledProcessError as exc:
        subprocess.run(['docker-machine', 'start', name])
        subprocess.run(['$(docker-machine env {})'.format(vm_name)], check = True)

def db(args):
    execute('rest_api', ['/venv/web/bin/python', '-m', 'rebase.scripts.manage'] + args)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--type', choices = BUILD_TYPES, default = 'dev')
    subparsers = parser.add_subparsers()

    build_parser = subparsers.add_parser('build')
    build_parser.set_defaults(func = build)

    up_parser = subparsers.add_parser('up')
    up_parser.set_defaults(func = up)

    start_parser = subparsers.add_parser('start')
    start_parser.set_defaults(func = start)

    stop_parser = subparsers.add_parser('stop')
    stop_parser.set_defaults(func = stop)

    exec_parser = subparsers.add_parser('exec')
    exec_parser.set_defaults(func = execute)
    exec_parser.add_argument('container', choices = CONTAINERS)

    db_parser = subparsers.add_parser('db')
    db_parser.set_defaults(func = db)

    args, extra = parser.parse_known_args()
    if 'func' in args:
        args.func(args.type, extra)
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
