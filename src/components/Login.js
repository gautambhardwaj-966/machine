import React,{useState,useRef} from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

const[isSignInForm,setIsSignInForm]=useState(true);
const [errorMessage,setErrorMessage] = useState();

const navigate = useNavigate();
const dispatch = useDispatch();

const email = useRef(null);
const password = useRef(null);
const name =useRef(null);

const handleButtonClick=()=>{
  //validate the form data

  console.log(email.current.value);
  console.log(password.current.value);

  const message = checkValidData(email.current.value,password.current.value);
  setErrorMessage(message);
  if(message) return;
  //The above code is same as here
  //if(!message){
 // Sign In/Sign Up Logic
  //}

  if(!isSignInForm){
//Sign Up Logic
createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://avatars.githubusercontent.com/u/131481375?v=4"
    }).then(() => {
      // Profile updated!
      // ...
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(
        addUser({
        uid:uid,
        email:email,
        displayName:displayName,
        photoURL:photoURL,
    })
);
      navigate("/browse");
    }).catch((error) => {
      setErrorMessage(error.message)
      // An error occurred
      // ...
    });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
    // ..
  });
  }
 else{
//Sign In Logic
signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
    navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });

 }
};

//This is how we create a toggle feature
const toggleSignInForm=()=>{
setIsSignInForm(!isSignInForm);
};

  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img 
      src='https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_small.jpg'
      alt="logo"/>

    </div>
<form 
onSubmit={(e)=>e.preventDefault()} 
className='w-3/12 absolute p-12 bg-black my-36 
mx-auto right-0 left-0 text-white bg-opacity-80 '>
<h1 
className='font bold text-3xl py-4'>
{isSignInForm ? "Sign In" : "Sign Up"}</h1>

  <input 
  ref={email}
  type="text" 
  placeholder='Email Address' 
  className='p-2 my-4 w-full bg-gray-700 rounded-lg'/>

  {!isSignInForm && (<input 
  type="text"
  ref={name} 
  placeholder='Full Name' 
  className='p-2 my-4 w-full bg-gray-700 rounded-lg'/>)}


  <input 
  ref={password}
  type="password" 
  placeholder='Password' 
  className='p-2 my-4 w-full bg-gray-700 rounded-lg'/>
  <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
  <button 
  className='my-6 p-4 bg-red-700 w-full rounded-lg' 
  onClick={handleButtonClick}>{isSignInForm?"Sing In":"Sign Up"}</button>
  <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already a User? Sign In Now"}</p>


</form>

    </div>
  )
}

export default Login;
