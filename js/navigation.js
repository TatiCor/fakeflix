console.log("aca estamos");
searchBtn.addEventListener('click' , () => {
    location.hash = '#search='
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})

arrowBtn.addEventListener('click',  ()=> {
    location.hash = '#home'
})
const navigatior = () => {
    // leer hash
    console.log( { location }, 'location object');
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
    }
}

const homePage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    headerSection.style.background = ''; //poster de la peli no tiene que estar en esta sección.
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview()
    getCategoriesPreview()
    console.log("home");
}

const categoriesPage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    headerSection.style.background = ''; //poster de la peli no tiene que estar en esta sección.
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchBar.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const url = location.hash.split('='); // [category, id-name]
    url
    console.log('categories');
}

const movieDetailsPage = () => {
    headerSection.classList.add('header-container--long') // clase para movie detail
/*     headerSection.style.background = '';  */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.remove('inactive');

    console.log('movies');
}

const searchPage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    /*     headerSection.style.background = '';  */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white') // flecha de color
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchBar.classList.remove('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    

    console.log('search movies');
}

const trendsPage = () => {
    headerSection.classList.remove('header-container--long') // clase para movie detail
    /*     headerSection.style.background = '';  */
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white') // flecha de color
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchBar.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    console.log('estas viendo tendencias');
}

window.addEventListener('hashchange', navigatior, false);
window.addEventListener('DOMContentLoaded', navigatior, false);