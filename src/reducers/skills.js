import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/requestConstants';
import IMPACT_SCORES from '../constants/impactScores';

const CommitInfo = Immutable.Record({ first: undefined, last: undefined, count: undefined });
const Skill = Immutable.Record({ name: undefined, rank: 0.0, impact: 1000, commits: new CommitInfo() });
const makeSkill = skill => new Skill({ name: skill[0], rank: 1 - skill[1], impact: IMPACT_SCORES[skill[0].toLowerCase()] || 1000 });
const initialState = new Immutable.List();

export default function skills(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( RESTORE_AUTH + SUCCESS ): return new Immutable.List(action.payload.user.current_role.skill_set.skills.map(makeSkill)); break;
    case ( RESTORE_AUTH + PENDING ): return prevState; break;
    case ( RESTORE_AUTH + ERROR ): return initialState; break;
    default: return prevState; break;
  }
}
