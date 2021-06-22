import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import NavBar from './components/modules/NavBar';
import TextUpload from './components/TextUpload';
import UrlShortener from './components/UrlShortener';
import CheckUrlRedirect from './axios/getUrlHandler';

const slug = window.location.pathname.match(/[^/][^/]*/g);

export default () => {
  // Check to see if slug is worth trying :)
  !!slug && CheckUrlRedirect(slug).then((url) => {
    window.location.href = url;
  }).catch(() => {});

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        <Route exact path="/" component={UrlShortener} />
        <Route exact path="/code" component={TextUpload} />
        <Route exact path="/files" component={FileUpload} />
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
