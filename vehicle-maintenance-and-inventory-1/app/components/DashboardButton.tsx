import Link from "next/link";
import React, { ReactNode } from "react";

interface DashboardProps {
    path: string;
    title: string;
    children: ReactNode;
}

const DashboardButton: React.FC<DashboardProps> = ({ path, children, title }) => {
    return (
        <Link href={path} className="flex flex-col justify-center items-center">
            <div className="max-w-32">
                <div className="w-20 h-20 md:w-32 md:h-32 p-2 mb-1 rounded-lg relative overflow-hidden bg-white hover:ring ring-cyan-400 flex justify-center items-center">
                    {children}
                </div>
                <p className="text-white text-center text-[8px] md:text-xs font-bold">{title}</p>
            </div>
        </Link>
    )
}

export default DashboardButton