import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { PENDING } from '../constants/requestConstants';

const GithubAccount = Immutable.Record({ github_user_id: null });

export default function githubAccounts(prevState = new Immutable.List(), action) {
  switch (action.type) {
    case RESTORE_AUTH: 
      return action.status == PENDING ? prevState : new Immutable.List(action.payload.user.github_accounts.map(ga => new GithubAccount(ga))); break;
    default: return prevState; break;
  }
}
