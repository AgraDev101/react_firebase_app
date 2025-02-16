import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router"
import Header from "./Header"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            navigate("/dashboard")
        }   catch (error) {
            console.log(error.message);
        }
    };

    if (auth.currentUser) {
        useEffect(() => {
            navigate("/dashboard")
        }, [])
    }

    return (
        <>
            <Header />
            <h1>Login Page</h1>
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
                <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
        </>
    )
}

export default Login