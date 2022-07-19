import express from "express";
import taskSchema from "../models/task.schema.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    const task = taskSchema(req.body);
    const save = await task.save()

    console.log(save)

    res.redirect("/");
})

export default router;