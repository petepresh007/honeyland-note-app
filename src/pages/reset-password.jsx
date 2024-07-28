import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { hodUrl, studentUrl, userUrl } from "../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ResetPassword = () => {
    const { id } = useParams()
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const go = useNavigate();


    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${hodUrl}/reset-password/${id}`, {
                password,
                confirmpassword
            })
            toast.success(data.msg);
            go("/signinhod");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className="reset-password">
            <div className="reset-password-center">
                <form action="" onSubmit={resetPassword}>
                    <h1>Reset Password</h1>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </div>
                    <button>UPDATE</button>
                </form>
            </div>
        </div>
    )
}



export const ResetPasswordStudent = () => {
    const { id } = useParams()
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const go = useNavigate();



    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${studentUrl}/reset-password/${id}`, {
                password,
                confirmpassword
            })
            toast.success(data.msg);
            go("/signinstudent");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }


    return (
        <div className="reset-password">
            <div className="reset-password-center">
                <form action="" onSubmit={resetPassword}>
                    <h1>Reset Password</h1>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </div>
                    <button>UPDATE</button>
                </form>
            </div>
        </div>
    )
}



export const ResetPasswordUser = () => {
    const { id } = useParams()
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const go = useNavigate();
    console.log(id);


    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${userUrl}/reset-passworduser/${id}`, {
                password,
                confirmpassword
            })
            toast.success(data.msg);
            go("/signinUser");
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className="reset-password">
            <div className="reset-password-center">
                <form action="" onSubmit={resetPassword}>
                    <h1>Reset Password</h1>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="confirm password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </div>
                    <button>UPDATE</button>
                </form>
            </div>
        </div>
    )
}

