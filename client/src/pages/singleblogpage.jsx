import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFacebook, faTelegram, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import { AllComments } from "../components/allComments";
export const SingleBlogPage = () => {
  const {id} = useParams()
  const [blog, setBlog] = useState()
  const [show, setShow] = useState(false)
  const [comment, setComment] =useState()
  const dateObj = new Date(blog?.createdAt);

const year = dateObj.getFullYear();
const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
const day = dateObj.getDate();

function postComment(ev){
  ev.preventDefault()
  axios.post('/blog/comment', {comment, id}).then(
    ({data})=>{
      setBlog(data)
      setShow(false)
    }
  )
}
  
  useEffect(()=>{
    axios.get('/blog/'+id).then(({data})=>{
      setBlog(data)
    })
  }, [id])

  return (
    <div className="w-full flex flex-col items-center">
      <div className=' sm:w-4/6 flex flex-col'>
            <div className="w-full items-baseline flex justify-between flex-col md:flex-row gap-2 md:gap-0">
            <Link className='w-fit mb-8'>
            <span className=' text-3xl font-semibold w-full text-start underline'>{blog?.authorName}</span> </Link>
            <div className=' w-fit flex justify-center sm:justify-start mb-4'>
            <Link>
            <FontAwesomeIcon icon={faGithub} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7" />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faInstagram} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            <Link>
            <FontAwesomeIcon icon={faFacebook} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7" />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faXTwitter} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            <Link className=" w-42 h-42 ">
            <FontAwesomeIcon icon={faTelegram} className="text-zinc-500 hover:text-white hover:scale-125 mx-2 h-7"  />
            </Link>
            </div>
            </div>
    <div className=" w-full flex flex-col">
      <span className="w-full text-left text-4xl font-semibold">{blog?.title}</span>
      <span className="text-lg text-left text-zinc-500 mt-4">{day},{month},{year}</span>
      {blog?.image && (
      <img className=" max-h-[600px] max-w-full object-cover" src= {blog?.image} />)}
      <ReactQuill
  theme="bubble"
  value={blog?.content}
  placeholder="write your blog"
  className="write my-5 "
  readOnly
/>
    </div>

</div>
<div className="w-full h-[2px] bg-gray-600"></div>
<div className=" w-full sm:w-4/6 flex flex-col">
  <button onClick={()=>setShow(!show)} className="border w-full rounded-lg  mt-4 border-gray-700 hover:border-gray-600 flex p-1 px-3 justify-between "><span>Add a Comment</span>
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
</button>
{show&& (<form className=" flex flex-col items-start w-full ">
          <div className=" flex flex-col items-start w-full relative">
            <span className="text-gray-400 mt-2">write a comment here </span>
            <textarea 
            type="text"
            value={comment}
            onChange={(ev)=>setComment(ev.target.value)}
            required
            className=" p-2 w-full min-h-[90px] bg-transparent border border-gray-500 rounded-lg focus:outline-gray-400"
            />
            <button onClick={postComment} className="absolute bottom-1 right-2 border rounded-full px-2 border-gray-700 hover:border-gray-600 w-fit bg-[#222] "> Post </button>
          </div>

</form>)}
{blog?.comment && blog.comment.map((comment, index)=>(
  <div key={index} className="border-b-2 border-gray-700 flex p-1 mt-3 text-gray-400">
  <span>
    {comment}
  </span>
</div>
))}

</div>
        </div>
  )
}
