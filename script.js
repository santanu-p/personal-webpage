//javascript for navigation bar effects on scroll
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 0);
  });
  
  //javascript for responsive navigation sidebar menu
  const menuBtn = document.querySelector(".menu-btn");
  const navigation = document.querySelector(".navigation");
  const navigationItems = document.querySelectorAll(".navigation a");
  
  menuBtn.addEventListener("click",  () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
  });
  
  // Modify the click event for navigation items
  navigationItems.forEach((navigationItem) => {
    navigationItem.addEventListener("click", (event) => {
      // Only close the menu if the clicked item is not the "More" dropdown button
      if (!event.target.closest('#more-btn')) {
        menuBtn.classList.remove("active");
        navigation.classList.remove("active");
      }
    });
  });
  
  // Dropdown menu behavior (existing code)
  document.getElementById('more-btn').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
  
      // Toggle the visibility of the dropdown
      var dropdownContent = document.getElementById('dropdown-menu');
      var caretIcon = document.getElementById('caret-icon');
  
      if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
          caretIcon.classList.remove('rotate-icon'); // Remove rotation when closed
      } else {
          dropdownContent.classList.add('show');
          caretIcon.classList.add('rotate-icon'); // Add rotation when opened
      }
  });
  
  // Prevent closing when clicking inside the dropdown
  document.getElementById('dropdown-menu').addEventListener('click', function(event) {
      event.stopPropagation(); // Stop the event from bubbling up to the document
  });
  
  // Close the dropdown when clicking outside
  window.addEventListener('click', function(event) {
      var dropdownContent = document.getElementById('dropdown-menu');
      var caretIcon = document.getElementById('caret-icon');
      var dropdownButton = document.getElementById('more-btn');
  
      // Check if the click target is outside the dropdown and button
      if (!dropdownContent.contains(event.target) && !dropdownButton.contains(event.target)) {
          dropdownContent.classList.remove('show');
          caretIcon.classList.remove('rotate-icon'); // Close the dropdown and reset icon
      }
  });
  
  //javascript for scroll to top button
  const scrollBtn = document.querySelector(".scrollToTop-btn");
  
  window.addEventListener("scroll", function(){
    scrollBtn.classList.toggle("active", window.scrollY > 500);
  });
  
  //javascript for scroll back to top on click scroll-to-top button
  scrollBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  
  //javascript for reveal website elements on scroll
  window.addEventListener("scroll", reveal);
  
  function reveal(){
    var reveals = document.querySelectorAll(".reveal");
  
    for(var i = 0; i < reveals.length; i++){
      var windowHeight = window.innerHeight;
      var revealTop = reveals[i].getBoundingClientRect().top;
      var revealPoint = 50;
  
      if(revealTop < windowHeight - revealPoint){
        reveals[i].classList.add("active");
      }
    }
  }
  
  
  
  
      // Get the modal
      var modal = document.getElementById("educationModal");
  
      // Get the button that opens the modal
      var btn = document.getElementById("learnMoreBtn");
  
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close-btn")[0];
  
      // When the user clicks the button, open the modal 
      btn.onclick = function() {
          modal.style.display = "block";
      }
  
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }
  
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const animatedText = document.getElementById('animated-text');
    const fullText = "Physics."; // The text to animate
    let currentIndex = 0;
  
    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]; // Generates one of the 16 possible hex digits (0–F)
        }
        return color;
    }
  
    function typeText() {
        if (currentIndex === 0) {
            animatedText.innerHTML = ""; // Clear the text on the first cycle
        }
        if (currentIndex < fullText.length) {
            // Get a random color for each letter
            const randomColor = getRandomColor();
            const span = `<span style="color: ${randomColor}">${fullText.charAt(currentIndex)}</span>`;
            animatedText.innerHTML += span;
            currentIndex++;
            setTimeout(typeText, 200); // Typing speed (adjust as needed)
        } else {
            // Wait 2 seconds before starting to erase
            setTimeout(eraseText, 2000);
        }
    }
  
    function eraseText() {
        if (currentIndex > 0) {
            animatedText.innerHTML = fullText.substring(0, currentIndex - 1); // Erasing without color
            currentIndex--;
            setTimeout(eraseText, 200); // Erasing speed (adjust as needed)
        } else {
            // Wait 1 second before starting to rewrite
            setTimeout(() => {
                currentIndex = 0; // Reset for typing again
                animatedText.innerHTML = ""; // Clear text before restarting
                typeText(); // Start typing again
            }, 1000);
        }
    }
  
    // Start the typing animation
    animatedText.innerHTML = ""; // Ensure no initial text on first load
    typeText(); // Start the typing animation
  });
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.querySelector('.bg-video');
  
    // Ensure autoplay starts with muted sound for compliance
    videoElement.muted = true;
    videoElement.play(); // Ensure video is played once loaded
  
    // Unmute video when clicked (or you can add mouseover)
    videoElement.addEventListener('click', function () {
      videoElement.muted = !videoElement.muted; // Toggle muted/unmuted
    });
  });
  
  
  
  // Get the modal
  const cvModal = document.getElementById("cvModal");
  
  // Get the button that opens the modal
  const showCvBtn = document.getElementById("showCvBtn");
  
  // Get the <span> element that closes the modal
  const closeBtn = cvModal.getElementsByClassName("close-btn")[0];
  
  // Disable the button initially (ensure it's also disabled in the HTML)
  showCvBtn.setAttribute("disabled", true);
  
  // When the user solves CAPTCHA, enable the button
  function onCaptchaSuccess() {
      showCvBtn.removeAttribute("disabled");
  }
  
  // When the user clicks the button, open the modal
  showCvBtn.onclick = function() {
      if (!showCvBtn.hasAttribute("disabled")) {
          cvModal.style.display = "block";
      }
  }
  
  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function() {
      cvModal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == cvModal) {
          cvModal.style.display = "none";
      }
  }
  
  
  
  
  
  // "See More" button functionality
  document.getElementById('seeMoreBtn').addEventListener('click', function() {
    const hiddenItems = document.querySelectorAll('.gallery-box.hidden');
    hiddenItems.forEach(item => {
      item.classList.remove('hidden'); // Reveal hidden items
    });
    this.style.display = 'none'; // Hide "See More" button
    document.getElementById('collapseBtn').classList.remove('hidden'); // Show "Collapse" button
  });
  
  // "Collapse" button functionality
  document.getElementById('collapseBtn').addEventListener('click', function() {
    const allItems = document.querySelectorAll('.gallery-box');
    allItems.forEach((item, index) => {
      if (index > 2) { // Only hide additional items, keep the first 3 visible
        item.classList.add('hidden');
      }
    });
    document.getElementById('seeMoreBtn').style.display = 'block'; // Show "See More" button
    this.classList.add('hidden'); // Hide "Collapse" button
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for like icons
  const likeIcons = document.querySelectorAll('.like-icon');
  likeIcons.forEach((icon, index) => {
    const likeCount = icon.parentElement.querySelector('.like-count');
    const storedCount = localStorage.getItem(`likeCount-${index}`); // Retrieve from local storage
    
    if (storedCount) {
      likeCount.innerText = storedCount; // Set like count from local storage
    }
  
    icon.addEventListener('click', function () {
      let currentCount = parseInt(likeCount.innerText);
      if (!icon.classList.contains('liked')) {
        currentCount += 1;
        localStorage.setItem(`likeCount-${index}`, currentCount); // Save to local storage
        likeCount.innerText = currentCount;
        icon.classList.add('liked');
      }
    });
  });
  
  // Function to handle views functionality
  const galleryBoxes = document.querySelectorAll('.gallery-box');
  galleryBoxes.forEach((box, index) => {
    const viewsCount = box.querySelector('.views-count');
    let storedViewCount = localStorage.getItem(`viewCount-${index}`); // Retrieve from local storage
    
    if (storedViewCount) {
      viewsCount.innerText = storedViewCount; // Set views count from local storage
    } else {
      storedViewCount = 0; // Initialize if not present
    }
  
    // Increment views when the user hovers over the gallery box
    box.addEventListener('mouseenter', function () {
      let currentViewCount = parseInt(viewsCount.innerText);
      currentViewCount += 1;
      localStorage.setItem(`viewCount-${index}`, currentViewCount); // Save to local storage
      viewsCount.innerText = currentViewCount;
    });
  });
  });
  
  
  
  
  // Function to share the link or image
  document.querySelectorAll('.shareButton').forEach((button, index) => {
    button.addEventListener('click', async function(e) {
        e.preventDefault(); // Prevent any default button behavior
        
        // Get the corresponding image for the share button
        const imageToShare = document.querySelectorAll('.imageToShare')[index].src;
  
        // Fetch the image as a blob
        const imageBlob = await fetch(imageToShare).then(res => res.blob());
  
        const shareData = {
            title: 'Check out this amazing image!',
            text: 'Check out this research presentation!',
            files: [new File([imageBlob], 'image.jpg', { type: 'image/jpeg' })] // Share the image
        };
  
        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Share successful');
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('Sharing not supported on this browser.');
        }
    });
  });
  
  
  
  
  
  const musicIcon = document.getElementById('music-icon');
    const musicPlayerContainer = document.getElementById('music-player-container');
    const lastListenedDiv = document.getElementById('last-listened');
    const playlistSelect = document.getElementById('playlist-select');
    const musicPlayer = document.getElementById('music-player');
    
    // Retrieve the last listened info from local storage
    const lastListened = localStorage.getItem('lastListenedTrack');
    
    // Display last listened track, if available
    if (lastListened) {
      lastListenedDiv.innerHTML = `<p><strong>Last listened:</strong> ${lastListened}</p>`;
    }
  
    // Change the embedded music player based on playlist selection
    playlistSelect.addEventListener('change', function() {
      const selectedPlaylist = playlistSelect.value;
      musicPlayer.src = selectedPlaylist; // Change the iframe source to the new playlist
      const currentTrack = playlistSelect.options[playlistSelect.selectedIndex].text; // Get the selected playlist name
      localStorage.setItem('lastListenedTrack', currentTrack); // Save the selected playlist to local storage
      lastListenedDiv.innerHTML = `<p><strong>Now listening to:</strong> ${currentTrack}</p>`;
    });
  
    // Toggle the music player on click
    musicIcon.addEventListener('click', function() {
      if (musicPlayerContainer.style.display === "none") {
        musicPlayerContainer.style.display = "block"; // Show the player
      } else {
        musicPlayerContainer.style.display = "none"; // Hide the player
      }
    });
  
  
   
    // Array of cities to randomly display weather data from
    const cities = [
      'London,uk', 'New York,us', 'Tokyo,jp', 'Paris,fr', 'Berlin,de', 'Sydney,au', 
      'Moscow,ru', 'Kolkata,in', 'Los Angeles,us', 'Beijing,cn', 'Rio de Janeiro,br', 
      'Dubai,ae', 'Toronto,ca', 'Rome,it', 'Mexico City,mx', 'Cairo,eg', 
      'Istanbul,tr', 'Seoul,kr', 'Bangkok,th', 'Mumbai,in', 'Barcelona,es', 
      'Johannesburg,za', 'Singapore,sg', 'Buenos Aires,ar', 'Hong Kong,hk', 
      'San Francisco,us', 'Madrid,es', 'Melbourne,au', 'Lagos,ng', 'Kuala Lumpur,my',
      'São Paulo,br', 'Amsterdam,nl', 'Lisbon,pt', 'Stockholm,se', 'Addis Ababa,et', 
      'Hanoi,vn', 'Helsinki,fi', 'Copenhagen,dk'
    ];  
  
  async function fetchWeather(city) {
    const apiKey = 'c5ccd8c6b6530c96148900de4b215ac7';  // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const weatherInfo = `🌤️ ${data.name}: ${data.weather[0].description}, Temp: ${data.main.temp}°C`;
      document.getElementById('weather-info').innerText = weatherInfo;
    } catch (error) {
      document.getElementById('weather-info').innerText = 'Failed to load weather data';
    }
  }
  
  // Function to randomly select a city and fetch its weather
  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];
    fetchWeather(randomCity);
  }
  
  // Call the function initially when the page loads
  window.onload = function() {
    getRandomCity();
    
    // Change the city and fetch new weather every 10 seconds
    setInterval(getRandomCity, 5000); // Adjust the interval as needed
  };
  
  
  // JavaScript to toggle sections
  document.querySelectorAll('.menu ul li a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Remove active class from all links
      document.querySelectorAll('.menu ul li a').forEach(function (item) {
        item.classList.remove('active');
      });
      
      // Add active class to the clicked link
      e.target.classList.add('active');
      
      // Hide all content
      document.querySelectorAll('.content').forEach(function (content) {
        content.classList.add('hidden');
        content.classList.remove('active');
      });
      
      // Show the related content
      const section = e.target.getAttribute('href').substring(1);
      document.getElementById(section).classList.remove('hidden');
      document.getElementById(section).classList.add('active');
    });
  });
  
  
  
  
  
  
  
  
    // JavaScript to toggle between Images and Videos
    document.querySelector(".dropdown-content1 a[href='#gallery-images']").addEventListener("click", function() {
      document.getElementById("gallery-images").classList.remove("hidden");
      document.getElementById("gallery-videos").classList.add("hidden");
    });
  
    document.querySelector(".dropdown-content1 a[href='#gallery-videos']").addEventListener("click", function() {
      document.getElementById("gallery-videos").classList.remove("hidden");
      document.getElementById("gallery-images").classList.add("hidden");
    });
  
  
  
  
  
    //--------------------------------------------------------------------------------------
    function loadVideo(src) {
      const videoPlayer = document.getElementById('video-player');
      const videoSource = document.getElementById('video-source');
      videoSource.src = src;
      videoPlayer.load();
      videoPlayer.style.display = 'block'; // Show the video player
      videoPlayer.play();
    };



    //--------------------------------------------------------------------------------------------
//for events section
document.getElementById("subscribe-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  if (!email) {
      document.getElementById("subscribe-message").textContent = "Please enter a valid email.";
      return;
  }

  fetch("https://script.google.com/macros/s/AKfycbzMq7K7wCDbntdoBskiwXvBQnxhqUjFJ-sQLNGalpQgErGPZN4lFHlvAkEIEGG1W_mo9w/exec", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: email })
})

  .then(() => {
      document.getElementById("subscribe-message").textContent = "Subscribed successfully!";
      document.getElementById("email").value = "";
  })
  .catch(error => {
      console.error("Subscription Error:", error);
      document.getElementById("subscribe-message").textContent = "An error occurred. Please try again.";
  });
});
