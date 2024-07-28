import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { adminUrl, hodUrl, studentUrl, userUrl } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaCaretDown, FaToggleOff, FaToggleOn } from "react-icons/fa";

export const SuperAdmin = () => {
    const { admin, setAdmin } = useContext(UserContext);
    const go = useNavigate();


    const [showLinks, setShowlinks] = useState(false);
    const [showSub, setShowSub] = useState(false);
    const [showHod, setShowHod] = useState(false);


    const [users, setUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState({});
    const [subject, setSubject] = useState("");
    const [id, setID] = useState("");
    const [student, setStudent] = useState("");
    const [hod, setHod] = useState("");


    const [studentSearchQuery, setStudentSearchQuery] = useState("");
    const [teacherSearchQuery, setTeacherSearchQuery] = useState("");
    const [hodSearchQuery, setHodSearchQuery] = useState("");


    /**SEARCH */
    async function handleUserSearch() {
        try {
            const { data } = await axios.get(
                `${studentUrl}/search?firstname=${studentSearchQuery}`
            );
            setStudent(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleTeacherSearch() {
        try {
            const { data } = await axios.get(
                `${userUrl}/search?firstname=${teacherSearchQuery}`
            );
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleHodSearch() {
        try {
            const { data } = await axios.get(
                `${hodUrl}/search?firstname=${hodSearchQuery}`
            );
            setHod(data)
        } catch (error) {
            console.log(error);
        }
    }
    /**SEARCH */


    const toggleUserLink = () => setShowlinks(prev => !prev);
    const toggleSub = () => setShowSub(prev => !prev);
    const toggleHod = () => setShowHod(prev => !prev);

    const toggleUserDropdown = (id) => {
        setShowDropdown(prev => ({ ...prev, [id]: !prev[id] }));
    };

    async function adminStayLoggedIn() {
        try {
            const { data } = await axios.get(`${adminUrl}/singleuser`);
            setAdmin(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        adminStayLoggedIn();
    }, []);

    async function getAllStaffs() {
        try {
            const { data } = await axios.get(`${userUrl}/allusers`);
            // console.log(data);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllStaffs();
    }, []);

    async function deleteUser(id, username) {
        try {
            const conf = confirm(`Do you want to delete "${username}"?`);
            if (conf) {
                const { data } = await axios.delete(`${userUrl}/deleteuser/${id}`);
                setUsers(data.data);
                alert(data.msg);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    async function approveTeacher(id) {
        try {
            const { data } = await axios.patch(`${userUrl}/approve/${id}`);
            setUsers(data.data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function blockTeacher(id) {
        try {
            const { data } = await axios.patch(`${userUrl}/blockUser/${id}`);
            setUsers(data.data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const AssignSubject = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.patch(`${userUrl}/assignsubject/${id}`, { subject });
            alert(data.msg);
            setUsers(data.data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    //**STUDENT RELATED */
    async function getAllStudents() {
        try {
            const { data } = await axios.get(`${studentUrl}/allusers`);
            //console.log(data);
            setStudent(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllStudents()
    }, [])

    async function deleteStudent(id, username) {
        try {
            const conf = confirm(`do you want to delete ${username}`);
            if (conf) {
                const { data } = await axios.delete(`${studentUrl}/deleteuser/${id}`);
                alert(data.msg);
                setStudent(data.data);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    async function approveStudent(id) {
        try {
            const { data } = await axios.patch(`${studentUrl}/approve/${id}`);
            alert(`approved`)
            setStudent(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function blockStudent(id) {
        try {
            const { data } = await axios.patch(`${studentUrl}/blockUser/${id}`);
            alert(`blocked`)
            setStudent(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    /**STUDENT RELATED */


    /**HOD RELATED */
    async function getAllHod() {
        try {
            const { data } = await axios.get(`${hodUrl}/allusers`);
            setHod(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllHod()
    }, []);


    async function deleteHod(id, username) {
        try {
            const conf = confirm(`do you want to delete ${username}`);
            if (conf) {
                const { data } = await axios.delete(`${hodUrl}/deleteuser/${id}`);
                alert(data.msg);
                setHod(data.data);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    async function approveHod(id) {
        try {
            const { data } = await axios.patch(`${hodUrl}/approve/${id}`);
            alert(`approved`)
            setHod(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function blockHod(id) {
        try {
            const { data } = await axios.patch(`${hodUrl}/blockUser/${id}`);
            alert(`blocked`)
            setHod(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    /**HOD RELATED */


    const logout = async () => {
        try {
            const { data } = await axios.post(`${adminUrl}/logout`);
            setAdmin("");
            if (data) {
                go("/signinadmin");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="super-admin">
            <section className="super-admin-header">
                <div>Welcome {admin && admin.username}</div>
                <div className="admin-link-section">
                    <Link onClick={logout}>Logout</Link>
                    <Link>Edit-Account</Link>
                </div>
                <div className="admin-Avarta">
                    <AiOutlineUser />
                </div>
            </section>

            <section className="super-admin-section">
                <div className="left-super">
                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Teacher</Link>
                            <AiOutlineCaretDown onClick={toggleUserLink} />
                        </div>
                        <div className={`admin-links ${showLinks ? "show-admin-link" : ""}`}>
                            <Link to='/adminreguser'>Create</Link>
                            <Link>Available</Link>
                            <Link>Assign Subject</Link>
                            <Link>Assign Class</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Student</Link>
                            <AiOutlineCaretDown onClick={toggleSub} />
                        </div>
                        <div className={`admin-links ${showSub ? "show-admin-link" : ""}`}>
                            <Link to='/adminregstudent'>Create</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>HOD</Link>
                            <AiOutlineCaretDown onClick={toggleHod} />
                        </div>
                        <div className={`admin-links ${showHod ? "show-admin-link" : ""}`}>
                            <Link to='/adminreghod'>Create</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link to="/admin/allnotes">Note</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Profile</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Landing</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Create</Link>
                        </div>
                    </div>

                    <div className="admin-user-note">
                        <div className="link-adm">
                            <Link>Others</Link>
                        </div>
                    </div>

                </div>

                <div className="right-super">
                    <section className="admin-teachers">
                        <div className="title-t">
                            <h1>All Teachers</h1>
                            <p>Total ({users && users.length})</p>
                        </div>
                        <section className="header-teacher">
                            <form action="" onChange={handleTeacherSearch}>
                                <input
                                    type="search"
                                    placeholder="search"
                                    value={teacherSearchQuery}
                                    onChange={(e) => setTeacherSearchQuery(e.target.value)}
                                />
                            </form>
                        </section>
                        <section className="teacher-content">
                            {users && users.map(data => (
                                <div key={data._id} className="individual-details">
                                    <span>{data.firstname} </span>
                                    <span>{data.lastname} </span>
                                    <span>{data.subject}</span>
                                    <span>{data.department}</span>
                                    <AiOutlineDelete onClick={() => deleteUser(data._id, data.username)} />
                                    <span>Class</span>
                                    <span className="drop-box-wrapper">
                                        <span
                                            onClick={() => {
                                                toggleUserDropdown(data._id)
                                                setID(data._id)
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Subject
                                        </span>
                                        <div className={`drop-box ${showDropdown[data._id] ? "show-drop-box" : ""}`}>
                                            <AiOutlineClose onClick={() => {
                                                toggleUserDropdown(data._id)
                                            }} />
                                            <form action="" onSubmit={AssignSubject}>
                                                <select name="" id=""
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                >
                                                    <option value="">assign subject</option>
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Mathematics">Mathematics</option>
                                                    <option value="English Language">English Language</option>
                                                    <option value="Physics">Physics</option>
                                                    <option value="Chemistry">Chemistry</option>
                                                    <option value="Agriculture Science">Agriculture Science</option>
                                                    <option value="Basic Technology">Basic Technology</option>
                                                    <option value="Basic Science">Basic Science</option>
                                                    <option value="Business Studies">Business Studies</option>
                                                    <option value="Cultural and Creative Art">Cultural and Creative Art</option>
                                                    <option value="Civic Education">Civic Education</option>
                                                    <option value="French Language">French Language</option>
                                                    <option value="History">History</option>
                                                    <option value="PHE">PHE</option>
                                                    <option value="Yoruba">Yoruba</option>
                                                    <option value="ICT">ICT</option>
                                                    <option value="Biology">Biology</option>
                                                    <option value="Further Mathematics">Further Mathematics</option>
                                                    <option value="Technical Drawing">Technical Drawing</option>
                                                    <option value="Foods and Nutrition">Foods and Nutrition</option>
                                                    <option value="CRS">CRS</option>
                                                    <option value="IRS">IRS</option>
                                                    <option value="Visual Art">Visual Art</option>
                                                    <option value="Geography">Geography</option>
                                                    <option value="Government">Government</option>
                                                    <option value="Economics">Economics</option>
                                                    <option value="Literature in English">Literature in English</option>
                                                    <option value="Financial Accounting">Financial Accounting</option>
                                                    <option value="Commerce">Commerce</option>
                                                    <option value="Painting & Decoration">Painting & Decoration</option>
                                                    <option value="Catering Craft">Catering Craft</option>
                                                    <option value="Data Processing">Data Processing</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                <button>update</button>
                                            </form>
                                        </div>
                                    </span>
                                    {data.approved ? (
                                        <FaToggleOn
                                            onClick={() => blockTeacher(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Approved
                                        </FaToggleOn>
                                    ) : (
                                        <FaToggleOff
                                            onClick={() => approveTeacher(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Not Approved
                                        </FaToggleOff>
                                    )}
                                </div>
                            ))}
                        </section>
                    </section>


                    <section className="admin-teachers">
                        <div className="title-t">
                            <h1>All Students</h1>
                            <p>Total ({student && student.length})</p>
                        </div>

                        <section className="header-teacher">
                            <form action="" onChange={handleUserSearch}>
                                <input
                                    type="search"
                                    placeholder="search"
                                    value={studentSearchQuery}
                                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                                />
                            </form>
                        </section>
                        <section className="teacher-content">
                            {student && student.map(data => (
                                <div key={data._id} className="individual-details">
                                    <span>{data.firstname} </span>
                                    <span>{data.lastname} </span>
                                    <AiOutlineDelete onClick={
                                        () => deleteStudent(data._id, data.username)}
                                    />
                                    <span>{data.studentClass}</span>
                                    {data.approved ? (
                                        <FaToggleOn
                                            onClick={() => blockStudent(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Approved
                                        </FaToggleOn>
                                    ) : (
                                        <FaToggleOff
                                            onClick={() => approveStudent(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Not Approved
                                        </FaToggleOff>
                                    )}
                                </div>
                            ))}
                        </section>
                    </section>


                    <section className="admin-teachers">
                        <div className="title-t">
                            <h1>All HOD</h1>
                            <p>Total ({hod && hod.length})</p>
                        </div>

                        <section className="header-teacher">
                            <form action="" onChange={handleHodSearch}>
                                <input
                                    type="search"
                                    placeholder="search"
                                    value={hodSearchQuery}
                                    onChange={(e) => setHodSearchQuery(e.target.value)}
                                />
                            </form>
                        </section>
                        <section className="teacher-content">
                            {hod && hod.map(data => (
                                <div key={data._id} className="individual-details">
                                    <span>{data.firstname} </span>
                                    <span>{data.lastname} </span>
                                    <AiOutlineDelete onClick={
                                        () => deleteHod(data._id, data.username)}
                                    />
                                    <span>{data.department}</span>
                                    <span>Assign</span>
                                    {data.approved ? (
                                        <FaToggleOn
                                            onClick={() => blockHod(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Approved
                                        </FaToggleOn>
                                    ) : (
                                        <FaToggleOff
                                            onClick={() => approveHod(data._id)}
                                            className="adm-toggle"
                                            style={{
                                                border: "1px solid #eee",
                                                padding: ".5rem",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Not Approved
                                        </FaToggleOff>
                                    )}
                                </div>
                            ))}
                        </section>
                    </section>


                </div>
            </section>

        </div>
    );
};
