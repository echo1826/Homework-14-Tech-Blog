async function addPost(event) {
    event.preventDefault();
    const postTitle = document.querySelector('#post-title').value.trim();
    const postText = document.querySelector('#post-content').value.trim();
    
    if(postTitle && postText){
        const response = await fetch('/api/post',{
            method: 'POST',
            body: JSON.stringify({postTitle, postText}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.post-form').addEventListener('submit', addPost);