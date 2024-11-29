import React, { useEffect, useState } from "react";
import APIWrapper from "./apiWrapper";

const api = new APIWrapper("http://127.0.0.1:8000");

function App() {
    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [musicas, setMusicas] = useState([]);
    const [newArtista, setNewArtista] = useState("");
    const [newAlbum, setNewAlbum] = useState("");
    const [newMusica, setNewMusica] = useState("");
    const [segundos, setSegundos] = useState("");  
    const [selectedArtista, setSelectedArtista] = useState(""); 
    const [selectedAlbum, setSelectedAlbum] = useState(""); 
    const [selectedAno, setSelectedAno] = useState(""); 
    const [newLocal, setNewLocal] = useState("");  // Campo para local do artista

    useEffect(() => {
        fetchArtistas();
        fetchAlbuns();
        fetchMusicas();
    }, []);

    const fetchArtistas = async () => {
        const data = await api.getArtistas();
        setArtistas(data);
    };

    const fetchAlbuns = async () => {
        const data = await api.getAlbuns();
        setAlbuns(data);
    };

    const fetchMusicas = async () => {
        const data = await api.getMusicas();
        setMusicas(data);
    };

    // Funções para Artistas
    const addArtista = async () => {
        if (newArtista.trim() && newLocal.trim()) {
            await api.createArtista({ nome: newArtista, local: newLocal, ano_criacao: 2024 });
            setNewArtista("");
            setNewLocal(""); // Limpar o campo de local
            fetchArtistas();
        } else {
            alert("Por favor, insira o nome e o local do artista.");
        }
    };

    const deleteArtista = async (id) => {
        await api.deleteArtista(id);
        fetchArtistas();
    };

    // Função para adicionar álbum com o artista selecionado
    const addAlbum = async () => {
        if (newAlbum.trim() && selectedArtista && selectedAno) {
            const artistaSelecionado = artistas.find(artista => artista.id === parseInt(selectedArtista));
            if (!artistaSelecionado) {
                alert("Artista não encontrado.");
                return;
            }

            await api.createAlbum({
                nome: newAlbum,
                ano: selectedAno,
                artista: selectedArtista,
            });
            setNewAlbum("");
            setSelectedArtista(""); 
            setSelectedAno(""); 
            fetchAlbuns();
        } else {
            alert("Por favor, preencha todos os campos do álbum.");
        }
    };

    const deleteAlbum = async (id) => {
        await api.deleteAlbum(id);
        fetchAlbuns();
    };

    // Funções para Musicas
    const addMusica = async () => {
        if (newMusica.trim() && selectedAlbum && segundos) {
            const albumSelecionado = albuns.find(album => album.id === parseInt(selectedAlbum));
            if (!albumSelecionado) {
                alert("Álbum não encontrado.");
                return;
            }

            if (isNaN(segundos) || segundos <= 0) {
                alert("Por favor, insira um valor válido para os segundos.");
                return;
            }

            await api.createMusica({
                nome: newMusica,
                album: selectedAlbum,  // Passando o ID do álbum
                segundos: parseInt(segundos),  // Usando o valor dos segundos
            });
            setNewMusica("");
            setSegundos("");  // Limpar o campo de segundos
            setSelectedAlbum(""); 
            fetchMusicas();
        } else {
            alert("Por favor, preencha todos os campos da música.");
        }
    };

    const deleteMusica = async (id) => {
        await api.deleteMusica(id);
        fetchMusicas();
    };

    return (
        <div className="App">
            <h1>Spotifake</h1>

            {/* Seção de Artistas */}
            <div>
                <input
                    type="text"
                    value={newArtista}
                    onChange={(e) => setNewArtista(e.target.value)}
                    placeholder="Novo Artista"
                />
                <input
                    type="text"
                    value={newLocal}
                    onChange={(e) => setNewLocal(e.target.value)}
                    placeholder="Local do Artista"
                />
                <button onClick={addArtista}>Adicionar Artista</button>
            </div>
            <ul>
                {artistas.length > 0 ? (
                    artistas.map((artista) => (
                        <li key={artista.id}>
                            {artista?.nome ? artista.nome : "Artista sem nome"} - {artista?.local || "Local desconhecido"} 
                            <button onClick={() => deleteArtista(artista.id)}>Excluir</button>
                        </li>
                    ))
                ) : (
                    <li>Carregando artistas...</li>
                )}
            </ul>

            {/* Seção de Albuns */}
            <div>
                <input
                    type="text"
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value)}
                    placeholder="Novo Álbum"
                />

                {/* Seletor de Artista */}
                <div>
                    <h3>Escolha um Artista:</h3>
                    <select
                        value={selectedArtista}
                        onChange={(e) => setSelectedArtista(e.target.value)}
                    >
                        <option value="">Selecione um Artista</option>
                        {artistas.length > 0 ? (
                            artistas.map((artista) => (
                                <option key={artista.id} value={artista.id}>
                                    {artista?.nome || "Nome desconhecido"}
                                </option>
                            ))
                        ) : (
                            <option>Carregando artistas...</option>
                        )}
                    </select>
                </div>

                {/* Seletor de Ano */}
                <div>
                    <h3>Escolha o Ano do Álbum:</h3>
                    <select
                        value={selectedAno}
                        onChange={(e) => setSelectedAno(e.target.value)}
                    >
                        <option value="">Selecione o Ano</option>
                        {[...Array(21)].map((_, index) => (
                            <option key={index} value={2024 - index}>
                                {2024 - index}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={addAlbum}>Adicionar Álbum</button>
            </div>
            <ul>
                {albuns.length > 0 ? (
                    albuns.map((album) => (
                        <li key={album.id}>
                            {album?.nome ? album.nome : "Álbum sem nome"} ({album.ano}) - 
                            {artistas.find(artista => artista.id === album.artista)?.nome || "Artista desconhecido"}
                            <button onClick={() => deleteAlbum(album.id)}>Excluir</button>
                        </li>
                    ))
                ) : (
                    <li>Carregando álbuns...</li>
                )}
            </ul>

            {/* Seção de Musicas */}
            <div>
                <input
                    type="text"
                    value={newMusica}
                    onChange={(e) => setNewMusica(e.target.value)}
                    placeholder="Nova Música"
                />

                {/* Seletor de Álbum */}
                <div>
                    <h3>Escolha um Álbum:</h3>
                    <select
                        value={selectedAlbum}
                        onChange={(e) => setSelectedAlbum(e.target.value)}
                    >
                        <option value="">Selecione um Álbum</option>
                        {albuns.length > 0 ? (
                            albuns.map((album) => (
                                <option key={album.id} value={album.id}>
                                    {album?.nome || "Álbum desconhecido"} ({album.ano})
                                </option>
                            ))
                        ) : (
                            <option>Carregando álbuns...</option>
                        )}
                    </select>
                </div>

                {/* Campo de segundos */}
                <div>
                    <input
                        type="number"
                        value={segundos}
                        onChange={(e) => setSegundos(e.target.value)}
                        placeholder="Segundos"
                    />
                </div>

                <button onClick={addMusica}>Adicionar Música</button>
            </div>
            <ul>
                {musicas.length > 0 ? (
                    musicas.map((musica) => (
                        <li key={musica.id}>
                            {musica.nome} ({musica.segundos}s)
                            <button onClick={() => deleteMusica(musica.id)}>Excluir</button>
                        </li>
                    ))
                ) : (
                    <li>Carregando músicas...</li>
                )}
            </ul>
        </div>
    );
}

export default App;
