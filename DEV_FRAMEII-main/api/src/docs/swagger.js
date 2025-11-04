import swaggerJSDoc from "swagger-jsdoc"; import swaggerUi from "swagger-ui-express";
const options={ definition:{ openapi:"3.0.0", info:{ title:"API - Módulo de Avaliações e Notas", version:"1.0.0" }, components:{ securitySchemes:{ bearerAuth:{ type:"http", scheme:"bearer", bearerFormat:"JWT" } } }, security:[{bearerAuth:[]} ] }, apis:["./src/routes/*.js"] };
export function setupSwagger(app){ const spec=swaggerJSDoc(options); app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec)); }
