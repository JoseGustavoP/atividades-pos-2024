class APIWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchData(endpoint, method = "GET", data = null) {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseURL}/${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Métodos para Artistas
    getArtistas() {
        return this.fetchData("artistas/");
    }

    createArtista(data) {
        return this.fetchData("artistas/", "POST", data);
    }

    updateArtista(id, data) {
        return this.fetchData(`artistas/${id}/`, "PUT", data);
    }

    deleteArtista(id) {
        return this.fetchData(`artistas/${id}/`, "DELETE");
    }

    // Métodos para Albuns
    getAlbuns() {
        return this.fetchData("albuns/");
    }

    createAlbum(data) {
        return this.fetchData("albuns/", "POST", data);
    }

    updateAlbum(id, data) {
        return this.fetchData(`albuns/${id}/`, "PUT", data);
    }

    deleteAlbum(id) {
        return this.fetchData(`albuns/${id}/`, "DELETE");
    }

    // Métodos para Musicas
    getMusicas() {
        return this.fetchData("musicas/");
    }

    createMusica(data) {
        return this.fetchData("musicas/", "POST", data);
    }

    updateMusica(id, data) {
        return this.fetchData(`musicas/${id}/`, "PUT", data);
    }

    deleteMusica(id) {
        return this.fetchData(`musicas/${id}/`, "DELETE");
    }
}

export default APIWrapper;
