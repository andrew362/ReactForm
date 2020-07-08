import React, { lazy, Suspense } from 'react';
import './styles/App.scss';
import Layout from './containers/Layout/Layout';
import Card from './Components/Card';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Spinner from './Components/Spinner';

const Shipping = lazy(() => import('./containers/Form/Form'));

function App({ products }) {
  return (
    <Layout>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cart" />} />
            <Route path="/cart" component={Card} />
            <Route path="/shipping" render={() => (products.length > 0 ? <Shipping /> : <Redirect to="/cart" />)} />
            <Route path="/" render={() => <Redirect to="/cart" />} />
          </Switch>
        </Suspense>
      </Router>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.items,
});

export default connect(mapStateToProps)(App);
