import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const { createNewUser, setLoading, googleSignin, updateUserProfile } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    uppercase: false,
    lowercase: false,
    length: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError({
      uppercase: !/[A-Z]/.test(value),
      lowercase: !/[a-z]/.test(value),
      length: value.length < 6,
    });
  };
  const handleRegisterUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    if (
      !passwordError.uppercase &&
      !passwordError.length &&
      !passwordError.lowercase
    ) {
      createNewUser(email, password)
        .then((userCredential) => {
          setLoading(false);
          setPasswordError(null);
          const user = userCredential.user;
          toast.success();
          updateUserProfile(name, photo)
            .then(() => {
              toast.success(`New account created for ${user.email}`);
              navigate("/");
            })
            .catch((error) => {
              toast.error("Problem in name or photourl");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
    } else {
      toast.error("Your password not strong");
    }
  };

  // google sign in
  const handleSignInWithGoogle = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        navigate("/");
        toast.success("Login Successfull");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);

        // ...
      });
  };
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full flex items-center justify-center">
        <div className="w-11/12 md:w-3/4 md:max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
            Register
          </h2>
          <form onSubmit={handleRegisterUser}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="photo"
                placeholder="Your photo url"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                onChange={handlePasswordChange}
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleTogglePassword}
                className="btn btn-xs absolute top-9 right-2 bg-transparent border-0"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>

              {(passwordError.uppercase ||
                passwordError.lowercase ||
                passwordError.length) && (
                <ul className="text-sm space-y-1 pt-1.5">
                  <li className="flex items-center gap-0.5">
                    <span
                      className={
                        !passwordError.uppercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      <IoCheckmarkDoneCircleSharp />
                    </span>
                    At least 1 uppercase letter (A–Z)
                  </li>
                  <li className="flex items-center gap-0.5">
                    <span
                      className={
                        !passwordError.lowercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      <IoCheckmarkDoneCircleSharp />
                    </span>
                    At least 1 lowercase letter (a–z)
                  </li>

                  <li className="flex items-center gap-0.5">
                    <span
                      className={
                        !passwordError.length
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      <IoCheckmarkDoneCircleSharp />
                    </span>{" "}
                    Minimum length: 6 characters
                  </li>
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              Sign up
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleSignInWithGoogle}
            className="w-full mt-4 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign-up with Google
          </button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Have an Account?
            <Link to="/auth/login" className="text-cyan-600 hover:underline">
              {" " + "Login Here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
