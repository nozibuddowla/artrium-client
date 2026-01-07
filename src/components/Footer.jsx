import React from "react";
import MyContainer from "./MyContainer";
import { Link } from "react-router";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { LiaSlackHash } from "react-icons/lia";

const Footer = () => {
  return (
    <div className="bg-base-content-200 border-t">
      <MyContainer>
        <footer className="footer grid grid-cols-2 md-grid-cols-4 gap-8 text-base-content p-10">
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title font-bold text-purple-700">Services</h6>
            <Link to="/exploreArtworks" className="link link-hover">
              Explore Artworks
            </Link>
            <Link className="link link-hover">Design</Link>
            <Link className="link link-hover">Marketing</Link>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title">Company</h6>
            <Link className="link link-hover">About us</Link>
            <Link className="link link-hover">Contact</Link>
            <Link className="link link-hover">Jobs</Link>
          </nav>
          <nav className="flex flex-col gap-2">
            <h6 className="footer-title">Legal</h6>
            <Link className="link link-hover">Terms of use</Link>
            <Link className="link link-hover">Privacy policy</Link>
          </nav>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <LiaSlackHash size={30} className="text-purple-600" />
              <span className="text-2xl font-black bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Artrium
              </span>
            </div>
            <div className="flex gap-4">
              <FaXTwitter
                size={20}
                className="hover:text-purple-600 cursor-pointer"
              />
              <FaYoutube
                size={20}
                className="hover:text-purple-600 cursor-pointer"
              />
              <FaFacebookF
                size={20}
                className="hover:text-purple-600 cursor-pointer"
              />
            </div>
          </div>
        </footer>
        <div className="text-center py-6 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} Artrium. All rights reserved.
        </div>
      </MyContainer>
    </div>
  );
};

export default Footer;
