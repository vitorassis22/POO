class produto {
  constructor(nome, quantidade, marca, valor) {
    this.nome = nome;
    this.quantidade = quantidade;
    this.marca = marca;
    this.valor = valor;
  }
}

class venda {
  constructor(vendedor, cliente) {
    this.vendedor = vendedor;
    this.cliente = cliente;
    this.produtos = [];
  }
}
class pessoa {
  constructor(codPessoa, nome, cpf, idade) {
    this.codPessoa = codPessoa;
    this.nome = nome;
    this.cpf = cpf;
    this.idade = idade;
  }
}
class vendedor extends pessoa {
  produtos = [];

  constructor(codPessoa, nome, cpf, idade) {
    super(codPessoa, nome, cpf, idade);
  }

  vender() {}

  cadastrarProduto(produto) {
    this.produtos.push(produto);
  }
}
class cliente extends pessoa {
  constructor(codPessoa, nome, cpf, idade, endereco) {
    super(codPessoa, nome, cpf, idade);
    this.endereco = endereco;
  }
  comprar() {}
}

let jair = new vendedor(1, "jair", "444.444.444-44", 50);
let agua = new produto("agua", 10, "aguaZe", 2.00);
jair.cadastrarProduto(agua);
console.log(jair.cpf)
console.log(jair.produtos);