// var nameInput = document.querySelector('#contactForm input[name="cname"]');
// var emailInput = document.querySelector('#contactForm input[name="cemail"]');
// var messageInput = document.querySelector('#contactForm textarea[name="cmessage"]');

// // Tekshirish
// if (nameInput && emailInput && messageInput) {
//     var name = nameInput.value;
//     var email = emailInput.value;
//     var message = messageInput.value;

//     // Ma'lumotlarni serverga yuborish
//     sendDataToServer({ name, email, message });
// } else {
//     console.error('Bir yoki bir nechta input elementlar topilmadi!');
// }

// document.addEventListener('DOMContentLoaded', function () {
//     var form = document.querySelector('#contactForm');
    
//     // Check if the form exists
//     if (form) {
//         form.addEventListener('submit', function (event) {
//             event.preventDefault();

//             // Get the input elements
//             var nameInput = document.querySelector('input[name="cname"]');
//             var phoneInput = document.querySelector('input[name="ctel"]');
//             var messageInput = document.querySelector('textarea[name="cmessage"]');

//             // Check if all inputs are found
//             if (nameInput && phoneInput && messageInput) {
//                 var data = {
//                     name: nameInput.value,
//                     phone: phoneInput.value,
//                     message: messageInput.value
//                 };

//                 // Send data to the server
//                 sendDataToServer(data);
//             } else {
//                 console.error("Bir yoki bir nechta input elementlar topilmadi!");
//             }
//         });
//     } else {
//         console.error("Form element topilmadi!");
//     }
// });

// // Function to send data to the server
// // CSRF token olish funksiyasi
// function getCSRFToken() {
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//         if (cookie.trim().startsWith('csrftoken=')) {
//             return cookie.split('=')[1];
//         }
//     }
//     return '';
// }

// function sendDataToServer(data) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://0.0.0.0:8000/admin/client/', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.setRequestHeader('X-CSRFToken', getCSRFToken()); // CSRF token qo'shish
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             console.log('Data sent:', xhr.responseText);
//         } else {
//             console.error('Error:', xhr.status, xhr.statusText);
//         }
//     };
//     xhr.send(JSON.stringify(data));
// }


// document.addEventListener('DOMContentLoaded', function() {
//     var button = document.querySelector('#contactForm button'); // To'g'ri ID yoki klass nomi ishlatilmoqda

//     // Element mavjudligini tekshirish
//     if (button) {
//         button.addEventListener('click', function(event) {
//             event.preventDefault();
//             var name = document.querySelector('input[name="cname"]').value;
//             var phone = document.querySelector('input[name="ctel"]').value;
//             var message = document.querySelector('textarea[name="cmessage"]').value;

//             if (!name || !phone || !message) {
//                 console.error("Bir yoki bir nechta input elementlar topilmadi yoki qiymatlar bo'sh!");
//                 return;
//             }

//             var data = {
//                 name: name,
//                 phone_number: phone,
//                 message: message
//             };

//             sendDataToServer(data);
//         });
//     } else {
//         console.error("Button element topilmadi!");
//     }
// });

// function sendDataToServer(data) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://0.0.0.0:8000/client/', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // CSRF token yuborish
//     xhr.onload = function() {
//         if (xhr.status === 200 || xhr.status === 201) {
//             console.log('Ma\'lumot yuborildi:', xhr.responseText);
//         } else {
//             console.error('Xato:', xhr.status, xhr.statusText);
//         }
//     };
//     xhr.send(JSON.stringify(data));
// }

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }




document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#contactForm button'); // To'g'ri ID yoki klass nomi ishlatilmoqda

    // Element mavjudligini tekshirish
    if (button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var name = document.querySelector('input[name="cname"]').value;
            var phone = document.querySelector('input[name="ctel"]').value;
            var message = document.querySelector('textarea[name="cmessage"]').value;

            if (!name || !phone || !message) {
                console.error("Bir yoki bir nechta input elementlar topilmadi yoki qiymatlar bo'sh!");
                return;
            }

            var data = {
                name: name,
                phone_number: phone,
                message: message
            };

            sendDataToServer(data);
        });
    } else {
        console.error("Button element topilmadi!");
    }
});

function sendDataToServer(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://0.0.0.0:8000/client/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken')); // CSRF token yuborish
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log('Ma\'lumot yuborildi:', xhr.responseText);

            // Serverdan ma'lumot yuborilganligi haqidagi javobni tekshirish
            var response = JSON.parse(xhr.responseText);
            if (response.status === true) {
                // Input maydonlarini tozalash
                document.querySelector('input[name="cname"]').value = '';
                document.querySelector('input[name="ctel"]').value = '';
                document.querySelector('textarea[name="cmessage"]').value = '';
            }
        } else {
            console.error('Xato:', xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Tarmoq xatosi yuz berdi.');
    };
    xhr.send(JSON.stringify(data));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
