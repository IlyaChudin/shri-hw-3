import path from "path";
import express, { NextFunction, Response, Request } from "express";
import routes from "./routes";
import config from "./config";
import updater from "./updater";

updater.init();

const app = express();
const buildPath = path.resolve(__dirname, "../../client/build");
const indexHtml = path.join(buildPath, "index.html");

app.use(express.static(buildPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.get("*", (req, res) => res.sendFile(indexHtml));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  if (err.response && err.response.status === 400) {
    res.status(400);
    const error = {
      error: {
        message: err.response.data.title,
        data: { errors: err.response.data.errors }
      }
    };
    console.error(error);
    res.json(error);
  }
  console.error(err.message);
  console.error(err.stack);
  if (!res.headersSent) {
    res.json({
      error: {
        message: err.message
      }
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}!`);
});
