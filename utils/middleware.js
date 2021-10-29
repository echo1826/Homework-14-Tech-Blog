function loginAuth(res, req, next) {
    if(!res.session.loggedIn) {
        res.redirect('');
    }else{
        next();
    }
}