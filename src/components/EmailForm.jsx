import { useState } from 'react';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import ImagePreview from './ImagePreview';

function EmailForm({ composedImages, filename, setErrorMessage }) {
  const [status, setStatus] = useState('');

  return (
    <Container className="p-4" style={{ maxWidth: '100vw', overflowY: "hidden" }}>
      <Container className="text-center mb-4">
        <Row className="g-3">
          {composedImages.map(({ key, image }) =>
            <ImagePreview
              key={key}
              imgkey={key}
              image={image}
            />
          )}
        </Row>
        <Button
          variant="danger"
          size='sm'
          // className="mt-3"
          onClick={() => {
            if (window.confirm('Are you sure you want to retake the pictures? Your current photos will be lost.')) {
              window.location.reload();
            }
          }}
          disabled={status !== '' && status !== 'Download complete!'}
        >
          Retake Pictures
        </Button>
      </Container>
    </Container>
  );
}

export default EmailForm;
