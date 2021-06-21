import 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import moment from 'moment';
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import getTxtHandler from '../axios/getTxtHandler';
import putTxtHandler from '../axios/putTxtHandler';
import './paste/acemodes';
import Syntax from './paste/Syntax.json';
import TextRender from './TextRender';

const expirationOptions = {
  Never: moment().add(2048, 'years').toISOString(),
  'In 1 Hour': moment().add(1, 'hour').toISOString(),
  'In 6 Hours': moment().add(6, 'hours').toISOString(),
  'In 12 Hours': moment().add(12, 'hours').toISOString(),
  'In 1 Day': moment().add(1, 'day').toISOString(),
  'In 1 Week': moment().add(1, 'week').toISOString(),
  'In 1 Month': moment().add(1, 'month').toISOString(),
};

export default () => {
  const [state, setState] = useState({
    paste: null,
    syntax: Syntax.PlainText,
    expiresAt: expirationOptions.Never,
    loading: false,
    result: null,
  });
  const [renderState, setRenderState] = useState({
    paste: null,
    notFound: false,
  });

  const query = new URLSearchParams(window.location.search);
  const isValid = state.paste && state.syntax && state.expiresAt;

  // Check if the user is _viewing_ a paste
  if (query.has('id')) {
    //   If the paste isn't loaded:
    if (!renderState.paste) {
      // If the paste attempted to load but wasn't found
      if (renderState.notFound) {
        return (
          <CSSTransition classNames="react-router" appear in timeout={300}>
            <h2 className="v-center">Paste Not Found Or Expired</h2>
          </CSSTransition>
        );
      }

      // Grab the paste, and set it
      getTxtHandler(query.get('id'))
        .then((paste) => setRenderState({ ...renderState, paste }))
        .catch(() => setRenderState({ ...renderState, notFound: true }));

      // Render nice loading text :)
      return (
        <CSSTransition classNames="react-router" appear in timeout={300}>
          <h1 className="v-center">Loading...</h1>
        </CSSTransition>
      );
    }

    // Return the actual paste with the data!
    return (
      <CSSTransition classNames="react-router" appear in timeout={300}>
        <TextRender
          paste={renderState.paste.paste}
          syntax={renderState.paste.syntax}
        />
      </CSSTransition>
    );
  }

  const submit = (evt) => {
    evt.preventDefault();
    if (state.paste && state.syntax && state.expiresAt) {
      setState({ ...state, loading: true });
      putTxtHandler(state).then((data) => {
        setState({
          ...state,
          result: `http://${window.location.host}/p?id=${data}`,
          loading: false,
        });
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="text-center m-auto">
        <h2 className="text-center mt-5 py-3">Pastebin</h2>

        <Form onSubmit={submit} className="perfect-width text-center m-auto">
          {/* Syntax Selection */}
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Syntax</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="select"
                onChange={(evt) => setState({ ...state, syntax: evt.target.value })}
              >
                {Object.keys(Syntax).map((name, idx) => (
                  <option selected={idx === 0} value={Syntax[name]}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </Form.Group>

          {/* Paste input */}
          <Form.Group>
            <Container className="shadow paste-edit p-0 rounded">
              <AceEditor
                mode={`${state.syntax}`}
                theme="github"
                name="paste_editor"
                onChange={(val) => setState({ ...state, paste: val })}
                fontSize={14}
                value={state.paste}
                showPrintMargin={false}
                enableBasicAutocompletion
                enableLiveAutocompletion
                highlightActiveLine
                enableSnippets
                wrapEnabled
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
          </Form.Group>

          {/* Expiration & Submission */}
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Expire?</InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                as="select"
                onChange={(evt) => setState({ ...state, expiresAt: evt.target.value })}
              >
                {Object.keys(expirationOptions).map((name, idx) => (
                  <option selected={idx === 0} value={expirationOptions[name]}>
                    {name}
                  </option>
                ))}
              </Form.Control>

              <InputGroup.Append>
                <Button type="submit" disabled={!isValid || state.loading}>
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>

        {state.result && (
          <h5 className="text-center">
            <a rel="noopener noreferrer" href={state.result} target="_blank">
              {state.result}
            </a>
          </h5>
        )}
      </Container>
    </CSSTransition>
  );
};
