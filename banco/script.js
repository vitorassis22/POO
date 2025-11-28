// ==================== CLASSES DO SISTEMA ====================

class Cliente {
  constructor(nome, cpf, senha) {
    this.nome = nome;
    this.cpf = cpf;
    this.senha = senha;
    this.conta = null;
  }
}

class Adm {
  constructor(login, senha) {
    this.login = login;
    this.senha = senha;
  }
}

class Conta {
  constructor(numero, agenciaNum, saldo = 0) {
    this.numero = numero;
    this.agenciaNum = agenciaNum;
    this.saldo = saldo;
    this.historico = []; // Array de objetos {tipo, valor, data, msg}
  }

  registrarHistorico(tipo, valor, msg) {
    const registro = {
      data: new Date().toLocaleString(),
      tipo: tipo,
      valor: valor,
      msg: msg,
    };
    this.historico.push(registro);
    return registro; // Retorna para uso no log global
  }

  depositar(valor) {
    if (valor <= 0) return { success: false, msg: "Valor inválido" };
    this.saldo += valor;
    this.registrarHistorico(
      "Depósito",
      valor,
      `Depósito de R$ ${valor.toFixed(2)}`
    );
    return { success: true };
  }

  sacar(valor) {
    if (valor <= 0) return { success: false, msg: "Valor inválido" };
    if (valor > this.saldo)
      return { success: false, msg: "Saldo insuficiente" };
    this.saldo -= valor;
    this.registrarHistorico("Saque", valor, `Saque de R$ ${valor.toFixed(2)}`);
    return { success: true };
  }

  transferir(valor, contaDestino) {
    if (valor <= 0) return { success: false, msg: "Valor inválido" };
    if (valor > this.saldo)
      return { success: false, msg: "Saldo insuficiente" };

    this.saldo -= valor;
    contaDestino.saldo += valor;

    this.registrarHistorico(
      "Transferência Enviada",
      valor,
      `Envio de R$ ${valor.toFixed(2)} para Conta ${contaDestino.numero}`
    );
    contaDestino.registrarHistorico(
      "Transferência Recebida",
      valor,
      `Recebimento de R$ ${valor.toFixed(2)} da Conta ${this.numero}`
    );

    return { success: true };
  }
}

class Agencia {
  constructor(numero) {
    this.numero = numero;
    this.clientes = [];
  }
  adicionarCliente(cliente, conta) {
    cliente.conta = conta;
    this.clientes.push(cliente);
  }
}

class Banco {
  constructor(nome) {
    this.nome = nome;
    this.agencias = [];
    this.admin = new Adm("admin", "admin"); // Admin padrão
  }
  adicionarAgencia(agencia) {
    this.agencias.push(agencia);
  }

  // Busca cliente pelo CPF em todas as agências
  buscarClientePorCPF(cpf) {
    for (let ag of this.agencias) {
      let cliente = ag.clientes.find((c) => c.cpf === cpf);
      if (cliente) return cliente;
    }
    return null;
  }

  // Retorna todas as transações de todos os clientes para o admin
  getTransacoesGlobais() {
    let todas = [];
    this.agencias.forEach((ag) => {
      ag.clientes.forEach((cli) => {
        cli.conta.historico.forEach((hist) => {
          todas.push({
            ...hist,
            cliente: cli.nome,
            agencia: ag.numero,
          });
        });
      });
    });
    return todas;
  }
}

// ==================== ESTADO GLOBAL & DADOS INICIAIS ====================

const bancoGPT = new Banco("BancoGPT");

// Criando Agência 001
let agencia1 = new Agencia(1);
bancoGPT.adicionarAgencia(agencia1);

// Clientes Iniciais
let mauro = new Cliente("Mauro", "123.456.789-00", "123"); // Senha simples
let marcia = new Cliente("Marcia", "987.654.321-00", "123");

let contaMauro = new Conta(1001, 1, 500);
let contaMarcia = new Conta(1002, 1, 1000);

