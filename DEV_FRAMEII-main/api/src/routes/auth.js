import { Router } from "express";
import { register, login } from "../controllers/auth.js";

const r = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Rotas de autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 */
r.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login e obtenção de token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT retornado
 */
r.post("/login", login);

export default r;
