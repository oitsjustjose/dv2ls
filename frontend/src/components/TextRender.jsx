import 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import React from 'react';
import AceEditor from 'react-ace';
import { Container } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

export default ({ paste, syntax }) => (
  <CSSTransition classNames="react-router" appear in timeout={300}>
    <Container className="shadow paste-view rouned">
      <AceEditor
        mode={`${syntax}`}
        theme="github"
        name="paste_viewer"
        fontSize={14}
        value={paste || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum labore optio quidem rerum consectetur perspiciatis, voluptates, aspernatur repellendus modi culpa, nam dolor cupiditate consequuntur? Dolorum sit deserunt assumenda commodi cum nihil iure sint repudiandae quos quod a architecto dicta eius excepturi nulla natus, quam voluptatum nemo itaque laudantium magnam. Sequi, beatae a debitis iusto velit porro blanditiis! Veritatis id nesciunt fugiat officia maxime rerum, exercitationem ratione doloremque atque, explicabo consequuntur! Minus, at saepe magni qui nobis earum, tempore optio in, sequi aliquid facilis accusamus ea amet minima. Aut eveniet similique ducimus ea illum dolorem expedita sapiente, ex culpa unde.'}
        wrapEnabled
        readOnly
        setOptions={{
          wrapBehavioursEnabled: true,
          wrap: true,
        }}
        tabSize="4"
        width="100%"
        height="100%"
        className="rounded"
      />
    </Container>
  </CSSTransition>
);
