const imageSection = document.querySelector('.image-section');
const textOverlay = document.querySelector('.text-overlay');

imageSection.addEventListener('mouseover', () => {
    textOverlay.style.opacity = '1';
});

imageSection.addEventListener('mouseout', () => {
    textOverlay.style.opacity = '0';
});
