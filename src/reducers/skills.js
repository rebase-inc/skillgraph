import Immutable from 'immutable';

const CommitInfo = Immutable.Record({ first: undefined, last: undefined, count: undefined });
const Skill = Immutable.Record({ name: undefined, rank: 0.0, impact: 1, commits: new CommitInfo() });

export default function skills(prevState = new Immutable.List(), action) {
  return new Immutable.List();
}
