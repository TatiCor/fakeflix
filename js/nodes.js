const selector = (element) => document.querySelector(element);

// Sections 
const headerSection = selector('#header');
const trendingPreviewSection = selector('#trendingPreview');
const categoriesPreviewSection = selector('#categoriesPreview');
const genericListSection = selector('#genericList');
const movieDetailSection = selector('#movieDetail');
const likedMoviesSection = selector('#liked');

// List & Containers
const searchBar = selector('#searchBar');
const trendingPreviewList = selector('.trendingPreview-movieList');
const categoriesPreviewList = selector('.categoriesPreviewList');
const movieDetailCategoriesList = selector('#movieDetail .categories-list');
const relatedMoviesContainer = selector('.relatedMovies-scrollContainer');
const likedMoviesContainer = selector('.liked-movieList')
const languageContainer = selector('#languagesContainer')

// Elements
const headerTitle = selector('.header-title');
const arrowBtn = selector('.header-arrow');
const headerCategoryTitle = selector('.header-title--categoryView');

const searchFormInput = selector('#searchBar input');
const searchBtn = selector('#searchBtn');

const trendingBtn = selector('.trendingPreview-btn');

const movieDetailTitle = selector('.movieDetail-title');
const movieDetailDescription = selector('.movieDetail-description');
const movieDetailScore = selector('.movieDetail-score');
const languageSelector = selector('#languageSelector')