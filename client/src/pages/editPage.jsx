import { useContext, useEffect, useState } from "react"
import ReactQuill from "react-quill";
import { UserContext } from "../Usercontext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
export const EditPage = () => {
    
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [redirect, setRedirect] = useState(false)
    const [num, setNum] = useState()
    const {id} = useParams()
    const {user} = useContext(UserContext)
    
    useEffect(()=>{
        axios.get('/blog/'+id).then(({data})=>{
            setTitle(data.title)
            setContent(data.content)
        })
    }, [id])
    
    async function handleUploadBlog(){
      axios.post('/blog/update', {title, content, id}).then(({data} )=>{
        setNum(data._id)
      })    
    }

    async function handleDeleteBlog(){
      axios.post('/blog/delete', {id}).then(setRedirect(true))
    }

    if (num){
      return <Navigate to={'/check/'+id} />
    }
  
    if (redirect){
      return <Navigate to={'/account/'+user?._id} />
    }
    return (
    <div className="">
        <nav className="flex justify-between items-center">
            <div className=" flex gap-3 items-center">
                <Link className=" text-2xl underline p-0 font-bold">
                {user?.fullname}
                </Link>
            </div>
            <div className=" flex gap-4 items-center">
              <button onClick={handleUploadBlog} className=" p-1 px-2 border border-green-500 hover:border-green-400 w-full bg-[#111] rounded-full">
                update
              </button>
              <button onClick={handleDeleteBlog} className=" p-1 px-2 border border-gray-700 hover:border-gray-600 w-full bg-[rgb(244,15,15)] rounded-full">
                Delete
              </button>
                
            </div>
        </nav>
        <div className=" mt-12 w-full flex flex-col gap-2 items-start">
            <input 
            type="text"
            value={title}
            onChange={(ev)=>setTitle(ev.target.value)}
            placeholder="Title"
            className=" font-semibold bg-transparent outline-none  text-3xl sm:text-5xl "
            />
        </div>
        
        <ReactQuill
  theme="bubble"
  value={content}
  onChange={setContent}
  placeholder="write your blog"
  className="write my-5 "
/>

      
    </div>
  )
}
