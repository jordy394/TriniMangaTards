document.addEventListener('DOMContentLoaded', function() {
    const recentMangaList = document.getElementById('recent-manga-list');
    let recentManga = JSON.parse(localStorage.getItem('recentManga')) || [];

    function updateRecentManga() {
        recentMangaList.innerHTML = '';
        recentManga.forEach(manga => {
            const mangaItem = document.createElement('div');
            mangaItem.classList.add('manga-item');
            mangaItem.innerHTML = `
                <a href="${manga.link}"><img src="${manga.image}" alt="${manga.title}"></a>
                <a href="${manga.link}"><h3>${manga.title}</h3></a>
            `;
            recentMangaList.appendChild(mangaItem);
        });
        const seeAll = document.createElement('a');
        seeAll.href = "pages/recent.html";
        seeAll.classList.add('see-all');
        seeAll.textContent = "See All";
        recentMangaList.appendChild(seeAll);
    }

    function addToRecentManga(manga) {
        // Prevent duplicates
        if (!recentManga.some(item => item.id === manga.id)) {
            recentManga.unshift(manga);
            // Limit to 3 items
            recentManga = recentManga.slice(0, 3);
            localStorage.setItem('recentManga', JSON.stringify(recentManga));
            updateRecentManga();
        }
    }

    // Add click event listeners to manga items
    document.querySelectorAll('.manga-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const mangaId = this.dataset.mangaId;
            const image = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const link = this.querySelector('a').href;

            addToRecentManga({
                id: mangaId,
                image: image,
                title: title,
                link: link
            });
            window.location.href = link;
        });
    });

    // Initial update
    updateRecentManga();
});