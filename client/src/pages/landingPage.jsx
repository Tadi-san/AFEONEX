import { useEffect, useState } from "react"
import { Header } from "../components/header"
import axios from "axios"
import CommonBlog from "../components/common_blog"

export const LandingPage = () => {
  const [blogs, setBlogs] = useState()
  const[show, setShow] = useState(false)
  const [filter, setFilter] = useState("")
  useEffect(()=>{
    axios.post('/blog', {filter}).then(({data})=>setBlogs(data))
  }, [filter])

  function handleSearch(searchValue) {
  axios.post('/blog/search', {searchValue}).then(({data})=>setBlogs(data))
  }

  return (
    <div>
        <Header onSearch={handleSearch} />
        <div className=" flex flex-col mt-4 gap-8">
          <div className=" flex justify-end relative">
          <button className="mt-4" onClick={()=>{
            setShow(true)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          </button>
          <div className={show ?" flex flex-col border absolute w-full bg-[#000] z-50 gap-2 p-2 rounded-s-2xl rounded-br-2xl max-w-40": " hidden flex-col border absolute w-full bg-[#000] z-50 gap-2 p-2 rounded-s-2xl rounded-br-2xl max-w-40"}>
            <button className="mt-8" onClick={()=>{
              setFilter("Politics")
            }}>Politics</button>
            <button
            onClick={()=>{
              setFilter("Religion")
            }}>Religion</button>
            <button
            onClick={()=>{
              setFilter("Tech")
            }}>Tech</button>
            <button
            onClick={()=>{
              setFilter("Other")
            }}>Other</button>
          <button className="absolute" onClick={()=>{
            setShow(false)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          </button>
          </div>
          </div>  
          <div className='grid grid-cols-1 md:flex flex-wrap gap-10 sm:gap-4 justify-around w-full '>
  {blogs?.length > 0 && [...blogs].reverse().map(blog => (
    <CommonBlog key={blog} blog={blog}/>
  ))}
</div>
        </div>
    </div>
  )
}
