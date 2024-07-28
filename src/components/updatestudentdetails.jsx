import { useEffect, useState } from "react";
import { studentUrl, url } from "../server";
import axios from "axios";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {AiOutlineUser} from "react-icons/ai";


export const UpdatePicStudent = () => {
    const [user, setUser] = useState("");
    const [showUpdatePics, setShowUpdatePics] = useState(false);
    const [file, setFile] = useState(null);
    const [showchangePassword, setShowChangePassword] = useState(false);
    const [password, setPassword] = useState(null);
    const [newpassword, setNewpassword] = useState(null);
    const [confirmpassword, setConfirmPassword] = useState(null);
    const navigate = useNavigate()


    async function updateFile(e) {
        e.preventDefault();
        const profilePics = new FormData()
        profilePics.append("file", file);

        try {
            const { data } = await axios.patch(`${studentUrl}/updateprofilepics`, profilePics)
            //alert(data.msg);
            toast.success(data.msg)
            setUser(data.data);
            setShowUpdatePics(false);
        } catch (error) {
            //console.log(error)
            console.log(error)
            toast.error(error.response.data.msg);
        }
    }


    async function changePassword(e) {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`${studentUrl}/password`, { password, newpassword, confirmpassword });
            //alert(data.msg)
            toast.success(data.msg)
            setShowChangePassword(false)
            navigate("/signinstudent")
        } catch (error) {
            //alert(error.response.data.msg);
            toast.error(error.response.data.msg);
        }
    }


    //show func
    function toggleShow() {
        setShowUpdatePics(previousState => !previousState)
    }


    function toggleShowPassUsr() {
        setShowChangePassword(previousState => !previousState)
    }


    const getSingleUser = async () => {
        try {
            const { data } = await axios.get(`${studentUrl}/singleuser`);
            console.log(data)
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleUser()
    }, [])


    function returnBack() {
        window.history.back()
    }

    return (
        <div className="image-and-others-center">
            <FaArrowLeft className="arr-others" onClick={() => returnBack()} />
            <div className="image-and-others">
                {user.file ? <img src={`${url}/upload/${user.file}`} alt="" /> : (<AiOutlineUser className="image-placeholder"/>)}

                <div className="update-image">
                    <p>update image</p>
                    <FaEdit onClick={() => toggleShow()} />
                </div>

                {
                    showUpdatePics && (
                        <motion.div className="update-proper"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <form action="" onSubmit={updateFile}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button>update</button>
                            </form>
                        </motion.div>
                    )
                }

                <div className="usr-pass">
                    <p>change password</p>
                    <FaEdit onClick={() => toggleShowPassUsr()} />
                </div>


                {
                    showchangePassword && (
                        <motion.div className="update-username-password"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <form action="" onSubmit={changePassword}>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="old password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="new password"
                                        value={newpassword}
                                        onChange={(e) => setNewpassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button className="update-user-btn">update</button>
                            </form>
                        </motion.div>
                    )
                }

            </div>
        </div>
    )
}