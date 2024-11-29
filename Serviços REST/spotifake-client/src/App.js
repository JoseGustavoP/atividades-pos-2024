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
        if (newArtista.trim()) {
            await api.createArtista({ nome: newArtista, local: "Desconhecido", ano_criacao: 2024 });
            setNewArtista("");
            fetchArtistas();
        }
    };

    const deleteArtista = async (id) => {
        await api.deleteArtista(id);
        fetchArtistas();
    };

    // Funções para Albuns
    const addAlbum = async () => {
        if (newAlbum.trim()) {
            await api.createAlbum({ nome: newAlbum, ano_lancamento: 2024 });
            setNewAlbum("");
            fetchAlbuns();
        }
    };

    const deleteAlbum = async (id) => {
        await api.deleteAlbum(id);
        fetchAlbuns();
    };

    // Funções para Musicas
    const addMusica = async () => {
        if (newMusica.trim()) {
            await api.createMusica({ nome: newMusica, duracao: 3.5 });
            setNewMusica("");
            fetchMusicas();
        }
    };

    const deleteMusica = async (id) => {
        await api.deleteMusica(id);
        fetchMusicas();
    };

    return (
        <div className="App">
            <h1>Spotifake</h1>

            {/* Artistas */}
            <div>
                <input
                    type="text"
                    value={newArtista}
                    onChange={(e) => setNewArtista(e.target.value)}
                    placeholder="Novo Artista"
                />
                <button onClick={addArtista}>Adicionar Artista</button>
            </div>
            <ul>
                {artistas.map((artista) => (
                    <li key={artista.id}>
                        {artista.nome}{" "}
                        <button onClick={() => deleteArtista(artista.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            {/* Albuns */}
            <div>
                <input
                    type="text"
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value)}
                    placeholder="Novo Álbum"
                />
                <button onClick={addAlbum}>Adicionar Álbum</button>
            </div>
            <ul>
                {albuns.map((album) => (
                    <li key={album.id}>
                        {album.nome}{" "}
                        <button onClick={() => deleteAlbum(album.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            {/* Musicas */}
            <div>
                <input
                    type="text"
                    value={newMusica}
                    onChange={(e) => setNewMusica(e.target.value)}
                    placeholder="Nova Música"
                />
                <button onClick={addMusica}>Adicionar Música</button>
            </div>
            <ul>
                {musicas.map((musica) => (
                    <li key={musica.id}>
                        {musica.nome}{" "}
                        <button onClick={() => deleteMusica(musica.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
