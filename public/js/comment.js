async function addComment() {
    const content = document.querySelector('#newComment').value.trim();
    const postId = document.querySelector('#newComment').getAttribute('data-id');
    if(content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({content: content, post_id: postId}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            document.location.reload();
        }else{
            alert(response.statusText);
        }
    }
}

document.querySelector('#commentBtn').addEventListener('click', addComment);