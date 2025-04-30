// Captura dos elementos advindos do index.html
const form = document.getElementById('form-item');
const input = document.getElementById('input-item');
const lista = document.getElementById('lista-compras');
const alerta = document.querySelector('.alerta-remocao');
const fecharAlerta = document.querySelector('.fechar-alerta');

let itensSalvos = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

alerta.style.display = 'none';
alerta.classList.remove('mostrar-alerta', 'esconder-alerta');

// Renderiza os itens salvos ao carregar a página
window.onload = function () {
  itensSalvos.forEach(texto => {
    adicionarItemNaTela(texto);
  });
};

// Evento para adicionar item na lista
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const texto = input.value.trim();

  if (texto !== '') {
    itensSalvos.push(texto);
    localStorage.setItem('listaDeCompras', JSON.stringify(itensSalvos));
    adicionarItemNaTela(texto);
    input.value = '';
  }
});

// Função que adiciona o item visualmente na tela
function adicionarItemNaTela(texto) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const botao = document.createElement('button');
  const iconeLixeira = document.createElement('img');

  checkbox.type = 'checkbox';
  span.textContent = texto;
  iconeLixeira.src = 'Icons/Trash.svg';
  iconeLixeira.alt = 'Ícone de lixeira';
  botao.appendChild(iconeLixeira);

  // Evento para remover item
  botao.addEventListener('click', function() {
    lista.removeChild(li);
    itensSalvos = itensSalvos.filter(item => item !== texto);
    localStorage.setItem('listaDeCompras', JSON.stringify(itensSalvos));

    alerta.style.display = 'flex'; 
    alerta.classList.remove('esconder-alerta');
    alerta.classList.add('mostrar-alerta');

    setTimeout(function() {
      alerta.classList.remove('mostrar-alerta');
      alerta.classList.add('esconder-alerta');
      setTimeout(function() {
        alerta.style.display = 'none';
      }, 500);
    }, 3000);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(botao);
  lista.appendChild(li);
}

// Evento para fechar alerta manualmente
fecharAlerta.addEventListener('click', function() {
  alerta.classList.remove('mostrar-alerta');
  alerta.classList.add('esconder-alerta');
  setTimeout(function() {
    alerta.style.display = 'none';
  }, 500);
});
