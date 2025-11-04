import { Avaliacao } from "../models/index.js";
export async function createAvaliacao(req,res){ const {titulo,peso=1,data=null}=req.body; if(!titulo) return res.status(400).json({error:"titulo é obrigatório"}); const av=await Avaliacao.create({titulo,peso,data}); res.status(201).json(av); }
export async function listAvaliacoes(req,res){ res.json(await Avaliacao.findAll()); }
export async function getAvaliacao(req,res){ const av=await Avaliacao.findByPk(req.params.id); if(!av) return res.status(404).json({error:"Avaliação não encontrada"}); res.json(av); }
export async function updateAvaliacao(req,res){ const av=await Avaliacao.findByPk(req.params.id); if(!av) return res.status(404).json({error:"Avaliação não encontrada"}); av.titulo=req.body.titulo??av.titulo; av.peso=req.body.peso??av.peso; av.data=req.body.data??av.data; await av.save(); res.json(av); }
export async function deleteAvaliacao(req,res){ const c=await Avaliacao.destroy({where:{id:req.params.id}}); res.json({deleted:c}); }
