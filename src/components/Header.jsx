import { Link } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from "react-router"

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        if (auth.currentUser != null) {
            await signOut(auth)
            navigate("/")
        }
    }

    return (
        <>
        <div style={{
            margin: "0px auto",
            display: "flex",
            alignItems: "center"
        }}>
            <h4 style={{ margin: "0px 0px 0px 25px" }}>{auth.currentUser ? auth.currentUser.email : "Hi"}</h4>
            <ul style={{
                display: "flex",
                margin: "10px 0px 0px 50px",
                padding: 0,
                listStyle: "none",
            }}>
                <li style={{
                    margin: "0px 0px 0px 0px"
                }}>
                    <Link to="/" >Login</Link>
                </li>
                <li style={{
                    margin: "0px 0px 0px 20px"
                }}>
                    <Link to="/register" >Register</Link>
                </li>
                <li style={{
                    margin: "0px 0px 0px 20px"
                }}>
                    <Link to="/dashboard" >Dashboard</Link>
                </li>
                <li style={{
                    margin: "0px 0px 0px 20px"
                }}>
                    <Link to="/profile" >Profile</Link>
                </li>
                <li style={{
                    margin: "0px 0px 0px 20px"
                }}>
                    <button onClick={handleLogout} className="btn btn-primary btn-sm">LogOut</button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header