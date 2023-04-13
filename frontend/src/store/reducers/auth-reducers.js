export const setAuthInfo = (state, action) => {
  state.isAuthenticated = action.payload.isAuthenticated;
  state.userId = action.payload.userId;
  state.name = action.payload.name;
  state.email = action.payload.email;
};

export const logout = (state, action) => {
  state.isAuthenticated = false;
  state.userId = null;
  state.name = null;
  state.email = null;
};
