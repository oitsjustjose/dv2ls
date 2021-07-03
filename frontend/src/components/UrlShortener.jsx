import React, { useState } from 'react';
import {
  Container, Form, Button, Col,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putUrlHandler from '../axios/putUrlHandler';

export default () => {
  const [state, setState] = useState({
    url: null,
    slug: null,
    loading: false,
    result: null,
    error: false,
  });

  const submit = async (evt) => {
    evt.preventDefault();
    if (state.url) {
      setState({ ...state, loading: true });

      try {
        const data = await putUrlHandler(state);
        if (data) {
          setState({
            ...state,
            result: `${window.location.origin}/${data}`,
            loading: false,
            error: false,
          });
        } else {
          setState({
            ...state,
            result: null,
            loading: false,
            error:
              'There is a conflict with this slug. Please try a different one!',
          });
        }
      } catch (ex) {
        if (ex.response?.data?.error) {
          setState({
            ...state,
            result: null,
            loading: false,
            error: ex.response.data.error,
          });
        }
      }
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width">
        <h2 className="text-center mt-10 py-3">URL Shortener</h2>
        <Form onSubmit={submit} className="mb-3">
          <Form.Row className="align-items-center justify-content-center">
            <Col xs={12} lg={7} className="mb-osm-3">
              <Form.Control
                type="url"
                value={state.url}
                placeholder="URL To Shorten (https://...)"
                onChange={(evt) => setState({ ...state, url: evt.target.value })}
                required
              />
            </Col>
            <Col xs={12} lg={3} className="mb-osm-3">
              <Form.Control
                type="text"
                value={state.slug}
                placeholder="Optional Slug"
                onChange={(evt) => setState({ ...state, slug: evt.target.value })}
              />
            </Col>
            <div className="center-osm">
              <Button type="submit" disabled={state.loading || !state.url}>
                {state.loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </Form.Row>
        </Form>

        {state.error && (
          <h5 className="text-center text-danger">{state.error}</h5>
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
