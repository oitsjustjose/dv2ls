import 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import React from 'react';
import AceEditor from 'react-ace';
import { Container } from 'react-bootstrap';
import Syntax from './paste/Syntax.json';

const reverseSearch = (syntax) => Object.keys(Syntax).filter((x) => Syntax[x] === syntax);

export default ({ paste, syntax }) => (
  <div className="v-center">
    <h4 className="text-center">{`Viewing ${reverseSearch(syntax)} File`}</h4>
    <Container className="shadow paste-view p-0">
      <AceEditor
        mode={`${syntax}`}
        theme="github"
        name="paste_viewer"
        fontSize={18}
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
  </div>
);
