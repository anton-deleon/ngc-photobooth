import { useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Spinner
} from 'react-bootstrap';

import ImagePreview from './ImagePreview';

function EmailForm({ composedImages, filename, setErrorMessage }) {
  const [status, setStatus] = useState('');
  const [allowPosting, setAllowPosting] = useState(true);

  return (
    <Container
      className="p-4"
      style={{ maxWidth: '100vw', overflowY: 'hidden' }}
    >
      <Form className="mt-3 mb-3 d-inline-block text-center">
        <div
          style={{
            backgroundColor: 'rgba(156, 156, 156, 0.7)',
            padding: '8px 12px',
            borderRadius: '8px'
          }}
        >
          <Form.Check
            type="checkbox"
            id="allow-posting-checkbox"
            checked={allowPosting}
            onChange={(e) => setAllowPosting(e.target.checked)}
            label="I allow the social media team to post my downloaded photos."
            style={{ fontSize: '0.9rem' }}
          />
        </div>
      </Form>

      <Container className="text-center mb-4">
        <Row className="g-3">
          {composedImages.map(({ key, image }) => (
            <ImagePreview
              key={key}
              imgkey={key}
              image={image}
              filename={filename}
              allowPosting={allowPosting}
            />
          ))}
        </Row>

        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to retake the pictures? Your current photos will be lost.'
              )
            ) {
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