
import UserBlog from '../components/user_blog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFacebook, faTelegram, faXTwitter, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { Link, Navigate, } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { UserContext } from '../Usercontext';

export const AccountPage = () => {
const {user} = useContext(UserContext)
const [blogs, setBlogs] = useState()
const id = user._id.toString()
useEffect(()=>{
    
    axios.get('/user/blog/'+id).then( ({data}) =>
        setBlogs(data)
    )
},[id])
if (!user){
  return <Navigate to={'/login'} />
}
    return (
    <div className=' w-full flex flex-col items-center'>
    <div className=' w-full p-2 sm:p-0 sm:w-5/6 flex flex-col items-center'>
        <div className=' w-full flex flex-col items-center'>
            <div className=' w-full flex justify-between items-center mb-8'>
            <span className=' text-4xl font-semibold w-full text-start mb-4'>{user?.fullname}</span>
            {user._id === id && (
  <Link to={'/edit/'+id} className=' flex  gap-2 p-1 rounded text-zinc-500 hover:text-white' >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
    <span className="whitespace-nowrap hidden sm:block">Edit Profile</span>
  </Link>
)}
            </div>
            <div className='w-full flex flex-col mb-8'>
                <span className=' text-xm font-semibold w-full text-start mb-1 text-zinc-500'>Bio</span>
            <p className='sm:w-1/2 sm:text-start mb-4 '> {user?.bio}</p>
            <div className=' w-full flex justify-center sm:justify-start mb-4'>
            <Link>
            <FontAwesomeIcon icon={faGithub} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7" />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faInstagram} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            <Link>
            <FontAwesomeIcon icon={faLinkedin} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7" />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faXTwitter} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faTelegram} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            </div>
            </div>
        </div>
            <span className='text-2xl font-semibold mb-12 mt-2'>Blogs Posted</span>

            <div className='grid grid-cols-1 md:flex flex-wrap gap-10 sm:gap-4 justify-around w-full '>
  {blogs?.length > 0 && blogs.map(blog => (
    <UserBlog key={blog} blog={blog}/>
  ))}
</div>
        </div>

    </div>
  )
}
