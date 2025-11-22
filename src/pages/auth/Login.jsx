import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const { loginExistingUser, setLoading, passwordReset, googleSignin } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const emailRef = useRef();

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginExistingUser(email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        navigate(location?.state || "/");
        toast.success("Login Successfull");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    passwordReset(email)
      .then(() => {
        toast.success(`Password reset email sent to ${email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // google sign in
  const handleSignInWithGoogle = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        navigate(location?.state || "/");
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
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full flex items-center justify-center pb-10">
        <div className="w-11/12 md:w-3/4 md:max-w-md p-4 md:p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
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
            </div>
            <div className="mb-4" onClick={handleForgetPassword}>
              <p className="block text-gray-700 text-sm mb-2">
                Forget your password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              Login
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
            Login with Google
          </button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an Account?
            <Link
              to="/auth/registration"
              className="text-cyan-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
