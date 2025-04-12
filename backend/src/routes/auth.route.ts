import { RequestHandler, Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", authController.register as unknown as RequestHandler);
router.post("/login", authController.login as unknown as RequestHandler);
router.post("/logout", authController.logout as unknown as RequestHandler);
router.post("/refresh-token", authController.refreshToken as unknown as RequestHandler);
router.get("/protected-route", authController.protectedRoute as unknown as RequestHandler);

export default router;
