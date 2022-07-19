import express from "express";
import mongoose from "mongoose";
import {engine} from "express-handlebars";
import path from "path";
import {fileURLToPath} from 'url'
import morgan from "morgan";
import { config } from "dotenv";

// importing routes
import indexRoutes from "./routes/index.routes.js"
import taskRoutes from "./routes/task.routes.js";

config();

const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(morgan('dev'))
// set the directory of views

// get the direction of the directory views
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
app.set('views',path.join(__dirname,"views")) 
// set that this app read .hbs files
app.set('view engine','.hbs');
app.engine(
    '.hbs',
    engine(
        {
            layoutsDir: path.join(app.get('views'),'layouts'),
            defaultLayout: 'header',
            extname: '.hbs'
        }
    )
)

// routes
app.use(indexRoutes);
app.use("/tasks",taskRoutes);


// conect to mongodb database
mongoose.connect(process.env.MONGODB_URI)
.then(res => console.log("connected to mongodb"))
.catch(err => console.error("Error: " + err));

// run the app in the port
app.listen(port,() => {
    console.log("listening on port " + port);
})

