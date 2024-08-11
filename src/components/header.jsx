import { AiOutlineBars, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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
    const [showNav, setShowNav] = useState(false)

    const toggleNav = () => setShowNav(prev => !prev)

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
        <div className="header-container" id="header-container">
            <header>
                <section className="logo-user-icon-bars">
                    <div className="logo-img-header">
                        <img src="/images/note_9.jpg" alt="" onClick={() => go('/')} />
                        <h1 onClick={() => go('/')}>HLC NOTE</h1>
                    </div>
                    <div className="bars-user">
                        <AiOutlineUser onClick={() => go("/signinstudent")} className="user-bars" />
                        <AiOutlineBars className="bars" onClick={() => toggleNav()} />
                    </div>
                </section>

                <section className="nav">
                    <nav className={`nav-bar ${showNav ? "show-nav" : ""}`}>
                        <Link onClick={() => toggleNav()}>Home</Link>
                        <Link onClick={() => toggleNav()}>About</Link>
                        <Link onClick={() => toggleNav()}>Contact</Link>
                        {
                            student && (
                                <>
                                    <Link onClick={() => {
                                        logout()
                                        toggleNav()
                                    }}>Logout</Link>
                                    <Link to='/student' onClick={() => toggleNav()}>Account</Link>
                                </>
                            )
                        }
                        {
                            hod && (
                                <>
                                    <Link onClick={() => {
                                        logoutHod()
                                        toggleNav()
                                    }}>Sign-out</Link>
                                    <Link to='/hod' onClick={() => toggleNav()}>HOD</Link>
                                </>
                            )
                        }
                        {
                            reguser && (
                                <>
                                    <Link onClick={() => {
                                        logoutUser()
                                        toggleNav()
                                    }}>Logout</Link>
                                    <Link to='/userdashboard' onClick={() => toggleNav()}>Teacher</Link>
                                </>
                            )
                        }
                        {
                            admin && (
                                <>
                                    <Link to='/admin101' onClick={() => toggleNav()}>Admin</Link>
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