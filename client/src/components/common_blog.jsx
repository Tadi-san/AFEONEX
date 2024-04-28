import { Link } from "react-router-dom"

function CommonBlog(props) {
    const { blog } = props
    // const id = user._id.toString()

const dateObj = new Date(blog?.createdAt);

const year = dateObj.getFullYear();
const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
const day = dateObj.getDate();

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

                    <div className="flex w-full justify-start mt-2">
    <Link to={'/account/'+blog?.author}>
        <span className="text-zinc-300">{blog?.authorName}</span>
    </Link>
    </div>
                </div>
            </div>
        </Link>
  )
}

export default CommonBlog