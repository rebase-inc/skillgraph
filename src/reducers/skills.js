import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING, SUCCESS, ERROR } from '../constants/requestConstants';
import IMPACT_SCORES from '../constants/impactScores';

const Language = Immutable.Record({ name: '', percentile: 0.001, modules: Immutable.Map(), grammar: Immutable.Map(), stdlib: Immutable.Map() })
const Module = Immutable.Record({ name: '', percentile: 0.001, impact: 0 });
const Grammar = Immutable.Record({ name: 'grammar', percentile: 0.001 });
const StdLib = Immutable.Record({ name: 'stdlib', percentile: 0.001 });
const initialState = new Immutable.Map();

export default function skills(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( RESTORE_AUTH + SUCCESS ):
      return Immutable.fromJS(action.payload.user.current_role.skill_set.skills).map((lang_stats, lang_name) => {
        return new Language({
          name: lang_name,
          percentile: parseFloat(lang_stats.get('percentile', 0.001)),
          grammar: new Grammar(lang_stats.get('grammar', { percentile: lang_stats.get('percentile', 0.001) })),
          stdlib: new StdLib(lang_stats.get('stdlib', { percentile: lang_stats.get('percentile', 0.001) })),
          modules: lang_stats.get('modules', Immutable.List()).map((module_stats, module_name) => {
            return new Module({
              percentile: parseFloat(module_stats.get('percentile', 0.001)),
              impact: parseFloat(module_stats.get('impact', 0)),
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
