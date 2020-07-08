import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, changeItemQuantity } from '../../actions/actions';

class Quantity extends Component {
  render() {
    const { quantity, id, decreaseItem, increaseItem, changeItemQuantityOnInput, styles } = this.props;
    return (
      <div className={styles.cardItemQuantity}>
        <button disabled={quantity <= 0 ? true : false} onClick={() => decreaseItem(id)}>
          -
        </button>
        <input onChange={(e) => changeItemQuantityOnInput(id, e.target.value)} value={quantity} type="text" />
        <button disabled={quantity >= 100 ? true : false} onClick={() => increaseItem(id)}>
          +
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseItem: (id) => dispatch(increaseItemQuantity(id)),
    decreaseItem: (id) => dispatch(decreaseItemQuantity(id)),
    changeItemQuantityOnInput: (id, value) => dispatch(changeItemQuantity(id, value)),
  };
};

export default connect(null, mapDispatchToProps)(Quantity);
