import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

export const CheakPage = () => {
  const [blog, setBlog] = useState()
  const [image, setImage] = useState()
  const [category, setCategory] = useState("Tech")
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const {id} = useParams()
  
  useEffect(()=>{
    axios.get('/blog/cheak/' + id).then(({data}) => setBlog(data))
  },[id])

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);
  

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
}    
function uploadSingleImage(base64) {
    setLoading(true);
    axios.post("/blog/upload", { image: base64 })
      .then((res) => {
        setImage(res.data);
        alert("profile picture updated Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  async function publish(ev){
   ev.preventDefault()
    await axios.post('/blog/publish', {image, category, id}).then(
      setRedirect(true)
    )
  }

  if (redirect) {
    return <Navigate to={'/account/' + id} />
  }
  
  return (
    <div className="flex justify-center">
  <div className="flex flex-col w-full sm:w-4/6 items-center justify-center ">
    <span className="text-4xl text-start">{blog?.title}</span>
    <div className="w-full flex flex-col mt-8">
      <span className="text-start font-semibold text-[#777] w-full">
        Upload a cover image{' '}
        <span className="text-[#666]">*optional</span>
      </span>
      <div className="flex justify-center border border-[#444]">
        <label className="cursor-pointer relative w-full h-56 shadow-md z-10 text-white flex justify-center items-center">
          <img
            src={!image == ""? image:'/add.png'}
            className={!image == ""? "w-full h-full object-cover" :'w-12  h12'}
            alt=""
          />
          <input
            type="file"
            multiple
            required
            onChange={uploadImage}
            className="hidden"
          />
        </label>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-24">
      <span className="text-start text-[#777] font-semibold">
        Choose category{' '}
        <span className="text-red-900">*must</span>
      </span>
      <select value={category} onChange={(ev)=>setCategory(ev.target.value)}
       className="bg-[#000] border border-[#333] hover:border-[#666] rounded w-[200px]">
        <option>Tech</option>
        <option>Religion</option>
        <option>Politics</option>
        <option>Other</option>
      </select>
    </div>
    <button onClick={publish} className="border border-gray-700 hover:border-gray-600 w-full py-3 bg-[#111] text-lg">
      Publish
    </button>
  </div>
</div>
  )
}
