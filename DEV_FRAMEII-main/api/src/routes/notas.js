import { Router } from "express";
import {
  createNota,
  listNotas,
  getNota,
  updateNota,
  deleteNota,
} from "../controllers/notas.js";

const r = Router();

/**
 * @swagger
 * tags:
 *   - name: Notas
 *     description: Lançamentos de notas
 */

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Lançar nota
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [valor, alunoId, avaliacaoId]
 *             properties:
 *               valor: { type: number, example: 8.5 }
 *               alunoId: { type: integer, example: 1 }
 *               avaliacaoId: { type: integer, example: 1 }
 *     responses:
 *       201: { description: Criado }
 *   get:
 *     summary: Listar notas
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */
r.post("/", createNota);
r.get("/", listNotas);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Buscar nota por ID
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrada }
 *   put:
 *     summary: Atualizar valor da nota
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor: { type: number, example: 9.0 }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrada }
 *   delete:
 *     summary: Remover nota
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
r.get("/:id", getNota);
r.put("/:id", updateNota);
r.delete("/:id", deleteNota);

export default r;

