import { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/context";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { noteUrl, studentUrl, url } from "../server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const StudentDashboard = () => {
    const { student, setStudent } = useContext(UserContext);
    const [user, setUser] = useState("");
    const [note, setNote] = useState("");
    const go = useNavigate();


    const getUser = async () => {
        try {
            const { data } = await axios.get(`${studentUrl}/singleuser`);
            setStudent(data)
            setUser(data);
            // console.log(data);
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const getNotes = async () => {
        try {
            const { data } = await axios.get(`${noteUrl}/allnotes`);
            //console.log(data);
            setNote(data);
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getNotes();
    }, [])

    const downloadFile = async (filename) => {
        try {
            const response = await fetch(`${noteUrl}/download/${filename}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    const logout = async () => {
        try {
            const { data } = await axios.post(`${studentUrl}/logoutuser`);
            setStudent("");
            if (data) {
                go("/signinstudent");
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }



    return (
        <div className="studentdashboard">
            <section className="header">
                <div className="stu-wel-mes">
                    Welcome {student && student.username} ({student && student.studentClass} {student && student.category})
                </div>
                <div className="bell-sudent">
                    <AiOutlineBell className="stu-bell-proper"/>
                    {
                        user.file ? (
                            <img src={`${url}/upload/${user.file}`} onClick={() => go('/studentupdate')}/>
                        ) : (
                                <AiOutlineUser className="user-student" onClick={() => go('/studentupdate')} />
                        )
                    }
                </div>
            </section>

            <section className="user-details">
                <div className="available-note">
                    <p>Available note</p>
                    <p>{note ? note.length : "loading..."}</p>
                </div>
                <div className="student-link">
                    <Link>update-user</Link>
                    <Link onClick={logout}>logout</Link>
                </div>

                <div className="note-student-data">
                    {
                        note && note.map(data => {
                            return (
                                <div className="det" key={data._id}>
                                    <p>{data.subject}</p>
                                    <p>{data.author}</p>
                                    <p>{data.topic}</p>
                                    <p>{data.studentClass}</p>
                                    <button
                                        className="det-btn"
                                        onClick={()=>downloadFile(data.file)}
                                    >download</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}