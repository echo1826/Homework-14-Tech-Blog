async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username, password);
    if(username&&password) {
        console.log('fetch firing');
        console.log(username, password);
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'}
        });
        console.log(response.ok);
        if(response.ok) {
            console.log('response ok');
            document.location.replace('/home');
        }else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginHandler);