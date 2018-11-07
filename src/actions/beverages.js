import axios from 'axios';

// export const getBeverages = params => {
//   return dispatch => {
//     axios.get(
//       'http://lcboapi.com/products/12341',
//       {},
//       { Authorization: `Token MDoyYTNlMjYwOC1lMjJlLTExZTgtYTI2NS02ZjJiMzNmNWMxNWY6c241UDRwWHFPU1JYVVV3SjU2Y3FPTmw2QTRyYTA5Q3laWEp1` }
//     )
//     .then(res => {
//       console.log(res);
//       if (res.data) {
//         return dispatch({ type: 'GET_USER', ...res.data });
//       } else console.log('Failed');
//     })
//     .catch(err => console.log(err));
//   };
// };

export const getBeverageByLocation = params => {
  if (params.lat && params.lng && params.id) {
    return dispatch => {
      axios.get(
        'http://localhost:9001/product/stores',
        {
          lat: params.lat,
          long: params.lng,
          product_id: params.id
        }
      )
      .then(res => {
        console.log('line 32', res.data.result);
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

// export const getStores = params => {
//   return dispatch => {
//     axios.get('http://lcboapi.com/stores/438457', { params })
//     .then(res => {
//       console.log(res);
//       if (res.data) {
//         return dispatch({ type: 'GET_USER', ...res.data });
//       } else console.log('Failed');
//     })
//     .catch(err => console.log(err));
//   };
// };

const showPosition = position => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log({ lat, lng });
  // this.props.dispatch(getBeverages({lat, lng}));
};

export const getStores = params => {
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition);
  else console.log('Browser does not support geo location');
};
