import { useContext } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user?.email;
  const photo = user?.photoURL;
  const displayName = user?.displayName;

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout Successfull");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Logout faild");
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/services"}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/my-services"}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                My Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/add-service"}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                Add Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/my-bookings"}
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                My Bookings
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          Home<span className="text-cyan-600">Hero</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/services"}
              className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/my-services"}
              className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
            >
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/add-service"}
              className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/my-bookings"}
              className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
            >
              My Bookings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-transparent border-0"
              >
                {photo ? (
                  <img
                    src={photo}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <CgProfile size={24} />
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100  w-56  space-y-1 shadow-2xl overflow-visible"
              >
                <li className="bg-green-100 pointer-events-none cursor-default">
                  <div className="flex flex-col justify-start">
                    <h1 className="text-lg font-semibold text-gray-500">
                      Signed in as
                    </h1>
                    <h2 className="text-sm text-gray-700">{displayName}</h2>
                    <h2 className="text-sm text-gray-700">{email}</h2>
                  </div>
                </li>
                <li>
                  <Link
                    to="/my-profile"
                    className="text-sm py-2 mt-6 hover:border-green-500 border-l-4 bg-green-50 hover:bg-green-100 border-transparent"
                  >
                    <MdManageAccounts size={20} /> My Profile
                    <span className="justify-end">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm py-2 hover:bg-red-100 bg-red-50 hover:border-red-500 border-l-4  border-transparent "
                  >
                    <FiLogOut size={20} /> Logout{" "}
                    <span className="justify-end">
                      <IoIosArrowForward />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link to={"/auth/login"} className="btn m-1 bg-cyan-600 text-white">
              Login
            </Link>
            <Link
              to={"/auth/registration"}
              className="btn m-1 bg-cyan-600 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
