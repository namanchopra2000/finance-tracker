import React, { useState } from 'react'
import Input from '../../Input/input'
import Button from '../../button/button';
import {  toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider, setDoc , db , doc  } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
function SingupSingInComponent() {
    
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [loader , setLoader] = useState(false);
    const [login , setLogIn] = useState(true);
    const navigate = useNavigate();
     

    function authentication(event){
        setLoader(true);
        event.preventDefault();
        if(name!="" && email!="" && password.length>6){
            if(password==confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user>>" , user)
                toast.success("User Created");
                createDoc(user);
                setLoader(false);
                setName("");
                setPassword("");
                setEmail("");
                setConfirmPassword("");
                navigate("/dashboard")
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error({errorMessage});
                setLoader(false);
                // ..
              });
            }
            else{
                toast.error("Password not Match with Confirm Pasword");
                setLoader(false);
                
            }            
        }
        else{
            toast.error("Please Fill Details Correctly");
            setLoader(false);
        }
        
    }

    function Login(event){
        event.preventDefault();
        setLoader(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
       // Signed in 
           const user = userCredential.user;
           toast.success("LogIn Sucessfully.")
           navigate("/dashboard")
           setLoader(false);
       // ...
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       toast.error(errorMessage);
       setLoader(false);
     });
        }

function GoogleAuth(event){
    event.preventDefault();
    setLoader(true);
    signInWithPopup(auth, provider)

  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    createDoc(user);
    toast.success("LogIn Sucessfully.")
    setLoader(false);
    navigate("/dashboard")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoader(false);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
} 

async function createDoc(user){

  if(!user) return ;

  const userRef = doc(db,"users",user.uid);
  const userData = await getDoc(userRef);
  if(!userData.exists()){
    try {
      await setDoc(doc(db , "users" , user.uid), {
        name: user.displayName ? user.displayName : name  , 
        email : user.email , 
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
      // toast.success("Doc Created");
    }
    catch(e){
      toast.error(e.message)
    }
  }
  else{
    // toast.error("doc already exist")

  }
}




  return (

<>
{ login ? <div className='singup-wrapper'>
    <h2 className='title'>LogIn on  <span style={{color:'var(--theme)'}}>Financly</span></h2>
    <form>
     
        <Input type={"email"}  lable={"E-Mail"} placeholder={"abc@gmail.com"} state={email} setState={setEmail}/>
        <Input  type={"password"} lable={"Password"} placeholder={"Example123"} state={password} setState={setPassword}/>
       

        <Button loader={loader} text={loader ? "Loading..." : "Log In with Email and Password "} onClick={event => Login(event)}/>
        <p className='middle-text'>or</p>
        <Button loader={loader} onClick={event => GoogleAuth(event)} text={loader ? "Loading..." :"Log In with Google"} outlined={true}/>
        <p className='middle-text' onClick={() =>setLogIn(false)}>or Don't Have An Account ? Click Here</p>
        
    </form>
    </div>
    
    : 
    
    <div className='singup-wrapper'>
    <h2 className='title'>Sign Up on  <span style={{color:'var(--theme)'}}>Financly</span></h2>
    <form>
        <Input type={"text"} lable={"Full Name"} placeholder={"John Doe"} state={name} setState={setName}/>
        <Input type={"email"}  lable={"E-Mail"} placeholder={"abc@gmail.com"} state={email} setState={setEmail}/>
        <Input  type={"password"} lable={"Password"} placeholder={"Example123"} state={password} setState={setPassword}/>
        <Input type={"password"} lable={"Confirm Password"} placeholder={"Example123"} state={confirmPassword} setState={setConfirmPassword}/>

        <Button loader={loader} text={loader ? "Loading..." : "Sign Up with Email and Password "} onClick={event =>authentication(event)}/>
        <p className='middle-text'>or</p>
        <Button loader={loader} onClick={event => GoogleAuth(event)} text={loader ? "Loading..." :"Sign Up with Google"} outlined={true}/>
        <p className='middle-text' onClick={() =>setLogIn(true)}>or Have An Account Already? Click Here</p>
        
    </form>
    </div>}
</>
    
  )
}

export default SingupSingInComponent
