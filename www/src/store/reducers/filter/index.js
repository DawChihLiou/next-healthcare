const initialState = {
  state: null,
  minDischarges: null,
  maxDischarges: null,
  minAverageCoveredCharges: null,
  maxAverageCoveredCharges: null,
  minAverageMedicarePayments: null,
  maxAverageMedicarePayments: null,
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
