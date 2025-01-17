document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
  
    try {
      const response = await fetch('https://jyk-machinery.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, mensaje }),
      });
  
      if (response.ok) {
        alert('Correo enviado correctamente.');
      } else {
        alert('Error al enviar el correo.');
      }
    } catch (error) {
      alert('Error al enviar el correo.');
      console.error('Error:', error);
    }
  });
  