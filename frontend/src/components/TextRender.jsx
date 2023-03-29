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
        value={paste}
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
