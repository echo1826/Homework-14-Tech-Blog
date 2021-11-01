async function signupHandler() {
    const username = document.querySelector('#name-signup');
    const password = document.querySelector('#password-signup');

    if(username&&password) {
        const response = await fetch('/api/users/signup',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    }
    
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);