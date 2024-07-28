import {useState, useEffect} from "react";
import {hodUrl} from "../server";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export const EditHod = () => {
    const [password, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const go = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.patch(`${hodUrl}/password`, {
                password,
                newpassword,
                confirmpassword
            })
            alert(data.msg)
            go("/hod")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div className="edit-hod">
            <div className="edit-hod-center">
                <section className="hod-password">
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="password"
                                value={password}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="new password"
                                value={newpassword}
                                onChange={(e)=> setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="confirm password"
                                value={confirmpassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button>change password</button>
                    </form>
                    <div>
                        switch here
                    </div>
                </section>


                <section className="update-profile-pics">
                    <div>
                        image stays here
                    </div>
                    <div>
                        <form action="">
                            <input
                                type="file"
                                accept="image/*"
                            />
                        </form>
                    </div>
                    <div>
                        switch here
                    </div>
                </section>
            </div>
        </div>
    )
}