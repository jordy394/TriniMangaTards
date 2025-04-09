const mangaData = {
    "About": "about.html",
    "Dragon Ball": "dragon_ball.html",
    "Frieren": "frieren.html",
    "Jujutsu Kaisen": "jujutsu_kaisen.html",
    "Attack On Titan": "attack_on_titan.html",
    "Demon Slayer": "demon_slayer.html",
    "One Punch Man": "one_punch_man.html",
    "Berserk": "berserk.html",
    "Code Geass": "code_geass.html",
    "Haikyuu": "haikyuu.html"
};

document.getElementById("search-button").addEventListener("click", function() {
    const searchQuery = document.getElementById("search-input").value;
    const mangaPage = mangaData[searchQuery];

    if (mangaPage) {
        window.location.href = mangaPage;
    } else {
        alert("Manga not found.");
    }
});

const stars = document.querySelectorAll('.star');
const averageRatingDisplay = document.getElementById('average-rating');

let ratings = []; 

function calculateAverageRating() {
    if (ratings.length === 0) {
        return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return (sum / ratings.length).toFixed(1);
}

function updateRatingDisplay() {
    averageRatingDisplay.textContent = calculateAverageRating();
}

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        ratings.push(rating); 
        updateRatingDisplay();

        
        stars.forEach(s => {
            if (parseInt(s.dataset.rating) <= rating) {
                s.textContent = '★';
            } else {
                s.textContent = '☆';
            }
        });

        
        console.log(`Rated: ${rating} stars`);
    });
});

updateRatingDisplay();