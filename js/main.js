const API_KEY = "5ad81eac7b8af6924569c3335052e504"

// Data
let selectedLanguage = languageSelector.value.startsWith('es') ? 'es-ES' : 'en-US';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': API_KEY,
        'language': selectedLanguage,
    },
    headers: {
        'Content-Type': 'application/json',
        }
})

if (languageSelector.value == 'es') {
    api.params.language = languageSelector.value
}

//LocalStorage
const likedMoviesList = () => {
    const item = localStorage.getItem('liked_movies')
    const parsedItem = JSON.parse(item);
    let movies;

    if (parsedItem) {
        movies = parsedItem;
        
    } else {
        movies = {};
    }

    return movies;
}

const likeMovie = (movie) => {
    const likedMovies = likedMoviesList();

    if (likedMovies[movie.id]) {
        delete likedMovies[movie.id];
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
    getLikedMovies();
}

// Helpers
// Intersection Observer 
let lazyLoading = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            const img = entry.target
            const url = entry.target.getAttribute('data-img');
            img.setAttribute('src', url);
            observer.unobserve(img)
        }
    })
});

const createMovies = (
    movies, container, {
    lazyLoad = false, 
    clean = true  
    } = {},
) => {
    if (clean) {
        container.innerHTML = "";
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', 
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );

        movieImg.addEventListener('click', ()=> {
            location.hash = `#movie=${movie.id}`
        })
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
                'src', 
                '../assets/file-not-found.jpg'
            );
            const movieTitle = document.createElement('h3');
            movieTitle.classList.add('placeholderImg')
            movieTitle.textContent = `${movie.title}`;
            movieContainer.appendChild(movieTitle)
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');

        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');

        movieBtn.addEventListener('click', (e) =>{ 
            e.stopPropagation();
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);            
        })
        
        if (lazyLoad) {
            lazyLoading.observe(movieImg);
        } else {
            movieImg.onload = () => {
                movieImg.classList.add('lazy-loaded');
            };
        }

        movieContainer.appendChild(movieImg)
        movieContainer.appendChild(movieBtn)
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
        createMovies(movies, trendingPreviewList, {lazyLoad: true});
}; 


const getCategoriesPreview = async() => {
    const {data} = await fetchData(`/genre/movie/list`);
    const categories = data.genres
    createCategories(categories, categoriesPreviewList);
       // categoriesPreviewList para usar mas adelante
};

const getMoviesByCategory = async (id, page = 1) => { 
    const {data} = await api.get(`/discover/movie`, {
            params: {
                with_genres: id,
                page
            }
        });
        const movies = data.results;
        createMovies(movies, genericListSection, {lazyLoad: true});
        maxPage = data.total_pages;
};

const getMoviesBySearch = async (query, page = 1) => {
    const {data} = await api.get(`/search/movie`, {
        params: {
            query,
            page
        }
    });
    
    const movies = data.results;
    createMovies(movies, genericListSection,{lazyLoad: true});
    maxPage = data.total_pages;
};

const getTrendingMovies = async() => {
    const {data} = await fetchData(`/trending/movie/week`);
    
    maxPage = data.total_pages;
    const movies = data.results
    createMovies(movies, genericListSection, {lazyLoad: true});
}

const getPaginatedMovies = async (
    url,
    container,
    options = {},
    page = 1
) => {
    const { data } = await api(url, {
        params: { page },
    });
    const movies = data.results;
    createMovies(movies, container, { lazyLoad: true, clean: false });
}

const handleInfiniteScroll = (url, container, options) => {
    return async () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 100;
        const pageIsNotMax = page < maxPage;
        
        if (scrollIsBottom && pageIsNotMax) {
            window.removeEventListener('scroll', infiniteScroll);
            await getPaginatedMovies(url, container, options, page);
            page++;
            window.addEventListener('scroll', infiniteScroll, {passive: false});
        }
    }
}
const getMovieById = async(id) => {
    const { data: movie } = await fetchData(`/movie/${id}`);
    const movieImageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%,
            rgba(0, 0, 0, 0) 29.17%
        ),   
        url(${movieImageURL}) no-repeat 
    `;

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.innerHTML = ""
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average
    
    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id)
}

const getRelatedMoviesById = async(id) => {
    const { data } = await fetchData(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer, {lazyLoad: true})
}

const getLikedMovies = () => {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies)

    createMovies(moviesArray, likedMoviesContainer, {lazyLoad: true, clean: true})
}

const translations = {
    'en-US': {
        trending: 'Trending',
        seeMore: 'See more',
        categories: 'Categories',
        favoriteMovies: 'Favorite Movies',
        similarMovies: 'Similar Movies'
    },
    'es-ES': {
        trending: 'Tendencias',
        seeMore: 'Ver más',
        categories: 'Categorías',
        favoriteMovies: 'Películas favoritas',
        similarMovies: 'Películas similares'
    }
};

const updateTexts = (language) => {
    selector('.trendingPreview-title').textContent = translations[language].trending;
    selector('.trendingPreview-btn').textContent = translations[language].seeMore;    
    selector('.categoriesPreview-title').textContent = translations[language].categories;
    selector('.liked-title').textContent = translations[language].favoriteMovies;
    selector('.relatedMovies-title').textContent = translations[language].similarMovies;

}

languageSelector.addEventListener('change', (e)=> {
    const selectedLang = e.target.value;
    
    updateTexts(selectedLang)
} )

languageSelector.addEventListener('change', (e) => {
    const selectedLang = e.target.value.startsWith('es') ? 'es-ES' : 'en-US';
    api.defaults.params['language'] = selectedLang;
    updateTexts(selectedLang);
    getCategoriesPreview()

});

document.addEventListener('DOMContentLoaded', getLikedMovies);