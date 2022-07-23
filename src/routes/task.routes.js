import express from "express";
import taskSchema from "../models/task.schema.js";
import dateFormat from "dateformat";

const router = express.Router();

// post new task
router.post("/tasks/add", async (req, res) => {
    const task = taskSchema(req.body);    
    const saved = await task.save();
    console.log(saved);
    res.redirect("/");
})

// get list of tasks
router.get("/", async (req,res) => {
    const list = await taskSchema.find().lean();
    list.forEach(el => el.date = dateFormat(el.date,"dd-mm-yyyy"))
    res.render("../views/index.hbs",{list})
})

// update
router.get("/tasks/edit/:id", async (req,res) => {
    const {id} = req.params;
    const task = await taskSchema.findById(id).lean()
    task.date = dateFormat(task.date,"yyyy-mm-dd");
    console.log(task)

    res.render("../views/edit.hbs", {task});
})

router.post("/tasks/edit/:id", async (req, res) => {
    const {id} = req.params;
    await taskSchema.findByIdAndUpdate(id,req.body)
    res.redirect("/");
})

// delete
router.get("/tasks/delete/:id", async (req,res) => {
    const {id} = req.params;
    await taskSchema.remove({_id:id})
    res.redirect("/")
})

export default router;