

const API_KEY = "5ad81eac7b8af6924569c3335052e504"
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWQ4MWVhYzdiOGFmNjkyNDU2OWMzMzM1MDUyZTUwNCIsInN1YiI6IjY2NzFjZjJjMmFlMDU4ZmMwOTBlMDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tItOaiHUKvKfdp4FKoaG_u2Xn3LWuFqYzRlIsKpz2cE'

console.log('Holi practiquemos apis')


const getTrendingMovies = async () => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const data = await res.json();
        const movies = data.results

        movies.forEach(movie => {
            const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container')

            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute(
                'src', 
                `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            )

            movieContainer.appendChild(movieImg)
            trendingPreviewContainer.appendChild(movieContainer)
        });
        
        console.log("tendencias ", movies);
    } catch(e) {
        console.error("error en la petición", e.message)
    }
} 
getTrendingMovies()

const getCategoriesPreview = async() => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        const data =  await res.json();
        const categories = data.genres
        
        console.log("categorias ", categories);

        categories.forEach(category => {
            const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreviewList');
            
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container');

            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title')
            categoryTitle.setAttribute('id', category.id)
            const categoryTextTitle = document.createTextNode(category.name)

            categoryTitle.appendChild(categoryTextTitle)
            categoryContainer.appendChild(categoryTitle)
            previewCategoriesContainer.appendChild(categoryContainer)
        });

    } catch (error) {
        throw new error ('Error categorías no disponible.' + error.message)
    }
}

getCategoriesPreview()