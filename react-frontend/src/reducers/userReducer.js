export default (state = { users: [], act: 'NULL' }, action) => {
  switch (action.type) {
      case 'ALL_USERS':
        return {...state, act: 'ALL_USERS_FETCHED'};
      case 'ALL_USERS_RECEIVED':
        console.log(action.payload);
        console.log('erwann');
        return {...state, act: 'ALL_USERS_RECEIVED', users: action.payload};
      default:
  }
  return {...state, act: 'NULL_RECEIVED'};
};