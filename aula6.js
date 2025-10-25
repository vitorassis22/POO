class cachorro {
  nome;
  raca;
  idade;
  dono;
  constructor(nome, ccz, dono) {
    Pessoa.dono = dono;
    this.nome = nome;
    ccz.animal = this;
  }
}

class CCZ {
  #animais = [];
  set animal(ani) {
    this.#animais.push(ani);
  }
  get animal() {
    return this.#animais;
  }
}

class Pessoa {
  nome;
  #din;
  historico = [];
  static todasPessoas = [];

  get dinheiro() {
    return this.#din;
  }

  set dinheiro(valor) {
    this.historico.push(valor - this.#din);
    this.#din = valor;
  }

  constructor(nome, dinheiro) {
    this.nome = nome;
    this.#din = dinheiro;
    Pessoa.todasPessoas.push(this);
  }

  static limparHistorico(p) {
    console.log("Histórico bancário limpo");
    for (p of Pessoa.todasPessoas) {
      p.historico = [];
    }
  }
}

class Busao {
  passageiros = [];
  valorPassagem = 10;

  embarcarPassageiros(passageiro) {
    if ((Object.getPrototypeOf(passageiro), "dinheiro")) {
      if (passageiro.dinheiro > this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dinheiro -= this.valorPassagem;
      }
    } else {
      if (passageiro.dono.dinheiro > this.valorPassagem) {
        this.passageiros.push(passageiro);
        passageiro.dono.dinheiro -= this.valorPassagem;
      }
    }
  }
}

cczTL = new CCZ();
// pets
//cachorro.prototype.dinheiro = 100;
let rex = new cachorro("rex", cczTL);
rex.dono = "joao";
let lessie = new cachorro("lessie", cczTL);
lessie.dono = "maria";

// pessoas
let joao = new Pessoa("Joao", 50);
let maria = new Pessoa("Maria", 9);
maria.dinheiro += 20; // Aqui o setter é chamado corretamente

// comprando passagens
const transLagoas = new Busao();
transLagoas.embarcarPassageiros(joao);
transLagoas.embarcarPassageiros(maria);
transLagoas.embarcarPassageiros(rex);
transLagoas.embarcarPassageiros(lessie);

console.log("Animais registrados:");
console.log(cczTL.animal);
console.log("Passageiros do translagoas:");
console.log(transLagoas.passageiros);
Pessoa.limparHistorico();
console.log(transLagoas.passageiros);
