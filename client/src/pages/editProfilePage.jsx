import { useContext, useState } from "react";
import { UserContext } from "../Usercontext";
import axios from "axios"
import { Navigate } from "react-router-dom";
export const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const id = user?._id
  console.log(id)
  const [fullname, setFullname] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [redirect, setRedirect] = useState(false);
  // const [password, setPassword] = useState("");
  const [bio, setBio] = useState(user?.bio);
  const [github, setGithub] = useState(user?.github);
  const [instagram, setInstagram] = useState(user?.instagram);
  const [linkedin, setLinkedin] = useState(user?.linkedin);
  const [x, setX] = useState(user?.x);
  const [telegram, setTelegram] = useState(user?.telegram);

    async function handleUpdate(ev){
      ev.preventDefault()
      axios.post('/user/edit',  {
        id,
        fullname,
        email,
        bio,
        github,
        instagram,
        linkedin,
        x,
        telegram,
      }).then( ({data})=>{
        setUser(data)
        setRedirect(true)
      }
      )
    }

    if(redirect){
      return <Navigate to={'/'} />
    }
  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-3xl mb-8 ">Edit your Profile</h1>
      <form className="p-5 w-full sm:w-4/6" onSubmit={ev=>handleUpdate(ev)}>
        <div className=" flex flex-col items-start">
          <span className="text-gray-400 text-xl">Full Name</span>
          <input
            type="text"
            required
            value={fullname}
            onChange={(ev) => {
              setFullname(ev.target.value);
            }}
            className=" p-2 w-fit sm:min-w-96 bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
          />
        </div>
        <div className=" flex flex-col items-end">
          <span className="text-gray-400 text-xl">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
            className=" p-2 w-fit bg-transparent border border-gray-500 sm:min-w-96 rounded-md focus:outline-gray-400"
          />
        </div>
        
        <div className=" flex flex-col items-start">
          <span className="text-gray-400 text-xl">Bio</span>
          <textarea
            type="text"
            value={bio}
            onChange={(ev) => {
              setBio(ev.target.value);
            }}
            className=" p-2 w-fit sm:min-w-96 bg-transparent border border-gray-500 rounded-md min-h-32 focus:outline-gray-400"
          />
        </div>

        <div className=" flex flex-col gap-8 mt-14">
          <span className="text-gray-200 text-xl">Add Socials</span>
          <div className="  flex gap-2 flex-wrap justify-center">
            <div className="flex flex-col">
              <span>Github</span>
              <input
              placeholder = "https\\:"
                value={github}
                onChange={(ev) => {
                  setGithub(ev.target.value);
                }}
                className=" p-1 w-fit bg-transparent border border-gray-500 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <span>Instagram</span>
              <input
              placeholder = "https\\:"
                value={instagram}
                onChange={(ev) => {
                  setInstagram(ev.target.value);
                }}
                className=" p-1 w-fit bg-transparent border border-gray-500 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <span>LinkedIn</span>
              <input
              placeholder = "https\\:"
                value={linkedin}
                onChange={(ev) => {
                  setLinkedin(ev.target.value);
                }}
                className=" p-1 w-fit bg-transparent border border-gray-500 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <span>X(twitter)</span>
              <input
              placeholder = "https//:"
                value={x}
                onChange={(ev) => {
                  setX(ev.target.value);
                }}
                className=" p-1 w-fit bg-transparent border border-gray-500 rounded-md focus:outline-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <span>Telegram</span>
              <input
              placeholder = "https\\:"
                value={telegram}
                onChange={(ev) => {
                  setTelegram(ev.target.value);
                }}
                className=" p-1 w-fit bg-transparent border border-gray-500 rounded-md focus:outline-gray-400"
              />
            </div>
          </div>
        </div>
        <button className="border border-gray-700 hover:border-gray-600 w-full py-3 bg-[#222] text-lg rounded-lg mt-8">
          Update
        </button>
      </form>
    </div>
  );
};
