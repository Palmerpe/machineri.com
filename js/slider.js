// Selecciona el contenedor del slider y las imágenes
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');

// Índice actual del slider
let index = 0;

/**
 * Actualiza la posición del slider al cambiar la imagen.
 * Se utiliza transform para desplazar las imágenes horizontalmente.
 */
const updateSlider = () => {
  track.style.transform = `translateX(-${index * 100}%)`;
  index = (index + 1) % slides.length; // Pasa a la siguiente imagen de forma cíclica
};

// Cambia de imagen cada 4 segundos
setInterval(updateSlider, 2000);
