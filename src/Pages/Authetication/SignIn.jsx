import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin/SocialLogin';


const SignIn = () => {
  const { signInUser }= useAuth();
  // react hook form 
  const { register, handleSubmit, formState: { errors } } = useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from || '/'
  // form handle sign in -------
  const onSubmit = data =>{
    console.log(data);
    // firebase signInUser
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
        navigate(from)
        // alert
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Log in  successfuly",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.log(error)
      });
  }
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-4xl font-bold">Sign In now!</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {/* email error */}
          {errors.email?.type === "required" && (
            <p className="text-left text-red-600">Email is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {/* errrors password show */}
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-left">Password is required </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-left text-red-600">
              Password must be 6 characters or longers.
            </p>
          )}
          {/* forgort button */}
          <div className="text-left">
            {" "}
            <a className="link link-hover text-black ">Forgot password?</a>
          </div>
          {/* google */}
          <SocialLogin></SocialLogin>
          {/* button */}
          <button className="btn btn-primary text-secondary mt-4">
            Sign In{" "}
          </button>
          <div className="text-left">
            <p>
              {" "}
              Please created account?{" "}
              <Link className="text-scondary underline" to={"/signup"}>
                Sign up{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn