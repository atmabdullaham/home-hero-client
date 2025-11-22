import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user?.email;
  const [displayName, setDisplayName] = useState();
  const [photo, setPhoto] = useState();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    setPhoto(user?.photoURL);
    setDisplayName(user?.displayName);
  }, [user]);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout Successful");
        navigate("/");
      })
      .catch(() => toast.error("Logout failed"));
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  return (
    <div className="bg-base-100 navbar  shadow-sm sticky top-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-20 bg-base-100 rounded-lg w-56 p-3 shadow-lg"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-cyan-600" : ""
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? "text-cyan-600" : ""
                  }
                >
                  Services
                </NavLink>
              </li>

              {user && (
                <>
                  <li>
                    <NavLink
                      to="/my-services"
                      className={({ isActive }) =>
                        isActive ? "text-cyan-600" : ""
                      }
                    >
                      My Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/add-service"
                      className={({ isActive }) =>
                        isActive ? "text-cyan-600" : ""
                      }
                    >
                      Add Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-bookings"
                      className={({ isActive }) =>
                        isActive ? "text-cyan-600" : ""
                      }
                    >
                      My Bookings
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link className="text-xl font-bold">
            <span className="text-cyan-600">Home</span>Hero
          </Link>
        </div>

        {/* CENTER (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 gap-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? "text-cyan-600" : "")}
              >
                Services
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/my-services"
                    className={({ isActive }) =>
                      isActive ? "text-cyan-600" : ""
                    }
                  >
                    My Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-service"
                    className={({ isActive }) =>
                      isActive ? "text-cyan-600" : ""
                    }
                  >
                    Add Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                      isActive ? "text-cyan-600" : ""
                    }
                  >
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3 flex items-center">
          {/* Theme Toggle */}

          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            className="toggle"
            defaultChecked={theme === "dark"}
          />

          {/* If logged in */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-0 border-0">
                {photo ? (
                  <img
                    src={photo}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <CgProfile size={26} />
                )}
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content z-20 menu bg-base-100 w-60 mt-3 p-3 shadow-xl rounded-lg space-y-1"
              >
                {/* User Info */}
                <li className="bg-green-100 rounded-md p-3 pointer-events-none">
                  <p className="text-xs font-semibold text-gray-500">
                    Signed in as
                  </p>
                  <p className="text-base font-medium">{displayName}</p>
                  <p className="text-xs">{email}</p>
                </li>

                {/* My Profile */}
                <li>
                  <Link
                    to="/my-profile"
                    className="text-sm py-2 mt-1 hover:border-green-500 border-l-4 border-transparent hover:bg-green-50"
                  >
                    <MdManageAccounts size={20} />
                    My Profile
                    <span className="ml-auto">
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm py-2 hover:bg-red-50 border-l-4 border-transparent hover:border-red-500"
                  >
                    <FiLogOut size={20} />
                    Logout
                    <span className="ml-auto">
                      <IoIosArrowForward />
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* If NOT logged in */
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                className="btn btn-sm bg-cyan-600 text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/registration"
                className="btn btn-sm btn-outline border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
