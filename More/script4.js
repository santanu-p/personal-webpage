document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');

    const button = document.getElementById('random-fact-btn');
    console.log(button); // Check if button is found

    if (button) {
        button.addEventListener('click', generateRandomFact);
    } else {
        console.error('Button not found');
    }

    function generateRandomFact() {
        const physicsFacts = [
            "A teaspoon of a neutron star weighs about 6 billion tons.",
            "Light from the Sun takes 8 minutes and 20 seconds to reach Earth.",
            "The universe is around 13.8 billion years old.",
            "Black holes are regions where gravity is so strong that not even light can escape.",
            "Electrons can behave both as particles and waves, a phenomenon known as wave-particle duality.",
            "A day on Venus is longer than a year on Venus.",
            "Time runs slower in stronger gravitational fields, known as time dilation."
        ];

        const randomIndex = Math.floor(Math.random() * physicsFacts.length);
        const randomFact = physicsFacts[randomIndex];
        document.getElementById('random-fact').textContent = randomFact;
        console.log('Random fact generated:', randomFact);
    }
});




// Interactive Facts Display
function showFact(topic) {
    let factText;
    switch (topic) {
        case 'quantum':
            factText = "Quantum mechanics is the study of very small particles, like electrons and photons.";
            break;
        case 'gravity':
            factText = "Gravity is a force that attracts two bodies towards each other, like the Earth and the Moon.";
            break;
        case 'blackholes':
            factText = "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape.";
            break;
        case 'relativity':
            factText = "Einstein's theory of relativity states that space and time are interconnected.";
            break;
        default:
            factText = "Select a topic to learn more!";
    }
    alert(factText);
}

// Search Filter for Facts
function searchFacts() {
    const input = document.getElementById('searchFacts').value.toLowerCase();
    const cards = document.querySelectorAll('.fact-card');

    cards.forEach(card => {
        const fact = card.textContent.toLowerCase();
        if (fact.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}




function changeAI() {
    // Get the selected AI option
    var selectedAI = document.getElementById("aiSelect").value;
    // Hide all AI divs
    var aiDivs = document.querySelectorAll(".ai-embed");
    aiDivs.forEach(function(div) {
        div.style.display = "none";
    });

    // Display the selected AI
    document.getElementById(selectedAI).style.display = "block";
}



let currentIndex = 0;
const videosPerBatch = 6;
let loading = false;

let activeTags = [];
let allVideos = [];

async function loadVideos() {
  const sheetID = '1DUz7dYzwqqI-h6JWjjyIRUHHQbbAVRC7PIRkwnO-p5U';
  const sheetName = 'Videos';
  const query = encodeURIComponent('SELECT A, B');
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows.slice(1); // Skip header row

    const container = document.getElementById('video-gallery');
    const tagFilter = document.getElementById('tag-filter');
    const tagSet = new Map();

    container.innerHTML = '';
    tagFilter.innerHTML = '';
    allVideos = [];
    currentIndex = 0;

    rows.forEach((row, index) => {

      const tags = row.c[0]?.v.toLowerCase() || '';
      const link = row.c[1]?.v || '';
      if (!link) return;

      let embedLink = "";
      try {
        const parsedURL = new URL(link);

        if (parsedURL.hostname.includes("youtube.com")) {
          const videoID = parsedURL.searchParams.get("v");
          const playlistID = parsedURL.searchParams.get("list");

          if (playlistID && !videoID) {
            embedLink = `https://www.youtube.com/embed/videoseries?list=${playlistID}`;
          } else if (videoID) {
            embedLink = `https://www.youtube.com/embed/${videoID}`;
          } else {
            embedLink = link;
          }

        } else if (parsedURL.hostname === "youtu.be") {
          const videoID = parsedURL.pathname.substring(1);
          embedLink = `https://www.youtube.com/embed/${videoID}`;
        } else {
          embedLink = link;
        }

      } catch {
        embedLink = link;
      }

      allVideos.push({ tags, embedLink, index });

      tags.split(' ').forEach(tag => {
        if (!tag) return;
        tagSet.set(tag, (tagSet.get(tag) || 0) + 1);
      });
    });

    tagSet.forEach((count, tag) => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn';
      btn.textContent = `#${tag} (${count})`;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => {
  btn.classList.toggle('active');
  if (btn.classList.contains('active')) {
    if (!activeTags.includes(tag)) activeTags.push(tag);
  } else {
    activeTags = activeTags.filter(t => t !== tag);
  }

  currentIndex = 0;
  document.getElementById('video-gallery').innerHTML = '';
  loadMoreVideos(); // This will now load from filteredVideos
});

      tagFilter.appendChild(btn);
    });

    loadMoreVideos(); // Initial load

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function renderVideos(batch) {
  const container = document.getElementById('video-gallery');

  batch.forEach(({ tags, embedLink }) => {
    const item = document.createElement('div');
    item.className = 'video-item fade-in'; // fade-in class
    item.setAttribute('data-tags', tags);
    item.innerHTML = `<iframe src="${embedLink}" loading="lazy" allowfullscreen></iframe>`;
    container.appendChild(item);
  });
}

function filterVideos() {
  const videoItems = document.querySelectorAll('.video-item');

  videoItems.forEach(video => {
    const videoTags = (video.dataset.tags || '').split(' ').filter(t => t);
    const matches = activeTags.every(tag => videoTags.includes(tag));
    if (activeTags.length === 0 || matches) {
      video.classList.remove('hidden');
    } else {
      video.classList.add('hidden');
    }
  });
}

function loadMoreVideos() {
  if (loading) return;
  loading = true;

  const container = document.getElementById('video-gallery');
  const spinner = document.getElementById('loading-spinner');
  spinner.style.display = 'block';

  // Apply tag filtering before slicing
  const filteredVideos = activeTags.length
    ? allVideos.filter(video => {
        const videoTags = video.tags.split(' ').filter(Boolean);
        return activeTags.every(tag => videoTags.includes(tag));
      })
    : allVideos;

  const nextBatch = filteredVideos.slice(currentIndex, currentIndex + videosPerBatch);
  if (nextBatch.length === 0) {
    spinner.style.display = 'none';
    loading = false;
    return;
  }

  setTimeout(() => {
    renderVideos(nextBatch);
    currentIndex += videosPerBatch;
    spinner.style.display = 'none';
    loading = false;
  }, 300);
}

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight + 100 >= docHeight) {
    loadMoreVideos();
  }
});

document.getElementById('clear-tags').addEventListener('click', () => {
  activeTags = [];
  document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
  currentIndex = 0;
  document.getElementById('video-gallery').innerHTML = '';
  loadMoreVideos();
});

document.getElementById('sort-options').addEventListener('change', e => {
  const value = e.target.value;
  let sorted = [...allVideos];
  if (value === 'newest') {
    sorted.reverse();
  } else if (value === 'oldest') {
    sorted.sort((a, b) => a.index - b.index);
  }
  currentIndex = 0;
  allVideos = sorted;
  document.getElementById('video-gallery').innerHTML = '';
  loadMoreVideos();
});

document.addEventListener('DOMContentLoaded', loadVideos);

