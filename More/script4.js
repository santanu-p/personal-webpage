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
