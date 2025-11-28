// Usa o seu próprio código

class cliente {
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.conta = null;
    }
}
class adm {
    constructor(login, senha){
        this.login = login
        this.senha = senha
    
    }
}
class conta {
    constructor(numero, saldo = 0) {
        this.numero = numero;
        this.saldo = saldo;
        this.historico = [];
    }
    depositar(valor) {
        if (valor < 0) return alert("Valor inválido");
        this.saldo += valor;
        this.historico.push("Depósito de R$: " + valor);
    }
    sacar(valor) {
        if (valor > this.saldo) return alert("Saldo insuficiente");
        this.saldo -= valor;
        this.historico.push("Saque de R$: " + valor);
    }
    transferir(valor, contaDestino) {
        if (valor > this.saldo) return alert("Saldo insuficiente");
        this.saldo -= valor;
        contaDestino.saldo += valor;
        this.historico.push("Transferência enviada R$: " + valor);
        contaDestino.historico.push("Transferência recebida R$: " + valor);
    }
}

class agencia {
    constructor(numero) {
        this.numero = numero;
        this.clientes = [];
    }
    adicionarCliente(cliente, conta) {
        cliente.conta = conta;
        this.clientes.push(cliente);
    }
}

class banco {
    constructor(nome) {
        this.nome = nome;
        this.agencias = [];
    }
    adicionarAgencia(agencia) {
        this.agencias.push(agencia);
    }
}


// ---------- Instâncias ----------------

let bancoGPT = new banco("BancoGPT");
let agencia1 = new agencia(1);

let mauro = new cliente("Mauro", "123.456.789-00");
let marcia = new cliente("Marcia", "987.654.321-00");

let contaMauro = new conta(1, 500);
let contaMarcia = new conta(2, 1000);

agencia1.adicionarCliente(mauro, contaMauro);
agencia1.adicionarCliente(marcia, contaMarcia);


// ---------- Atualizar UI --------------

function atualizarTela() {
    document.getElementById("saldoConta").textContent = contaMauro.saldo;

    let extratoDiv = document.getElementById("extrato");
    extratoDiv.innerHTML = "";

    contaMauro.historico.forEach(item => {
        let p = document.createElement("p");
        p.textContent = item;
        extratoDiv.appendChild(p);
    });
}

atualizarTela();

// ----------- Funções dos botões ----------

function pegarValor() {
    return Number(document.getElementById("valorOperacao").value);
}

function depositar() {
    let v = pegarValor();
    contaMauro.depositar(v);
    atualizarTela();
}

function sacar() {
    let v = pegarValor();
    contaMauro.sacar(v);
    atualizarTela();
}

function transferir() {
    let v = pegarValor();
    contaMauro.transferir(v, contaMarcia);
    atualizarTela();
}