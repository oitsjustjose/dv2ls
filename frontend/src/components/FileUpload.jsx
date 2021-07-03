import React, { useState } from 'react';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putFileHandler from '../axios/putFileHandler';

const toMb = (size) => (size / 1000000).toFixed(2);

export default () => {
  const [state, setState] = useState({
    loading: false,
    result: null,
    file: null,
    error: null,
  });

  const submit = async (evt) => {
    evt.preventDefault();
    if (state.file && state.file.name.length) {
      if (state.file.size > 16000000) {
        setState({
          loading: false,
          result: null,
          file: null,
          error: `File size ${toMb(state.file.size)}MB is too large`,
        });
        return;
      }

      setState({ ...state, loading: true });
      const data = await putFileHandler(state.file);
      setState({
        loading: false,
        result: `${window.location.origin}/f/${data}`.replace('5000', '3000'),
        file: null,
        error: null,
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width">
        <h2 className="text-center mt-10 py-3">File Uploader</h2>

        <Form onSubmit={submit} className="perfect-width">
          <Form.Group>
            <InputGroup>
              <Form.File
                custom
                required
                accept="*"
                label={(state.file && state.file.name) || 'Select File (Max: 16MB)'}
                onChange={(evt) => setState({ ...state, file: evt.target.files[0] })}
              />
              <InputGroup.Append>
                <Button type="submit" disabled={state.loading || !state.file}>
                  {state.loading ? 'Loading...' : 'Submit'}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>

        {state.error && (
        <h5 className="text-center text-danger">
          {state.error}
        </h5>
        )}

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
