import React, { useRef, useState } from "react";
import "./Login.css";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import googleIcon from "./images/googleIcon.png";
import facebookIcon from "./images/facebookIcon.svg";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, googleLogin, facebookLogin } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleEmailSubmit(e) {
        e.preventDefault();
        
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
    
        setLoading(false);
    }

    async function handleGoogleLogin() {
        try {
            setError("");
            setLoading(true);
            await googleLogin();
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }
    async function handleFacebookLogin() {
        try {
            setError("");
            setLoading(true);
            await facebookLogin();
            history.push("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                <div className="loginIcons">
                    <div>
                        <img
                            className="loginIcon"
                            src={googleIcon}
                            alt="Google"
                            onClick={() => handleGoogleLogin()}
                        />
                        <p>Login With Google</p>
                    </div>
                    <div>
                        <img
                            id="facebookIcon"
                            className="loginIcon"
                            src={facebookIcon}
                            alt="FaceBook"
                            onClick={() => handleFacebookLogin()}
                        />
                        <p>Login With Facebook</p>
                    </div>
                </div>
                <p>Or Login With Email Account</p>
                {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleEmailSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
        </>
    );
}
