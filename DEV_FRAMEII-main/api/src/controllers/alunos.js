import { Aluno, Nota, Avaliacao } from "../models/index.js";
export async function createAluno(req,res){ const {nome}=req.body; if(!nome) return res.status(400).json({error:"nome é obrigatório"}); const a=await Aluno.create({nome}); res.status(201).json(a); }
export async function listAlunos(req,res){ res.json(await Aluno.findAll()); }
export async function getAluno(req,res){ const a=await Aluno.findByPk(req.params.id); if(!a) return res.status(404).json({error:"Aluno não encontrado"}); res.json(a); }
export async function updateAluno(req,res){ const a=await Aluno.findByPk(req.params.id); if(!a) return res.status(404).json({error:"Aluno não encontrado"}); a.nome=req.body.nome??a.nome; await a.save(); res.json(a); }
export async function deleteAluno(req,res){ const c=await Aluno.destroy({where:{id:req.params.id}}); res.json({deleted:c}); }
export async function mediasDoAluno(req,res){ const aluno=await Aluno.findByPk(req.params.id); if(!aluno) return res.status(404).json({error:"Aluno não encontrado"}); const notas=await Nota.findAll({where:{alunoId:aluno.id},include:[Avaliacao]}); const sp=notas.reduce((acc,n)=>acc+(n.Avaliacao?.peso??1),0); const spo=notas.reduce((acc,n)=>acc+n.valor*(n.Avaliacao?.peso??1),0); const media=sp>0?spo/sp:null; res.json({alunoId:aluno.id,nome:aluno.nome,media,qtdNotas:notas.length}); }
