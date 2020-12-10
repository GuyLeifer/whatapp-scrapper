import React, { useContext, useState, useEffect } from "react"
import { auth, storage, db, loginWithGoogle, loginWithFacebook } from "../firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, file, firstName, lastName, age, gender) {
        return auth.createUserWithEmailAndPassword(email, password).then(auth => {
            const uid = auth.user.uid
            userDataCloud(uid, firstName, lastName, email, age, gender)
            storage.ref('users/' + uid + '/profile').put(file).then(() => {
                console.log('successfully upload profile image')
            })
        }).catch(err => console.log(err.massage))
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    const googleLogin = () => loginWithGoogle();
    const facebookLogin = () => loginWithFacebook();

    function userDataCloud(userUid, firstName, lastName, email, age, gender) {
        db.collection('users').doc(`${userUid}`).set({
            userUid: userUid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            gender: gender,
        }).then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });  
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        googleLogin,
        facebookLogin
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}