import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import HomePage from './pages/HomePage/HomePage';
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import Service from './pages/ServicePage/Service';
import Catalog from "./pages/CatalogPage/Catalog";
import Blog from "./pages/BlogPage/Blog";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ProductCard from "./pages/ProductCard/ProductCard";
import NotFound404 from './components/NotFound404';
import ScrollToTop from "./components/ScrollToTop";
import BlogOpen from './pages/BlogPageOpen.js/BlogOpen';

import store from './store/configureStore'

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/services'} component={Service} />
          <Route path={'/catalog'} component={Catalog} />
          <Route path={'/product-card/:id'} component={ProductCard}/>
          <Route path={'/blog'} component={Blog} exact />
          <Route path={'/blog/article/:id'} component={BlogOpen} />
          <Route path={'/contacts'} component={ContactsPage} />
          <Route path={'/about-us'} component={AboutUsPage} />
          <Route render={NotFound404} />
        </Switch>
      </Router>
    </Provider>
  )
};

export default App;
