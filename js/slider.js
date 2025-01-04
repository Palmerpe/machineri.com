document.addEventListener('DOMContentLoaded', function () {
  // Selecciona el contenedor del slider y las imágenes
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-track img');

  // Índice actual del slider
  let index = 0;

  // Ancho de cada imagen (asumiendo que todas tienen el mismo ancho)
  let slideWidth = slides[0].clientWidth;

  // Función para actualizar la posición del slider
  const updateSlider = () => {
      index++;
      track.style.transition = 'transform 0.7s ease-in-out';
      track.style.transform = `translateX(-${index * slideWidth}px)`;

      if (index >= slides.length / 2) {
          setTimeout(() => {
              track.style.transition = 'none';
              track.style.transform = 'translateX(0)';
              index = 0;
          }, 700); // Duración de la transición en milisegundos
      }
  };

  // Cambia de imagen cada 4 segundos
  setInterval(updateSlider, 4000);

  // Ajustar el ancho de las imágenes al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
      slideWidth = slides[0].clientWidth;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      setTimeout(() => {
          track.style.transition = 'transform 0.7s ease-in-out';
      }, 50); // Ajuste de tiempo para asegurar la transición
  });
});


