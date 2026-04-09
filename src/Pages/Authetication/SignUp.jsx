import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin/SocialLogin";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const SignUp = () => {
  const { creatUser, updateUserProfile ,user} = useAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // File preview state
  const [preview, setPreview] = useState(null);
  const photoFile = watch("photoFile");

  // Already logged in? Redirect to home
  useEffect(() => {
    if (user) {
      navigate("/"); // already logged in -> home page
    }
  }, [user, navigate]);

  // Watch photo file for preview
  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [photoFile]);

  // Form submit
  const onSubmit = async (data) => {
    try {
      //  Create user
      const result = await creatUser(data.email, data.password);
      console.log("User created:", result);

      //  Upload photo (base64 for demo)
      let photoURL = "";
      if (data.photoFile && data.photoFile.length > 0) {
        const file = data.photoFile[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
          photoURL = reader.result;

          // Save user to DB
          // user info
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            role: "user", // VERY IMPORTANT
          };
          axiosSecure.post("/users", userInfo)
            .then((res) => {
            if (res.data.insertedId) {
              console.log("User saved in DB");
            }
          });

          // Update Firebase profile
          await updateUserProfile(data.name, photoURL);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/signin"); // redirect to login
        };
        reader.readAsDataURL(file);
      } else {
        // No photo
        await updateUserProfile(data.name, "");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-4xl font-bold">Sign Up now!</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 text-left">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-left">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-left text-red-600">
              Password must be 6 characters or longer.
            </p>
          )}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photoFile")}
            className="file-input file-input-ghost w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2"
            />
          )}

          {/* Social Login */}
          <SocialLogin />

          {/* Sign Up Button */}
          <button className="btn btn-primary text-secondary mt-4">
            Sign Up
          </button>

          <div className="text-left mt-2">
            <p>
              Already have account?{" "}
              <Link className="text-secondary underline" to={"/signin"}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};;

export default SignUp;
