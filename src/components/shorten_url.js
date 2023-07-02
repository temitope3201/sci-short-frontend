import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { baseUrl, urlRegex } from "..";
import { useAuth, logout } from "../auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShortenUrlPage =()=>{
    

    const LoggedInView =()=>{

        const { register, handleSubmit, reset, formState: { errors } } = useForm();
        const [show, setShow] = useState(false);
        const [serverResponse, setServerResponse] = useState("");
        const navigate = useNavigate();

        const shortenUrl = (data) => {
            let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            });

            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            }

            fetch(`${baseUrl}/urls/shorten`, requestOptions)
                .then(response => {
                    console.log(response.status)
                    if ((response.status === 201) || (response.status === 200)) {
                        navigate("/")
                    }
                    else if (response.status === 401) {
                        logout()
                        navigate("/login");
                    }
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    setServerResponse(data.message)
                    // console.log(data.status)
                    setShow(true)
                    navigate("/")
                    alert(data.message)
                })
                .catch(error => console.log(error))

            reset()
        }

        return (
            <div className="shorten container">
                <div className="form box">
                    {show ?
                        <>
                            <Alert variant="danger" onClose={() => setShow(true)} dismissible>
                                <p>{serverResponse}</p>
                            </Alert>
                            <h1 className="mb-3">Shorten Your URL</h1>
                        </>
                        :
                        <h1 className="mb-3">Shorten Your URL</h1>
                    }
                    <Form>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>URL Title</Form.Label>
                            <Form.Control type="text" placeholder="[Optional] Enter URL Title"
                                {...register("title", { required: false, maxLength: 50 })}
                            />
                            {errors.password?.type === "maxLength" && <small style={{ color: "red" }}>Maximum Character should be 50.</small>}
                        </Form.Group> */}
                        <br />
                        <Form.Group className="mb-3">
                            <Form.Label>Long URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter your long URL"
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
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3">
                            <Form.Label>Custom URL</Form.Label>
                            <Form.Control type="text" placeholder="[Optional] Enter a custom URL"
                                {...register("custom_url", { required: false, maxLength: 20 })}
                            />
                            <Form.Text className="text-muted">
                                Ignore for auto-generated short URL.
                            </Form.Text>
                            <br />
                            {errors.custom_url?.type === "maxLength" && <small style={{ color: "red" }}>Maximum Character should be 20.</small>}
                        </Form.Group>
                        <br />
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Generate QR Code?"
                                {...register("qr_code_added", { required: false })}
                            />
                        </Form.Group> */}
                        <br />
                        <Form.Group className="mb-3">
                            <Button as="sub" variant="success" onClick={handleSubmit(shortenUrl)} >Submit</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
        }
        
    
    const LoggedOutView =()=>{
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
            {logged?<LoggedInView/>:<LoggedOutView/>}
            
        </div>
    )
}

export default ShortenUrlPage