import connect from "@/lib/db";
import User from "@/lib/modals/users";
import Notification from "@/lib/modals/notifications";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return new NextResponse(JSON.stringify({message: 'User id not found'}), {status: 400});
        }
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'Invalid user id'}), {status: 400});
        }

        await connect();
        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse(JSON.stringify({message: 'User not found'}), {status: 400});
        }
        const notifications = await Notification.find({user: user._id}).select('-password').sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify({message: 'OK', notifications: notifications}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('ERROR: ' + message, {status:500});
    }
}

export const DELETE = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const notificationId = searchParams.get('notificationId');

        if (!notificationId) {
            return new NextResponse(JSON.stringify({message: 'Notification id not found'}), {status: 400});
        }
        if (!Types.ObjectId.isValid(notificationId)) {
            return new NextResponse(JSON.stringify({message: 'Invalid notification id'}), {status: 400});
        }

        await connect();
        const deleteNotification = await Notification.findByIdAndDelete(new Types.ObjectId(notificationId));

        if (!deleteNotification) {
            return new NextResponse(JSON.stringify({message: 'Failed to delete notification'}), {status: 400});
        }
        
        return new NextResponse(JSON.stringify({message: 'Notification deleted successfully'}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('ERROR: ' + message, {status:500});
    }
}