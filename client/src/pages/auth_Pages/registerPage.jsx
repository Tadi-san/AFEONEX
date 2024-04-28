import {Link, Navigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub,faGoogle} from "@fortawesome/free-brands-svg-icons";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [fullname,setFullname] = useState('');
  const [email,setEmail] = useState('');
  const [redirect, setRedirect] = useState(false)
  const [password,setPassword] = useState('');
  const [bio, setBio] = useState('')

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/auth/register', {
        fullname,
        email,
        password,
        bio,
      });
      alert('Registration successful. Now you can log in');
     setRedirect(true)
    } catch (e) {
      console.log(e)
    }
  }

    if (redirect){
      return <Navigate to={'/login'} /> 
    }
 
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 w-full">
        <h1 className="text-4xl text-center font-semibold mb-12">Register</h1>
        <form className=" w-3/4 sm:w-6/12 md:w-1/3 mx-auto flex flex-col items-center gap-4 " onSubmit={registerUser}>
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">FULL NAME</span>
            <input 
            type="text"
            value={fullname}
            required
            onChange={(ev)=>{setFullname(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">Email</span>
            <input 
            type="email"
            required
            value={email}
            onChange={(ev)=>{setEmail(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">Password</span>
            <input 
            type="password"
            required
            value={password}
            onChange={(ev)=>{setPassword(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col items-start w-full">
            <span className="text-gray-400">Bio (optional) </span>
            <textarea 
            type="text"
            value={bio}
            onChange={(ev)=>{setBio(ev.target.value)}}
            className=" p-2 w-full bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
          </div>
          <div className=" flex flex-col w-full">
          <button className="border border-gray-700 hover:border-gray-600 w-full py-3 bg-[#111] text-lg">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-gray-400" to={'/login'}>Login</Link>
          </div>
          </div>
          <div className=" w-full flex justify-center">
            <Link>
            <FontAwesomeIcon icon={faGithub} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7" />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faGoogle} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}