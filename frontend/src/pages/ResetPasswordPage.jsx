import React, { useContext, useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ResetPasswordPage = () => {
  useDocumentTitle('Reset Password');
  const { navigate, axios } = useContext(AppContext);
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmPassword: ""
  });

  // state for validation errors
  const [errors, setErrors] = useState({
    otp: "",
    password: "",
    confirmPassword: ""
  });

  // ✅ frontend validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }else if(formData.confirmPassword.trim() === ""){
      newErrors.confirmPassword = "Confirm Password is required";
    } 
    if (!formData.otp.trim()) { 
        newErrors.otp = "OTP is required";  
    } else if (formData.otp.length !== 6 || !/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = "OTP must be a 6-digit number"; 
    }

    setErrors(newErrors);

    // return true only if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    // console.log("ResetPassword Form data",formData);
    Object.assign(formData, { email: localStorage.getItem("resetEmail") });
    // console.log(formData);

    // run validation before sending request
    if (!validateForm()) {
      return; // stop form submit if errors exist
    }

    try {
      const { data } = await axios.post("/user/change-password", formData,{withCredentials: true});
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <form
        onSubmit={handleFormData}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Reset Password</h1>

        {/* Username */}
        <div className="flex flex-col mt-6">
          <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* <FaRegUser className="w-5 h-5" /> */}
            <input
              type="text"
              name="otp"
              maxLength={6}
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              placeholder="Type Otp"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-lg w-full h-full"
              required
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.otp}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <TbLockPassword className="w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="bg-transparent placeholder-gray-500 outline-none text-lg w-full h-full"
              required
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <TbLockPassword className="w-5 h-5" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="bg-transparent placeholder-gray-500 outline-none text-lg w-full h-full"
              required
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
          <div className="flex gap-3">
          <button
          type="submit"
          className="cursor-pointer mt-5 mb-5 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Reset Password
        </button>
        <button
        onClick={() => navigate(-1)}
          className="cursor-pointer mt-5 mb-5 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Back
        </button>
          </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
