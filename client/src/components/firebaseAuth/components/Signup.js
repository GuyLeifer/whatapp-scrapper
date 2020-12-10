import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// packages
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const age = ageRef.current.value;
        const gender = genderRef.current.value;

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password, file, firstName, lastName, age, gender)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} required />
                        </Form.Group>
                        <Form.Group id="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} required />
                        </Form.Group>
                        <Form.Group id="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" ref={ageRef} required />
                        </Form.Group>
                        <Form.Group id="gender" controlId="formGridState">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" ref={genderRef} required >
                            <option>Male</option>
                            <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}