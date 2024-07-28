import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});
import {studentUrl, userUrl, hodUrl, adminUrl} from "../server";


export const CreatedContext = ({ children }) => {
    /**GETTING CREDENTIALS */
    axios.defaults.withCredentials = true
    const [student, setStudent] = useState("");
    const [reguser, setReguser] = useState("");
    const [hod, setHod] = useState("");
    const [admin, setAdmin] = useState("")



    const getStudents = async () => {
        try {
            const { data } = await axios.get(`${studentUrl}/stay_logged`);
            setStudent(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudents();
    }, []);

    /**USER */
    async function userStayLoggedIn() {
        try {
            const { data } = await axios.get(`${userUrl}/stay_logged`);
            setReguser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userStayLoggedIn();
    }, [])

    async function hodStayLoggedIn() {
        try {
            const { data } = await axios.get(`${hodUrl}/stay_logged`);
            setHod(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        hodStayLoggedIn()
    }, [])


    async function adminStayLoggedIn() {
        try {
            const { data } = await axios.get(`${adminUrl}/stayonline`);
            setAdmin(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        adminStayLoggedIn()
    }, [])


    return (
        <UserContext.Provider value={{
            student, 
            setStudent,
            reguser,
            setReguser,
            hod, 
            setHod,
            admin, 
            setAdmin
        }}>
            {children}
        </UserContext.Provider>
    )
}