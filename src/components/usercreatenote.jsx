import { useState, useEffect } from "react";
import { AiOutlineFile, AiOutlineUpload } from "react-icons/ai";
import { noteUrl, userUrl } from "../server";
import axios from "axios";
import { toast } from "react-toastify";


export const UserCreateNote = () => {
    //const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    //const [department, setDepartment] = useState("Science");
    const [file, setFile] = useState(null)
    // const [subject, setSubject] = useState("Computer Science");
    const [topic, setTopic] = useState("");
    const [user, setUser] = useState("")
    const [studentClass, setStudentClass] = useState("");



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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = new FormData();
        //note.append("author", author)
        note.append("description", description)
        // note.append("department", department)
        note.append("file", file)
        //note.append("subject", subject)
        note.append("topic", topic)
        note.append("studentClass", studentClass)

        try {
            const { data } = await axios.post(`${noteUrl}/usercreatenote`, note);
            console.log(data);
            toast.success(data.msg)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }


    return (
        <div className="user-create-note-t">
            <div className="user-create-note-center-t">
                <h1>Upload Note</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="first-row">
                        {/* <input
                            type="text"
                            placeholder="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        /> */}
                        <input
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/* <div>
                        <select
                            name=""
                            id=""
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="Science">Science</option>
                            <option value="Art">Art</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Language">Language</option>
                        </select>
                    </div> */}
                    <div className="file-up-avar">
                        <input
                            type="file"
                            accept=".pdf"
                            id="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                        {
                            file ? (file.name) : (<AiOutlineFile />)
                        }

                        <label htmlFor="file" id="file" name='file'><AiOutlineUpload /></label>
                    </div>
                    {/* <div>
                        <select
                            name=""
                            id=""
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
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
                            <option value="Marketting">Marketting</option>
                            <option value="Others">Others</option>
                        </select>
                    </div> */}

                    <div>
                        <input
                            type="text"
                            placeholder="Topic (Intro to CSC)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                        >
                            {/* <option value="Year 7">Year 7</option>
                            <option value="Year 8">Year 8</option>
                            <option value="Year 9">Year 9</option>
                            <option value="Year 10">Year 10</option>
                            <option value="Year 11">Year 11</option>
                            <option value="Year 12">Year 12</option> */}
                            <option value={``}>
                                available classes
                            </option>
                            {
                                user && user.assignedClass.map(data => {
                                    return <option key={data} value={`${data}`}>{data} {user.subject}</option>
                                })
                            }
                        </select>
                    </div>
                    <button >Create Note</button>
                </form>
            </div>
        </div>
    )
}