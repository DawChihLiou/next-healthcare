const initialState = {
  state: 'al',
  min_discharges: '0',
  max_discharges: '5000',
  min_average_covered_charges: '0',
  max_average_covered_charges: '5000',
  max_average_medicare_payments: '0',
  min_average_medicare_payments: '5000',
};

export default function filter(state = initialState, { type, payload }) {
  if (type === 'SET_FILTER') {
    return {
      ...state,
      ...payload,
    };
  }

  return state;
}
