import React from "react";
import MyContainer from "./MyContainer";
import { Link } from "react-router";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { LiaSlackHash } from "react-icons/lia";

const Footer = () => {
  return (
    <div className="bg-base-200 ">
      <MyContainer>
        <footer className="footer sm:footer-horizontal text-base-content p-10">
          <nav>
            <h6 className="footer-title">Services</h6>
            <Link to="/exploreArtworks" className="link link-hover">
              Explore Artworks
            </Link>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
          <aside className="grid-flow-col items-center">
            <LiaSlackHash size={24} color="#9810fa" />
            <Link
              to="/"
              className="text-2xl font-black bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Artrium
            </Link>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              <a>
                <FaXTwitter size={24} color="#9810fa" />
              </a>
              <a>
                <FaYoutube size={24} color="#9810fa" />
              </a>
              <a>
                <FaFacebookF size={24} color="#9810fa" />
              </a>
            </div>
          </nav>
        </footer>
      </MyContainer>
    </div>
  );
};

export default Footer;
