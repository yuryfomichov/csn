import { app } from "./app";
const start = async () => {
  app.listen(8088, () => {
    console.log("Listening on port 8088!!!!");
  });
};

start();
