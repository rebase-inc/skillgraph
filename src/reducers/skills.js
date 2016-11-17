import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING } from '../constants/requestConstants';
import IMPACT_SCORES from '../constants/impactScores';
console.log("IMPACT SOCRES ARE ", IMPACT_SCORES);

const CommitInfo = Immutable.Record({ first: undefined, last: undefined, count: undefined });
const Skill = Immutable.Record({ name: undefined, rank: 0.0, impact: 1000, commits: new CommitInfo() });

export default function skills(prevState = new Immutable.List(), action) {
  switch (action.type) {
    case RESTORE_AUTH: 
      return action.status == PENDING ? prevState : 
        new Immutable.List(action.payload.user.current_role.skill_set.skills.map(s => new Skill({ 
          name: s[0], 
          rank: 1 - s[1],
          impact: IMPACT_SCORES[s[0].toLowerCase()] || 1000,
        }))); 
      break;
    default: return prevState; break;
  }
}
