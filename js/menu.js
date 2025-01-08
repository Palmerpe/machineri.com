document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');
    const serviceButton = document.querySelector('.nav-item.group > a');
    const subMenu = document.querySelector('.nav-item.group ul');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        menu.classList.toggle('flex-col');
        menu.classList.toggle('items-center');
        menu.classList.toggle('mt-4');
    });

    serviceButton.addEventListener('click', function(event) {
        event.preventDefault();
        subMenu.classList.toggle('block');
        serviceButton.parentElement.classList.toggle('open');
    });

    // Cerrar el submenú cuando se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !serviceButton.contains(event.target)) {
            subMenu.classList.remove('block');
            serviceButton.parentElement.classList.remove('open');
        }
    });
});
