import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { GetUserController } from "../../../../modules/accounts/useCases/getUser/GetUserController";
const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const getUser = new GetUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/getUser/:id", getUser.handle);
export { usersRoutes };