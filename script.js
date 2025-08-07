document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
    const pageSections = document.querySelectorAll('.page-section');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Maneja el menú lateral y la visibilidad de las secciones
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const submenu = item.querySelector('.submenu');
            // Cierra todos los submenús
            document.querySelectorAll('.submenu').forEach(sub => {
                if (sub !== submenu) {
                    sub.parentElement.classList.remove('active');
                }
            });
            // Alterna la clase 'active' para mostrar/ocultar el submenú
            item.classList.toggle('active');
        });
    });

    submenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que se cierre el submenú al hacer clic en un ítem

            const targetId = item.dataset.target;
            
            // Oculta todas las secciones
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Muestra la sección correspondiente
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Maneja la galería de imágenes y el modal
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