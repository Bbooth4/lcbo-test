const defaultState = {};

const stores = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOAD_STORES_WITH_REQUESTED_STOCK':
      return { ...state, ...action.data };
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};

export default stores;
