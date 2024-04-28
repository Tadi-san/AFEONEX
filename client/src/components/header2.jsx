import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Usercontext"

export const Header2 = ({ onUploadBlog }) => {
  const {user} = useContext(UserContext)
  return (
    <div>
        <nav className="flex justify-between items-center">
            <div className=" flex gap-3 items-center">
                <Link className=" text-2xl underline p-0 font-bold">
                {user.fullname}
                </Link>
            </div>
            <div className=" flex gap-4 items-center">
              <button onClick={onUploadBlog} className=" p-1 px-2 border border-gray-700 hover:border-gray-600 w-full bg-[#111] rounded-full">
                Post Blog
              </button>
                <Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                </Link>
            </div>
        </nav>

    </div>
  )
}
