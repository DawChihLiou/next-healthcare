const initialState = {
  state: 'AL',
  minDischarges: 0,
  maxDischarges: 0,
  minAverageCoveredCharges: 0,
  maxAverageCoveredCharges: 0,
  minAverageMedicarePayments: 0,
  maxAverageMedicarePayments: 0,
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
