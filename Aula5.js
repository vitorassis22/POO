class Pessoa{

    nome
    cpf
    dataNasc

    apresentar() {

        console.log('O nome é', this.nome)

    }

}

//Herança
class Funcionario extends Pessoa{

    funcao;
    matricula;

    //sobre escrita
    apresentar(){
        //somar o metodo antigo com o novo sobre escrito
        super.apresentar()
        console.log(`A função é ${this.funcao} e a matricula é ${this.matricula}`)
    }

}

let empacotador = new Funcionario()
empacotador.nome = "Jose Silva"
empacotador.cpf = "555.555.555-55"
empacotador.dataNasc = "20/07/96"
empacotador.matricula = "404"
empacotador.funcao = "Assistente"

empacotador.apresentar()