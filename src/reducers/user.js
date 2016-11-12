import Immutable from 'immutable';

const User = Immutable.Record({ email: null }); 

export default function user(prevState = new User(), action) {
  return new User(action.payload.user); 
}
