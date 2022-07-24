import dateFormat from "dateformat"
import taskSchema from "../models/task.schema.js";


export const renderTask = async (req,res) => {
    const list = await taskSchema.find().lean();
    list.forEach(el => {
        const date = new Date(el.date);
        date.setDate(date.getDate() + 1);
        el.date = dateFormat(date,"dd-mm-yyyy");
    });
    res.render("../views/index.hbs",{list})
}

export const createTask = async (req, res) => {
    try {
        const task = taskSchema(req.body);    
        const saved = await task.save();
        console.log(saved);
    } catch (error) {
        console.log(error)
    }
    res.redirect("/");
}

export const renderTasktoEdit = async (req,res) => {
    const {id} = req.params;
    const task = await taskSchema.findById(id).lean()

    const date = new Date(task.date);
    date.setDate(date.getDate() + 1);

    task.date = dateFormat(date,"yyyy-mm-dd");

    res.render("../views/edit.hbs", {task});
}

export const editTask = async (req, res) => {
    const {id} = req.params;
    await taskSchema.findByIdAndUpdate(id,req.body)
    res.redirect("/");
}

export const toggleDone = async (req, res) => {
    const {id} = req.params;
    const task = await taskSchema.findById(id);
    task.done = !task.done;
    await task.save()
    res.redirect("/")
}

export const deleteTask = async (req,res) => {
    const {id} = req.params;
    await taskSchema.remove({_id:id})
    res.redirect("/")
}