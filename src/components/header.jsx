import { AiOutlineBars, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/context";
import axios from "axios";
import { studentUrl, hodUrl, userUrl } from "../server";



export const Header = () => {
    const go = useNavigate();
    const {
        student,
        setStudent,
        hod,
        setHod,
        reguser,
        setReguser,
        admin
    } = useContext(UserContext);

    const logout = async () => {
        try {
            const { data } = await axios.post(`${studentUrl}/logoutuser`);
            setStudent("");
            if (data) {
                go("/signinstudent");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoutHod = async () => {
        try {
            const { data } = await axios.post(`${hodUrl}/logoutuser`);
            setHod("");
            if (data) {
                go("/signinhod");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoutUser = async () => {
        try {
            const { data } = await axios.post(`${userUrl}/logoutuser`);
            setReguser("");
            if (data) {
                go("/signinUser");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="header-container">
            <header>
                <section className="logo-user-icon-bars">
                    <div className="logo-img-header">
                        <img src="/images/note_9.jpg" alt="" />
                        <h1>HLC NOTE</h1>
                    </div>
                    <AiOutlineBars className="bars" />
                </section>

                <section className="nav">
                    <nav className="nav-bar">
                        <Link>Home</Link>
                        <Link>About</Link>
                        <Link>Contact</Link>
                        {
                            student && (
                                <>
                                    <Link onClick={logout}>Logout</Link>
                                    <Link to='/student'>Account</Link>
                                </>
                            )
                        }
                        {
                            hod && (
                                <>
                                    <Link onClick={logoutHod}>Sign-out</Link>
                                    <Link to='/hod'>HOD</Link>
                                </>
                            )
                        }
                        {
                            reguser && (
                                <>
                                    <Link onClick={logoutUser}>Logout</Link>
                                    <Link to='/userdashboard'>Teacher</Link>
                                </>
                            )
                        }
                        {
                            admin && (
                                <>
                                    <Link to='/admin101'>Admin</Link>
                                </>
                            )
                        }
                    </nav>
                </section>

                <section className="user-login">
                    <AiOutlineUser onClick={() => go("/signinstudent")} />
                </section>
            </header>
        </div>

    )
}