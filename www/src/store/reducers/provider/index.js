export const initialState = {
  list: null,
  isLoading: false,
  error: null,
};

export default function providers(state = initialState, { type, payload }) {
  if (type === 'FETCH_PROVIDERS_REQUESTED') {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === 'FETCH_PROVIDERS_SUCCESSFUL') {
    return {
      ...state,
      isLoading: false,
      list: payload,
      error: null,
    };
  }

  if (type === 'FETCH_PROVIDERS_FAILED') {
    return {
      ...state,
      isLoading: false,
      list: null,
      error: payload,
    };
  }

  return state;
}
