import { Sequelize, DataTypes } from "sequelize";

const {
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_USER = "postgres",
  DB_PASS = "postgres",
  DB_NAME = "escola",
  NODE_ENV = "development",
} = process.env;

export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: NODE_ENV === "development" ? console.log : false,
});

export const User = sequelize.define("User", { id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}, name:{type:DataTypes.STRING,allowNull:false}, email:{type:DataTypes.STRING,unique:true,allowNull:false}, passwordHash:{type:DataTypes.STRING,allowNull:false} });
export const Aluno = sequelize.define("Aluno", { id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}, nome:{type:DataTypes.STRING,allowNull:false} });
export const Avaliacao = sequelize.define("Avaliacao", { id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}, titulo:{type:DataTypes.STRING,allowNull:false}, peso:{type:DataTypes.FLOAT,allowNull:false,defaultValue:1.0}, data:{type:DataTypes.DATEONLY,allowNull:true} });
export const Nota = sequelize.define("Nota", { id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true}, valor:{type:DataTypes.FLOAT,allowNull:false} });

Aluno.hasMany(Nota,{foreignKey:"alunoId",onDelete:"CASCADE"}); Nota.belongsTo(Aluno,{foreignKey:"alunoId"});
Avaliacao.hasMany(Nota,{foreignKey:"avaliacaoId",onDelete:"CASCADE"}); Nota.belongsTo(Avaliacao,{foreignKey:"avaliacaoId"});

export async function ensureDb(){
  const max=20; const w=(ms)=>new Promise(r=>setTimeout(r,ms));
  for(let i=1;i<=max;i++){
    try{ await sequelize.authenticate(); await sequelize.sync(); return; }
    catch(e){ console.log(`[DB] tentativa ${i}/${max} falhou: ${e.message}`); await w(1500); }
  }
  throw new Error("Não foi possível conectar ao banco após várias tentativas.");
}
