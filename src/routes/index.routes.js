import express from "express";

const router = express.Router();

router.get("/", async (req,res) => {
    res.render("../views/index.hbs")
})



export default router;