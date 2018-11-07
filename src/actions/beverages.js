import axios from 'axios';

export const getBeverageByLocation = params => {
  if (params.lat && params.lng && params.id) {
    return dispatch => {
      axios.get(
        `http://localhost:9001/product/stores?lat=${params.lat}&long=${params.lng}&product_id=${params.id}`
      )
      .then(res => {
        if (res.data.result) {
          return dispatch({ type: 'LOAD_STORES_WITH_REQUESTED_STOCK', data: res.data.result });
        } else console.log('Failed');
      })
      .catch(err => console.log(err));
    };
  } else console.log('Missing param(s)');
};

export const getBeverageCollection = params => {
  return dispatch => {
    axios.get('http://localhost:9001/products')
    .then(res => {
      if (res.data.result) {
        return dispatch({ type: 'LOAD_BEVERAGES', data: res.data.result });
      } else console.log('Failed');
    })
    .catch(err => console.log(err));
  };
};
