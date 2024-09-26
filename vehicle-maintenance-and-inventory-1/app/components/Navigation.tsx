'use client'

import { FaRegBell } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import personImg from "@/assets/images/person-icon.jpg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth";

interface User {
    _id: string;
    first_name: string,
    middle_name: string,
    last_name: string;
    extension: string;
    email: string;
}

interface Notification {
    _id: string,
    user: User;
    message: string;
    status: string;
    createdAt: Date;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
}

export default function Navigation() {
    const router = useRouter()
    const store = useAuthStore()
    const [profileModal, setProfileModal] = useState<boolean>(false)
    const [notificationModal, setNotificationModal] = useState<boolean>(false)
    const [unreadCount, setUnreadCount] = useState<number>(0)
    const [notifications, setNotifications] = useState<NotificationState>({
        notifications: [],
        loading: true
    })
    // const [userData, setUserData] = useState<User>({
    //     _id: '',
    //     first_name: '',
    //     middle_name: '',
    //     last_name: '',
    //     extension: '',
    //     email: '',
    // })

    const logout = async () => {
        await axios.get('/api/auth')
        .then(() => {
            store.removeUser()
            router.push('/auth/sign-in')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getNotifications = async () => {
        const user = store.user
        await axios.get(`/api/notifications?userId=${user.id}`)
        .then(response => {
            const notification = response.data?.notifications
            setNotifications({
                notifications: notification,
                loading: false
            })
            const count = notification.filter((data: Notification) => data?.status === 'unread').length
            setUnreadCount(count)
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const deleteNotification = async (id: string) => {
        await axios.delete(`/api/notifications?notificationId=${id}`)
        .then(response=>{
            const notification = response.data?.notifications
            setNotifications({
                notifications: notification,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    function capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(()=>{
        getNotifications()
    }, [store.user])

    return (
        <div className="w-full fixed flex justify-between items-center top-0 border-b border-cyan-400 text-white p-5 z-10 bg-img">
            <p className="text-lg md:text-2xl font-bold">GUBAT TRANSPORT COOPERATIVE</p>
            <div className="flex justify-center items-center gap-5 md:gap-10">
                <div className="relative">
                    <button onClick={()=>setNotificationModal(!notificationModal)} className="flex flex-col justify-center items-center">
                        <div className="rounded-full ring ring-cyan-400 p-2 relative">
                            {
                                unreadCount > 0 &&
                                <div className="rounded-full w-5 h-5 absolute block top-[-3px] right-[-3px] border border-cyan-400 flex justify-center items-center bg-blue-950">
                                    <p className="text-xs text-cyan-400">{unreadCount}</p>
                                </div>
                            }
                            <FaRegBell className="text-cyan-400 w-5 h-5 md:w-10 md:h-10" />
                        </div>
                        <p className="text-center text-sm">Notifications</p>
                    </button>
                    {
                        notificationModal &&
                        <div className="absolute w-96 h-96 overflow-y-auto border-blue-400 border p-5 rounded bg-white text-black right-0">
                            {
                                notifications.notifications.length > 0 &&
                                notifications.notifications.map((item,index)=>{
                                    return(
                                        <div className="mb-5 flex justify-center items-center" key={index}>
                                            <div className="border-b border-black w-full">
                                                <p className="text-center">{item.message}</p>
                                                <p className="text-xs font-bold">{new Date(item.createdAt).toLocaleTimeString('en-US')} {new Date(item.createdAt).toLocaleDateString('en-US')}</p>
                                            </div>
                                            <button type="button" onClick={()=>deleteNotification(item._id)} className="">
                                                <FaTrash className="text-black hover:text-red-400" />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                <div className="relative">
                    <button onClick={()=>setProfileModal(!profileModal)} className="flex flex-col justify-center items-center">
                        <div className="rounded-full overflow-hidden w-[40px] h-[40px] md:w-[58px] md:h-[58px] relative flex justify-center items-center">
                            <Image src={personImg} alt="person" width={100} height={100} className="scale-150 absolute"/>
                        </div>
                        <p className="text-center text-sm">{ capitalize(store.user.position) }</p>
                    </button>
                    <div className={`absolute w-96 p-5 rounded bg-white right-0 ${profileModal ? '' : 'hidden'}`}>
                        <button onClick={logout} className="w-full p-2 rounded bg-blue-400 hover:bg-blue-600 text-xs text-white font-bold">logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}