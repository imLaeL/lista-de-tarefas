const tarefaInput = document.getElementById('tarefaInput');
const listaDeTarefas = document.getElementById('listaDeTarefas');
const buttonAdicionar = document.getElementById('adicionar');

document.addEventListener('DOMContentLoaded', carregarTarefas);

buttonAdicionar.addEventListener('click', adicionarTarefa);

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => adicionarTarefaDOM(tarefa));
}

function adicionarTarefa() {
    const tarefa = tarefaInput.value.trim();
    if (tarefa === '') {
        alert('Por favor, adicione uma tarefa');
        return;
    }

    adicionarTarefaDOM(tarefa);  
    salvarTarefa(tarefa);        
    tarefaInput.value = '';    
}   

function adicionarTarefaDOM(tarefa) {
    const li = document.createElement('li');
    li.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'tarefa');
    
    const span = document.createElement('span');
    span.textContent = tarefa;;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.classList.add('btn', 'btn-danger', 'btn-sm', 'remover');
    
    botaoRemover.onclick = function () {
        removerTarefa(tarefa);
    };

    li.appendChild(span);
    listaDeTarefas.appendChild(li);
    listaDeTarefas.appendChild(botaoRemover);
}

function salvarTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function removerTarefa(tarefa) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter(t => t !== tarefa); 
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    atualizarLista(); 
}

function atualizarLista() {
    listaDeTarefas.innerHTML = '';
    carregarTarefas();
}
