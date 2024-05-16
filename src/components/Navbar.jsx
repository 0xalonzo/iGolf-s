import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import Container from "./Container";

import useAuthStore from "../hooks/useAuthStore";

export default function Navbar() {
  const { token, setToken, setUser } = useAuthStore();
  const notify = () => toast.success("Logged out successfully.");

  return (
    <Disclosure as="nav" className="bg-gray-950 shadow text-white">
      {({ open }) => (
        <>
          <Container>
            <div className="flex h-16 justify-between">
              <div className="flex justify-between w-full">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <h1 className="font-bold text-2xl inline-flex items-center gap-2">
                      ⛳️ iGolf
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex items-center sm:space-x-8">
                  {token ? (
                    <>
                      <DesktopNavLink to="/">Home</DesktopNavLink>
                      <DesktopNavLink to="add-course">
                        Add Course
                      </DesktopNavLink>
                      <Button
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          setToken("");
                          setUser({ username: "", password: "", fullname: "" });
                          notify();
                        }}
                        className="inline-flex items-center w-full h-fit justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <DesktopNavLink to="/">Home</DesktopNavLink>
                      <DesktopNavLink to="register">Register</DesktopNavLink>
                      <DesktopNavLink to="login">Login</DesktopNavLink>
                    </>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </Container>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {token ? (
                <>
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="add-course">Add Course</MobileNavLink>
                  <Button
                    className="inline-flex items-center w-full h-fit justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setToken("");
                      setUser({ username: "", password: "", fullname: "" });
                      notify();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/">Home</MobileNavLink>
                  <MobileNavLink to="register">Register</MobileNavLink>
                  <MobileNavLink to="login">Login</MobileNavLink>
                </>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

function DesktopNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex flex-shrink-0 items-center border-b-2 px-1 pt-1 text-sm font-medium ${
          isActive
            ? "border-green-500 text-gray-100"
            : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-200"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
          isActive
            ? "bg-green-50 border-green-500 text-green-700"
            : "border-transparent text-gray-200 hover:bg-gray-600 hover:border-gray-300"
        }`
      }
    >
      <DisclosureButton as="div">{children}</DisclosureButton>
    </NavLink>
  );
}
