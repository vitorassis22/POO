class produto {
    constructor(id, nome, preco){
        this.id = id
        this.nome = nome
        this.preco = preco
    }
}

class pessoa{
    nome
    cpf
    constructor(nome, cpf){
        this.nome = nome
        this.cpf = cpf
    }
}
// ===== HERANÇA =====
class vendedor extends pessoa {
    constructor(nome, cpf, loja){
        super(nome,cpf)
        this.loja = loja
    }
}
// ===== HERANÇA =====
class cliente extends pessoa {
  constructor(nome, cpf, endereco) {
    super(nome, cpf);
    this.endereco = endereco;
  }
}

class venda{
    constructor(vendedor,cliente){
        this.vendedor = vendedor
        this.cliente = cliente
        this.produtos = [] //lista vazia para receber os produtos
        this.total = 0
    }
    adicionarProduto(produto){
        this.produtos.push(produto) //adiciona produtos na lista
        this.total += produto.preco //soma o valor do produto adicionado no total
    }
    vendaFinalizada(){
        console.log("Resumo da venda")
        console.log(`Vendedor: ${this.vendedor.nome}`)
        console.log(`Cliente: ${this.cliente.nome}`)
        console.log("Itens comprados: ")
        console.table(this.produtos) //transforma a lista em tabela

        console.log('Total a pagar: R$ ${this.total}')
    }
}

const vendedor1 = new vendedor("Joao", "444.444.444-44", "Churrasquinho Grill")
const cliente1 = new cliente("Marco", "222.222.222-22", "(18)99170-5302")

const carne = new produto(1, "Espeto de carne", 12.00)
const frango = new produto(2, "Espeto de frango", 10.0);

const venda1 = new venda(vendedor1, cliente1)

venda1.adicionarProduto(carne)
venda1.adicionarProduto(frango)
venda1.vendaFinalizada()