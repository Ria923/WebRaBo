"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const username = document.querySelector('[name=username]');

    if (!form || !username) {
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('uname', username.value);
        location.href = '../userpage/index.html';
    });

});
