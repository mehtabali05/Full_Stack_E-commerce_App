import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const LoginPage = () => {
  useDocumentTitle('Login');
  const {setUser,navigate,axios} = useContext(AppContext);
  const [formData,setFormData] = useState({
    email: "",
    password: ""
  });

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/user/login",formData,{withCredentials: true});
      // console.log("User Login Data: ",data);
      if(data.success){
        setUser(data.user); 
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message); 
        navigate("/");
        window.scrollTo({top:0,behavior:"smooth"})
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error)
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || error.message);
    }
  } 
  
  return (
    <div className="flex items-center justify-center h-screen bg-primary p-4">
      <form onSubmit={handleFormData} className="max-w-96 mx-auto w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MdOutlineMailOutline className= "text-2xl" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData,email:e.target.value})}
            placeholder="Email id"
            autoComplete="current-password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <TbLockPassword className= "text-2xl" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData,password:e.target.value})}
            placeholder="Password"
            autoComplete="current-password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="mt-5 text-left text-indigo-500">
          <Link to={"/send-email"} className="text-sm" href="#">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="cursor-pointer mt-2 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Login
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-primary" >
            Sign up
          </Link> 
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
