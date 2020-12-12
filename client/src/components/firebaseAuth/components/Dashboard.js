import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db, storage } from "../firebase";
import './Dashboard.css'

export default function DashBoard() {
    const [error, setError] = useState("");

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [picture, setPicture] = useState();

    const { currentUser, logout } = useAuth();
    const history = useHistory();
    useEffect(() => {
        db.collection("users")
        .doc(`${currentUser.uid}`)
        .get()
        .then(doc => {
            const data = doc.data();
            // setters
            if(data) {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setAge(data.age);
                setGender(data.gender);
                setEmail(data.email); 
                storage.ref().child(`users/${currentUser.uid}/profile`).getDownloadURL().then(function(url) {
                    setPicture(url) 
                }).catch(err => {
                    console.log(err.massage)
                })
            } else console.log("no data")
})  ;
    }, [currentUser])
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    console.log(currentUser)
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser.displayName &&
                        <div>
                            <strong>Username:</strong> {currentUser.displayName}
                        </div>      
                    }
                    {firstName && 
                        <div>
                            <strong>First Name:</strong> {firstName}
                        </div> 
                    }
                    {lastName && 
                        <div>
                            <strong>Last Name:</strong> {lastName}
                        </div> 
                    }
                    {(currentUser.email || email) &&
                        <div>
                            <strong>Email:</strong> {currentUser.email || email}
                        </div>         
                    }
                    {age && 
                        <div>
                            <strong>Age:</strong> {age}
                        </div>
                    }
                    {gender && 
                        <div>
                            <strong>Gender:</strong> {gender}
                        </div>
                    }
                    {picture && 
                        <div>
                            <strong>Profile Picture:</strong><br />
                            <img className="profilePicture" src={`${picture}`}/>
                        </div>
                    }
                    {currentUser.photoURL &&
                        <div> 
                            <strong>Profile Picture:</strong><br />
                            <img className="profilePicture" src={`${currentUser.photoURL}`}/>
                        </div>    
                    }

                
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    )
}