import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/modules/NavBar';
import UrlShortener from './components/UrlShortener';
import ImageUpload from './components/ImageUpload';

export default () => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        <Route exact path="/" component={UrlShortener} />
        <Route exact path="/img" component={ImageUpload} />
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
