import { useContext, useState } from "react"
import { Header2 } from "../components/header2"
import ReactQuill from "react-quill";
import { UserContext } from "../Usercontext";
import { Navigate } from "react-router-dom";
import axios from "axios";
export const WritePage = () => {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [id, setId] = useState()
    const {user} = useContext(UserContext)
    
    if(!user){
      return <Navigate to={'/login'} />
    }
    async function handleUploadBlog(){
      axios.post('/blog/post', {title, content}).then(({data} )=>{
        setId(data._id)
      })
            
    }
    if (id){
      return <Navigate to={'/check/'+id} />
    }
  
    return (
    <div className="">
        <Header2 onUploadBlog={handleUploadBlog} />
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
