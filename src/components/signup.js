import React, {useState} from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import { baseUrl } from "..";

const SignUpPage =()=>{

    

    const{register, watch, handleSubmit, reset ,formState:{errors}} = useForm()
    const[show, setShow] = useState(false)
    const [serverResponse, setServerResponse] = useState('')

    const submitForm = (data)=>{
        
        if (data.password === data.confirm_password){
            console.log(data)

            const body = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                password: data.password,
                confirm_password: data.confirm_password

            }
            const headers = new Headers({
                "Content-Type": "application/json",
            });

            const requestOptions={
                method: "POST",
                headers:headers,
                body:JSON.stringify(body)
            }

            fetch(`${baseUrl}/users/signup`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setServerResponse(data.message)
                setShow(true)
            })
            .catch(err => console.log(err))


            reset()
        }

        else{
            alert('Passwords Do Not Match')
        }
        
    }

    console.log(watch("username"))
    console.log(watch("email"))
    console.log(watch("password"))

    return(

        <div className="container">
            <div className="form">
                
                
                {
                    show?
                    
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Visit The Login Page</Alert.Heading>
                        <p>
                            {serverResponse}
                        </p>
                        </Alert>
                    <h1>
                        SignUp page
                    </h1>
                        
                    </>
                    :
                    <h1>
                        SignUp page
                    </h1>
                    
                }
                <form>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" 
                            placeholder="Your email"
                            {...register("email", {required:true, maxLength:60})}
                        />

                        {errors.email && <span style={{color:"red"}}>Username is required</span>}
                        {errors.email?.type==="maxLength"&&<span style={{color:"red"}}>Max Characters Should be 25</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Form.Control type="text" 
                            placeholder="Your First Name"
                            {...register("first_name", {required:true, maxLength:50})}
                        />

                        {errors.first_name && <span style={{color:"red"}}>Input is required</span>}<br></br>
                        {errors.first_name?.type==="maxLength"&&<span style={{color:"red"}}>Max Characters Should be 30</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Last Name
                        </Form.Label>
                        <Form.Control type="text" 
                            placeholder="Your Last Name"
                            {...register("last_name", {required:true, maxLength:80})}
                        />
                        {errors.last_name && <span style={{color:"red"}}>Input is required</span>}
                        {errors.last_name?.type==="maxLength"&&<span style={{color:"red"}}>Max Characters Should be 80</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control type="text" 
                            placeholder="Your Username"
                            {...register("username", {required:true, maxLength:25})}
                        />
                        {errors.username && <span style={{color:"red"}}>Input is required</span>}
                        {errors.username?.type==="maxLength"&&<span style={{color:"red"}}>Max Characters Should be 25</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type="password" 
                            placeholder="Your Password"
                            {...register("password", {required:true, maxLength:80, minLength:8})}
                        />
                        {errors.password && <span style={{color:"red"}}>Input is required</span>}
                        {errors.password?.type==="minLength"&&<span style={{color:"red"}}>Minimum Characters Should be 8</span>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control type="password" 
                            placeholder="Confirm Password"
                            {...register("confirm_password", {required:true, maxLength:80, minLength:8})}
                        />
                        {errors.confirm_password && <span style={{color:"red"}}>Input is required</span>}
                        {errors.confirm_password?.type==="minLength"&&<span style={{color:"red"}}>Minimum Characters Should be 8</span>}
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant = "success" onClick={handleSubmit(submitForm)} >
                            SignUp
                        </Button>
                    </Form.Group>

                    <Form.Group>
                        <small>
                            Already have an Account? <Link to="/login"> Log In </Link>
                        </small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage