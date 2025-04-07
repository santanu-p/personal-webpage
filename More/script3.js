document.getElementById("search-button").addEventListener("click",()=>{let t=document.getElementById("search-input").value.toLowerCase(),e=document.querySelectorAll(".book-item");e.forEach(e=>{let o=e.querySelector("h2").textContent.toLowerCase(),a=e.querySelector("p").textContent.toLowerCase();o.includes(t)||a.includes(t)?e.style.display="block":e.style.display="none"})}),document.getElementById("search-input").addEventListener("keyup",t=>{"Enter"===t.key&&document.getElementById("search-button").click()});const books=[{title:"A Brief History of Time",author:"Stephen Hawking",image:"https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/A-Brief-History-of-Time-300x460.jpg",rating:"★★★★☆",status:"Reading",genre:"Science",link:"https://www.fisica.net/relatividade/stephen_hawking_a_brief_history_of_time.pdf"},{title:"The Great Gatsby",author:"F. Scott Fitzgerald",image:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",rating:"★★★★☆",status:"Completed",genre:"Fiction",link:"https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf"},{title:"Sapiens: A Brief History of Humankind",author:"Yuval Noah Harari",image:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg",rating:"★★★★★",status:"Want to Read",genre:"Non-Fiction",link:"https://www.1pezeshk.com/wp-content/uploads/2019/07/Sapiens-A-Brief-History-of-Humankind.pdf"},{title:"Harry Potter and the Sorcerer's Stone",author:"J.K. Rowling",image:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",rating:"★★★★★",status:"Reading",genre:"Fantasy",link:"https://kanpurkvcantt.wordpress.com/wp-content/uploads/2020/04/harry-potter-book-1.pdf"},{title:"The Martian",author:"Andy Weir",image:"https://coverart.oclc.org/ImageWebSvc/oclc/+-+0263665966_140.jpg?allowDefault=false&client=WorldcatOrgUI",rating:"★★★★☆",halfStar:!0,status:"Reading",genre:"Fiction",link:"https://search.worldcat.org/en/title/1140118175"},{title:"Ikigai",author:"Francesc Miralles and Hector Garcia",image:"https://ikkadukka.com/cdn/shop/products/ikigai-the-japanese-secret-to-a-long-and-happy-life-book-books-house-home-lifestyle-newarrivals-product-type-ikkadukka-store-ikka-dukka-eclectic-online_580_740x.jpg?v=1584737493",rating:"★★★★★",status:"Completed",genre:"self-help",link:"https://libtoon.com/wp-content/uploads/Ikigai-_Libtoon.com_.pdf"},{title:"Harry Potter: The Complete Collection",author:"J.K. Rowling",image:"https://5.imimg.com/data5/SELLER/Default/2020/8/PE/PX/MO/54836353/harry-potter-books-collection-j-k-rowling-bloomsbury-publishing-500x500.jpg",rating:"★★★★★",status:"Completed",genre:"Fantasy",link:"https://kvongcmehsanalibrary.wordpress.com/wp-content/uploads/2021/07/harrypotter.pdf"},{title:"Gone Girl",author:"Gillian Flynn",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx8n9KiKjDBUcov8hg6sip6XxWbFdkC4YT2w&s",rating:"★★★★☆",status:"Want to Read",genre:"mys-thril",link:"https://kvongcmehsanalibrary.wordpress.com/wp-content/uploads/2021/07/harrypotter.pdf"},];function displayBooks(t=""){let e=document.getElementById("book-grid");e.innerHTML="",books.forEach(o=>{if(""===t||o.genre===t){let a=`
                <div class="book-item">
                    <img src="${o.image}" alt="${o.title}">
                    <h2>${o.title}</h2>
                    <p>Author: ${o.author}</p>
                    <span class="rating">Review: ${o.rating}</span>
                    <p class="status"><button class="change-status" onclick="changeStatus('${o.title.replace(/\s+/g,"-")}')">Status: </button> <span id="status-${o.title.replace(/\s+/g,"-")}">${o.status}</span></p>
                    <a href="${o.link}" class="read-more" target="_blank">Read More</a>
                </div>
            `;e.innerHTML+=a}})}function changeStatus(t){let e=document.getElementById(`status-${t.replace(/\s+/g,"-")}`),o=e.textContent,a=["Reading","Completed","Want to Read"],s=a.indexOf(o);s=(s+1)%a.length,e.textContent=a[s]}function filterBooks(t){displayBooks(t)}function filterByCategory(t){let e=document.querySelectorAll(".note-card"),o=document.querySelectorAll(".filter-button");o.forEach(t=>t.classList.remove("active")),event.target.classList.add("active"),e.forEach(e=>{e.style.opacity="0",e.style.transition="opacity 0.3s",setTimeout(()=>{"all"===t||e.classList.contains(t)?(e.style.display="block",requestAnimationFrame(()=>{e.style.opacity="1"})):e.style.display="none"},300)})}function filterNotes(){let t=document.getElementById("noteSearch"),e=t.value.toLowerCase(),o=document.querySelectorAll(".note-card");o.forEach(t=>{let o=t.querySelector(".note-title").textContent.toLowerCase(),a=t.querySelector(".note-content").textContent.toLowerCase();t.style.opacity="0",t.style.transition="opacity 0.3s",setTimeout(()=>{o.includes(e)||a.includes(e)?(t.style.display="block",requestAnimationFrame(()=>{t.style.opacity="1"})):t.style.display="none"},300)})}displayBooks();
