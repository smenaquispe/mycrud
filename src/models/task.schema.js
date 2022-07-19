import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }, 

    date: {
        type: Date
    }

})

export default mongoose.model("Task",taskSchema);