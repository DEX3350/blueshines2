// Load the translations from the JSON file
const loadTranslations = async () => {
    const response = await fetch('./translations.json');
    const translations = await response.json();
    return translations;
};

// Set the initial language based on the query parameter
const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang') || 'en';
let translations = {};

// Function to translate the elements
const translateElements = () => {
    // Get the elements that need translation
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    // Translate each element
    elementsToTranslate.forEach((element) => {
        const translationKey = element.dataset.translate;
        const translation = translations[language][translationKey];
        if (translation) {
            element.textContent = translation;
        }
    });
};

// Function to handle scrolling and change header opacity
const handleScroll = () => {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    const headerOpacity = scrollY > 100 ? 0.7 : 1; // Adjust the opacity value (0.7 in this case) as needed

    header.style.backgroundColor = `rgba(128, 128, 128, ${headerOpacity})`;
};

// Function to adjust the logo size on scrolling
const adjustLogoSize = () => {
    const logo = document.getElementById('logo');

    if (window.scrollY > 50) { // Adjust the value (50 in this case) as needed to determine when to change the logo size
        logo.style.width = '80px'; // Adjust the size as needed
    } else {
        logo.style.width = '150px'; // Set the original size when scrolling back to the top
    }
};

// Async function to handle both logo size adjustment and translations
const initializePage = async () => {
    // Load translations and initialize the page
    translations = await loadTranslations();
    translateElements();

    // Add scroll event listener to adjust logo size and header opacity
    window.addEventListener('scroll', adjustLogoSize);
    window.addEventListener('scroll', handleScroll);
};

// Call the initializePage function to start the initialization process
initializePage();
