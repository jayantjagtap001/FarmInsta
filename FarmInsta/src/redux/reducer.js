import { ADD_USER, SET_USERS, UPDATE_USER } from './actions';

const initialState = {
  users: [],
  editingUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => user.email === action.payload.email ? action.payload : user)
      };
    default:
      return state;
  }
};

export default reducer;
