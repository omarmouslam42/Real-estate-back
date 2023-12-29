import express from "express"
import initApp from "./src/index.router.js";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app= express();
const port= process.env.PORT || 5000

app.use(cors())

initApp(app,express)
app.listen(port,()=>{console.log(`Project is listening on ${port}`);})