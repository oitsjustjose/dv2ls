import React, { useState } from 'react';
import {
  InputGroup, Container, Form, Button,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putUrlHandler from '../axios/putUrlHandler';

export default () => {
  const [state, setState] = useState({
    url: null,
    loading: false,
    result: null,
  });

  const submit = (evt) => {
    evt.preventDefault();
    if (state.url) {
      setState({ ...state, loading: true });
      putUrlHandler(state.url).then((data) => {
        setState({
          ...state,
          result: `http://${window.location.host}/u/${data}`.replace('5000', '3000'),
          loading: false,
        });
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width">
        <h2 className="text-center mt-10 py-3">URL Shortener</h2>

        <Form onSubmit={submit} className="perfect-width">
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                value={state.url}
                placeholder="URL To Shorten (https://...)"
                onChange={(evt) => setState({ ...state, url: evt.target.value })}
                required
              />
              <InputGroup.Append>
                <Button type="submit" disabled={state.loading || !state.url}>
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
