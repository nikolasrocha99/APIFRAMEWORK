import { Nota } from "../models/index.js";
export async function createNota(req,res){ const {valor,alunoId,avaliacaoId}=req.body; if(valor==null||alunoId==null||avaliacaoId==null) return res.status(400).json({error:"valor, alunoId e avaliacaoId são obrigatórios"}); const n=await Nota.create({valor,alunoId,avaliacaoId}); res.status(201).json(n); }
export async function listNotas(req,res){ res.json(await Nota.findAll()); }
export async function getNota(req,res){ const n=await Nota.findByPk(req.params.id); if(!n) return res.status(404).json({error:"Nota não encontrada"}); res.json(n); }
export async function updateNota(req,res){ const n=await Nota.findByPk(req.params.id); if(!n) return res.status(404).json({error:"Nota não encontrada"}); n.valor=req.body.valor??n.valor; await n.save(); res.json(n); }
export async function deleteNota(req,res){ const c=await Nota.destroy({where:{id:req.params.id}}); res.json({deleted:c}); }
