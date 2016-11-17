import { dispatchedRequest } from '../utils/api';

import { RESTORE_AUTH } from '../constants/actionTypes';

export function restoreAuth() {
  return dispatchedRequest('GET', '/c2r_auth', RESTORE_AUTH);
}
