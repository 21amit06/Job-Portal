import express from "express";
import * as dotenv from "dotenv";

import userRoute from "./routes/user.route";
import companyRoute from "./routes/company.route";
import jobRoute from "./routes/job.route";
import applicationRoute from "./routes/application.route";
import interviewRoute from "./routes/interview.route";
import notificationRoute from "./routes/notification.route";
import adminRoute from "./routes/admin.route";
import cors from 'cors';
import dashboardRoute from "./routes/dashboard.route";
import aiRoute from "./routes/ai.route";
dotenv.config({
    path: "./env/dev.env"
});



const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use( "/api/users",userRoute);

app.use( "/api/companies",companyRoute);

app.use("/api/jobs",jobRoute);

app.use("/api/applications", applicationRoute);

app.use("/api/interviews",interviewRoute);

app.use("/api/notifications", notificationRoute);

app.use("/api/admin",adminRoute);

app.use("/api/dashboard",dashboardRoute);

app.use("/api/ai", aiRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Job Portal Backend is running"
    });

});


const PORT =Number(process.env.PORT) || 3000;

app.listen(
    PORT,
    () => {
        console.log(
            `Server is running on port ${PORT}`
        );

    }
);
//npx ts-node src/server.ts