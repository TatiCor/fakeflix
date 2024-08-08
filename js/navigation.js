let maxPage;
let page = 1;
let infiniteScroll;

// Event Listeners
searchBtn.addEventListener('click' , () => {
    const value = searchFormInput.value.trim();

    if (value) {
        location.hash = `#search=${value}`
        getMoviesBySearch(value);
    } 
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})
arrowBtn.addEventListener('click', () => {
    window.history.back();
});

// Navigation fx
const navigator = () => {
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll);
        infiniteScroll = undefined;
    }

    // leer hash

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    };

    document.body.scrollTop = 0;
    window.scrollTo(0,0);

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll)
    }
}

// Event listener for page load and hash change
window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);

// Page Handlers
const homePage = () => {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''; 
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesSection.classList.remove('inactive');
    languageContainer.classList.remove('inactive')
    languageSelector.classList.remove('inactive');
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

const categoriesPage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    headerSection.style.background = ''; //poster de la peli no tiene que estar en esta sección.
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchBar.classList.add('inactive');
    languageSelector.classList.add('inactive');
    languageContainer.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    
    const url = location.hash.split('=') // [category, id-name]
    const [_, categoryData] = url;
    const [categoryId, categoryName] = categoryData.split('-')
    const decodedName = decodeURIComponent(categoryName.replace(/\+/g, ' '));
    headerCategoryTitle.textContent = decodedName;
    
    getMoviesByCategory(categoryId);
    infiniteScroll = handleInfiniteScroll(`/discover/movie?with_genres=${categoryId}`, genericListSection, {lazyLoad: true});
    
}

const movieDetailsPage = () => {
    headerSection.classList.add('header-container--long') 
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.add('inactive')
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    likedMoviesSection.classList.add('inactive');
    languageSelector.classList.add('inactive');
    languageContainer.classList.add('inactive')

    const url = location.hash.split('=');
    const [_, movieId] = url;
    
    getMovieById(movieId);
}

const searchPage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    /*     headerSection.style.background = '';  */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white') // flecha de color
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    languageSelector.classList.add('inactive');
    
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query, page);
    infiniteScroll = handleInfiniteScroll(`/search/movie?query=${query}`, genericListSection, {lazyLoad: true})
}

const trendsPage = () => {
    headerSection.classList.remove('header-container--long')
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white') 
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchBar.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    languageSelector.classList.add('inactive');

    headerCategoryTitle.textContent = "Tendencias"

    getTrendingMovies();
    
    infiniteScroll = handleInfiniteScroll(`/trending/movie/week`, genericListSection, { lazyLoad: true });
}

