// api.js
const FIPE_API_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export async function loadMarcas() {
    try {
        const url = `${FIPE_API_BASE_URL}/carros/marcas`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar as marcas.');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar as marcas:', error);
        alert('Não foi possível carregar as marcas.');
    }
}

export async function loadModelos(codigoMarca) {
    try {
        const url = `${FIPE_API_BASE_URL}/carros/marcas/${codigoMarca}/modelos`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar os modelos.');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar os modelos:', error);
        alert('Não foi possível carregar os modelos.');
    }
}

export async function loadAnos(codigoMarca, codigoModelo) {
    try {
        console.log(`Carregando anos para marca: ${codigoMarca}, modelo: ${codigoModelo}`);
        const url = `${FIPE_API_BASE_URL}/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Erro ao buscar os anos: Status ${response.status}`);
            throw new Error('Erro ao buscar os anos.');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar os anos:', error);
        alert('Não foi possível carregar os anos.');
    }
}

export async function loadValor(codigoMarca, codigoModelo, codigoAno) {
    try {
        const url = `${FIPE_API_BASE_URL}/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar o valor do veículo.');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar o valor do veículo:', error);
        alert('Não foi possível carregar o valor do veículo.');
    }
}
