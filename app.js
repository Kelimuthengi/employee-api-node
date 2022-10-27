const express = require("express");
const connectDb = require("./db/connect");
const employeerouter = require("./router/employee")
const notfound = require("./error/notfound")
const protect  = require("./auth")
const userrouter = require('./router/user')
const controllererror = require("./error/routeserror")
const cors = require("cors")
require("dotenv").config();


// securities;
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express()

app.use(cors())

// middle wares
app.use(express.json());

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs:15 * 60 * 1000,
  max:100
}))

app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send('our jobs api is deployed!')
})

app.use('/userapi/v1', userrouter)
app.use("/employeeapi/v1",protect, employeerouter);
app.use(notfound);
app.use(controllererror)

const PORT = process.env.PORT || 9191;

// creates database connection;
const start = async () => {

    try {
          await connectDb(process.env.MONGO_URI);
          app.listen(PORT, () =>
            console.log(`server is running at port ${PORT}`)
          );
    } catch (error) {
        console.log(error.message);
    }
  
}
start()
