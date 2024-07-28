import { useState, useEffect, useContext } from "react";
import { hodUrl, noteUrl, url, userUrl, wpsUrl } from "../server";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../components/context";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
//import MenuIcon from '@material-ui/icons/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";



export const HodDashboard = () => {
    const [allTeachers, setScienceTeachers] = useState("");
    const { hod, setHod } = useContext(UserContext);
    const [user, setUser] = useState("");
    const [approvedNote, setApprovedNote] = useState("");
    const [allNotes, setAllNotes] = useState("");
    const [WPS, setWPS] = useState("")


    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${hodUrl}/singleuser`);
            console.log(data);
            setHod(data);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getUsers();
    }, [])


    const hodGetAllDeptStaff = async () => {
        try {
            const { data } = await axios.get(`${userUrl}/hodallusers`);
            setScienceTeachers(data)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        hodGetAllDeptStaff()
    }, [])


    const hodAllNotes = async () => {
        try {
            const { data } = await axios.get(`${noteUrl}/hodallnotes`);
            setAllNotes(data);
            //console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        hodAllNotes()
    }, [])


    const approvedUser = async () => {
        try {
            const { data } = await axios.get(`${noteUrl}/hodallnotesapproved`);
            console.log(data)
            setApprovedNote(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        approvedUser()
    }, [])


    const notApproved = async () => {
        try {
            const { data } = await axios.get(`${noteUrl}/hodallnotesnotapproved`);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        notApproved()
    }, [])


    //admin block and unblock
    const approveNote = async (id) => {
        try {
            const { data } = await axios.patch(`${noteUrl}/hodactivate/${id}`);
            setApprovedNote(data.dataApproved);
            setAllNotes(data.note);
            toast.success(data.msg)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        approveNote()
    }, [])

    const blockNote = async (id) => {
        try {
            const { data } = await axios.patch(`${noteUrl}/hodblock/${id}`);
            setApprovedNote(data.dataApproved);
            setAllNotes(data.note);
            toast.success(data.msg)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        blockNote();
    }, [])


    const deleteNote = async (id) => {
        try {
            const conf = confirm("Are you sure you want to delete this note?");
            if (conf) {
                const { data } = await axios.delete(`${noteUrl}/hoddel/${id}`);
                setApprovedNote(data.dataApproved);
                setAllNotes(data.note);
                toast.success(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //WPS
    const getAllWPS = async () => {
        try {
            const { data } = await axios.get(`${wpsUrl}/allhod`)
            setWPS(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAllWPS()
    }, [])


    const handleReadFile = async (filename) => {
        try {
            const response = await axios.get(`${noteUrl}/read/${filename}`, {
                responseType: 'blob' // Tell Axios to treat the response as a blob
            });
            /// const url = window.URL.createObjectURL(new Blob([response.data]));
            const url = window.URL.createObjectURL(response.data);
            window.open(url);
            // console.log(response)
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };


    return (
        <div className="hodashboard">
            <section className="hod-header-dash">
                <div>
                    Hello, {user && user.firstname} {user && user.lastname}
                </div>
                <div className="hod-not-log">
                    <NotificationsIcon />
                    <div className="note-img">
                        {
                            user.file ?
                                (
                                    <img src={`${url}/upload/${user.file}`} alt="" />
                                )
                                :
                                (<Avatar />)
                        }
                    </div>

                </div>
            </section>

            <section className="hod-content">
                <div className="sidebar">
                    <Link to="/edithod">edit profile</Link>
                </div>

                <div className="main-content">
                    <div className="all-techers">
                        <h1>{user.department} department staffs ({allTeachers && allTeachers.length})</h1>
                        {
                            allTeachers && allTeachers.map((data, index) => {
                                return (
                                    <div className="teacher-center">
                                        <p>{index + 1}. {data.firstname} {data.lastname}</p>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="all-notes-hod">
                        <h1>Available notes ({allNotes && allNotes.length})</h1>
                        {
                            allNotes && allNotes.map(data => {
                                return (
                                    <div className="all-note-center">
                                        <p>{data.author}</p>
                                        <p>{data.subject}</p>
                                        <p>{data.studentClass}</p>
                                        <FaTrash onClick={() => deleteNote(data._id)} />
                                        <span
                                            onClick={() => handleReadFile(data.file)}
                                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                                        >
                                            <AiOutlineEye />
                                        </span>
                                        {
                                            data.approved ? (
                                                <span style={{
                                                    background: "green",
                                                    padding: ".5rem",
                                                    cursor: "pointer",
                                                    fontSize: "1.2rem",
                                                    color: "white"
                                                }}
                                                    onClick={() => blockNote(data._id)}
                                                >Approved</span>
                                            ) : (
                                                <span style={{
                                                    background: "red",
                                                    padding: ".5rem",
                                                    cursor: "pointer",
                                                    fontSize: "1.2rem",
                                                    color: "white"
                                                }}
                                                    onClick={() => approveNote(data._id)}
                                                >Approve</span>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className="all-approved-note-hod">
                        <h1>Approved notes ({approvedNote && approvedNote.length})</h1>
                        {
                            approvedNote && approvedNote.map(data => {
                                return (
                                    <div className="all-hod-approve-center">
                                        <p>{data.author}</p>
                                        <p>{data.subject}</p>
                                        <p>{data.studentClass}</p>
                                        <span style={{ fontSize: "1.5rem", cursor: "pointer" }}>
                                            <AiOutlineEye />
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="all-created-note">
                        <h1>Created Notes ({WPS && WPS.length})</h1>
                        {
                            WPS && WPS.map(data => {
                                return (
                                    <div className="ALL-created-center">
                                        <p>{data.author}</p>
                                        <p>{data.subject}</p>
                                        <p>{data.studentClass}</p>
                                        <span style={{ fontSize: "1.4rem", cursor: "pointer" }}>view</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}