import { Schema, model, models } from "mongoose";

const driverReportSchema = new Schema(
    {
        report_date: {
            type: Date,
            required: true,
        },
        bus_number: {
            type: String,
            required: true,
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        conductor: {
            type: String,
            required: true,
        },
        report: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const DriverReport = models.DriverReport || model('DriverReport', driverReportSchema);

export default DriverReport;