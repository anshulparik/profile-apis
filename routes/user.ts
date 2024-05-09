import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user";
import { verifyToken } from "../middlewares/verifyToken";

export const router = Router();

router.route("/").get(verifyToken, getAllUsers);
router
  .route("/:id")
  .get(verifyToken, getUser)
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);
