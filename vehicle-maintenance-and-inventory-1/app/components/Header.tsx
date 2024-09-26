'use client'

import Link from "next/link";
import backImg from "@/assets/images/back-icon.jpg";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface HeaderProps {
    title: string;
    backTo?: string | null;
    goTo?: string | null;
    searchFunction?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, backTo, goTo, searchFunction }) => {

    const [searchKey, setSearchKey] = useState<string>('')
    
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value
        setSearchKey(key)
        handleSearch(key)
    }

    const handleSearch = (e: FormEvent | string) => {
        if (typeof e !== 'string') {
            e.preventDefault(); 
        }

        const key = typeof e === 'string' ? e : searchKey; 

        if (searchFunction) {
            searchFunction(key);
        }
    }

    return (
            <header className="flex flex-col md:flex-row justify-between items-center gap-5 p-5 w-full">
                <div className="w-full md:w-1/2 flex justify-start items-center gap-5">
                    {
                        backTo &&
                        <Link href={backTo}>
                            <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-red-400 flex justify-center items-center hover:ring ring-cyan-400">
                                <Image src={backImg} alt="back-icon" width={100} height={100} className="scale-110 absolute" />
                            </div>
                        </Link>
                    }
                    <h1 className="text-2xl text-white font-bold">{ title }</h1>
                </div>
                {
                    goTo && 
                    <Link href={goTo} className="p-2 rounded bg-blue-400 hover:bg-blue-600 text-white font-bold">Create</Link>
                }
                {
                    searchFunction &&
                    <form onSubmit={handleSearch} className="w-full md:w-1/2 group focus-within:ring ring-cyan-400">
                        <div className="w-full flex justify-center items-center">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                className="w-full bg-gray-100 placeholder:text-gray-600 p-2 outline-none" 
                                onChange={handleOnChange}
                                placeholder="Search..." 
                                value={searchKey}
                            />
                            <button type="submit" className="bg-gray-100 flex justify-center items-center h-10 w-10">
                                <FaMagnifyingGlass className="text-blue-400" size={23} />
                            </button>
                        </div>
                    </form>
                }
            </header>
    )
}

export default Header