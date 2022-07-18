let listaLancamentos = [];

function lancamento() {

    let inputDesc = document.querySelector('#input-desc');
    let desc = inputDesc.value;

    let inputValor = document.querySelector('#input-valor');
    let valor = inputValor.value;

    let tipoLancamento = document.querySelector('input[name=tipoValor]:checked').value;

    if (desc === '' || valor === '' || tipoLancamento === '') {
        alert("Preencha todos os campos!");
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
    spanValor.innerHTML = objLancamento.valor;

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
    
    for(i = 0; i < lista.length; i++) {
        if(lista[i].tipo === "entrada") {
            soma += parseFloat(lista[i].valor);
        }
    }

    
    divEntradas = document.querySelector("#entradas");
    divEntradas.innerHTML ='R$ ' + soma;
    
    
}


function valorSaidas() {

    let somaSaida = 0;

    let lista = JSON.parse(localStorage.getItem('@controle-financeiro'));
    
    for(i = 0; i < lista.length; i++) {
        if(lista[i].tipo === "saida") {
            somaSaida += parseFloat(lista[i].valor);
        }
    }

    
    divSaidas = document.querySelector("#saidas");
    divSaidas.innerHTML = 'R$ ' + somaSaida;
    
    
}


function valorTotal() {
    
    let somaTotal = 0;


    let soma = 0;

    let lista = JSON.parse(localStorage.getItem('@controle-financeiro'));
    
    for(i = 0; i < lista.length; i++) {
        if(lista[i].tipo === "entrada") {
            soma += parseFloat(lista[i].valor);
        }
    }
    
    let somaSaida = 0;

      
    for(i = 0; i < lista.length; i++) {
        if(lista[i].tipo === "saida") {
            somaSaida += parseFloat(lista[i].valor);
        }
    }

    somaTotal = soma - somaSaida;
    

    divTotal = document.querySelector("#total");
    divTotal.innerHTML = 'R$ ' + somaTotal;


    
}
