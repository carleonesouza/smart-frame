import React from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "../../lib/AuthContext";
import "./styles.css";

const MyAccount = ({ signOut }) => {
  const auth = useAuth();
  return (
    <div className="dropdown items-center  space-x-2">
      <button className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
        <span>{auth.name}</span>
      </button>
      <ul className="dropdown-content absolute hidden text-gray-700 pt-1">
        <li>
          <Link
            to="/app"
            className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Home
          </Link>
        </li>
        <Link
          to="/app/device"
          className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
          Device
        </Link>
        <li>
          <Link
            to="/app/update-password"
            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
            Update Password
          </Link>
        </li>
        <li>
          <button
            onClick={signOut}
            className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-12 block whitespace-no-wrap">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const Header = ({ app }) => {
  const auth = useAuth();
  const signOut = async () => {
    await auth.signOut();
    navigate("/");
  };
  return (
    <div className="bg-gray-200 ">
      {auth.isAuthReady && (
        <div className="relative bg-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              <div className="lg:w-0 lg:flex-1">
                <Link
                  to="/"
                  className="inline-block flex py-2 text-gray-800 text-2xl font-bold">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                    alt="Workflow"/>
                </Link>
              </div>
              <div>
                <nav className="hidden md:flex space-x-10">
                  {auth.isAuth && (
                    <React.Fragment>
                      {!app && (
                        <Link
                          to="/app"
                          className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                          Go to App
                        </Link>
                      )}
                      <Link
                        to="/d"
                        className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                        Open Player
                      </Link>{" "}
                    </React.Fragment>
                  )}
                </nav>
              </div>
              <div className="hidden md:flex items-center justify-end space-x-2 md:flex-1 lg:w-0">
                {!auth.isAuth && (
                  <React.Fragment>
                    <Link
                      to="/sign-in"
                      className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                      Sign-in
                    </Link>
                    <span className="flex rounded-md shadow-sm">
                      <Link
                        to="/create-account"
                        className="w-full flex items-center justify-center px-4 py-2 
                                border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 
                                focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Sign-up
                      </Link>
                    </span>
                  </React.Fragment>
                )}
                 {auth.isAuth && (
                    <React.Fragment>
                      <MyAccount signOut={signOut} />
                    </React.Fragment>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
