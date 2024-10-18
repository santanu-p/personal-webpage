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
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg',
        rating: '★★★★☆',
        status: 'Completed',
        genre: 'Fiction',
        link: 'https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf', // Replace with a valid link
    },
    {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg',
        rating: '★★★★★',
        status: 'Want to Read',
        genre: 'Non-Fiction',
        link: 'https://www.1pezeshk.com/wp-content/uploads/2019/07/Sapiens-A-Brief-History-of-Humankind.pdf', // Replace with a valid link
    },
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg',
        rating: '★★★★★',
        status: 'Reading',
        genre: 'Fantasy',
        link: 'https://kanpurkvcantt.wordpress.com/wp-content/uploads/2020/04/harry-potter-book-1.pdf', // Replace with a valid link
    },
    {
        title: 'The Martian',
        author: 'Andy Weir',
        image: 'https://coverart.oclc.org/ImageWebSvc/oclc/+-+0263665966_140.jpg?allowDefault=false&client=WorldcatOrgUI',
        rating: '★★★★☆',
        halfStar: true, // Indicates if there's a half star
        status: 'Reading',
        genre: 'Fiction',
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






// Filter notes by category with animation
function filterByCategory(category) {
    const notes = document.querySelectorAll('.note-card');
    const filterButtons = document.querySelectorAll('.filter-button');

    // Reset active button
    filterButtons.forEach(button => button.classList.remove('active'));

    // Set active button
    event.target.classList.add('active');

    notes.forEach(note => {
        // Fade out the note card
        note.style.opacity = '0'; // Start fade-out
        note.style.transition = 'opacity 0.3s'; // Smooth transition

        // Wait for fade-out to finish before displaying/hiding notes
        setTimeout(() => {
            if (category === 'all' || note.classList.contains(category)) {
                note.style.display = 'block'; // Show matching notes
                requestAnimationFrame(() => {
                    note.style.opacity = '1'; // Fade in the note
                });
            } else {
                note.style.display = 'none'; // Hide non-matching notes
            }
        }, 300); // Delay for fade-out
    });
}

// Search notes by title/content with animation
function filterNotes() {
    const input = document.getElementById('noteSearch');
    const filter = input.value.toLowerCase();
    const notes = document.querySelectorAll('.note-card');

    notes.forEach(note => {
        const title = note.querySelector('.note-title').textContent.toLowerCase();
        const content = note.querySelector('.note-content').textContent.toLowerCase();

        // Fade out the note card
        note.style.opacity = '0'; // Start fade-out
        note.style.transition = 'opacity 0.3s'; // Smooth transition

        // Wait for fade-out to finish before displaying/hiding notes
        setTimeout(() => {
            if (title.includes(filter) || content.includes(filter)) {
                note.style.display = 'block'; // Show matching notes
                requestAnimationFrame(() => {
                    note.style.opacity = '1'; // Fade in the note
                });
            } else {
                note.style.display = 'none'; // Hide non-matching notes
            }
        }, 300); // Delay for fade-out
    });
}
