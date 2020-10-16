import 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import React from 'react';
import AceEditor from 'react-ace';

export default ({ paste, syntax }) => (
  <div style={{ width: '100vw', height: 'calc(100vh - 3.5em)' }}>
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
    />
  </div>
);
