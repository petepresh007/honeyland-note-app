import { useState } from "react";
import axios from "axios";
import { hodUrl, studentUrl, userUrl } from "../server";
import {toast} from "react-toastify";


export const ForgetPassword = () => {
    const [email, setEmail] = useState("")

    const forgetpassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${hodUrl}/forgetpassword`, {email})
            toast.success(data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div className="fogetpassword">
            <div className="forget-center">
                <form action="" onSubmit={forgetpassword}>
                    <h1>Enter Your Email</h1>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}



export const ForgetPasswordStudent = () => {
    const [email, setEmail] = useState("")

    const forgetpassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${studentUrl}/forgetpassword`, { email })
            toast.success(data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }


    
    return (
        <div className="fogetpassword">
            <div className="forget-center">
                <form action="" onSubmit={forgetpassword}>
                    <h1>Enter Your Email</h1>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}



export const ForgetPasswordUser = () => {
    const [email, setEmail] = useState("")

    const forgetpassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${userUrl}/forgetpassworduser`, { email })
            toast.success(data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }


    return (
        <div className="fogetpassword">
            <div className="forget-center">
                <form action="" onSubmit={forgetpassword}>
                    <h1>Enter Your Email</h1>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    )
}