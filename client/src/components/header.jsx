import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Usercontext";
export function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(UserContext);
  const id = user?._id.toString();

  function handleSearch(event) {
    event.preventDefault();
    onSearch(searchValue);
    setSearchValue("");
  }

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }
  function handleBlogLinkClick() {
    window.location.reload();
  }

  return (
    <div>
      <nav className=" flex justify-between items-center ">
        <div className=" flex gap-3 items-center ">
          <Link
            onClick={handleBlogLinkClick}
            to={"/"}
            className=" text-3xl p-0 font-bold"
          >
            Blog
          </Link>
          <form className=" flex justify-start " onSubmit={handleSearch}>
            <label className=" bg-gray-800 w-fit p-1 rounded-full gap-2 flex justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                className=" bg-transparent outline-none min-w-52"
                value={searchValue}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSearch} className="hidden"></button>
          </form>
        </div>
        <div className=" flex gap-2 ml-2">
          <Link to={"/write"} className=" flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>

            <span className="hidden sm:block">Write</span>
          </Link>
          <Link
            to={user ? "/account/" + id : "/login"}
            className={user ? " mr-2 text-green-400" : " mr-2"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}
