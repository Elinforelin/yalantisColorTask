const SET_USERS_DATA = "SET_USERS_DATA";

const userReduser = (state = [], action) => {
  switch (action.type) {
    case SET_USERS_DATA: {
      return {
        ...state, data: action.payload
      }
    }
  }
}


export const setUsersData = (data) => {
  return {
    type: SET_USERS_DATA,
    payload: data,
  }
}