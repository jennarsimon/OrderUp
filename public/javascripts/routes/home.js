window.onload = function () {
    console.log('on home page');

    const username = window.location.pathname.split("/").pop();
    console.log('username', username);

    let name = document.getElementsByTagName('b')[0];
    console.log('name', name);

    fetch('/users/' + username)
    .then(response => response.json())
    .then(data => {
        name.innerHTML = data.firstName + '!';
    })

}