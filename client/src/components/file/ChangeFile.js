import React, { useState } from 'react';
import './ChangeFile.css';

import Modal from 'react-modal';
import { Form, Button, Card } from "react-bootstrap";
import axios from 'axios';

// Modal issue
Modal.setAppElement('div');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-30%',
        transform             : 'translate(-50%, -50%)',
        background            : '#25D366',
        color                 : 'white',
        borderRadius          : '10%',
        textAlign             : 'center'
    }
    
};

function ChangeFile({ modalIsOpen, setModalIsOpen, method }) {

    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        // for (const key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        try {
            setLoading(true)
            if (method === "put") {
                await axios.put('/chatfile', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
            } else if (method === "post") {
                await axios.post('/chatfile', formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
            }
            setTimeout( () => {
                setModalIsOpen(false)
                setLoading(false)
                window.location.assign('/')
            }, 20 * 1000)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        >   
            <Card className="card">
                <Card.Body>
                <div>
                <h3>Export chat history</h3>
                <p>You can use the export chat feature to export a copy of the chat history from an individual or group chat.</p>
                <p><strong>Note</strong>: This feature isn’t supported in Germany.</p>
                <ol>
                    <li>Open the individual or group chat.</li>
                    <li>Tap <strong>
                        <a className="_36or" href="https://faq.whatsapp.com/android/troubleshooting/finding-the-more-options-icon">More options</a>
                        </strong>
                        <span className="margin-cms"></span>
                        <picture>
                            <source srcset="https://scontent.whatsapp.net/v/t39.8562-34/cp0/p50x50/118117430_995065920932265_1336446442210986426_n.jpg.webp?ccb=2&amp;_nc_sid=8a74b9&amp;_nc_ohc=FkoQxIVv9k8AX-L84FN&amp;_nc_ht=scontent.whatsapp.net&amp;_nc_tp=30&amp;oh=fae6e19a6fa7cd3dc95114bb9c810ecb&amp;oe=5FF8A6EF" type="image/webp" />
                            <img className="icon _-p-" id="" src="https://scontent.whatsapp.net/v/t39.8562-34/cp0/e10/p50x50/118117430_995065920932265_1336446442210986426_n.jpg?ccb=2&amp;_nc_sid=8a74b9&amp;_nc_ohc=FkoQxIVv9k8AX-L84FN&amp;_nc_ht=scontent.whatsapp.net&amp;tp=27&amp;oh=c1d646cee43051ee2092c41f796488f1&amp;oe=5FF64776" loading="lazy" />
                        </picture> 
                        &gt; <strong>More</strong> &gt; <strong>Export chat</strong>. 
                        </li>
                                <li>Choose whether to export with media or without media.</li>
                                </ol>
                                <p>An email will be composed with your chat history attached as a .txt document.</p>
                                <p><strong>Note</strong>:</p>
                                <ul>
                                    <li>If you choose to attach media, the most recent media sent will be added as attachments.</li>
                                    <li>When exporting with media, you can send up to 10,000 latest messages. Without media, you can send 40,000 messages. These constraints are due to maximum email sizes.</li>
                                </ul>
                    </div>
                    
                    {/* <form className="formModal">
                        <input type="file" />
                        <input type="submit" value="Send" />
                    </form> */}
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="chatFileUpload" >
                        <Form.Label>Chat File</Form.Label>
                        <Form.Control id="fileUpload" type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-20" type="submit">
                            Submit
                        </Button>
                        { loading && <div>Loading...</div>}
                </Form>
            </Card>
        </Modal>
    )
}

export default ChangeFile


