const defaultState = {};

const beverages = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOAD_BEVERAGES':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default beverages;
