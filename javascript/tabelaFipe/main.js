// main.js
import { init } from './dom.js';

// Função principal para iniciar a aplicação
function main() {
    // Inicializa a funcionalidade de carregamento de marcas
    init();
}

// Chama a função principal quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', main);
