const API_URL = 'http://127.0.0.1:8000';
const API_TOKEN = 'f0c7456a04cbadc07c1625a8935dc7984fce4804';

export default class API {
    static async loginUser(body) {
        const response = await fetch(`${API_URL}/auth/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },body:JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }
    static async fetchMovies() {
        const response = await fetch(`${API_URL}/api/movies/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }
    static async rateMovie(movie_id,body) {
        const response = await fetch(`${API_URL}/api/movies/${movie_id}/rate_movie/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            },body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }
    static async getMovie(movie_id) {
        const response = await fetch(`${API_URL}/api/movies/${movie_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }
    static async updateMovie(movie_id, body) {
        const response = await fetch(`${API_URL}/api/movies/${movie_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Update Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }

    static async createMovie(body) {  // Removed movie_id from parameters
        const response = await fetch(`${API_URL}/api/movies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Create Movie Error:", errorData);
            return null;
        }

        return await response.json();
    }
    static async removeMovie(movie_id) {  
        const response = await fetch(`${API_URL}/api/movies/${movie_id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${API_TOKEN}`
            }
        });

        if (!response.ok) {
            
            return false;
        }

        return true;
    }
}
