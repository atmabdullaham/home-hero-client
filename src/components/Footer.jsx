import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <Link className="text-2xl font-bold">
            <span className="text-cyan-600">Home</span>Hero
          </Link>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
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
        <nav className="">
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-4 text-3xl">
            <a href="https://facebook.com" target="_blank">
              <FaFacebook color="#1877F2" />
            </a>

            <a href="https://instagram.com" target="_blank">
              <FaInstagram color="#E4405F" />
            </a>

            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin color="#0A66C2" />
            </a>

            <a
              href="https://twitter.com"
              className="dark:bg-gray-200 rounded-md"
              target="_blank"
            >
              <FaXTwitter color="#000000" size={28} />
            </a>

            <a href="https://youtube.com" target="_blank">
              <FaYoutube color="#FF0000" />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            HomeHero Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
