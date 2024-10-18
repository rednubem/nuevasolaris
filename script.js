function showInfo(infoId) {
    // Ocultar todas las informaciones
    const infos = document.querySelectorAll('.info-content');
    infos.forEach(info => {
        info.classList.remove('active');
    });

    // Mostrar la información correspondiente
    const selectedInfo = document.getElementById(infoId);
    selectedInfo.classList.add('active');
    selectedInfo.scrollIntoView({ behavior: 'smooth' }); // Desplazar a la sección
}

// Validación del formulario
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const captcha = document.getElementById('captcha').value;
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value; // Captura el nombre del remitente

    if (captcha === '5') { // Asegúrate de que '5' es la respuesta correcta
        // Verifica que el nombre no esté vacío
        if (name.trim() === '') {
            formMessage.textContent = 'Por favor, ingresa tu nombre.';
            formMessage.style.color = 'red';
            return;
        }

        // Enviar el formulario usando EmailJS
        emailjs.send('service_xz61orm', 'YOUR_TEMPLATE_ID', {
            name: name, // Incluye el nombre en los parámetros
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        })
        .then(function() {
            formMessage.textContent = 'Formulario enviado con éxito.';
            formMessage.style.color = 'green';
        }, function(error) {
            console.error("Error al enviar el formulario:", error);
            formMessage.textContent = 'Error al enviar el formulario. Inténtalo de nuevo.';
            formMessage.style.color = 'red';
        });
    } else {
        formMessage.textContent = 'Captcha incorrecto. Inténtalo de nuevo.';
        formMessage.style.color = 'red';
    }
});