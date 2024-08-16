import { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/context";
import { FaHome, FaBars, FaBook, FaEdit, FaTrash, FaTeamspeak } from "react-icons/fa";
import { Link, useNavigate, redirect } from "react-router-dom";
import axios from "axios";
import { userUrl, url, noteUrl } from "../server";
import { UserUpdateNote } from "../components/userUpdateNote";
import { toast } from "react-toastify"
import { AiOutlineUser } from "react-icons/ai";

export const UserDashboard = () => {
    //const [reguser, setReguser] = useState("")
    const { reguser, setReguser } = useContext(UserContext)
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [noteID, setNoteID] = useState("")


    async function userStayLoggedIn() {
        try {
            const { data } = await axios.get(`${userUrl}/stay_logged`);
            setReguser(data)
        } catch (error) {
            console.log(error)
            navigate("/loginuser");
        }
    }


    useEffect(() => {
        userStayLoggedIn()
    }, [])


    /**Toggle between form */
    const toggleShowForm = () => setShowForm(previous => !previous);


    // State variables
    const [adminDuties, setAdminDuties] = useState(true);
    const [note, setNote] = useState(null); // Initialize note state as null


    // Function to fetch notes
    async function fetchNotes() {
        try {
            const { data } = await axios.get(`${noteUrl}/usernote`);
            setNote(data); // Update note state with fetched data
        } catch (error) {
            console.log(error);
        }
    }


    // Fetch notes when component mounts
    useEffect(() => {
        fetchNotes();
    }, []); // Empty dependency array ensures this effect runs only once after initial render


    async function handlesub(e) {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${noteUrl}/usersearch?topic=${search}`);
            setNote(data);
            //console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    //delete note
    async function deleteNote(noteID) {
        try {
            const conf = confirm("Do you want to delete this particular note?");
            if (conf) {
                const { data } = await axios.delete(`${noteUrl}/userdelete/${noteID}`);
                toast.success(data.msg);
                setNote(data.data);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    // Function to toggle admin duties
    function toggleAdminDuties() {
        setAdminDuties(prevState => !prevState);
    }


    // Hide header when component mounts
    // useEffect(() => {
    //     setShowHeader(false);
    //     return () => {
    //         setShowHeader(true); // Show header when component unmounts
    //     };
    // }, [setShowHeader]); // Dependency array ensures this effect runs only once after initial render

    //get single user when user is logged in
    const getSingleUser = async () => {
        try {
            const { data } = await axios.get(`${userUrl}/singleuser`);
            console.log(data)
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleUser()
    }, [])

    //logout user
    async function logoutuser() {
        try {
            const { data } = await axios.post(`${userUrl}/logoutuser`);
            console.log(data)
            if (data) {
                navigate("/signinUser");
            }
            //location.reload()
            setReguser("")
        } catch (error) {
            console.log(error);
        }
    }




    if (reguser) {
        return (
            <div className="user-dash">
                <div className="user-dash-head">
                    <header className="he">
                        <div>
                            <Link onClick={() => {
                                navigate("/");
                                // setShowHeader(true);
                                // location.reload()
                            }}>
                                <FaHome />
                            </Link>
                        </div>
                        <div>
                            <FaBars onClick={toggleAdminDuties} />
                        </div>
                    </header>
                    <div className={`admin-duties ${adminDuties ? "" : "show-admin-duties"}`}>
                        <Link onClick={() => navigate("/user-create")}>
                            Create Note <FaBook />
                        </Link>
                        {/* <Link onClick={() => navigate("/word-processor")}>Word-Processor</Link> */}
                        <Link onClick={() => logoutuser()}>logout </Link>
                        <Link to='/subjectteachersnote'>{user.subject} Notes</Link>
                    </div>
                </div>

                <div className="admin-stuff">
                    <section className="name-pic">
                        <div className="wel-msg" onClick={() => navigate("/update")}>Welcome back {reguser.username}</div>
                        {user.file ? <img src={`${url}/upload/${user.file}`} alt="file" className="admin-img"
                            onClick={() => {
                                navigate("/update");
                            }}
                        /> : <AiOutlineUser className="outline-user"
                                onClick={() => {
                                    navigate("/update");
                                }}
                        /> }
                    </section>

                    <div className="admin-manage">
                        <div className="admin-created">
                            <p>created Note</p>
                            {note ? <p>{note.length}</p> : <p>Loading...</p>}
                        </div>

                        <div className="user-dash-search">
                            <form onChange={handlesub}>
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="search..."
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </div>

                        {/**display none on big screen */}
                        <div className="big-screen-adm-nav">
                            <Link onClick={() => navigate("/user-create")}>
                                Create Note
                            </Link>
                            <Link to='/subjectteachersnote'>{user.subject} Notes</Link>
                            <Link>Edit Acc </Link>
                            <Link onClick={() => navigate("/word-processor")}>Word-Processor</Link>
                            <Link onClick={() => logoutuser()}>logout </Link>
                        </div>
                        {/**display none on big screen */}


                        <div className="user-create-center">
                            {
                                note && note.map(data => (
                                    <div className="user-create" key={data._id}>
                                        <span>{data.topic.substring(0, 40)}</span>
                                        <span><FaTrash onClick={() => deleteNote(data._id)} /></span>
                                        <span><FaEdit onClick={() => {
                                            toggleShowForm()
                                            setNoteID(data._id)
                                        }} /></span>
                                        {data.approved === true && <span><FaTeamspeak /></span>}
                                    </div>
                                ))
                            }

                            <div className="user-edit-note">
                                {showForm &&
                                    <
                                        UserUpdateNote noteID={noteID}
                                        toggleShowForm={toggleShowForm}
                                        setNoteID={setNoteID}
                                        setNote={setNote}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        // Redirect to login page if user is not authenticated
        return <p>login with the <Link to="/loginuser">link</Link></p>
    }

};