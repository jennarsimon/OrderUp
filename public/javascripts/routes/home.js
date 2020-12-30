window.onload = function () {
    console.log('on home page');

    const username = window.location.pathname.split("/").pop();
    console.log('username', username);
}