import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getById,
  register,
  hasSignedCurrentTerm,
  signCurrentTerm,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/user/getUsers", isAuthenticated, getAllUsers);
  router.get("/user/getUserById/:id", isAuthenticated, getById);
  router.get(
    "/user/hasSignedCurrentTerm/:id",
    isAuthenticated,
    hasSignedCurrentTerm
  );
  router.post("/user/register", register);
  router.delete("/user/deleteUser/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/user/updateUser/:id", isAuthenticated, updateUser);
  router.post("/user/signCurrentTerm/:id", isAuthenticated, signCurrentTerm);
};
