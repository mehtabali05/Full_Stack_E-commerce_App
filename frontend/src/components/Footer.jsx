import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="my-6 bg-primary text-white px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
            <div className="footer flex md:flex-col justify-between w-full gap-8 border-b border-gray-500 pb-10">
                <div className="md:max-w-full footer-description">
                    <img alt="" className="h-11" src={assets.logo} />
                    <p className="mt-6 text-sm">
                    Discover a world of stories, knowledge, and inspiration. Our bookstore brings you the latest releases, timeless classics, and special editions—all in one place. Read more, grow more, and never stop exploring.
                    </p>
                </div>
                <div className="footer-links flex-1 flex justify-between items-start gap-20 md:gap-60 ">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><Link to={"/about-us"} className="hover:underline">About us</Link></li>
                            <li><Link to={"/contact-us"} className="hover:underline">Contact us</Link></li>
                            <li><Link to={"/privacy-policy"} className="hover:underline">Privacy policy</Link></li>
                        </ul>
                    </div>
                    <div> 
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                        <div className="flex items-center gap-3 mt-8 text-indigo-500">
                            <Link to={"https://www.facebook.com/share/15kKFtvFkN/"} className="hover:-translate-y-0.5 transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <Link to={"https://www.instagram.com/mehtabaliali973?igsh=MXFsY2JpZXhwYXd5NA=="} className="hover:-translate-y-0.5 transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <Link to={"https://www.linkedin.com/in/mehtab-ali-280b2631b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} className="hover:-translate-y-0.5 transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            
                            <Link to={"https://github.com/mehtabali05"} className="hover:-translate-y-0.5 transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                            <p>mehtabalics7@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
            © 2025 BookStore. All rights reserved. Crafted with ❤️ for readers everywhere.
            </p>
        </footer>
    )
}

export default Footer;