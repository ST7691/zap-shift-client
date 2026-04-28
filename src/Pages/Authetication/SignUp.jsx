import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin/SocialLogin";
import axios from "axios";

const SignUp = () => {
  const { creatUserRegister, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle on submit react hook form
  // const handleRgister = async (data) => {
  //   console.log(data);
  //   console.log("after register ", data.photo[0]);
  //   const profileImg = data.photo[0];
  //   // create user firebase sign up
  //   creatUserRegister(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       // form data store the img
  //       const formData = new FormData();
  //       formData.append("image", profileImg);
  //       // img bb send the photo url
  //       const imge_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Key}`;
  //       // axios
  //    const imgRes =await axios.post(imge_API_URL, formData);
  //       const imageUrl = imgRes.data.data.url;

  //   await updateUserProfile({
  //     displayName: data.name,
  //     photoURL: imageUrl,
  //   });
  //   const dbRes = await axios.post("https://zap-shift-server-pi-six.vercel.app/users", {
  //     name: data.name,
  //     email: data.email,
  //     photo: imageUrl,
  //   });

  //   console.log("DB SUCCESS:", dbRes.data);

  //           // alert
  //           Swal.fire({
  //             position: "top",
  //             icon: "success",
  //             title: "Sign in  successfuly",
  //             showConfirmButton: false,
  //             timer: 2000,
  //           });

  //           navigate(from);
  //         })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const handleRgister = async (data) => {
    try {
      const profileImg = data.photo[0];

      await creatUserRegister(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const imge_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Key}`;

      const imgRes = await axios.post(imge_API_URL, formData);
      const imageUrl = imgRes.data.data.url;
      const userInfo = {
        displayName: data.name,
        photoURL: imageUrl,
      };
      await updateUserProfile(userInfo);

      const dbRes = await axios.post(
        "https://zap-shift-server-pi-six.vercel.app/users",
        {
          displayName: data.name,
          email: data.email,
          photo: imageUrl,
          // role: "user",
        },
      );

      console.log("DB SUCCESS:", dbRes.data);

      Swal.fire({
        icon: "success",
        title: "Sign up successful",
        timer: 2000,
      });

      navigate(from);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-4xl font-bold">Sign Up now!</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRgister)} className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          {/*image */}
          <label className="label">Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-ghost"
            placeholder="Your photo"
          />
          {errors.photo && <p className="text-red-500">Photo is required</p>}

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
};

export default SignUp;
