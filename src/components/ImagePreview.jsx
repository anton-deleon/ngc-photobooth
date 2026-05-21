import { useState } from 'react';
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';

function ImagePreview({ imgkey, image, filename }) {
    const [isAllowShare, setAllowShare] = useState(true);
    const [hasDownloaded, setHasDownloaded] = useState(false);
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');

    const handleDownload = async (image, imgkey) => {
        if (hasDownloaded && !window.confirm('You have already downloaded this photo. Do you want to download it again?')) {
            return;
        }

        try {
            setStatus('Preparing download...');
            const res = await fetch('/api/vercelPut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ base64: image, filename: isAllowShare ? `post_${filename}` : filename }),
            });

            const data = await res.json();

            if (res.ok) {
                setUrl(data.url);
            } else {
                console.error('Upload failed:', data.error);
                setErrorMessage('Upload failed. Please try again later.');
            }
        } catch (e) {
            console.error('Unexpected error:', e);
        } finally {
            setStatus('Downloading...');
            const a = document.createElement('a');
            a.href = image;
            a.download = `${imgkey}.png`;
            a.click();
            setStatus('Download complete!');
            setHasDownloaded(true);
        }
    };

    return (
        <Col
            imgkey={imgkey}
            className="d-flex flex-column justify-content-start align-items-center mb-3 mx-auto d-block"
        >
            <img
                src={image}
                alt={`Preview ${imgkey}`}
                className="img-fluid rounded mb-2 mx-auto d-block"
                style={{
                    maxWidth: '100%',
                    maxHeight: 'fit-content',
                    height: '65vh',
                    objectFit: 'contain',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
                    borderRadius: '1rem',
                }}
                onContextMenu={e => e.preventDefault()}
            />

            {/* <div
                style={{
                    background: "rgba(156, 156, 156, 0.7)",  // transparent gray
                    padding: "0.6rem 0.8rem",
                    borderRadius: "5px",
                    width: "100%",
                    maxWidth: "20rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.5rem"
                }}
            >
                <Form.Check
                    type="checkbox"
                    id={`share-${imgkey}`}
                    checked={isAllowShare}
                    onChange={() => setAllowShare(!isAllowShare)}
                    style={{ margin: 0 }}
                />

                <label
                    htmlFor={`share-${imgkey}`}
                    style={{
                        fontSize: "0.9rem",
                        color: "white",
                        margin: 0,
                        cursor: "pointer",
                        textAlign: "left"
                    }}
                >
                    Allow this photo to be shared with NGC’s social media team?
                </label>
            </div> */}

            {status &&
                <div style={{
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    background: "rgba(156, 156, 156, 0.7)",
                    borderRadius: "5px",
                    padding: "0.6rem 0.8rem"
                }}>
                    {status !== 'Download complete!' && (
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                            style={{
                                width: '1.25rem',
                                height: '1.25rem',
                                flex: '0 0 auto'
                            }}
                        />
                    )}
                    <span style={{
                        color: 'white',
                        display: 'inline-block',
                        maxWidth: '24rem',
                        wordBreak: 'break-word'
                    }}
                    >
                        {
                            url
                                ?
                                (
                                    <>
                                        {status}
                                        <br />
                                        {"Can't download your photo? Click "}
                                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                            here
                                        </a>.
                                    </>
                                )
                                :
                                status
                        }
                    </span>
                </div>
            }

            <Button
                variant="primary"
                size="md"
                onClick={() => handleDownload(image, imgkey)}
                disabled={status !== '' && status !== 'Download complete!'}
            >
                Download
            </Button>
        </Col>
    )
}

export default ImagePreview;