import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { baseUrl } from "..";
import { login } from "../auth";
import { useNavigate } from "react-router-dom"

const LoginPage =()=>{

    const{register, watch, handleSubmit, reset ,formState:{errors}} = useForm()

    const navigate = useNavigate()
  


    const loginUser =(data)=>{
        

        console.log(data)

        const body = {
            email: data.email,
            password: data.password
        }
        const headers = new Headers({
            "Content-Type": "application/json",
        });

        const requestOptions={
            method: "POST",
            headers:headers,
            body:JSON.stringify(body)
        }

        fetch(`${baseUrl}/users/login`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            login(data.access_token)
            navigate('/')
        })
        .catch(err => console.log(err))


        reset()
    }



    return(
        <div className="container">
            <div className="form">
                <h1>
                    SignUp page
                </h1>
                <form>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type="email" 
                            placeholder="Your email"
                            {...register("email", {required:true, maxLength:50})}
                           
                        />
                        {errors.email && <span style={{color:"red"}}>Input is required</span>}<br></br>
                        {errors.email?.type==="maxLength"&&<span style={{color:"red"}}>Max Characters Should be 50</span>}
                    </Form.Group>
                   

                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <   Form.Control type="password" 
                            placeholder="Your Password"
                            {...register("password", {required:true, maxLength:80, minLength:8})}
                        />
                        {errors.password && <span style={{color:"red"}}>Input is required</span>}
                        {errors.password?.type==="minLength"&&<span style={{color:"red"}}>Minimum Characters Should be 8</span>}
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant = "primary" onClick={handleSubmit(loginUser)}>
                            LOGIN
                        </Button>
                    </Form.Group>

                    <Form.Group>
                        <small>
                            Do not have an Account? <Link to="/signup"> Sign Up </Link>
                        </small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage