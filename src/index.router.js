import connectDB from "../DB/connection.js"
import { globalErrorHandling } from "./utlis/errorHandling.js"
import auhtRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import listingRouter from "./modules/listing/listing.router.js"

const initApp=(app,express)=>{
app.use(express.json())
app.get("/",(req,res,next)=>{
    return res.json({message:"Welcome to RaleEstate Company"})
})

app.use("/api/auth",auhtRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)

app.all('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})

app.use(globalErrorHandling)
connectDB()
}

export default initApp