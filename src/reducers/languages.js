import Immutable from 'immutable';

import * as actions from '../actions';

const Language = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1, modules: Immutable.Map() })
const Module = Immutable.Record({ name: '', rank: 0, population: 1, relevance: 1 });
const StdLib = Immutable.Record({ name: '__stdlib__', rank: 0, population: 1, relevance: 1 });
const initialState = new Immutable.Map();

export default function languages(prevState = , action) {
  switch (action.type) {
    case (actions.AUTH.REQUEST):
      return prevState;
      break;
    case (actions.AUTH.SUCCESS): 
      return action.response.entities.languages;
      break;
    case (actions.AUTH.FAILURE): 
      return prevState;
      break;
    default: 
      return prevState; break;
  }
}
