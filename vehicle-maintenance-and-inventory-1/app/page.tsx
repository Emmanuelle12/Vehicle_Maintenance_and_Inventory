'use client'

import Image from "next/image";
import { useAuthStore } from "./stores/auth";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import DashboardButton from "./components/DashboardButton";
import driverImg from "@/assets/images/driver-icon.jpg";
import vehicleImg from "@/assets/images/maintenance-icon.jpg";
import inventoryImg from "@/assets/images/inventory-icon.jpg";
import Header from "./components/Header";
import purchaseImg from "@/assets/images/purchase-icon.jpg";
import supplierImg from "@/assets/images/supplier-icon.jpg";

export default function Home() {
  const [userData, setUserData] = useState<{
    first_name: string,
    middle_name: string,
    last_name: string,
    extension: string,
    email: string,
    role: string,
    position: string
  }>({
    first_name: '',
    middle_name: '',
    last_name: '',
    extension: '',
    email: '',
    role: '',
    position: ''
  })
  const store = useAuthStore()

  const setUser = () => {
    const user = store.user
    setUserData({
      first_name: user?.first_name,
      middle_name: user?.middle_name,
      last_name: user?.last_name,
      extension: user?.extension,
      email: user?.email,
      role: user?.role,
      position: user?.position
    })
  }

  useEffect(()=>{
    setUser()
  }, [store.user])

  return (
    <div className="w-full min-h-screen">
      <Navigation />
      <main className="w-full min-h-screen pt-20 flex flex-col justify-center items-center relative">
        <div className="absolute top-28 left-0">
          
      <Header title="DASHBOARD" />
        </div>
        <section className={`w-96 p-10 flex flex-wrap gap-2 ${userData.position == 'driver' ? '' : 'hidden'}`}>
           <DashboardButton path="/driver/report" title="Report Bus Issues">
            <Image src={driverImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
           </DashboardButton>
        </section>
        <section className={`w-96 md:w-[400px] p-10 flex flex-wrap justify-center items-center gap-10 md:mt-12 ${userData.position == 'admin' ? '' : 'hidden'}`}>
           <DashboardButton path="/admin/maintenance" title="Vehicle Maintenance">
            <Image src={vehicleImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
           </DashboardButton>
           <DashboardButton path="/admin/inventory" title="Purchase Orders">
            <Image src={inventoryImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
           </DashboardButton>
           <DashboardButton path="/admin/inventory" title="Inventory">
            <Image src={purchaseImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
           </DashboardButton>
           <DashboardButton path="/admin/suppliers" title="Suppliers">
            <Image src={supplierImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
           </DashboardButton>
        </section>
      </main>
    </div>
  );
}
