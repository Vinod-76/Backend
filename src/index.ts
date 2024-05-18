import { User } from "./entity/User";
import express = require("express");
import userRouter from "./routes/userRouter";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());
const PORT = 3006;

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("Inserting a new user into the database...");
    })
    .catch((error) => console.log(error));
});
