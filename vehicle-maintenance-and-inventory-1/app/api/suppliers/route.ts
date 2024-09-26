import connect from "@/lib/db";
import { NextResponse } from "next/server";
import Supplier from "@/lib/modals/suppliers";
import { Types } from "mongoose";

export const GET = async () => {
    try {
        await connect();
        const suppliers = await Supplier.find();
        return new NextResponse(JSON.stringify({message: 'OK', suppliers: suppliers}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('ERROR: ' + message, {status:500});
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const supplier = new Supplier(body);
        supplier.save();
        if (!supplier) {
            return new NextResponse(JSON.stringify({message: 'Failed to create supplier'}), {status: 400});
        }
        return new NextResponse(JSON.stringify({message: 'New supplier created'}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('ERROR: ' + message, {status:500});
    }
}

export const PATCH = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const supplierId = searchParams.get('supplierId');
        const body = await request.json();

        if (!supplierId) {
            return new NextResponse(JSON.stringify({message: 'Supplier id not found'}), {status: 400});
        }
        if (!Types.ObjectId.isValid(supplierId)) {
            return new NextResponse(JSON.stringify({message: 'Supplier id is invalid'}), {status: 400});
        }

        await connect();
        const updateSupplier = await Supplier.findOneAndUpdate(
            { _id: new Types.ObjectId(supplierId) },
            body,
            { new: true }
        );

        if (!updateSupplier) {
            return new NextResponse(JSON.stringify({message: 'Failed to update supplier'}), {status: 400});
        }

        return new NextResponse(JSON.stringify({message: 'Supplier updated'}), {status: 200});
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
        const supplierId = searchParams.get('supplierId');

        if (!supplierId) {
            return new NextResponse(JSON.stringify({message: 'Supplier id not found'}), {status: 400});
        }
        if (!Types.ObjectId.isValid(supplierId)) {
            return new NextResponse(JSON.stringify({message: 'Supplier id is invalid'}), {status: 400});
        }

        await connect();
        const deleteSupplier = await Supplier.findByIdAndDelete(new Types.ObjectId(supplierId));
        if (!deleteSupplier) {
            return new NextResponse(JSON.stringify({message: 'Failed to delete supplier'}), {status: 400});
        }

        return new NextResponse(JSON.stringify({message: 'Supplier deleted'}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('ERROR: ' + message, {status:500});
    }
}