import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/requestConstants';
import IMPACT_SCORES from '../constants/impactScores';

const Language = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1, modules: Immutable.Map() })
const Module = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1 });
const StdLib = Immutable.Record({ name: '__stdlib__', rank: 0, population: 1, relevance: 1 });
const initialState = new Immutable.Map();

export default function skills(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( RESTORE_AUTH + SUCCESS ):
      return Immutable.fromJS(action.payload.user.current_role.skill_set.skills).map((lang_stats, lang_name) => {
        return new Language({
          name: lang_name,
          rank: lang_stats.get('rank'),
          population: lang_stats.get('population'),
          relevance: lang_stats.get('relevance'),
          modules: lang_stats.get('modules').map((stats, name) => {
            return name == '__stdlib__' ? new StdLib(stats) : new Module(stats.set('name', name));
          })
        });
      });
      break;
    case ( RESTORE_AUTH + PENDING ): return prevState; break;
    case ( RESTORE_AUTH + ERROR ): return initialState; break;
    default: return prevState; break;
  }
}
