class Pessoa{

    constructor(nome){
        console.log('Nova pessoa registrada')
        console.log(`O nome é ${nome}`)
        //atribui o nome recebido   
        //this.nome = nome
    }

    nome
    cpf
    dataNasc

    apresentar() {

        console.log('O meu nome é', this.nome)

    }

    //sobrecarga
    setNome(nome,dataNasc){

        console.log(`O nome é ${nome} e é nascido em ${dataNasc}`)
        this.nome = nome
        this.dataNasc = dataNasc
    }

    setNome(nome,dataNasc,cpf){

        console.log(`O nome é ${nome}, é nascido em ${dataNasc} e o cpf é ${cpf}`)
        this.nome = nome
        this.dataNasc = dataNasc
        this.cpf = cpf
    }

}

/* //Mudar a variavel, quando nao é primária.
   //Perceba que a pessoa é um metodo da classe,
   //quando é uma variável primária, ela nao muda de nome fora de métodos 

 function mudarNome(individuo){

   individuo.nome = "sem nome";
}

let pessoa1 = new Pessoa()
pessoa1.nome = "ana"
mudarNome(pessoa1)
pessoa1.apresentar() */


let jose
//em linguagens tipadas isso nao funciona
jose = new Pessoa("Jose Silva")
jose.setNome("Jose", "20/06/96")