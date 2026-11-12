import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Admin from './Admin.jsx';
import { CategoryPage, ProductsPage, AboutPage, ContactPage } from './Pages.jsx';
import ProductDetail from './ProductDetail.jsx';
import './index.css';
import './admin.css';
const path=window.location.pathname.replace(/\/$/,'')||'/';
const routes={
'/admin':<Admin/>,'/products':<ProductsPage/>,'/about':<AboutPage/>,'/contact':<ContactPage/>,
'/food-bags':<CategoryPage slug="food-bags"/>,'/shopping-bags':<CategoryPage slug="shopping-bags"/>,'/pizza-boxes':<CategoryPage slug="pizza-boxes"/>,'/disposable-items':<CategoryPage slug="disposable-items"/>,'/food-packaging':<CategoryPage slug="food-packaging"/>,'/paper-products':<CategoryPage slug="paper-products"/>
};
const productMatch=path.match(/^\/product\/([^/]+)$/);
const page=productMatch?<ProductDetail slug={productMatch[1]}/>:routes[path]||<App/>;
createRoot(document.getElementById('root')).render(<React.StrictMode>{page}</React.StrictMode>);
