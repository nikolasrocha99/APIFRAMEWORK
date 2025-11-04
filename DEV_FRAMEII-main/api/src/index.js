import "dotenv/config"; import express from "express"; import cors from "cors"; import routes from "./routes/index.js"; import { ensureDb } from "./models/index.js"; import { setupSwagger } from "./docs/swagger.js";
const app=express(); app.use(cors()); app.use(express.json());
app.get("/",(req,res)=>res.json({ok:true,name:"TC Framework2 API"}));
app.use("/",routes); setupSwagger(app);
const port=process.env.PORT||3000;
ensureDb().then(()=>{ app.listen(port,()=>console.log(`API on http://localhost:${port}`)); }).catch(err=>{ console.error("DB error:",err); process.exit(1); });
