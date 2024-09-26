'use client'

import Link from "next/link";
import person from '@/assets/images/person.jpg';
import lock from '@/assets/images/lock.jpg';
import logo from '@/assets/images/app-logo.jpg';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useAuthStore } from "@/app/stores/auth";

export default function SignIn() {
    const [signInForm, setSignInForm] = useState<{
        email: string,
        password: string,
    }>({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const store = useAuthStore()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setButtonDisabled(true)
        setIsLoading(true)
        console.log(signInForm)
        await axios.post('/api/auth', signInForm)
        .then(response => {
            const user = response.data?.user
            store.getUser({
                id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                extension: user.extension,
                email: user.email,
                role: user.role,
                position: user.position,
            })
            router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
        .finally(()=>{
            setButtonDisabled(false)
            setIsLoading(false)
        })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSignInForm((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <div className="w-full min-h-screen flex justify-center items-center">
            {
                isLoading &&
                <div className="w-full min-h-screen fixed flex justify-center items-center bg-black/80">
                    <p className="text-white text-xl font-bold animate-pulse">Loading...</p>
                </div>
            }
            <section className="w-full md:w-4/5">
                <header className="mb-16 text-white text-center">
                    <h1 className="text-2xl font-bold">GUBAT TRANSPORT COOPERATIVE</h1>
                </header>
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:px-5">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center p-5 md:p-0">
                        <div className="overflow-hidden rounded-full w-auto">
                            <Image src={logo} alt="logo" priority={true} width={300} height={300} />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 justify-center items-center flex">
                        <div className="w-full max-w-96 space-y-4 px-5 md:px-0">
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="email" className="">
                                    <Image src={person} alt="person-icon" width={20} height={20} />
                                </label>
                                <input onChange={handleOnChange} type="email" name="email" id="email" className="w-full px-2 outline-none border-l border-black" />
                            </div>
                            <div className="group w-full flex justify-center items-center bg-white p-2 rounded ring-2 focus-within:ring ring-black gap-2">
                                <label htmlFor="password" className="">
                                    <Image src={lock} alt="lock-icon" width={20} height={20} />
                                </label>
                                <input onChange={handleOnChange} type="password" name="password" id="password" className="w-full px-2 outline-none border-l border-black" />
                            </div>
                            <button type="submit" disabled={buttonDisabled} className="p-2 w-full rounded bg-yellow-600 hover:bg-yellow-500 text-white font-bold">
                                LOG IN
                            </button>
                            <p className="text-center text-white"><Link className="font-bold hover:text-blue-400" href={'/auth/forgot-password'}>Forgot Password?</Link></p>
                            <p className="text-center text-xs text-white">No account yet? <Link href={'/auth/sign-up'} className="font-bold hover:text-blue-400">sign up</Link></p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}