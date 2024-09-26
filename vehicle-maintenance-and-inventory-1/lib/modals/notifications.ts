import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'unread',
        }
    },
    {
        timestamps: true,
    }
)

const Notification = models.Notification || model('Notification', notificationSchema);

export default Notification;