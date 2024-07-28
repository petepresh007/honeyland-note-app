import { useState } from 'react';
import { Sharedlayout } from "./components/sharedlayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/errorPage";
import { CreatedContext } from "./components/context";
import { Home } from "./pages/homepage";
import { SignInUser } from "./pages/loginuser";
import { SignUpStudent } from "./pages/registerStudent";
import { SignInStudent } from "./pages/loginstudent";
import { Search } from "./components/search";
import { UserDashboard } from "./pages/userdashboard";
import { UpdatePics } from "./components/updateprofilepics";
import { UserUpdateNote } from "./components/userUpdateNote";
import { StudentDashboard } from "./pages/studentdashboard";
import { UpdatePicStudent } from "./components/updatestudentdetails";
import { SignInHOD } from "./pages/loginhod";
import { HodDashboard } from "./pages/hoddashboard";
import { ForgetPassword, ForgetPasswordStudent, ForgetPasswordUser } from "./pages/forgetpassword";
import { ResetPassword, ResetPasswordStudent, ResetPasswordUser } from "./pages/reset-password";
import { HODDashboard } from "./components/dashboard/Dashboard";
import { UserCreateNote } from "./components/usercreatenote";
import {WPSCREATE} from "./components/wps";
import {SuperAdmin} from "./components/admindashboard/superadmindashboard";
import {SignInAdmin} from "./pages/loginadmin";
import {AdminSignUpUser} from "./components/admindashboard/admincreate";
import {AdminSignUpStudent} from "./components/admindashboard/admincreateStudent";
import {SignUpHod} from "./components/admindashboard/admincreatehod";
import {EditHod} from "./components/edithod";
import {Note} from "./components/admindashboard/allnotes";


import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sharedlayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/signinUser",
          element: <SignInUser />
        },
        {
          path: "/register",
          element: <SignUpStudent />
        },
        {
          path: "/signinstudent",
          element: <SignInStudent />
        },
        {
          path: "/search",
          element: <Search />
        },
        {
          path: "/userdashboard",
          element: <UserDashboard />
        },
        {
          path: "/update",
          element: <UpdatePics />
        },
        {
          path: "/userupdatenote",
          element: <UserUpdateNote />
        },
        {
          path: "/student",
          element: <StudentDashboard />
        },
        {
          path: "/studentupdate",
          element: < UpdatePicStudent />
        },
        {
          path: "/signinhod",
          element: <SignInHOD />
        },
        {
          path: "/hod",
          element: <HodDashboard />
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />
        },
        {
          path: "/forgetpasswordstudent",
          element: <ForgetPasswordStudent />
        },
        {
          path: "/forgetpassworduser",
          element: <ForgetPasswordUser />
        },

        {
          path: "/reset-password/:id",
          element: <ResetPassword />
        },
        {
          path: "/reset-password-student/:id",
          element: <ResetPasswordStudent />
        },
        {
          path: "/reset-password-user/:id",
          element: <ResetPasswordUser/>
        },
        {
          path: "/hoddash",
          element: <HODDashboard />
        },
        {
          path: "/user-create",
          element: <UserCreateNote />
        },
        {
          path:"word-processor",
          element: <WPSCREATE/>
        },
        {
          path:"admin101",
          element: <SuperAdmin/>
        },
        {
          path:"/signinadmin",
          element: <SignInAdmin/>
        },
        {
          path:"/adminreguser",
          element: <AdminSignUpUser/>
        },
        {
          path:"/adminregstudent",
          element: <AdminSignUpStudent/>
        },
        {
          path:"/adminreghod",
          element: <SignUpHod/>
        },
        {
          path:"/edithod",
          element:<EditHod/>
        },
        {
          path:"/admin/allnotes",
          element: <Note/>
        }
      ]
    }
  ])


  return (
    <CreatedContext>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </CreatedContext>
  )
}

export default App
