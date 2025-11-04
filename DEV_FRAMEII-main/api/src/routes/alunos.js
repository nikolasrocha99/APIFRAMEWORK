import { Router } from "express";
import { createAluno, listAlunos, getAluno, updateAluno, deleteAluno, mediasDoAluno } from "../controllers/alunos.js";

const r = Router();

/**
 * @swagger
 * tags:
 *   - name: Alunos
 *     description: CRUD de alunos
 */

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Criar aluno
 *     tags: [Alunos]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome: { type: string, example: "João" }
 *     responses:
 *       201: { description: Aluno criado }
 *   get:
 *     summary: Listar alunos
 *     tags: [Alunos]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: OK }
 */
r.post("/", createAluno);
r.get("/", listAlunos);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Buscar aluno por ID
 *     tags: [Alunos]
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
 *     summary: Atualizar aluno
 *     tags: [Alunos]
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
 *               nome: { type: string, example: "Maria" }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrado }
 *   delete:
 *     summary: Remover aluno
 *     tags: [Alunos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 */
r.get("/:id", getAluno);
r.put("/:id", updateAluno);
r.delete("/:id", deleteAluno);

/**
 * @swagger
 * /alunos/{id}/medias:
 *   get:
 *     summary: Média ponderada do aluno
 *     tags: [Alunos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Não encontrado }
 */
r.get("/:id/medias", mediasDoAluno);

export default r;

