import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/requestConstants';
import IMPACT_SCORES from '../constants/impactScores';

const Language = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1, modules: Immutable.Map(), stdlib: Immutable.Map() })
const Module = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1 });
const StdLib = Immutable.Record({ name: 'stdlib', rank: 0, population: 1, relevance: 1 });
const initialState = new Immutable.Map();

export default function skills(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( RESTORE_AUTH + SUCCESS ):
      return Immutable.fromJS(action.payload.user.current_role.skill_set.skills).map((lang_stats, lang_name) => {
        return new Language({
          name: lang_name,
          rank: parseInt(lang_stats.get('rank', 1)),
          population: parseInt(lang_stats.get('population', 1)),
          relevance: parseInt(lang_stats.get('relevance', 1)),
          stdlib: new StdLib(lang_stats.get('stdlib')),
          modules: lang_stats.get('modules', Immutable.Map()).map((module_stats, module_name) => {
            return new Module({
              rank: module_stats.get('rank', 0),
              population: module_stats.get('population', 1),
              relevance: module_stats.get('relevance', 1),
              name: module_name
            });
          })
        })
      });
      break;
    case ( RESTORE_AUTH + PENDING ): return prevState; break;
    case ( RESTORE_AUTH + ERROR ): return initialState; break;
    default: return prevState; break;
  }
}
