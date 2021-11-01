async function logout(event) {
    event.preventDefault();
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'}
    });
    if(response.ok) {
        document.location.replace('/home');
    }else{
        response.statusText
    }
}

document.querySelector('#logout').addEventListener('click', logout);