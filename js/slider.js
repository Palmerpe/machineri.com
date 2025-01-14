document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-track img');

  if (slides.length === 0) {
    console.error('No se encontraron imágenes para el slider.');
    return;
  }

  let index = 0;
  let slideWidth = slides[0].clientWidth;

  const updateSlider = () => {
    index++;
    track.style.transition = 'transform 0.7s ease-in-out';
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    if (index >= slides.length / 2) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        index = 0;
      }, 700);
    }
  };

  setInterval(updateSlider, 4000);

  window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    setTimeout(() => {
      track.style.transition = 'transform 0.7s ease-in-out';
    }, 50);
  });
});





