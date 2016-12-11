#!/usr/bin/env python3
import os
import re
import readline
import argparse
import subprocess

BUILD_TYPES = [ composefile.replace('.yml', '') for composefile in os.listdir('layouts/') if re.match('[a-z]+\.yml', composefile) ]
CONTAINERS = [ container.decode() for container in subprocess.run(['docker', 'ps', '--format', '{{.Names}}'], stdout = subprocess.PIPE).stdout.split() ]

def env_var_prompt(name):
    if 'REPO' in name:
        user_readable_name = ' '.join(name.split('_')).title()
        guessed_location = '../' + name.replace('_REPO', '').replace('_', '-').lower()
        return os.path.abspath(input('{} location [{}]'.format(user_readable_name, guessed_location)) or guessed_location)
    else:
        return input('{} value: '.format(name))

def set_environment_variables(composefile):
    with open(composefile) as f:
        env_vars = set(re.findall('\${([A-z,0-9,_]*)}', f.read()))
    with open('layouts/common.yml') as f:
        env_vars.update(set(re.findall('\${([A-z,0-9,_]*)}', f.read())))
    for env_var in env_vars:
        os.environ[env_var] = os.environ[env_var] if env_var in os.environ else env_var_prompt(env_var)
    print('To not have to deal with this again, run the following:')
    for env_var in env_vars:
        print('export {}={};'.format(env_var, os.environ[env_var]))

def compose(buildtype, extra, stdout = None):
    composefile = 'layouts/{}.yml'.format(buildtype)
    subprocess.run(["docker-compose", "-f", composefile] + extra)

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
    parser.add_argument('container', choices = CONTAINERS)

    db_parser = subparsers.add_parser('db')
    db_parser.set_defaults(func = db)

    args, extra = parser.parse_known_args()
    args.func(args.type, extra)

if __name__ == '__main__':
    set_environment_variables('layouts/dev.yml')
