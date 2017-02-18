import Immutable from 'immutable';
import _ from 'lodash';

export class JobProgress extends Immutable.Record({ finished: Immutable.Map(), steps: Immutable.Map() }) {
  constructor(progressData = {}) {
    super({
      finished: Immutable.Map(progressData.finished).map(step => parseInt(step)),
      steps: Immutable.Map(progressData.steps).map(step => parseInt(step)),
    })
  }
}

export class Job extends Immutable.Record({ name: undefined, progress: undefined, status: undefined }) {
  constructor(jobData = {}) {
    super({
      progress: new JobProgress(jobData.progress),
      status: jobData.status,
      name: jobData.name,
    });
  }
}

export class Scan extends Immutable.Record({ jobs: Immutable.List() }) {
  constructor(scanData = {}) {
    super({ jobs: Immutable.Map(scanData.jobs).map(job => new Job(job)) })
  }
}

export class GithubAccount extends Immutable.Record({}) { }

export class GithubUser extends Immutable.Record({ login: undefined, name: undefined }) { }

export class User extends Immutable.Record({ githubAccounts: new Immutable.List() }) {
  constructor(userData = {}) {
    super({ githubAccounts: Immutable.List(userData.githubAccounts) });
  }
}

export class Auth extends Immutable.Record({ user: -1 }) {
  constructor(authData = {}) {
    super({ user: authData.user || -1 });
  }
}

export class Language extends Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1, modules: new Immutable.List() }) {
  constructor(data = {}) {
    data = _.assign({}, data, { modules: new Immutable.List(data.modules) });
    super(data)
  }
}

export class Module extends Immutable.Record({ name: '', languageName: '', rank: 0, population: 1, relevance: 1 }) {}

const AppStateStructure = {
  auth: undefined,
  languages: Immutable.OrderedMap(),
  githubUsers: Immutable.Map(),
  modules: Immutable.OrderedMap(),
  jobs: Immutable.Map(),
}
export class AppState extends Immutable.Record(AppStateStructure) {
  constructor(data = {}) {
    data = _.assign({}, data, {
      auth: (data.auths && data.auths[0]) ? new Auth(data.auths[0]) : undefined, // a bit of a hack..should be a single object
      languages: new Immutable.OrderedMap(data.languages || {}).map((lang) => new Language(lang)).sort((a, b) => a.relevance - b.relevance),
      modules: new Immutable.OrderedMap(data.modules || {}).map((mod) => new Module(mod)).sort((a, b) => a.relevance - b.relevance),
      githubUsers: new Immutable.Map(data.githubUsers || {}).map((ghuser) => new GithubUser(ghuser)),
      jobs: new Immutable.Map(data.jobs || {}).map((job) => new Job(job)),
    });
    super(data);
  }
}
