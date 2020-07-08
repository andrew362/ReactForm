import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  REMOVE_ITEM_FROM_CARD,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  CHANGE_ITEM_QUANTITY,
  UPDATE_PRODUCT,
  RESET_CHANGED_VALUE,
} from '../actions/actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  fetched: false,
  posting: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        items: action.payload.products,
      };

    case FETCH_PRODUCTS_FAILURE:
      alert('Upps... Something goes wrong. Try again.');
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    case REMOVE_ITEM_FROM_CARD:
      let newCardList = state.items.filter((el) => el.id !== action.payload);
      return {
        ...state,
        items: newCardList,
      };

    case INCREASE_ITEM_QUANTITY:
      let newItemsAmountInc = state.items.map((el) => {
        if (el.id === action.payload) {
          el.quantity++;
          if (el.quantity > 100) {
            el.quantity = 100;
          }
          if (el.quantity < 0) {
            el.quantity = 0;
          }
          el.changed = true;
          return el;
        } else {
          return el;
        }
      });
      return {
        ...state,
        items: newItemsAmountInc,
      };

    case DECREASE_ITEM_QUANTITY:
      let newItemsAmountDec = state.items.map((el) => {
        if (el.id === action.payload) {
          el.quantity--;
          if (el.quantity > 100) {
            el.quantity = 100;
          }
          if (el.quantity < 0) {
            el.quantity = 0;
          }
          el.changed = true;
          return el;
        } else {
          return el;
        }
      });
      return {
        ...state,
        items: newItemsAmountDec,
      };

    case CHANGE_ITEM_QUANTITY:
      let newItemsAmountOnInput = state.items.map((el) => {
        if (el.id === action.payload.item) {
          el.quantity = action.payload.value;
          if (el.quantity > 100) {
            el.quantity = 100;
          }
          if (el.quantity < 0) {
            el.quantity = 0;
          }
          el.changed = true;
          return el;
        } else {
          return el;
        }
      });
      return {
        ...state,
        items: newItemsAmountOnInput,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        posting: action.payload,
      };

    case RESET_CHANGED_VALUE:
      let resetCangedValuesForItem = state.items.map((el) => {
        if (el.changed) {
          el.changed = false;
        }
        return el;
      });
      return {
        ...state,
        items: resetCangedValuesForItem,
      };

    default:
      return state;
  }
}
