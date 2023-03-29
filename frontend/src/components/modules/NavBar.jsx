import { faCode, faFile, faLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import NavLinkItem from './NavLinkItem';

export default () => (
  <Navbar expand="lg" collapseOnSelect>
    <Navbar.Brand>Dev Tools</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
        <NavLinkItem name="Code" dest="/code" icon={faCode} />
        <NavLinkItem name="File" dest="/files" icon={faFile} />
        <NavLinkItem name="URL" dest="/" icon={faLink} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
