const initialState = {
  shippingOptions: [
    {
      name: 'D7L',
      price: 15.99,
    },
    {
      name: '7post',
      price: 7.99,
    },
  ],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
