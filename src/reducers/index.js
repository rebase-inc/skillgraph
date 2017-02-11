import Immutable from 'immutable';
import * as actions from '../actions';
import * as schema from './schema';

export function entities(state = new schema.AppState(), action) {
  switch (action.type) {
    case (actions.AUTH.REQUEST):
      return state;
      break;
    case (actions.AUTH.SUCCESS):
      console.log('jentitites are ', action.response.entities);
      return state.mergeDeep(new schema.AppState(action.response.entities));
      break;
    case (actions.JOBS.SUCCESS):
      console.log('jobs are ', action.response.result.jobs);
      return state.mergeDeep({ jobs: new Immutable.Map(action.response.entities.jobs).map(j => new schema.Job(j)) });
      break;
    case (actions.AUTH.FAILURE):
      return state;
      break;
    default:
      return state; break;
  }
}
