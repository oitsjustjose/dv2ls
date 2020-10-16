import React, { useState } from 'react';
import {
  Button, Container, Form, InputGroup,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import putImgHandler from '../axios/putImgHandler';

export default () => {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const submit = (evt) => {
    evt.preventDefault();
    if (file && file.name.length) {
      setLoading(true);
      putImgHandler(file).then((data) => {
        setResultUrl(`http://${window.location.host}/i/${data}`.replace('5000', '3000'));
        setLoading(false);
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <Container className="perfect-width v-center">
        <h2 className="text-center py-3">Image Uploader</h2>

        <Form onSubmit={submit} className="perfect-width">
          <Form.Group>
            <InputGroup>
              <Form.File
                custom
                required
                id="image"
                accept="image/*"
                label={(file && file.name) || 'Choose an Image..'}
                onChange={(evt) => setFile(evt.target.files[0])}
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
