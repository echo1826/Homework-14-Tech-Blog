async function deletePost(event) {
    event.preventDefault();
    console.log(event.target);
    
}

document.querySelector('#deletePost').addEventListener('click', deletePost);