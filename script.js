document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
    const pageSections = document.querySelectorAll('.page-section');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Maneja la visibilidad de los submenús y las secciones principales
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const targetId = item.dataset.target;
            const submenu = item.querySelector('.submenu');

            // Cierra todos los submenús y remueve la clase 'active' de todos los elementos
            menuItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                }
            });

            // Si es el elemento "Inicio", solo muestra la sección de inicio y cierra los menús
            if (targetId === 'inicio') {
                pageSections.forEach(section => section.classList.remove('active'));
                document.getElementById('inicio').classList.add('active');
                menuItems.forEach(i => i.classList.remove('active'));
            } 
            // Si tiene un submenú, alterna la clase 'active' para mostrarlo/ocultarlo
            else if (submenu) {
                item.classList.toggle('active');
            } 
            // Si es un elemento sin submenú (por ejemplo, los sistemas dentro de 'Sistemas'),
            // muestra la sección correspondiente
            else {
                pageSections.forEach(section => section.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });

    // Maneja los clicks en los submenús para navegar a las páginas de los órganos
    submenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            const targetId = item.dataset.target;
            pageSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Maneja los clics en las tarjetas de la sección principal "Sistemas"
    document.querySelector('.content').addEventListener('click', (event) => {
        const cardLink = event.target.closest('.card-link');
        if (cardLink) {
            event.preventDefault();
            const targetId = cardLink.dataset.target;
            pageSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }
    });

    // Maneja el modal para ampliar imágenes
    document.querySelector('.content').addEventListener('click', (event) => {
        const clickedImage = event.target.closest('.image-card img');
        if (clickedImage) {
            modal.style.display = 'block';
            modalImage.src = clickedImage.src;
            modalCaption.innerHTML = clickedImage.parentElement.querySelector('.image-description').innerHTML;
        }
    });

    // Cierra el modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal al hacer clic fuera de la imagen
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Muestra la sección de inicio por defecto
    document.getElementById('inicio').classList.add('active');
});
