const API_KEY = '0f9eb964b198811280b78448ed7cc53d';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

let favoriteMovies = []; // Array para armazenar os filmes favoritos

// Função para buscar filmes com base em um endpoint da API
async function fetchMovies(endpoint) {
    const url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results) {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

// Função para exibir os filmes na tela
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Limpa a lista de filmes exibidos

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview.slice(0, 100)}...</p>
            <p><strong>Data:</strong> ${movie.release_date}</p>
            <button onclick="addToList('${movie.title}', '${movie.poster_path}', '${movie.overview}')">Adicionar à Lista</button>
        `;

        movieList.appendChild(movieElement);
    });
}

// Função para adicionar filme à lista de favoritos
function addToList(title, poster, overview) {
    const movie = { title, poster, overview };

    // Verifica se o filme já está na lista
    if (!favoriteMovies.some(f => f.title === movie.title)) {
        favoriteMovies.push(movie);
        renderFavoriteMovies(); // Atualiza a exibição da lista de favoritos
    }
}

// Função para renderizar os filmes favoritos na "Minha Lista"
function renderFavoriteMovies() {
    const favoriteMoviesList = document.getElementById('favorite-movies');
    favoriteMoviesList.innerHTML = ''; // Limpa a lista de favoritos

    favoriteMovies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster}" alt="${movie.title}" width="50">
            <span>${movie.title}</span>
        `;
        favoriteMoviesList.appendChild(listItem);
    });
}

// Ações da barra lateral
document.getElementById('popular').addEventListener('click', () => {
    fetchMovies('/movie/popular');
});

document.getElementById('top-rated').addEventListener('click', () => {
    fetchMovies('/movie/top_rated');
});

document.getElementById('now-playing').addEventListener('click', () => {
    fetchMovies('/movie/now_playing');
});

document.getElementById('upcoming').addEventListener('click', () => {
    fetchMovies('/movie/upcoming');
});

// Pesquisa de filmes
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    fetchMovies(`/search/movie?query=${query}`);
});

// Carregar filmes populares inicialmente
fetchMovies('/movie/popular');
