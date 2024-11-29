"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const signLink = document.querySelector('.sign a'); // Assuming the class is '.sign' for the signLink
    const loginLink = document.querySelector('.log_a'); // Assuming the class is '.log_a' for the loginLink

    // Logout function
    function logout(event) {
        event.preventDefault();
        localStorage.removeItem('uname');
        render();
    }

    // Render function based on localStorage
    function render() {
        const uname = localStorage.getItem('uname');
        if (uname) {
            // User is logged in
            signLink.innerHTML = 'マイページ';
            signLink.href = '../userpage/index.html';
            signLink.style.color = 'rgba(250, 250, 250)';
            signLink.style.fontFamily = '"Inter", Helvetica';
            signLink.style.fontWeight = '700';
            signLink.style.fontSize = '15px';
            signLink.style.textShadow = '0px 4px 4px rgba(0, 0, 0, 0.5)';
            signLink.style.position = 'relative';
            signLink.style.top = '10px';
            signLink.style.left = '48px';
            loginLink.innerHTML = `<a href="#" class="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>`;
            const logoutButton = loginLink.querySelector('.logout');
            if (logoutButton) {
                logoutButton.addEventListener('click', logout);
            }
        } else {
            // User is not logged in
            signLink.innerHTML = `<img class="simg" src="./img/sign_button.png" alt="sign">`;
            signLink.href = '../signin/index.html';
            signLink.style.fontFamily = '';
            signLink.style.fontWeight = '';
            signLink.style.fontSize = '';
            signLink.style.textShadow = '';
            signLink.style.position = '';
            signLink.style.top = '';
            signLink.style.left = '';
            loginLink.innerHTML = `<a href="../userlogin/index.html">ログイン</a>`;
        }

        // Add click event listener to all cards for flipping
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", flipCard);
        });
    }

    // Initial render on page load
    render();
});

// Function to flip card on click
function flipCard(event) {
    const flipCardContainer = event.currentTarget.querySelector(".flip-card-container");
    if (flipCardContainer) {
        flipCardContainer.classList.toggle("flip-card");
    }
}
