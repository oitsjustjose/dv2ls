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
export const routes = [
  { path: '/', component: UrlShortener },
  { path: '/code', component: TextUpload },
  { path: '/files', component: FileUpload },
];

export default () => {
  /* Ensure that there's a slug worth trying, and that it isn't
      already a route that should be "protected"
  */
  if (!!slug && !routes.map(
    ({ path }) => path,
  ).includes(window.location.pathname)) {
    CheckUrlRedirect(slug).then((url) => {
      window.location.href = url;
    }).catch(() => {});
  }

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        {routes.map(({ path, component }) => (
          <Route exact path={path} component={component} />
        ))}
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
