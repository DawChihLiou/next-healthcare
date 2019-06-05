const initialState = {
  accessToken: null,
  email: null,
  familyName: null,
  givenName: null,
  googleId: null,
  imageUrl: null,
  name: null,
  isLoading: false,
  error: null,
};

export default function user(state = initialState, { type, payload }) {
  if (type === 'AUTH_REQUESTED') {
    return { ...state, isLoading: true };
  }

  if (type === 'AUTH_SUCCESSFUL') {
    return { ...state, isLoading: false, ...payload };
  }

  if (type === 'AUTH_FAILED') {
    return { ...state, isLoading: false, error: payload };
  }

  return state;
}
