import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchProducts, removeProductFromCard, updateProducts } from "../../actions/productActions";
import Product from './Product/Product';
import Spinner from './Spinner';
import { Link } from "react-router-dom";


class Card extends Component {

    componentDidMount() {
        if (!this.props.fetched) {
            this.props.dispatch(fetchProducts());
        }
    }

    componentWillUnmount() {
        this.props.updateProducts(this.props.products);
    }

    summarizeAllPrices = (products) => {
        let total = 0;
        products.forEach(item => {
            total += Number(item.price) * Number(item.quantity);
        });
        return total.toFixed(2);
    }

    removeProductFromCardHandler = (id) => {
        this.props.removeProductFromCard(id);
    }

    render() {
        const { error, loading, products } = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return (
                <div className="cardsContainer">
                    <Spinner />
                </div>
            );
        }
        if (products.length > 0) {
            return (
                <div className='cardsContainer'>
                    {products ?
                        products.map(item =>
                            <Product
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                price={item.price}
                                quantity={item.quantity}
                                removeItemFromCardHandler={(id) => this.removeProductFromCardHandler(id)}
                            />) : null
                    }
                    <div className="cardsContainerFooter">
                        <h2>
                            {this.summarizeAllPrices(products)}
                            <span className="currencySymbol">&#8364;</span>
                        </h2>
                        <Link to="/shipping">
                            <button>BUY</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cardsContainer emptyList">
                    <h3>Nothing to display...</h3>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    products: state.products.items,
    loading: state.products.loading,
    error: state.products.error,
    fetched: state.products.fetched
});

const mapDispatchToProps = dispatch => {
    return {
        removeProductFromCard: (item) => dispatch(removeProductFromCard(item)),
        updateProducts: (products) => dispatch(updateProducts(products)),
        dispatch
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Card);