import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('connected to MONGODB');
        return;
    }

    if (connectionState === 2) {
        console.log('connecting...');
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'vehicle-maintenance-and-inventory',
            bufferCommands: true,
        })
        console.log('connected');
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        console.log('ERROR: ', message);
    }
}

export default connect;