agencia1.adicionarCliente(mauro, contaMauro);
agencia1.adicionarCliente(marcia, contaMarcia);

// Histórico fictício inicial
contaMauro.registrarHistorico("Depósito", 500, "Depósito inicial");
contaMarcia.registrarHistorico("Depósito", 1000, "Depósito inicial");

// Sessão Atual
let usuarioLogado = null; // Pode ser objeto Cliente ou 'admin'

// ==================== NAVEGAÇÃO & UI ====================

function mostrarTela(telaId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(telaId).classList.add("active");

  const headerInfo = document.getElementById("headerUserInfo");
  const headerName = document.getElementById("headerUserName");

  if (telaId === "screen-login") {
    headerInfo.style.display = "none";
  } else {
    headerInfo.style.display = "block";
    headerName.textContent =
      usuarioLogado === "admin" ? "Administrador" : usuarioLogado.nome;
  }
}

function toggleAuth(modo) {
  document
    .querySelectorAll(".auth-tab")
    .forEach((t) => t.classList.remove("active"));
  if (modo === "login") {
    document.getElementById("form-login").style.display = "block";
    document.getElementById("form-cadastro").style.display = "none";
    document.querySelectorAll(".auth-tab")[0].classList.add("active");
  } else {
    document.getElementById("form-login").style.display = "none";
    document.getElementById("form-cadastro").style.display = "block";
    document.querySelectorAll(".auth-tab")[1].classList.add("active");
    carregarSelectAgencias();
  }
}

function carregarSelectAgencias() {
  const sel = document.getElementById("cadAgenciaSelect");
  sel.innerHTML = "";
  bancoGPT.agencias.forEach((ag) => {
    let opt = document.createElement("option");
    opt.value = ag.numero;
    opt.textContent = `Agência ${ag.numero}`;
    sel.appendChild(opt);
  });
}

function logout() {
  usuarioLogado = null;
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
  mostrarTela("screen-login");
}

// ==================== FUNÇÕES DE LOGIN / CADASTRO ====================

