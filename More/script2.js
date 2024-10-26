  let slideIndex = 1; // Start from the first actual image (not the cloned ones)
  const slides = document.querySelectorAll('.mySlides');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length - 2; // Exclude the cloned ones
  const sliderTrack = document.querySelector('.slider-track');
  
  // Set initial position (showing the actual first image)
  sliderTrack.style.transform = `translateX(-100%)`;
  
  function showSlides(index) {
    slideIndex = index;
    
    // If it's the cloned last slide (first image), transition to actual first slide
    if (index === totalSlides + 1) {
      sliderTrack.style.transition = "none"; // Disable transition for instant move
      sliderTrack.style.transform = `translateX(-100%)`; // Move to the real first slide
      slideIndex = 1;
      setTimeout(() => {
        sliderTrack.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
      }, 20);
    }
  
    // If it's the cloned first slide (last image), transition to actual last slide
    else if (index === 0) {
      sliderTrack.style.transition = "none";
      sliderTrack.style.transform = `translateX(-${totalSlides * 100}%)`; // Move to the real last slide
      slideIndex = totalSlides;
      setTimeout(() => {
        sliderTrack.style.transition = "transform 0.5s ease-in-out";
      }, 20);
    }
  
    const offset = -slideIndex * 100; // Calculate the translateX percentage
    sliderTrack.style.transform = `translateX(${offset}%)`;
  
    // Update active dot (excluding the cloned slides)
    dots.forEach((dot, i) => {
      dot.className = dot.className.replace(" active", "");
      if (i === slideIndex - 1) dot.className += " active"; // Update correct dot
    });
  }
  
  function nextSlide() {
    showSlides(slideIndex + 1);
  }
  
  // Run the slide show automatically every 3 seconds
  let autoSlide = setInterval(nextSlide, 3000);
  
  // Allow manual navigation by clicking on dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoSlide); // Stop automatic slide if user manually clicks
      showSlides(i + 1); // Slide to the correct one
      autoSlide = setInterval(nextSlide, 3000); // Resume auto slide after clicking
    });
  });
  
  // Initial dot
  showSlides(slideIndex);





  const rssFeeds = [
    'https://www.physicstoday.org/rss',
    'https://www.sciencenews.org/feed/',
    'https://www.sciencedaily.com/rss/top/science.xml',
    'https://www.nasa.gov/rss/dyn/breaking_news.rss',
    'https://arstechnica.com/science/feed/',
    'https://www.newscientist.com/feed/home/',
    'https://phys.org/rss-feed/breaking/',
    'https://www.nature.com/nature.rss'
];

// Define a set of valid topics or keywords
const validTopicsSet = new Set([
    'quantum', 'gravitational', 'waves', 'exoplanet', 'discovery',
    'dark', 'matter', 'black', 'hole', 'science', 'physics',
    'astrophysics', 'technology', 'innovation', 'research', 'biology',
    'chemistry', 'medicine', 'genetics', 'environment', 'energy', 'black hole'
    // Add more valid topics as needed
]);

const newsItems = []; // Store all news items for search functionality

const fetchRSSFeeds = async () => {
    let output = '';
    const trendingNewsCounts = {};

    for (const feed of rssFeeds) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`);
            const data = await response.json();

            if (data.status === 'ok') {
                data.items.forEach(item => {
                    newsItems.push(item); // Store each news item

                    output += `
                        <div class="news-item">
                            <img src="${item.enclosure ? item.enclosure.link : 'default-image.jpg'}" alt="News Image">
                            <h2>${item.title}</h2>
                            <p>${item.description}</p>
                            <a href="${item.link}" class="read-more" target="_blank">Read More</a>
                        </div>
                    `;

                    // Count occurrences of valid words in titles for trending news
                    const words = item.title.split(' ');
                    words.forEach(word => {
                        const cleanedWord = word.replace(/[^\w]/g, '').toLowerCase();
                        if (validTopicsSet.has(cleanedWord) && cleanedWord.length > 3) { // Only consider valid words longer than 3 characters
                            trendingNewsCounts[item.link] = (trendingNewsCounts[item.link] || 0) + 1;
                        }
                    });
                });
            } else {
                console.error('Error fetching feed:', data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    document.querySelector('.news-grid').innerHTML = output;

    // Determine trending news based on the most frequent valid words
    const trendingNews = Object.entries(trendingNewsCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count descending
        .slice(0, 5) // Get top 5 trending news links
        .map(([link]) => newsItems.find(item => item.link === link)); // Find the corresponding news item

    updateTrendingNews(trendingNews);
};

const updateTrendingNews = (trendingNews) => {
    const trendingList = document.getElementById('trending-topics');
    trendingList.innerHTML = ''; // Clear existing topics

    trendingNews.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.title; // Show the title of the trending news
        li.appendChild(a);
        trendingList.appendChild(li);
    });
};

// Search functionality
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Get the input value and convert to lowercase
    const filteredItems = newsItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm)
    );

    // Clear previous items
    document.querySelector('.news-grid').innerHTML = '';

    // Render filtered items
    filteredItems.forEach(item => {
        const newsItem = `
            <div class="news-item">
                <img src="${item.enclosure ? item.enclosure.link : 'default-image.jpg'}" alt="News Image">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <a href="${item.link}" class="read-more" target="_blank">Read More</a>
            </div>
        `;
        document.querySelector('.news-grid').innerHTML += newsItem;
    });

    // Clear the search input
    searchInput.value = '';
});

fetchRSSFeeds();











//------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
