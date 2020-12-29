window.onload = function() {

    let about = document.getElementById('about');
    let backHome = document.getElementById('backHome');
    let login = document.getElementsByTagName('u')[0];

    if(about) {

        about.addEventListener('click', function(req, res) {
            console.log('about');
            window.location.href = "about";
        });

    }

    if(backHome) {

        backHome.addEventListener('click', function(req, res) {
            console.log('back');
            window.location.href = "/";
        });

    }

    if(login) {

        login.addEventListener('click', function(req, res) {
            window.location.href = "login";
        })

    }

}