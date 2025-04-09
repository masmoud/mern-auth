import { RequestHandler, Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register as unknown as RequestHandler);
router.post("/login", login as unknown as RequestHandler);
router.post("/logout", logout as unknown as RequestHandler);
router.post("/refresh-token", refreshToken as unknown as RequestHandler);
export default router;
