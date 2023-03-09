require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
app.use(fileUpload());
app.use(express.json());

const server = require("http").createServer(app);

const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const tagRouter = require("./router/tag");
const roleRouter = require("./router/role");
const permitRouter = require("./router/permit");
const postRouter = require("./router/post");
const commentRouter = require("./router/comment");

app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/tag", tagRouter);
app.use("/role", roleRouter);
app.use("/permit", permitRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({
    mes: "hello testing server",
  });
});

const defaultUser = async () => {
  let migration = require("./Migration/migration");
  //await migration.migrate();
  //await migration.backup();
  //await migration.sendRoleDB();
  //await migration.sendPermitDB();
  //await migration.addOwerRole();
  // await migration.addMangerRole();
  //await migration.addPermitOwer();
};
defaultUser();

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    message: err.message,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
