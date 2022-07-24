import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    }, 

    date: {
        type: Date,
        required: false
    },

    done : {
        type: Boolean,
        required: false,
        default: false
    }

})

export default mongoose.model("Task",taskSchema);