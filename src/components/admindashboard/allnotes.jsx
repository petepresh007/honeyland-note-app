import React, { useEffect, useState } from "react";
import axios from "axios";
import { noteUrl } from "../../server";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { FaThumbsUp, FaToggleOff, FaToggleOn } from "react-icons/fa"


export function Note() {
    const [selectedDepartment, setSelectedDepartment] = useState("Science");
    const [notes, setNotes] = useState({
        Science: [],
        SocialScience: [],
        Language: [],
        Humanities: [],
        Mathematics: [],
        Vocational: []
    });

    const fetchNotes = async (department, endpoint) => {
        try {
            const { data } = await axios.get(`${noteUrl}/${endpoint}`);
            setNotes(prevNotes => ({ ...prevNotes, [department]: data }));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchNotes("Science", "admsci");
        fetchNotes("Social Science", "admart");
        fetchNotes("Language", "admlang");
        fetchNotes("Humanities", "admhum");
        fetchNotes("Mathematics", "admmth");
        fetchNotes("Vocational", "admvoc");
    }, []);

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

    async function deleteNote(id, username, department) {
        try {
            const conf = confirm(`Do you want to delete ${username}'s note?`);
            if (conf) {
                const { data } = await axios.delete(`${noteUrl}/admindeletenote/${id}`);
                setNotes(prevNotes => ({
                    ...prevNotes,
                    [department]: prevNotes[department].filter(note => note._id !== id)
                }));
                alert(data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const approveNote = async (id) => {
        try {
            const { data } = await axios.patch(`${noteUrl}/activatenote/${id}`);
            // setNotes(prevNotes => ({
            //     ...prevNotes,
            //     [selectedDepartment]: prevNotes[selectedDepartment].map(note =>
            //         note._id === id ? { ...note, approved: true } : note
            //     )
            // }));
            setNotes(prevNotes => {
                const updatedNotes = prevNotes[selectedDepartment].map(note =>
                    note._id === id ? { ...note, approved: true } : note
                );
                return { ...prevNotes, [selectedDepartment]: updatedNotes };
            });
            console.log(data);
            alert(data.msg)
        } catch (error) {
            console.log(error);
        }
    };

    const blockNote = async (id) => {
        try {
            const { data } = await axios.patch(`${noteUrl}/blocknote/${id}`);
            // setNotes(prevNotes => ({
            //     ...prevNotes,
            //     [selectedDepartment]: prevNotes[selectedDepartment].map(note =>
            //         note._id === id ? { ...note, approved: false } : note
            //     )
            // }));
            setNotes(prevNotes => {
                const updatedNotes = prevNotes[selectedDepartment].map(note =>
                    note._id === id ? { ...note, approved: false } : note
                );
                return { ...prevNotes, [selectedDepartment]: updatedNotes };
            });
            console.log(data);
            alert(data.msg)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };



    return (
        <div className="note-adm">
            <h1>All notes</h1>
            <div className="note-adm-center">
                <select value={selectedDepartment} onChange={handleDepartmentChange}>
                    <option value="Science">Science</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Language">Language</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Vocational">Vocational</option>
                </select>
                <div>
                    {notes[selectedDepartment].map((note, index) => (
                        <div key={index} className="adm-nte-details">
                            <p>{note.author}</p>
                            <p>{note.subject}</p>
                            <p>{note.topic}</p>
                            <p>{note.studentClass}</p>
                            <AiOutlineDelete style={{
                                cursor: "pointer",
                                color: "rgb(0, 153, 255)"
                            }}
                                onClick={() => deleteNote(note._id, note.author, note.department)}
                            />
                            <AiOutlineEye
                                className="adm-view"
                                onClick={() => handleReadFile(note.file)}
                            />
                            {
                                note.approved ? (
                                    <FaToggleOn
                                        className="adm-toggle"
                                        onClick={() => blockNote(note._id)}
                                    />
                                ) : (
                                    <FaToggleOff
                                        className="adm-toggle"
                                        onClick={() => approveNote(note._id)}
                                    />
                                )
                            }

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
