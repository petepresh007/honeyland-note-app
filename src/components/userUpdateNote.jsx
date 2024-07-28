import axios from "axios";
import React from "react";
import { noteUrl } from "../server";
import { RxUpload, RxFile } from "react-icons/rx";
import { FaWindowClose } from "react-icons/fa"


export const UserUpdateNote = ({ noteID, toggleShowForm, setNoteID, setNote }) => {
    // const [author, setAuthor] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [avatar, setAvatar] = React.useState(null);
    //const [subject, setSubject] = React.useState("Computer Science");
    const [topic, setTopic] = React.useState("");



    /**FUNCTIONS */
    function photoHandler(e) {
        const file = e.target.files[0];
        setAvatar(file);
    }


    /**SUBMIT HANDLER */
    async function submitHandler(e) {
        e.preventDefault();

        const form_input = new FormData();
        // form_input.append("author", author);
        form_input.append("description", description);
        form_input.append("file", avatar);
       // form_input.append("subject", subject);
        form_input.append("topic", topic);

        /**POSTING THE DATA */
        try {
            const res = await axios.patch(`${noteUrl}/userupdatenote/${noteID}`, form_input);
            setNote(res.data.data)
            alert(res.data.msg)
            console.log(res)
        } catch (error) {
            alert(error.response.data.msg)
        }
        setAuthor("");
        setDescription("");
        setTopic("")
        setNoteID(null)
    }


    return (
        <div className="user-update-note">
            <div className="user-update-nte-center">
                <div className="window-close-user">
                    <p>Edit</p>
                    <FaWindowClose onClick={() => toggleShowForm()} />
                </div>
                {/**FORM SECTION */}
                <form onSubmit={submitHandler} className="user-update-frm">
                    {/* <div>
                        <input
                            id="author"
                            type="text"
                            placeholder="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            autoComplete="on"
                        />
                    </div> */}

                    <div>
                        <input
                            id="desc"
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            autoComplete="on"
                        />
                    </div>

                    <div id="user-update-docx-file">
                        <div className="user-update-avar-upl">
                            {
                                !avatar ? (
                                    <RxFile className="user-update-rx-file" />
                                ) : (
                                    <span>{avatar.name}</span>
                                )
                            }
                        </div>

                        <div>
                            <input
                                type="file"
                                multiple
                                accept=".pdf"
                                onChange={photoHandler}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput"><RxUpload className="user-update-rx-upload" /></label>
                        </div>
                    </div>

                    {/* <div>
                        <select name="" id=""
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option value="pick">Pick a subject</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English Language">English Language</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Others">Chemistry</option>
                        </select>
                    </div> */}

                    <div>
                        <input
                            type="text"
                            placeholder="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <button type="submit" id="user-update-btn" > UPDATE </button>
                </form>
            </div>
        </div>
    )
}