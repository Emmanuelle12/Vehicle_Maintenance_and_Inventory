import DashboardButton from "@/app/components/DashboardButton";
import Header from "@/app/components/Header";
import Image from "next/image";
import driverImg from "@/assets/images/driver-icon.jpg";
import mechanicImg from "@/assets/images/mechanic-icon.jpg";

export default function Maintenance() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Header title="VEHICLE MAINTENANCE" backTo={'/'} />
            <section className="w-96 md:w-[400px] p-10 flex flex-wrap justify-center items-center gap-4">
                <DashboardButton path="/admin/reports" title="Drivers Reports">
                    <Image src={driverImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
                </DashboardButton>
                <DashboardButton path="/admin/inventory" title="Mechanics Reports">
                    <Image src={mechanicImg} alt="bus" width={100} height={100} className="scale-100 absolute" />
                </DashboardButton>
            </section>
        </div>
    )
}