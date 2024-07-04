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


const getTrendingMoviesPreview = async () => {
    try {
        trendingPreviewList.textContent = "";
        const {data} = await api.get(`/trending/movie/week`);
        console.log("pelis " , data.results);
        const movies = data.results

        movies.forEach(movie => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container')

            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute(
                'src', 
                `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            )

            movieContainer.appendChild(movieImg)
            trendingPreviewList.appendChild(movieContainer)
        });
        
        console.log("tendencias ", movies);
    } catch(e) {
        console.error("error en la petición", e.message)
    }
} 


const getCategoriesPreview = async() => {
    try {
        categoriesPreviewList.textContent = "" // limpio container para evitar duplicación de contenido
        const {data} = await api.get(`/genre/movie/list`);
        const categories = data.genres
        
        console.log("categorias ", categories);

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
            categoriesPreviewList.appendChild(categoryContainer)
        });

    } catch (error) {
        throw new Error ('Error categorías no disponible.' + error.message);
    }
}

const getMoviesByCategory = async (id) => {
    try {
        const {data} = await api.get(`/discover/movie`, {
            params: {
                with_genres: id
            }
        });
        const movies = data.results;
        genericListSection.textContent = ''

        movies.forEach((movie) => {
            const movieContainer = document.createElement('div');
            const movieImg = document.createElement('img');

            movieContainer.classList.add('movie-container');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute(
                'src',
                `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            )

            movieContainer.appendChild(movieImg);
            genericListSection.appendChild(movieContainer);
            
        })
        console.log("movies" , movies);
        
    } catch (error) {
        throw new Error ('Error, no disponible momentáneamente.' + error.message);
    }
} 