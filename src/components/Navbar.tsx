'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from 'next-auth'
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "@/images/qbox_logo.png"


const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="py-2 shadow-md relative">
            <div className="container mx-auto flex flex-row justify-between items-center">
                <a href="/">
                <Image
                className="mb-4 md:mb-0"
                src={logo}
                alt="logo"
                height={50}
                />
                </a>
                {/* <a className="text-3xl font-bold mb-4 md:mb-0" >Qbox</a> */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <nav className={`hidden flex-col sm:hidden md:flex-row md:flex md:items-center ${isOpen ? "flex" : "hidden"}`}>
                    {
                        session ? (
                            <>
                                <span className="mr-4">Welcome, {user?.username || user?.email}</span>
                                <Button className="w-full md:w-auto" onClick={() => {
                                    signOut()
                                }}>Logout</Button>
                            </>
                        ) : (
                            <Link href={'/signin'}>
                                <Button className="w-full md:w-auto">Login</Button>
                            </Link>
                        )
                    }
                </nav>
            </div>
            {/* Mobile menu, show/hide based on isOpen state */}
            {isOpen && (
                <div className="md:hidden bg-white  mt-4 p-4">
                    <nav className="flex flex-col space-y-2">
                    <span className="mr-4">Welcome, {user?.username || user?.email}</span>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        {
                            session ? (
                                <>
                                    
                                    <Button className="w-full bg-white hover:bg-gray-200 text-black text-md md:w-auto" onClick={() => {
                                        signOut()
                                    }}>Logout</Button>
                                </>
                            ) : (
                                <Link href={'/signin'}>
                                    <Button className=" w-full bg-white hover:bg-gray-200 text-black text-md md:w-auto">Log in</Button>
                                </Link>
                            )
                        }
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar
