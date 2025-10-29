class cliente {
    constructor(nome, cpf) {
        this.nome = nome
        this.cpf = cpf
        this.conta = null
    }
}
class conta {
    constructor(numero, saldo = 0) {
        this.numero = numero
        this.saldo = saldo
        this.historico = []
    }
    depositar(valor) {
        if (valor < 0) {
            console.log("Valor inválido")
            return
        }
        this.saldo += valor
        this.historico.push('Depósito de R$: ' + valor)
    }
    sacar(valor) {
        if (valor > this.saldo) {
            console.log("Saldo insuficiente")
            return
        }
        this.saldo -= valor
        this.historico.push('Saque de R$: ' + valor)
    }
    transferir(valor, contaDestino) {
        if (valor > this.saldo) {
            console.log("Saldo insuficiente")
            return
        }
        this.saldo -= valor
        contaDestino.saldo += valor
        this.historico.push("Transferencia feita de R$: " + valor)
        contaDestino.historico.push('Transferencia recebida de R$: ' + valor)

    }
    extrato() {
        console.log("Extrato da conta ", this.numero)
        this.historico.forEach(item => console.log("- ", item))
        console.log("Saldo atual: ", this.saldo)
    }
}
class agencia {
    constructor(numero) {
        this.numero = numero
        this.clientes = []
    }
    adicionarCliente(cliente, conta) {
        cliente.conta = conta
        this.clientes.push(cliente)
    }
}
class banco {
    constructor(nome) {
        this.nome = nome
        this.agencias = []
    }
    adicionarAgencia(agencia) {
        this.agencias.push(agencia)
    }
    listarAgencias() {
        console.log("agencias do banco:")
        this.agencias.forEach(a => console.log("agencia: " + a.numero))
    }
    transacoes() {
        console.log("transacoes controladas por: ", this.nome)
    }

}

banco = new banco("zapGPT")

agencia1 = new agencia(1)

mauro = new cliente("Mauro", "123.456.789-00")
marcia = new cliente("Marcia", "987.654.321-00")
contaMauro = new conta(1, 500)
agencia1.adicionarCliente(mauro, contaMauro)
contaMarcia = new conta(2, 1000)
agencia1.adicionarCliente(marcia, contaMarcia)

contaMauro.depositar(200)
contaMauro.sacar(100)
contaMauro.transferir(250, contaMarcia)

contaMauro.extrato()
contaMarcia.extrato()

banco.transacoes()