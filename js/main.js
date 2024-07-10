const API_KEY = "5ad81eac7b8af6924569c3335052e504"
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWQ4MWVhYzdiOGFmNjkyNDU2OWMzMzM1MDUyZTUwNCIsInN1YiI6IjY2NzFjZjJjMmFlMDU4ZmMwOTBlMDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tItOaiHUKvKfdp4FKoaG_u2Xn3LWuFqYzRlIsKpz2cE'

console.log('Practico APIs. Fin.')
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': API_KEY
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
})

// Helpers 
const createMovies = (movies, container) => {
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', ()=> {
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src', 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        )
        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
    });
};

const createCategories = (categories, container) => {
    container.innerHTML = "";

    categories.forEach(category => {            
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', category.id)
        const categoryTextTitle = document.createTextNode(category.name)
        categoryTitle.addEventListener('click', () => {
            const categoryName = category.name
            const ubicacion = location.hash = `category=${category.id}-${categoryName.toLowerCase()}`
            console.log(ubicacion, "location");
            
        })

        categoryTitle.appendChild(categoryTextTitle)
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
    });
};

const fetchData = async(url) => {
    try {
        const response = await api.get(url);
        return response;
    } catch (error) {
        throw new Error (`Error en la petición ${error.message}`)
    }
};

const getTrendingMoviesPreview = async () => {
        const {data} = await fetchData(`/trending/movie/week`);
        const movies = data.results;
        createMovies(movies, trendingPreviewList);
}; 


const getCategoriesPreview = async() => {
    const {data} = await fetchData(`/genre/movie/list`);
    const categories = data.genres
    createCategories(categories, categoriesPreviewList);
       // categoriesPreviewList para usar mas adelante
};

const getMoviesByCategory = async (id) => {
        const {data} = await api.get(`/discover/movie`, {
            params: {
                with_genres: id
            }
        });
        const movies = data.results;
        createMovies(movies, genericListSection);
};

const getMoviesBySearch = async (query) => {
    const {data} = await api.get(`/search/movie`, {
        params: {
            query
        }
    });
    const movies = data.results;
    createMovies(movies, genericListSection);
};

const getTrendingMovies = async() => {
    const {data} = await fetchData(`/trending/movie/week`);
    const movies = data.results
    createMovies(movies, genericListSection);
}

const getMovieById = async(id) => {
    const { data: movie } = await fetchData(`/movie/${id}`);
    const movieImageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.background = `
        url(${movieImageURL})
        
        `
    console.log(movie);
    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList)

}