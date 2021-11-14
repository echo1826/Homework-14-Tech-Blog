async function addComment(event) {
    event.preventDefault()
    const content = document.querySelector('#newComment').value.trim();
    const postId = document.querySelector('#newComment').getAttribute('data-id');
    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content: content,
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function deleteComment(event) {
    event.preventDefault();
    const commentId = event.target.getAttribute('data-id');
    console.log(commentId);

    if (commentId) {
        const response = await fetch(`/api/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function updateComment(event) {
    event.preventDefault();
    const commentId = event.target.getAttribute("data-id");
    const commentText = event.target.previousElementSibling.value;
    console.log(commentText);
    if(commentId && commentText) {
        const response = await fetch(`/api/comment/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({content: commentText}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#commentBtn').addEventListener('click', addComment);

const deleteComments = document.querySelectorAll('.comments');
const updateComments = document.querySelectorAll(".updateComments");
// console.log(comments);

for (let i = 0; i < deleteComments.length; i++) {
    deleteComments[i].addEventListener('click', deleteComment);
}

for(let i = 0; i < updateComments.length; i++) {
    updateComments[i].addEventListener('click', updateComment);
}