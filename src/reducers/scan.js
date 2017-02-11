import Immutable from 'immutable';

import { GET_SCAN_STATUS } from '../constants/actionTypes';
import { SUCCESS, ERROR, PENDING } from '../constants/requestConstants';

const ScanStatus = Immutable.Record({ scan: Immutable.Map(), update: Immutable.Map() });
const JobStatus = Immutable.Record({ progress: Immutable.Map(), status: 'finished' });
const Progress = Immutable.Record({ finished: Immutable.Map(), steps: Immutable.Map() });
const initialState = new Immutable.List();

export default function scan(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( GET_SCAN_STATUS + PENDING ): return prevState; break;
    case ( GET_SCAN_STATUS + SUCCESS ):
      return ScanStatus({
        scan: JobStatus({
          progress: Progress( Immutable.fromJS(action.payload.scan.progress) ),
          status: action.payload.scan.status
        }),
        update: JobStatus({
          progress: Progress( Immutable.fromJS(action.payload.update.progress) ),
          status: action.payload.scan.status
        })
      });
      break;
    case ( GET_SCAN_STATUS + ERROR ): return initialState; break;
    default: return prevState; break;
  }
}
