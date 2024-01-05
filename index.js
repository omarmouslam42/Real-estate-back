import express from "express"
import initApp from "./src/index.router.js";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })
const app = express();
const port = process.env.PORT || 5000

app.use(cors())

initApp(app, express)
app.listen(port, () => { console.log(`Project is listening on ${port}`); })