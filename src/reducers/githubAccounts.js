import Immutable from 'immutable';

import { RESTORE_AUTH } from '../constants/actionTypes';
import { SUCCESS, ERROR, PENDING } from '../constants/requestConstants';

const GithubAccount = Immutable.Record({ login: null });
const initialState = new Immutable.List();

export default function githubAccounts(prevState = initialState, action) {
  switch (action.type + action.status) {
    case ( RESTORE_AUTH + PENDING ): return prevState; break;
    case ( RESTORE_AUTH + SUCCESS ): return new Immutable.List(action.payload.user.github_accounts.map(ga => new GithubAccount(ga.github_user))); break;
    case ( RESTORE_AUTH + ERROR ): return initialState; break;
    default: return prevState; break;
  }
}
