import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer() {
  return (
    <section className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">

          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                &copy; 2026 InkFlow. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-posts" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/add-post" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}