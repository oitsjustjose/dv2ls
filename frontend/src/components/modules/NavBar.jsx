import { faCode, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import NavLinkItem from './NavLinkItem';

export default () => (
  <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark" fixed="top">
    <Navbar.Brand>{window.location.origin.substr(window.location.origin.indexOf('//') + 2)}</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
        <NavLinkItem name="URL" dest="/" icon={faLink} />
        <NavLinkItem name="Code" dest="/code" icon={faCode} />
        <NavLinkItem name="File" dest="/files" icon={faFile} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
