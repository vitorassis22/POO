let pessoa1 = new Pessoa()
pessoa1.nome = "ana"
mudarNome(pessoa1)
pessoa1.apresentar()

function mudarNome(individuo){

    individuo.nome = "sem nome";
}

class Pessoa{

    nome
    cpf
    dataNasc

    apresentar() {

        console.log('O meu nome é', this.nome)

    }
}