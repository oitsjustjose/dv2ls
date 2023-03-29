import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import NavBar from './components/modules/NavBar';
import TextUpload from './components/TextUpload';
import UrlShortener from './components/UrlShortener';
import CheckUrlRedirect from './axios/getUrlHandler';
import TextRender from './components/TextRender';

const slug = window.location.pathname.match(/[^/][^/]*/g);
export const routes = [
  { path: '/', component: UrlShortener },
  { path: '/files', component: FileUpload },
  { path: '/code', component: TextUpload },
  { path: '/test', component: TextRender },
];

export default async () => {
  /* Ensure that there's a slug worth trying, and that it isn't
      already a route that should be "protected"
  */
  if (!!slug && !routes.map(
    ({ path }) => path,
  ).includes(window.location.pathname)) {
    const url = await CheckUrlRedirect(slug);
    if (url) {
      window.location.href = url;
    }
  }

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <div className="rootbox-flex">
          <div className="rootbox">
            <NavBar />
            {routes.map(({ path, component }) => (
              <Route exact path={path} component={component} />
            ))}
          </div>
        </div>
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
