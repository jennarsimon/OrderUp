window.onload = function() {

    let about = document.getElementById('about');

    about.addEventListener('click', function(req, res) {
        console.log('about');
        window.location.href = "about";
    });

}