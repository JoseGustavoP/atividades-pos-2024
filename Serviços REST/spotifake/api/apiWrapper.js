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

    // Métodos para cada endpoint
    getArtistas() {
        return this.fetchData("artistas/");
    }

    getAlbuns() {
        return this.fetchData("albuns/");
    }

    getMusicas() {
        return this.fetchData("musicas/");
    }

    createArtista(data) {
        return this.fetchData("artistas/", "POST", data);
    }

    createAlbum(data) {
        return this.fetchData("albuns/", "POST", data);
    }

    createMusica(data) {
        return this.fetchData("musicas/", "POST", data);
    }

    updateArtista(id, data) {
        return this.fetchData(`artistas/${id}/`, "PUT", data);
    }

    deleteArtista(id) {
        return this.fetchData(`artistas/${id}/`, "DELETE");
    }
}

export default APIWrapper;
