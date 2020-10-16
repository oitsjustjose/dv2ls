import React, { useState } from 'react';
import {
  InputGroup, Container, Form, Button,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putUrlHandler from '../axios/putUrlHandler';

export default () => {
  const [state, setState] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const submit = (evt) => {
    evt.preventDefault();
    if (state.length) {
      setLoading(true);
      putUrlHandler(state).then((data) => {
        setResultUrl(`http://${window.location.host}/u/${data}`.replace('5000', '3000'));
        setLoading(false);
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width v-center">
        <h2 className="text-center py-3">URL Shortener</h2>

        <Form onSubmit={submit} className="perfect-width">
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                value={state.url}
                placeholder="URL To Shorten (https://...)"
                onChange={(evt) => setState(evt.target.value)}
                required
              />
              <InputGroup.Append>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>

        {resultUrl && (
        <h5 className="text-center">
          <a rel="noopener noreferrer" href={resultUrl} target="_blank">
            {resultUrl}
          </a>
        </h5>
        )}
      </Container>
    </CSSTransition>
  );
};
