import { StatusCodes as httpStatus } from "http-status-codes";
import { APIError } from "./common/APIError";
// import app route
import { accountRoutes } from "./modules/account";
import { tagRoutes } from "./modules/tag";
import { courseRoutes } from "./modules/course";
import { authRoutes } from "./modules/auth";
import { categoryRoutes } from "./modules/category";
import { isAuth } from "./middlewares/auth.middleware";
import config from "./config";
import { moduleRoutes } from "./modules/module";

export default function routes(app) {
  // all app routes
  app.use("/auth", authRoutes);
  app.use("/account", isAuth, accountRoutes);
  app.use("/category", isAuth, categoryRoutes);
  app.use("/tag", isAuth, tagRoutes);
  app.use("/course", isAuth, courseRoutes);
  app.use("/module", isAuth, moduleRoutes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new APIError("API not found", httpStatus.NOT_FOUND);
    return next(err);
  });

  // error handler, send stacktrace only during development
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.isPublic ? err.message : httpStatus[err.status],
      stack: config.env === "development" ? err.stack : {},
    });
  });
}
