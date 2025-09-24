import express from "express";
import { router } from "./route.js";
import cors from 'cors';
import { accountrouter } from "./accountRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.use("/api/v1/account", accountrouter);
app.listen(3000);
//# sourceMappingURL=index.js.map