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
    switch(topic) {
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



const tagButtons = document.querySelectorAll('.tag-btn');
let activeTags = [];

tagButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const tag = button.dataset.tag;

    if (button.classList.contains('active')) {
      activeTags.push(tag);
    } else {
      activeTags = activeTags.filter(t => t !== tag);
    }

    filterVideos();
  });
});

function filterVideos() {
  const videoItems = document.querySelectorAll('.video-item'); // <- Moved here to update live
  videoItems.forEach(video => {
    const videoTags = (video.dataset.tags || "").split(' ');
    const matches = activeTags.every(tag => videoTags.includes(tag));

    if (matches || activeTags.length === 0) {
      video.classList.remove('hidden');
    } else {
      video.classList.add('hidden');
    }
  });
}




    async function loadVideos() {
  const sheetID = '1DUz7dYzwqqI-h6JWjjyIRUHHQbbAVRC7PIRkwnO-p5U';
  const sheetName = 'Videos'; // Make sure this matches your tab name
  const query = encodeURIComponent('SELECT A, B');
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const container = document.getElementById('video-gallery');
    container.innerHTML = ""; // Clear existing content

    rows.forEach(row => {
      const tags = row.c[0]?.v || '';
      const link = row.c[1]?.v || '';
      let embedLink = "";

      if (!link) return;

      try {
        const parsedURL = new URL(link);

        // 1. YouTube watch?v=abc123
        if (parsedURL.hostname.includes("youtube.com") && parsedURL.searchParams.get("v")) {
          const videoID = parsedURL.searchParams.get("v");
          embedLink = `https://www.youtube.com/embed/${videoID}`;
        }

        // 2. youtu.be/abc123
        else if (parsedURL.hostname === "youtu.be") {
          const videoID = parsedURL.pathname.substring(1); // remove leading /
          embedLink = `https://www.youtube.com/embed/${videoID}`;
        }

        // 3. Already an embed link or from another platform (Vimeo, mp4, etc.)
        else {
          embedLink = link;
        }

        // Fallback check
        if (!embedLink.startsWith("http")) return;

        const item = document.createElement('div');
        item.className = 'video-item';
        item.setAttribute('data-tags', tags);
        item.innerHTML = `<iframe src="${embedLink}" allowfullscreen></iframe>`;
        container.appendChild(item);
      } catch (e) {
        console.warn("Invalid video URL:", link);
      }
    });

  } catch (error) {
    console.error('Error loading videos:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadVideos);
