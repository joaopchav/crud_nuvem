import express from "express";
import { addUser, deleteUser, getUsers, updateUser, searchUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.get('/users', searchUsers);  // Alterar a rota de busca conforme necessário


export default router