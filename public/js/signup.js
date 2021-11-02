async function signupHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username, password);
    if(username&&password) {
        const response = await fetch('/api/user/signup',{
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