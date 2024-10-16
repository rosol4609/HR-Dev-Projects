document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessageDiv = document.getElementById('login-message');

    function displayMessage(messageDiv, message, color) {
        messageDiv.innerHTML = `<p style="color: ${color};">${message}</p>`;
        messageDiv.style.opacity = '1';

        setTimeout(() => {
            messageDiv.style.transition = 'opacity 1s'; 
            messageDiv.style.opacity = '0'; 
        }, 3000); 

        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 4000);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(loginForm);

            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log("Otrzymała odpowiedz: ", data);
                if (data.status === 'success') {
                    displayMessage(loginMessageDiv, data.message, 'green');
                    setTimeout(() => {
                        window.location.href = data.redirect; 
                    }, 3000); 
                } else {
                    displayMessage(loginMessageDiv, data.message, 'red'); 
                }
            })
            .catch(error => {
                displayMessage(loginMessageDiv, 'Wystąpił błąd. Spróbuj ponownie później.', 'red');
            });
        });
    }
});
