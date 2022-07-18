let listaLancamentos = [];

function lancamento() {

    let inputDesc = document.querySelector('#input-desc');
    let desc = inputDesc.value;

    let inputValor = document.querySelector('#input-valor');
    let valorPrev = inputValor.value;


    var frase = valorPrev;
    var letra = ".";
    var letra2 = ",";
    var quantidade = 0;

    for (var i = 0; i < frase.length; i++) {
        if (frase[i] == letra || frase[i] == letra2) {
            quantidade++
        }
    }

    if(quantidade > 1) {
        alert('Utilize apenas 1 ponto para informar casas decimais! Exemplo: 1000.99');
        return;
    }

    let valor = valorPrev.replace(",", ".");

    if (isNaN(valor)) {
        alert("Valor inválido!")
        return;
    }

    valorLength = valor.length;
    positionPoint = valor.indexOf(".");

    if((valorLength - positionPoint) > 3) {
        alert('Valor inválido, utilize apenas duas casas decimais após o ponto. Exemplo: 9.99')
        return;
    };



    let tipoLancamento = document.querySelector('input[name=tipoValor]:checked').value;

    if (desc === '' || valor === '' || tipoLancamento === '') {
        alert("Preencha todos os campos!");
        return;
    }

    if (valor.includes(',')) {
        alert("Preencha campo valor sem vírgulas, utilize ponto para casas decimais.");
        return;
    }

    let objLancamento = {
        descricao: desc,
        valor: valor,
        tipo: tipoLancamento,
    }

    const div = document.querySelector(".itens-lancados");

    if (listaLancamentos.length === 0) {
        div.innerHTML = "";
    }

    listaLancamentos.push(objLancamento);
    localStorage.setItem('@controle-financeiro', JSON.stringify(listaLancamentos));


    renderLancamento(objLancamento);


    alert('Lançamento realizado com sucesso!')
    inputDesc.value = '';
    inputValor.value = '';
    valorEntradas();
    valorSaidas();
    valorTotal();


}


function renderLancamento(objLancamento) {

    let divLancamentos = document.querySelector('#itens-lancados');
    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'lancamento');

    let spanDesc = document.createElement('span');
    spanDesc.innerHTML = objLancamento.descricao;

    // PARAMETRO PARA DELTAR TAREFA



    listaLancamentos.map((item, index) => {
        if (item.descricao === objLancamento.descricao) {
            posicao = index;
        }
    })

    //

    let spanValor = document.createElement('span');
    spanValor.innerHTML = 'R$ ' + parseFloat(objLancamento.valor).toFixed(2);

    let spanTipo = document.createElement('span');

    if (objLancamento.tipo === 'saida') {

        let spanIconDown = document.createElement('span');
        spanIconDown.setAttribute('class', 'material-symbols-outlined red')
        spanIconDown.innerHTML = "arrow_circle_down"

        let spanIconTrash = document.createElement('span');
        spanIconTrash.setAttribute('class', 'material-symbols-outlined')
        spanIconTrash.innerHTML = "delete"

        let buttonDeletar = document.createElement('button');
        buttonDeletar.setAttribute('onclick', `apagar(${posicao})`)
        buttonDeletar.setAttribute('class', 'delete');

        buttonDeletar.appendChild(spanIconTrash);

        spanTipo.appendChild(spanIconDown);
        spanTipo.appendChild(buttonDeletar);

    } else {

        let spanIconDown = document.createElement('span');
        spanIconDown.setAttribute('class', 'material-symbols-outlined green')
        spanIconDown.innerHTML = "arrow_circle_up"

        let spanIconTrash = document.createElement('span');
        spanIconTrash.setAttribute('class', 'material-symbols-outlined')
        spanIconTrash.innerHTML = "delete"

        let buttonDeletar = document.createElement('button');
        buttonDeletar.setAttribute('onclick', `apagar(${posicao})`)
        buttonDeletar.setAttribute('class', 'delete');

        buttonDeletar.appendChild(spanIconTrash);

        spanTipo.appendChild(spanIconDown);
        spanTipo.appendChild(buttonDeletar);

    }





    divItem.appendChild(spanDesc);
    divItem.appendChild(spanValor);
    divItem.appendChild(spanTipo);

    divLancamentos.appendChild(divItem);


}

function renderLoad() {


    const div = document.querySelector(".itens-lancados");
    div.innerHTML = ""



    if (localStorage.getItem('@controle-financeiro') !== null) {

        listaLancamentos = JSON.parse(localStorage.getItem('@controle-financeiro'));

    }

    if (listaLancamentos.length === 0) {
        div.innerHTML = "Não existem lançamentos!"
    }

    listaLancamentos.map((item) => {
        renderLancamento(item);
    })

    valorEntradas();
    valorSaidas()
    valorTotal();


}


function apagar(posicao) {

    listaLancamentos.splice(posicao, 1)

    console.log(listaLancamentos.length);

    localStorage.setItem('@controle-financeiro', JSON.stringify(listaLancamentos));

    const div = document.querySelector(".itens-lancados");
    div.innerHTML = ""

    listaLancamentos.map((item) => {
        renderLancamento(item);
    })

    if (listaLancamentos.length === 0) {
        div.innerHTML = "Não existem lançamentos!"
    }

    valorEntradas();
    valorSaidas();
    valorTotal();

}



function valorEntradas() {

    let soma = 0;

    let lista = JSON.parse(localStorage.getItem('@controle-financeiro'));

    for (i = 0; i < lista.length; i++) {
        if (lista[i].tipo === "entrada") {
            soma += parseFloat(lista[i].valor);
        }
    }


    divEntradas = document.querySelector("#entradas");
    divEntradas.innerHTML = 'R$ ' + soma.toFixed(2);


}


function valorSaidas() {

    let somaSaida = 0;

    let lista = JSON.parse(localStorage.getItem('@controle-financeiro'));

    for (i = 0; i < lista.length; i++) {
        if (lista[i].tipo === "saida") {
            somaSaida += parseFloat(lista[i].valor);
        }
    }


    divSaidas = document.querySelector("#saidas");
    divSaidas.innerHTML = 'R$ ' + somaSaida.toFixed(2);


}


function valorTotal() {

    let somaTotal = 0;


    let soma = 0;

    let lista = JSON.parse(localStorage.getItem('@controle-financeiro'));

    for (i = 0; i < lista.length; i++) {
        if (lista[i].tipo === "entrada") {
            soma += parseFloat(lista[i].valor);
        }
    }

    let somaSaida = 0;


    for (i = 0; i < lista.length; i++) {
        if (lista[i].tipo === "saida") {
            somaSaida += parseFloat(lista[i].valor);
        }
    }

    somaTotal = soma - somaSaida;


    divTotal = document.querySelector("#total");
    divTotal.innerHTML = 'R$ ' + somaTotal.toFixed(2);



}


var currentTime = new Date();
var year = currentTime.getFullYear()
var footerContent = `Copyright © ${year} - juliano340.com`;
var myFooter = document.querySelector("#myFooter");
myFooter.innerHTML = footerContent;