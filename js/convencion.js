
"use strict";

/* =========================================
   CARRUSEL — CONVENCIÓN 2026
   Funciona con los seis integrantes.
========================================= */

(() => {
    const carousels = document.querySelectorAll(
        "[data-convention-carousel]"
    );

    carousels.forEach((carousel) => {
        const slides = Array.from(
            carousel.querySelectorAll("[data-convention-slide]")
        );

        const previousButton = carousel.querySelector(
            "[data-convention-prev]"
        );

        const nextButton = carousel.querySelector(
            "[data-convention-next]"
        );

        const dots = Array.from(
            carousel.querySelectorAll("[data-convention-dot]")
        );

        // No inicializar si no hay diapositivas.
        if (slides.length === 0) {
            return;
        }

        // Identificar la diapositiva que debe aparecer primero.
        let currentIndex = slides.findIndex((slide) => {
            return (
                slide.classList.contains("is-active") &&
                !slide.hidden
            );
        });

        if (currentIndex === -1) {
            currentIndex = slides.findIndex((slide) => !slide.hidden);
        }

        if (currentIndex === -1) {
            currentIndex = 0;
        }

        // Mostrar una diapositiva y ocultar las demás.
        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === currentIndex;

                slide.hidden = !isActive;
                slide.classList.toggle("is-active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            // Actualizar los puntos de navegación.
            dots.forEach((dot) => {
                const dotIndex = Number(dot.dataset.conventionDot);
                const isActive = dotIndex === currentIndex;

                dot.classList.toggle("is-active", isActive);

                if (isActive) {
                    dot.setAttribute("aria-current", "true");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        // Ir al integrante anterior.
        previousButton?.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        // Ir al integrante siguiente.
        nextButton?.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });

        // Ir directamente al integrante seleccionado.
        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number(dot.dataset.conventionDot);

                if (
                    Number.isInteger(index) &&
                    index >= 0 &&
                    index < slides.length
                ) {
                    showSlide(index);
                }
            });
        });

        // Mostrar correctamente la diapositiva inicial.
        showSlide(currentIndex);
    });
})();