function fazerLogin() {
  const login = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  // 1. Tenta Admin
  if (login === bancoGPT.admin.login && pass === bancoGPT.admin.senha) {
    usuarioLogado = "admin";
    mostrarTela("screen-admin");
    atualizarAdminUI();
    return;
  }

  // 2. Tenta Cliente
  const clienteEncontrado = bancoGPT.buscarClientePorCPF(login);
  if (clienteEncontrado && clienteEncontrado.senha === pass) {
    usuarioLogado = clienteEncontrado;
    mostrarTela("screen-cliente");
    atualizarClienteUI();
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function cadastrarCliente() {
  const nome = document.getElementById("cadNome").value;
  const cpf = document.getElementById("cadCpf").value;
  const senha = document.getElementById("cadSenha").value;
  const numAgencia = parseInt(
    document.getElementById("cadAgenciaSelect").value
  );

  if (!nome || !cpf || !senha) return alert("Preencha todos os campos");

  if (bancoGPT.buscarClientePorCPF(cpf)) return alert("CPF já cadastrado!");

  const agenciaDestino = bancoGPT.agencias.find((a) => a.numero === numAgencia);

  // Gera numero de conta aleatório simples
  const numConta = Math.floor(Math.random() * 9000) + 1000;

  const novoCliente = new Cliente(nome, cpf, senha);
  const novaConta = new Conta(numConta, numAgencia, 0); // Saldo 0

  agenciaDestino.adicionarCliente(novoCliente, novaConta);

  alert("Conta criada com sucesso! Faça login.");
  toggleAuth("login");
}

// ==================== FUNÇÕES CLIENTE ====================

function atualizarClienteUI() {
  if (!usuarioLogado || usuarioLogado === "admin") return;

  const c = usuarioLogado;
  const conta = c.conta;

  document.getElementById("nomeCliente").textContent = c.nome;
  document.getElementById("cpfCliente").textContent = c.cpf;
  document.getElementById("agenciaCliente").textContent = conta.agenciaNum;
  document.getElementById("numeroConta").textContent = conta.numero;
  document.getElementById("saldoConta").textContent = conta.saldo.toFixed(2);

  // Atualiza Extrato
  const extratoDiv = document.getElementById("extrato");
  extratoDiv.innerHTML = "";

  // Inverte array para mostrar mais recentes primeiro
  [...conta.historico].reverse().forEach((item) => {
    let div = document.createElement("div");
    div.className = "list-item";

    let badgeClass = "bg-primary";
    if (item.tipo.includes("Depósito")) badgeClass = "bg-deposito";
    if (item.tipo.includes("Saque")) badgeClass = "bg-saque";
    if (item.tipo.includes("Transferência")) badgeClass = "bg-transferencia";

    div.innerHTML = `
            <span class="badge-type ${badgeClass}">${item.tipo}</span>
            <strong>${item.data}</strong><br>
            ${item.msg}
        `;
    extratoDiv.appendChild(div);
  });
}

function pegarValor() {
  const val = parseFloat(document.getElementById("valorOperacao").value);
  document.getElementById("valorOperacao").value = "";
  return isNaN(val) ? 0 : val;
}

function depositar() {
  const v = pegarValor();
  const res = usuarioLogado.conta.depositar(v);
  if (!res.success) alert(res.msg);
  atualizarClienteUI();
}

function sacar() {
  const v = pegarValor();
  const res = usuarioLogado.conta.sacar(v);
  if (!res.success) alert(res.msg);
  atualizarClienteUI();
}

function transferir() {
  const cpfDest = document.getElementById("cpfDestino").value;
  const v = pegarValor();

  if (!cpfDest) return alert("Digite o CPF de destino");
  if (cpfDest === usuarioLogado.cpf)
    return alert("Não pode transferir para si mesmo");

  const dest = bancoGPT.buscarClientePorCPF(cpfDest);
  if (!dest) return alert("Cliente destino não encontrado");

  const res = usuarioLogado.conta.transferir(v, dest.conta);
  if (res.success) {
    alert("Transferência realizada!");
    document.getElementById("cpfDestino").value = "";
  } else {
    alert(res.msg);
  }
  atualizarClienteUI();
}

// ==================== FUNÇÕES ADMIN ====================

function atualizarAdminUI() {
  if (usuarioLogado !== "admin") return;

  // 1. Listar Agências
  const listaAg = document.getElementById("listaAgencias");
  listaAg.innerHTML = "";
  bancoGPT.agencias.forEach((ag) => {
    let div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<strong>Agência ${ag.numero}</strong> - ${ag.clientes.length} clientes`;
    listaAg.appendChild(div);
  });

  // 2. Listar Transações Globais
  const listaTrans = document.getElementById("transacoesGlobais");
  listaTrans.innerHTML = "";
  const transacoes = bancoGPT.getTransacoesGlobais(); // Pega tudo

  // Ordena reverso para mostrar as últimas primeiro
  transacoes.reverse().forEach((t) => {
    let div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
            <small>${t.data} - ${t.cliente} (Ag: ${t.agencia})</small><br>
            <strong>${t.tipo}</strong>: R$ ${t.valor.toFixed(2)}
        `;
    listaTrans.appendChild(div);
  });
}

function criarAgencia() {
  const num = parseInt(document.getElementById("novaAgenciaNum").value);
  if (!num) return alert("Número inválido");

  // Verifica se existe
  if (bancoGPT.agencias.find((a) => a.numero === num))
    return alert("Agência já existe");

  bancoGPT.adicionarAgencia(new Agencia(num));
  alert(`Agência ${num} criada com sucesso!`);
  document.getElementById("novaAgenciaNum").value = "";
  atualizarAdminUI();
}
