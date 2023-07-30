import React, { useEffect } from 'react'
import "./header.css"
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase';


function Header({ logout }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, loading])


  function logOutFunc() {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("LogOut Successfully")
      navigate("/")

    }).catch((error) => {
      // An error happened.
      toast.error(error)
    });
  }
  return (
    <div className='navbar'>
      <p className='logo'>Financly.</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

        {user ?
          user.photoURL ?
            <img style={{
              width: "2rem"
              , height: "2rem",
              borderRadius: "0.4rem",
              margin: "0.4rem"
            }}
              src={user.photoURL} >
            </img>
             : 
             <svg style={{ 
              
              width: "1.5rem",
              height: "1.5rem",
               borderRadius: "0.4rem",
                margin: "0.4rem"
                 }}
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg> 
                  : ""}
        {logout ? <p className='logo link' onClick={logOutFunc}>Logout</p> : ""}
      </div>
    </div>
  )
}

export default Header
