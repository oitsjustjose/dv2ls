import { faCode, faImage, faLink } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import NavLinkItem from './NavLinkItem';

export default () => (
  <Navbar expand="lg" collapseOnSelect bg="dark" variant="dark" fixed="top">
    <Navbar.Brand>oitsjustjo.se</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="mr-auto">
        <NavLinkItem name="URL" dest="/" icon={faLink} />
        <NavLinkItem name="Img" dest="/img" icon={faImage} />
        <NavLinkItem name="Paste" dest="/paste" icon={faCode} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
