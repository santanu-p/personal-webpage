document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach(item => {
        const title = item.querySelector('h2').textContent.toLowerCase();
        const author = item.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchInput) || author.includes(searchInput)) {
            item.style.display = 'block'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
});

// Optional: Add a keyup event to enable search by pressing "Enter"
document.getElementById('search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});



const books = [
    {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        image: 'https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/A-Brief-History-of-Time-300x460.jpg',
        rating: '★★★★☆',
        status: 'Reading',
        genre: 'Science',
        link: 'https://www.fisica.net/relatividade/stephen_hawking_a_brief_history_of_time.pdf',
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Great_Gatsby%2C_by_F._Scott_Fitzgerald%2C_1925.jpg/400px-The_Great_Gatsby%2C_by_F._Scott_Fitzgerald%2C_1925.jpg',
        rating: '★★★★☆',
        status: 'Completed',
        genre: 'Fiction',
        link: '#', // Replace with a valid link
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Sapiens_A_Brief_History_of_Humankind.jpg/220px-Sapiens_A_Brief_History_of_Humankind.jpg',
        rating: '★★★★★',
        status: 'Want to Read',
        genre: 'Non-Fiction',
        link: '#', // Replace with a valid link
    },
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Harry_Potter_and_the_Sorcerer%27s_Stone.jpg/220px-Harry_Potter_and_the_Sorcerer%27s_Stone.jpg',
        rating: '★★★★★',
        status: 'Reading',
        genre: 'Fantasy',
        link: '#', // Replace with a valid link
    },
    {
        title: 'The martian',
        author: 'Andy Weir',
        image: 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0263665966_140.jpg?allowDefault=false&client=WorldcatOrgUI',
        rating: '★★★★☆',
        halfStar: true, // Indicates if there's a half star
        status: 'Reading',
        genre: 'Fantasy',
        link: 'https://search.worldcat.org/en/title/1140118175', // Replace with a valid link
    },
];

// Function to display books
function displayBooks(filterGenre = '') {
    const bookGrid = document.getElementById('book-grid');
    bookGrid.innerHTML = ''; // Clear existing books

    books.forEach(book => {
        if (filterGenre === '' || book.genre === filterGenre) { // Only display books matching the genre
            const bookItem = `
                <div class="book-item">
                    <img src="${book.image}" alt="${book.title}">
                    <h2>${book.title}</h2>
                    <p>Author: ${book.author}</p>
                    <span class="rating">Review: ${book.rating}</span>
                    <p class="status"><button class="change-status" onclick="changeStatus('${book.title.replace(/\s+/g, '-')}')">Status: </button> <span id="status-${book.title.replace(/\s+/g, '-')}">${book.status}</span></p>
                    <a href="${book.link}" class="read-more" target="_blank">Read More</a>
                </div>
            `;
            bookGrid.innerHTML += bookItem;
        }
    });
}

// Function to change status
function changeStatus(statusId) {
    const statusElement = document.getElementById(`status-${statusId.replace(/\s+/g, '-')}`);
    const currentStatus = statusElement.textContent;

    const statuses = ['Reading', 'Completed', 'Want to Read'];
    let currentIndex = statuses.indexOf(currentStatus);
    currentIndex = (currentIndex + 1) % statuses.length; // Wrap around
    statusElement.textContent = statuses[currentIndex];
}

// Function to filter books by genre
function filterBooks(genre) {
    displayBooks(genre); // Call displayBooks with the selected genre
}

// Initial call to display all books
displayBooks();
