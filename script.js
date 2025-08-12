document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
    const pageSections = document.querySelectorAll('.page-section');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-btn');

  
    // Maneja la visibilidad de los menús y las secciones de la página
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que los clics en submenús se propaguen al menú padre
            const submenu = item.querySelector('.submenu');
            const targetId = item.dataset.target;
            // Si el elemento del menú tiene un submenú, lo expande/contrae
            if (submenu) {
                // Alterna la clase 'active' para mostrar/ocultar el submenú
                item.classList.toggle('active');
                // Cierra otros submenús del mismo nivel
                const parentMenu = item.closest('ul');
                if (parentMenu) {
                    const siblings = parentMenu.querySelectorAll('.menu-item');
                    siblings.forEach(sibling => {
                        if (sibling !== item) {
                            sibling.classList.remove('active');
                        }
                    });
                }
            } else {
                // Si el elemento no tiene submenú (ej. "Inicio"), navega a la sección
                pageSections.forEach(section => {
                    section.classList.remove('active');
                });
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                // Cierra todos los submenús al navegar a una sección final
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            }
        });
    });

    // Maneja los clics en los submenús para navegar a las páginas de los órganos
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

    // Maneja los clics en las tarjetas de la sección "Sistemas"
    document.querySelector('.content').addEventListener('click', (event) => {
        const cardLink = event.target.closest('.card-link');
        if (cardLink) {
            event.preventDefault(); // Evita que el enlace recargue la página
            const targetId = cardLink.dataset.target;
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
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

