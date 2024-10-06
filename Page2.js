const postsContainer = document.getElementById('postsContainer'); // Where the posts should be stored


let currentPage = 1;    // Which side from the API we load
const postsPerPage = 3; // Posts per page which should be loaded
let loading = false;    // Avoid multiple loadings at the same time, so we ensure only three posts load at once

/* Function for fetching and showing the posts: */
async function loadPosts() {

    if (loading) return; // If we are already loading, stop the function
    loading = true;      // Makes loading true, so we don't do it multiple times at the same time
    
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`)
        .then(response => response.json()) // Convert to JSON format
        .then(posts => {
        posts.forEach(post => { // Go through each post
            const postElement = document.createElement('div');  // FOr each post, create a div
            
            // Adding title and paragraph for the posts:
            postElement.innerHTML = ` 
                <h2> ${post.title} </h2>
                <p> ${post.body} </p>
            `;
            postsContainer.appendChild(postElement); // Put the post-element in the postsContainer, to be shown on the webpage
        });
        loading = false;    // When done, page is not loading anymore
        currentPage++;      // Increases currentPage to fetch next set of posts
    })
}

/* Scroll-function: */

function hasScrolled() {
    const scrollPosition = window.scrollY + window.innerHeight; // Users position on the webpage
    const documentHeight = document.documentElement.scrollHeight;  // The webpage's height

    
    if (scrollPosition >= documentHeight - 10) { // If the user has scrolled to the bottom:
        loadPosts(); // Call function to fetch more posts
    }
}

window.addEventListener('scroll', hasScrolled);  // EventListener to check if the user is scrolling, so it can call the hasScrolled() function

loadPosts();    // Initial load posts