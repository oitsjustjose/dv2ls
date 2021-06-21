import React, { useState } from 'react';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putImgHandler from '../axios/putImgHandler';

export default () => {
  const [state, setState] = useState({
    loading: false,
    result: null,
    file: null,
  });

  const submit = (evt) => {
    evt.preventDefault();
    if (state.file && state.file.name.length) {
      setState({ ...state, loading: true });
      putImgHandler(state.file).then((data) => {
        setState({
          ...state,
          result: `http://${window.location.host}/i/${data}`.replace('5000', '3000'),
          loading: false,
        });
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width">
        <h2 className="text-center mt-10 py-3">Image Uploader</h2>

        <Form onSubmit={submit} className="perfect-width">
          <Form.Group>
            <InputGroup>
              <Form.File
                custom
                required
                id="image"
                accept="image/*"
                label={(state.file && state.file.name) || 'Select Image (Max: 50MB)'}
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
