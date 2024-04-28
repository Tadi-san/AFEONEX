import { Link } from "react-router-dom"

function UserBlog(props) {
    const { blog } = props
    const dateObj = new Date(blog?.createdAt);

const year = dateObj.getFullYear();
const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
const day = dateObj.getDate();
    // const id = user._id.toString()
  return (
    <Link to={'/blog/' + blog?._id}>
            <div className="
                    no-scrollbar 
                    relative w-full h-52 rounded-2xl z-0 border-zinc-800 border border-t-0 border-l-0 
                    hover:border-zinc-700 hover:border-2 hover:border-t-0 hover:border-l-0 hover:bg-zinc-900 duration-[0.4s]
                    sm:w-full md:w-full lg:w-96 xl:w-96 2xl:w-96
                ">
                <div className="
                        overflow-none no-scrollbar
                        absolute w-full h-full -m-2 p-4 border-2 rounded-xl border-zinc-700 text-zinc-300
                        hover:border-zinc-200 hover:bg-[#0A0A0A] hover:text-white hover:-m-4 duration-[0.2s]
                        sm:w-full md:w-full lg:w-96 xl:w-96 2xl:w-96
                    ">

                    <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">
                    {day},{month},{year}
                    </span>
                    <span className={"text-emerald-400 text-xs font-bold uppercase"}>
                        {blog?.category}
                    </span>
                    </div>


                    {/* Title */}
                    <div className="text-md font-bold mb-0 mt-1 text-white
                    sm:text-xl sm:mb-3
                    sm:text-zinc-300 md:text-zinc-300 lg:text-zinc-300 xl:text-zinc-300">
                        {blog?.title}
                    </div>

                    {/* Description */}
                    <div className="text-sm text-zinc-400 mt-2 overflow-clip line-clamp-4" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    <div className="flex w-full justify-end mt-2">
    <Link to={'/blog/edit/'+blog?._id} className=" ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</Link>
    </div>


                </div>

            </div>
        </Link>
  )
}

export default UserBlog