import { loadMarcas, loadModelos, loadAnos, loadValor } from './api.js';

export function init() {
    document.addEventListener('DOMContentLoaded', loadMarcasAndDisplay);
}

async function loadMarcasAndDisplay() {
    const marcas = await loadMarcas();
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = ''; // Limpa o carrossel anterior

    if (marcas.length === 0) {
        carouselInner.innerHTML = '<div class="carousel-item active"><div class="text-center">Nenhuma marca encontrada.</div></div>';
        return;
    }

    const marcasPorSlide = 4;
    for (let i = 0; i < marcas.length; i += marcasPorSlide) {
        const marcasSlide = marcas.slice(i, i + marcasPorSlide);
        const isActive = i === 0 ? 'active' : '';
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${isActive}`;

        let carouselContent = '<div class="d-flex justify-content-around">';
        marcasSlide.forEach(marca => {
            carouselContent += `
                <div>
                    <img src="img.jpg?text=${encodeURIComponent(marca.nome)}" alt="${marca.nome}" data-codigo="${marca.codigo}" class="marca-img">
                    <p class="mt-2">${marca.nome}</p>
                </div>
            `;
        });
        carouselContent += '</div>';

        carouselItem.innerHTML = carouselContent;
        carouselInner.appendChild(carouselItem);
    }

    addMarcaClickEvent();
}

function addMarcaClickEvent() {
    document.querySelectorAll('.marca-img').forEach(img => {
        img.addEventListener('click', () => {
            const codigoMarca = img.getAttribute('data-codigo');
            const nomeMarca = img.nextElementSibling.textContent;
            openMarcaModal(codigoMarca, nomeMarca);
        });
    });
}

function openMarcaModal(codigoMarca, nomeMarca) {
    const marcaModal = new bootstrap.Modal(document.getElementById('marcaModal'));
    document.getElementById('marcaModalLabel').textContent = `Detalhes da Marca: ${nomeMarca}`;
    const modalContentBody = document.getElementById('modal-content-body');
    modalContentBody.innerHTML = '<div class="text-center">Carregando modelos...</div>';
    marcaModal.show();

    loadModelos(codigoMarca).then(modelosData => {
        loadModelosAndDisplay(modelosData.modelos);
    });
}
async function loadModelosAndDisplay(modelos) {
    const modalContentBody = document.getElementById('modal-content-body');
    modalContentBody.innerHTML = ''; // Limpa o conteúdo anterior

    if (modelos.length === 0) {
        modalContentBody.innerHTML = '<div class="text-center">Nenhum modelo encontrado.</div>';
        return;
    }

    const modelosAccordion = document.createElement('div');
    modelosAccordion.className = 'accordion';
    modelosAccordion.id = 'modelos-accordion';

    modelos.forEach((modelo, indexModelo) => {
        const modeloItem = document.createElement('div');
        modeloItem.className = 'accordion-item';

        modeloItem.innerHTML = `
            <h2 class="accordion-header" id="modelo-heading-${indexModelo}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#modelo-collapse-${indexModelo}" aria-expanded="false" aria-controls="modelo-collapse-${indexModelo}">
                    ${modelo.nome}
                </button>
            </h2>
            <div id="modelo-collapse-${indexModelo}" class="accordion-collapse collapse" aria-labelledby="modelo-heading-${indexModelo}" data-bs-parent="#modelos-accordion">
                <div class="accordion-body" id="modelo-details-${indexModelo}">
                    <div class="text-center">Carregando anos...</div>
                </div>
            </div>
        `;

        modelosAccordion.appendChild(modeloItem);

        modeloItem.querySelector('.accordion-button').addEventListener('click', async () => {
            const modeloDetails = document.getElementById(`modelo-details-${indexModelo}`);
            if (!modeloDetails.classList.contains('loaded')) {
                try {
                    const anos = await loadAnos(modelo.codigo);
                    loadAnosAndDisplay(anos, codigoMarca, modelo.codigo, indexModelo);
                } catch (error) {
                    modeloDetails.innerHTML = `<div class="text-center text-danger">Erro ao carregar anos: ${error.message}</div>`;
                }
            }
        });
    });

    modalContentBody.appendChild(modelosAccordion);
}

function loadAnosAndDisplay(anos, codigoMarca, codigoModelo, indexModelo) {
    const modeloDetails = document.getElementById(`modelo-details-${indexModelo}`);
    modeloDetails.innerHTML = ''; // Limpa o conteúdo anterior

    if (anos.length === 0) {
        modeloDetails.innerHTML = '<div class="text-center">Nenhum ano encontrado.</div>';
        return;
    }

    const anosAccordion = document.createElement('div');
    anosAccordion.className = 'accordion nested-accordion';
    anosAccordion.id = `anos-accordion-${indexModelo}`;

    anos.forEach((ano, indexAno) => {
        const anoItem = document.createElement('div');
        anoItem.className = 'accordion-item';

        anoItem.innerHTML = `
            <h2 class="accordion-header" id="ano-heading-${indexModelo}-${indexAno}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ano-collapse-${indexModelo}-${indexAno}" aria-expanded="false" aria-controls="ano-collapse-${indexModelo}-${indexAno}">
                    ${ano.nome}
                </button>
            </h2>
            <div id="ano-collapse-${indexModelo}-${indexAno}" class="accordion-collapse collapse" aria-labelledby="ano-heading-${indexModelo}-${indexAno}" data-bs-parent="#anos-accordion-${indexModelo}">
                <div class="accordion-body" id="ano-details-${indexModelo}-${indexAno}">
                    <div class="text-center">Carregando valor...</div>
                </div>
            </div>
        `;

        anosAccordion.appendChild(anoItem);

        anoItem.querySelector('.accordion-button').addEventListener('click', () => {
            const anoDetails = document.getElementById(`ano-details-${indexModelo}-${indexAno}`);
            if (!anoDetails.classList.contains('loaded')) {
                loadValor(codigoMarca, codigoModelo, ano.codigo).then(valorData => {
                    loadValorAndDisplay(valorData, indexModelo, indexAno);
                });
            }
        });
    });

    modeloDetails.appendChild(anosAccordion);
    modeloDetails.classList.add('loaded'); // Marca como carregado
}

function loadValorAndDisplay(valorData, indexModelo, indexAno) {
    const anoDetails = document.getElementById(`ano-details-${indexModelo}-${indexAno}`);
    anoDetails.innerHTML = `
        <p><strong>Marca:</strong> ${valorData.marca}</p>
        <p><strong>Modelo:</strong> ${valorData.modelo}</p>
        <p><strong>Ano:</strong> ${valorData.ano}</p>
        <p><strong>Valor FIPE:</strong> R$ ${valorData.valor.toFixed(2)}</p>
    `;
    anoDetails.classList.add('loaded'); // Marca como carregado
}

// Chame a função init para iniciar o aplicativo
init();
