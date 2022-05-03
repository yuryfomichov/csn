import { app } from "./app";
import { getCompanyService } from "./container";
const start = async () => {
  app.listen(8088, () => {
    console.log("Listening on port 8088!!!!");
    getCompanyService().generate_db();
  });
};

start();
