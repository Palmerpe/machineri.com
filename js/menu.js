
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        menu.classList.toggle('flex-col'); // Añadir clase para mostrar los elementos verticalmente en móviles
        menu.classList.toggle('items-center'); // Añadir clase para centrar los elementos en móviles
        menu.classList.toggle('mt-4'); // Añadir margen superior para el menú en dispositivos móviles
    });
});
