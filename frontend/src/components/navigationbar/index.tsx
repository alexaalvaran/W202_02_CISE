import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <>
         <div className="navBar w-full h-20 sticky top-0">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full text-white">
                    <ul>
                    <li>
                            <Link href="/">
                            <p>Home</p>
                            </Link>
                    </li>
                    </ul>
                    <ul className="flex gap-x-10 text-white justify-between items-center h-full">
                        <li>
                            <Link href="/search">
                            <p>Search</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/add">
                            <p>Add Article</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                            <p>Moderate</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login">
                            <p>Analyse</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
        </>
    );
};

export default Navbar;