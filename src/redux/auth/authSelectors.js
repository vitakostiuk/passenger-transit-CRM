const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;
const getToken = state => state.auth.token;
const getLoadingUser = state => state.auth.loadingUser;
const getLoading = state => state.auth.loading;
const getClickSigninPhone = state => state.auth.isClickSigninPhone;
const getPhoneNumber = state => state.auth.phoneNumber;

export {
  getUserName,
  getUserEmail,
  getToken,
  getLoading,
  getLoadingUser,
  getClickSigninPhone,
  getPhoneNumber,
};
