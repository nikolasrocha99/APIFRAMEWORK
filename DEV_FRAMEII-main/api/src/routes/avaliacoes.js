import { Router } from "express";
import {
  createAvaliacao,
  listAvaliacoes,
  getAvaliacao,
  updateAvaliacao,
  deleteAvaliacao,
} from "../controllers/avaliacoes.js";

const r = Router();

/**
 * @swagger
 * tags:
 *   - name: Avaliacoes
 *     description: CRUD de avaliações (provas, trabalhos)
 */

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Criar avaliação
 *     tags: [Avaliacoes]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo]
 *             properties:
 *               titulo: { type: string, example: "Prova 1" }
 *               peso: { type: number, example: 2 }
 *               data: { type: string, format: date, example: "2025-11-02" }
 *     responses:
 *       201: { description: Criado }
 *   get:
 *     summary: Listar avaliações
 *     tags: [Avaliacoes]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */
r.post("/", createAvaliacao);
r.get("/", listAvaliacoes);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   get:
 *     summary: Buscar avaliação por ID
 *     tags: [Avaliacoes]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrado }
 *   put:
 *     summary: Atualizar avaliação
 *     tags: [Avaliacoes]
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
 *               titulo: { type: string }
 *               peso: { type: number }
 *               data: { type: string, format: date }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrado }
 *   delete:
 *     summary: Remover avaliação
 *     tags: [Avaliacoes]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
r.get("/:id", getAvaliacao);
r.put("/:id", updateAvaliacao);
r.delete("/:id", deleteAvaliacao);

export default r;

