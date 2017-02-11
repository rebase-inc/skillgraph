import { normalize, schema } from 'normalizr';

export const job = new schema.Entity('jobs');
export const scan = new schema.Entity('scans', { scan: job, update: job }, { idAttribute: 'tempid' }); 
export const language = new schema.Entity('languages', {}, { idAttribute: (val, parent, key) => key });
export const skillSet = new schema.Entity('skillSets', { skills: new schema.Values(language) });
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
export const auth = new schema.Entity('auth', { user: user }, { idAttribute: () => 0 });
