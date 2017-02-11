import { normalize, schema } from 'normalizr';
import _ from 'lodash';

export const job = new schema.Entity('jobs');
export const jobs = new schema.Array(job);
export const module = new schema.Entity('modules', {}, { idAttribute: (val, parent, key) => `${val.languageName}_${val.name}` });
export const language = new schema.Entity('languages', { modules: new schema.Array(module) }, { idAttribute: 'name' });
export const skillSet = new schema.Entity('skillSets', { languages: new schema.Array(language) }, {
  processStrategy: (ss) => {
    let data = _.assign({}, ss, {
      languages: _.mapValues(ss.skills, (lang, languageName) => _.assign({}, lang, {
        name: languageName,
        modules: _.mapValues(lang.modules, (mod, moduleName) => _.assign({}, mod, { name: moduleName, languageName }))
      }))
    });
    delete data.skills;
    return data;
  }
});
export const role = new schema.Entity('roles', { skillSet: skillSet }, {
  processStrategy: (role, par, key) => {
    delete role.user; // TODO: Remove from API
    delete role.walkthroughCompleted; // TODO: Remove from API
    return Object.assign({}, role);
  }
});
export const githubUser = new schema.Entity('githubUsers', {});
export const githubAccount = new schema.Entity('githubAccounts', { githubUser: githubUser }, { idAttribute: 'githubUserId' });
export const user = new schema.Entity('users', { githubAccounts: new schema.Array(githubAccount), currentRole: role });
export const auth = new schema.Entity('auths', { user: user }, { idAttribute: () => 0 });
