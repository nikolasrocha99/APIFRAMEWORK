import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import authRoutes from "./auth.js";
import alunosRoutes from "./alunos.js";
import avaliacoesRoutes from "./avaliacoes.js";
import notasRoutes from "./notas.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/alunos", requireAuth, alunosRoutes);
router.use("/avaliacoes", requireAuth, avaliacoesRoutes);
router.use("/notas", requireAuth, notasRoutes);
export default router;
