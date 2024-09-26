'use client'

import Image from "next/image";
import Link from "next/link";
import person from '@/assets/images/person.jpg';
import lock from '@/assets/images/lock.jpg';
import logo from '@/assets/images/app-logo.jpg';
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthStore } from "@/app/stores/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";

interface User {
    first_name: string;
    middle_name: string;
    last_name: string;
    extension: string;
    email: string;
    password: string;
    position: string;
}

export default function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [signUpForm, setSignUpForm] = useState<User>({
        first_name: '',
        middle_name: '',
        last_name: '',
        extension: '',
        email: '',
        password: '',
        position: '',
    })
    const store = useAuthStore()
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setButtonDisabled(true)
        setIsLoading(true)
        await axios.post('/api/users', signUpForm)
        .then(response => {
            store.getUser(response.data?.user)
            router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSignUpForm({
            ...signUpForm,
            [name]: value
        })
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            {
                isLoading &&
                <div className="w-full min-h-screen fixed flex justify-center items-center bg-black/80">
                    <p className="text-white text-xl font-bold animate-pulse">Loading...</p>
                </div>
            }
            <section className="w-full md:w-4/5">
                <header className="mb-5 text-white text-center">
                    <h1 className="text-2xl font-bold">GUBAT TRANSPORT COOPERATIVE</h1>
                </header>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:px-5">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center p-5 md:p-0">
                        <div className="overflow-hidden rounded-full w-auto">
                            <Image src={logo} alt="logo" priority={true} width={300} height={300} />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 justify-center items-center flex">
                        <div className="w-full max-w-96 space-y-4 p-5 md:px-0">
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="first_name" className="">
                                    <Image src={person} alt="person-icon" width={20} height={20} />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="text" 
                                    name="first_name" 
                                    id="first_name" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="First name"
                                />
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="middle_name" className="">
                                    <Image src={person} alt="person-icon" width={20} height={20} />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="text" 
                                    name="middle_name" 
                                    id="middle_name" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="Middle name"
                                />
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="last_name" className="">
                                    <Image src={person} alt="person-icon" width={20} height={20} />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="text" 
                                    name="last_name" 
                                    id="last_name" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="Last name"
                                />
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="extension" className="">
                                    <Image src={person} alt="person-icon" width={20} height={20} />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="text" 
                                    name="extension" 
                                    id="extension" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="Extension"
                                />
                            </div>
                            
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="position" className="">
                                    <IoMdBriefcase className="text-black w-5 h-5" />
                                </label>
                                <select onChange={handleOnChange} name="position" id="position" className="w-full px-2 outline-none border-l border-black">
                                    <option value="driver">Driver</option>
                                    <option value="mechanic">Mechanic</option>
                                    <option value="inventory">Inventory Personel</option>
                                </select>
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="email" className="">
                                    {/* <Image src={person} alt="person-icon" width={20} height={20} /> */}
                                    <MdEmail className="text-black w-5 h-5" />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="Email"
                                />
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="password" className="">
                                    <Image src={lock} alt="lock-icon" width={20} height={20} />
                                </label>
                                <input 
                                    onChange={handleOnChange} 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="w-full px-2 outline-none border-l border-black" 
                                    placeholder="Password"
                                />
                            </div>
                            <button type="submit" disabled={buttonDisabled} className="p-2 w-full rounded bg-yellow-600 hover:bg-yellow-500 text-white font-bold">
                                REGISTER
                            </button>
                            <p className="text-center text-xs text-white">Already have an account? <Link href={'/auth/sign-in'} className="font-bold hover:text-blue-400">sign in</Link></p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}