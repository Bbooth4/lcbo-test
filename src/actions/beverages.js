import axios from 'axios';
require('dotenv').config();

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

export const getBeverageCollection = params => {
  console.log('line 22');
  return dispatch => {
    axios.get('http://localhost:9001/products')
    .then(res => {
      console.log('line 26');
      console.log(res.data.result[0])
      // Object.keys(res.data.result).map(e => {
      //   console.log('line 28', res.data[e])
      //   res.data[e]
      // })

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
