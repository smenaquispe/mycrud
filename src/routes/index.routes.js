import express from "express";

const router = express.Router();

router.get("/", async (req,res) => {
    res.render("../views/index.hbs")
})

router.get("/about",(req,res) => {
    res.render("../views/about.hbs")
})


export default router;