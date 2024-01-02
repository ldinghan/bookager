'use client';

import { Button } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from "classnames";
import { auth } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import LightDarkModeSwitch from './components/LightDarkModeSwitch';

const NavBar = () => {
    const currentPath = usePathname();

    const [firstName, setFirstName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const links = [
        { label: "Home", href:"/" },
        { label: "Dashboard", href:"/dashboard" },
    ]

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setFirstName(user.displayName!);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })

    }, [])

    const loginUser = async () => {
        const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
        setFirstName(userCred.user.displayName!);
        setIsLoggedIn(true);
    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            setFirstName("");
            setIsLoggedIn(false);
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <nav className='flex justify-between border-b-2 border-b-violet-600 mb-5 px-5 h-14 items-center'>
            <ul className='flex space-x-6'>
                {links.map(link => 
                <Link 
                    key={link.label} 
                    className={classnames({
                        'text-zinc-900 dark:text-purple-400': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 dark:hover:text-purple-500 transition-colors': true
                    })} 
                    href={link.href}>
                        {link.label}
                </Link>)}
                
            </ul>
            <div className='absolute w-1/2 text-center left-1/4 text-2xl font-extrabold tracking-widest z-10'><Link href="/">BOOKAGER</Link></div>
            <div className='flex space-x-6 items-center z-20'>
                <LightDarkModeSwitch />
                {isLoggedIn 
                    ? <><div>{firstName}</div>
                      <Button className='hover:cursor-pointer' onClick={logoutUser}>Log Out</Button>
                    </>
                    : 
                    <Button className='hover:cursor-pointer' onClick={loginUser}>Log In</Button>
                }
            </div>
        </nav>
    )
}

export default NavBar