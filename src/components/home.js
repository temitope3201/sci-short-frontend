import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { baseUrl, domain } from "..";
import { useState } from "react";
import { set } from "react-hook-form";
import { Alert, Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { urlRegex } from "..";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCut } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { URL, URLDetails } from "./url";
import { useEffect } from "react";



const HomePage =()=>{

    const LoggedInHome =()=>{

        const [urls, setUrls] = useState([]);
        const [url, setUrl] = useState();
        const [show, setShow] = useState(false);
        const [showAlert, setShowAlert] = useState(false);
        const { register, handleSubmit, setValue, formState: { errors } } = useForm();
        const [urlId, setUrlId] = useState(0);
        const [qrAdded, setQrAdded] = useState(false)

        const navigate = useNavigate();

        let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")
        const requestOptions = {
            method: "GET",
            headers: { "Authorization": `Bearer ${JSON.parse(token)}` }
        };

        useEffect(() => {
            fetch(`${baseUrl}/urls/curren_user`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data)
                    setUrls(data);
                    // getURL(data.id);
                })
                .catch(error => console.log(error))
        }, []);

        const closeModal = () => { setShow(false) };
        const showModal = (id) => {
            setShow(true);
            setUrlId(id)
            urls.map((url) => {
                if (url.id === id) {
                    setValue("title", url.title)
                    setValue("long_url", url.true_url)
                    setValue("short_url", url.short_url)
                };
                return null;
            });
        };

        const getUserLinks = () => {
            fetch(`${baseUrl}/urls/curren_user`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data)
                    setUrls(data);
                })
                .catch(error => console.log(error))
        };

        const getURL = (id) => {
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "GET",
                headers: headers,
            }
            console.log(id)

            fetch(`${baseUrl}/urls/${id}/url`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data);
                    setUrl(data);
                })
                .catch(error => console.log(error))
        };

        const updateURL = (data) => {
            console.log(data);
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data),
            }

            fetch(`${baseUrl}/urls/${urlId}/url`, requestOptions)
                .then(response => {
                    // console.log(response.statusText);
                    if (response.status === 409) {
                        showModal();
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data);
                    // console.log(data.message);
                    alert(data.message);
                    navigate("/");
                    // getUserLinks();
                    getURL(data.id);
                    closeModal();
                })
                .catch(error => console.log(error))
        }

        const deleteURL = (id) => {
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "DELETE",
                headers: headers,
            }

            fetch(`${baseUrl}/urls/${id}/url`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    alert(data.message);
                    getUserLinks();
                    // const reload = window.location.reload();
                    // reload();
                })
                .catch(error => console.log(error))
        }

        const generateQRCode = (id) => {
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(`${baseUrl}/urls/generate_qr/${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    alert(data.message)
                    setQrAdded(true)
                    const reload = window.location.reload()
                    reload()
                })
                .catch(error => console.log(error))
        };


        const resetShortURL = (id) => {
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "PUT",
                headers: headers,
            };

            fetch(`${baseUrl}/urls/${id}/url`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    alert(data.message);
                    // const reload = window.location.reload()
                    // reload()
                })
                .catch(error => console.log(error))

        };

        const copyShortURL = (link) => {
            link = `${domain}/${link}`;
            navigator.clipboard.writeText(link)
                .then(() => {
                    console.log(`${link} copied to clipboard`);
                })
                .catch((error) => {
                    console.error('Error copying string to clipboard:', error);
                });
        };
        

        

      
        
        
        
        return (
            <>
                <Modal
                    show={show}
                    size="lg"
                    onHide={closeModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Short URL
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            
                            <br />
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Long URL</Form.Label>
                                <Form.Control type="text" placeholder="Example: https://... or http://..."
                                    {...register("long_url", {
                                        required: { value: true, message: "Long URL is required" },
                                        pattern: { value: urlRegex, message: "URL must start with: 'https://' or 'http://'" }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    Start with: https://... or http://...
                                </Form.Text>
                                <br />
                                {errors.long_url && <small style={{ color: "red" }}>{errors.long_url.message}</small>}
                            </Form.Group> */}
                            <br />
                            <Form.Group className="mb-3">
                                <Form.Label>Short/Custom URL</Form.Label>
                                <Form.Control type="text" placeholder="[Optional] Enter a custom URL"
                                    {...register("custom_url", {
                                        required: { value: false },
                                        minimum: { value: 5, message: "Minimum length of 5 not reached." },
                                        maxLength: { value: 20, message: "Maximum length of 20 exceeded." }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    Ignore to auto-generate short URL.
                                </Form.Text>
                                <br />
                                {errors.custom_url && <small style={{ color: "red" }}>{errors.custom_url.message}</small>}
                            </Form.Group>
                            <br />
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Customize URL?"
                                    {...register("is_custom", { required: false })}
                                />
                            </Form.Group> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSubmit(updateURL)}>Update</Button>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Container>
                    {urls.length > 0 &&
                        <>
                            <Button className="mb-3" variant="success" href="/shorten_url"><FontAwesomeIcon icon={faCut} />{" "}Shorten New URL</Button>
                        </>
                    }
                    {urls && urls.length > 0 ? (
                        <>
                            <Row>
                                <Col xs={12} sm={5} className="mb-3 boxShadow" >
                                    <h2 className="mb-3">Your Short URLs List</h2>
                                    <div className="scrollable-container">
                                        {urls.map((url, index) => (
                                            <URL
                                                key={index}
                                                id = {url.id}
                                                title={url.description}
                                                long_url={url.true_url}
                                                short_url={url.short_url}
                                                date_created={url.date_created}
                                                no_of_clicks={url.no_of_clicks}
                                                onRetrieve={() => getURL(url.id)}
                                            />
                                        ))}
                                    </div>
                                    < br />
                                    <Button className="mb-3" variant="success" href="/shorten"><FontAwesomeIcon icon={faCut} />{" "}Shorten New URL</Button>
                                </Col>
                                <Col xs={12} sm={7} className="mb-3 boxShadow" >
                                    <h2 className="mb-3">Short URL Details</h2>
                                    <div >
                                        {url &&
                                            <URLDetails
                                                id={url.id}
                                                title={url.description}
                                                true_url={url.true_url}
                                                short_url={url.short_url}
                                                no_of_clicks={url.no_of_clicks}
                                                date_created={url.date_created}
                                                qr_created={url.qr_created}
                                                qr_image_url={url.qr_image_url}
                                                qrcodescans = {url.qrcodescans}
                                                qr_code_id={url.unique_code}
                                                onUpdate={() => showModal(url.id)}
                                                onReset={() => resetShortURL(url.id)}
                                                onDelete={() => deleteURL(url.id)}
                                                onGenerateQR={() => generateQRCode(url.id)}
                                                onCopy={() => copyShortURL(url.short_url)}
                                            />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <h3>No Short URLs available yet. </h3>
                            <br />
                            <Link className="btn btn-lg btn-success" to="/shorten_url"><FontAwesomeIcon icon={faCut} />{" "}Shorten Your First URL.</Link>
                        </>
                    )}
                </Container>
            </>

        )
    }
    
    const LoggedOutHome =()=>{
        return(
            <>
            
                <h1 className="heading">
                    Welcome To Our URL Shortener
                </h1>
                <Link to='/signup' className="btn btn-primary btn-lg"> Get Started </Link>
            </>
        )
    
    }

    const [logged] = useAuth()
    return(
        <div className="home container">
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
            
        </div>
    )
}

export default HomePage