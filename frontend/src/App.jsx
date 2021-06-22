import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import NavBar from './components/modules/NavBar';
import TextUpload from './components/TextUpload';
import UrlShortener from './components/UrlShortener';

export default () => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        <Route exact path="/" component={UrlShortener} />
        <Route exact path="/f" component={FileUpload} />
        <Route exact path="/p" component={TextUpload} />
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
