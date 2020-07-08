export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const REMOVE_ITEM_FROM_CARD = 'REMOVE_ITEM_FROM_CARD';
export const INCREASE_ITEM_QUANTITY = 'INCREASE_ITEM_QUANTITY';
export const DECREASE_ITEM_QUANTITY = 'DECREASE_ITEM_QUANTITY';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const RESET_CHANGED_VALUE = 'RESET_CHANGED_VALUE';

export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    return fetch('https://5cf51970ca57690014ab3a23.mockapi.io/products')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error));
        console.log(error);
      });
  };
}

export function updateProducts(items) {
  return (dispatch) => {
    async function mapProducts() {
      dispatch(updateProductsToApi(true));
      await items.map((item) => {
        if (item.changed) {
          return fetch(`https://5cf51970ca57690014ab3a23.mockapi.io/products/${item.id}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          })
            .then((response) => {
              console.log('Update status: ', response.status);
              return response.json();
            })
            .then((json) => console.log('Response: ', json))
            .catch(function (error) {
              console.log('Problem witch post items: ', error.message);
            });
        }
      });
      await dispatch(updateProductsToApi(false));
      await dispatch(resetChangedValue());
    }
    mapProducts();
  };
}

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const removeProductFromCard = (item) => ({
  type: REMOVE_ITEM_FROM_CARD,
  payload: item,
});

export const increaseItemQuantity = (item) => ({
  type: INCREASE_ITEM_QUANTITY,
  payload: item,
});

export const decreaseItemQuantity = (item) => ({
  type: DECREASE_ITEM_QUANTITY,
  payload: item,
});

export const changeItemQuantity = (item, value) => ({
  type: CHANGE_ITEM_QUANTITY,
  payload: { item, value },
});

export const updateProductsToApi = (step) => ({
  type: UPDATE_PRODUCT,
  payload: step,
});

export const resetChangedValue = () => ({
  type: RESET_CHANGED_VALUE,
});
