import { useState, useEffect } from "react"
import { auth, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Header from "./Header"
import { useNavigate } from "react-router"
import { addDoc, collection } from "firebase/firestore"

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userRef = collection(db, "users");

    const handleRegister = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        await addDoc(userRef, {
            email: email,
            userId: auth.currentUser.uid
        })
        navigate("/")
    }

    if (auth.currentUser) {
        useEffect(() => {
            navigate("/dashboard")
        }, [])
    }

    return (
        <>
            <Header />
            <h1>Register Page</h1>
            <div style={{
                width: "400px",
                margin: "100px auto 0px auto"
            }}>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <button onClick={handleRegister} className="btn btn-primary">Register</button>
            </div>
        </>
    )
}

export default Register