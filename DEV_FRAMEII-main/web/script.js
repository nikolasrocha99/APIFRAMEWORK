// ---------- CONFIGURAÇÃO BASE ----------
function apiBase() {
  return document.getElementById("api_base").value || "http://localhost:3000";
}

function getToken() {
  return document.getElementById("token").value;
}

function setToken(t) {
  document.getElementById("token").value = t;
  document.getElementById("token_show").textContent = t ? "Bearer " + t : "(nenhum)";
}

// ---------- UTILIDADES ----------
async function api(path, method = "GET", body = null, auth = true) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) headers["Authorization"] = "Bearer " + getToken();
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(apiBase() + path, opts);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function showMsg(id, msg, ok = true) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<span class="${ok ? "ok" : "err"}">${msg}</span>`;
}

// ---------- AUTENTICAÇÃO ----------
async function register() {
  const name = reg_name.value;
  const email = reg_email.value;
  const password = reg_pass.value;
  if (!name || !email || !password) return showMsg("reg_msg", "Preencha todos os campos", false);

  const r = await api("/auth/register", "POST", { name, email, password }, false);
  if (r.error) return showMsg("reg_msg", r.error, false);
  showMsg("reg_msg", "Usuário criado com sucesso!");
}

async function login() {
  const email = login_email.value;
  const password = login_pass.value;
  const r = await api("/auth/login", "POST", { email, password }, false);
  if (r.error) return showMsg("login_msg", r.error, false);
  setToken(r.token);
  showMsg("login_msg", "Login realizado com sucesso!");
}

// ---------- ALUNOS ----------
async function createAluno() {
  const nome = aluno_nome.value;
  if (!nome) return showMsg("aluno_msg", "Informe o nome", false);
  const r = await api("/alunos", "POST", { nome });
  if (r.error) return showMsg("aluno_msg", r.error, false);
  showMsg("aluno_msg", `Aluno criado (id ${r.id})`);
}

async function listAlunos() {
  const data = await api("/alunos");
  list_alunos.textContent = JSON.stringify(data, null, 2);
}

// ---------- AVALIAÇÕES ----------
async function createAvaliacao() {
  const titulo = av_titulo.value;
  const peso = parseFloat(av_peso.value || "1");
  const data = av_data.value || null;
  if (!titulo) return showMsg("av_msg", "Informe o título", false);
  const r = await api("/avaliacoes", "POST", { titulo, peso, data });
  if (r.error) return showMsg("av_msg", r.error, false);
  showMsg("av_msg", `Avaliação criada (id ${r.id})`);
}

async function listAvaliacoes() {
  const data = await api("/avaliacoes");
  list_avs.textContent = JSON.stringify(data, null, 2);
}

// ---------- NOTAS ----------
async function createNota() {
  const valor = parseFloat(nota_valor.value);
  const alunoId = parseInt(nota_aluno.value);
  const avaliacaoId = parseInt(nota_av.value);
  if (isNaN(valor) || !alunoId || !avaliacaoId) {
    return showMsg("nota_msg", "Preencha todos os campos corretamente", false);
  }
  const r = await api("/notas", "POST", { valor, alunoId, avaliacaoId });
  if (r.error) return showMsg("nota_msg", r.error, false);
  showMsg("nota_msg", `Nota criada (id ${r.id})`);
}

// ---------- MÉDIA ----------
async function mediaAluno() {
  const id = parseInt(med_aluno.value);
  if (!id) return showMsg("med_out", "Informe o ID do aluno", false);
  const r = await api(`/alunos/${id}/medias`);
  med_out.textContent = JSON.stringify(r, null, 2);
}
