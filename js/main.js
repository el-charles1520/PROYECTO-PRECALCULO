
"use strict";

/* ========================================
   ELEMENTOS PRINCIPALES
======================================== */

const $ = (selector) => document.querySelector(selector);

const menuToggle = $(".menu-toggle");
const navLinks = $("#nav-links");

const moduleDialog = $("#module-dialog");
const creatorsDialog = $("#creators-dialog");

const dialogTitle = $("#dialog-title");
const dialogDescription = $("#dialog-description");
const dialogTopics = $("#dialog-topics");


/* ========================================
   MENÚ PARA CELULARES
======================================== */

menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Abrir menú");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }
    });
});


/* ========================================
   CONTENIDO DE LOS TRES MÓDULOS
======================================== */

const modules = [
    {
        title: "Módulo 1. Álgebra y ecuaciones",

        description:
            "Aprende las bases del álgebra y aplica ecuaciones a la resolución de problemas.",

        topics: [
            "Exponentes y radicales: propiedades, simplificación y operaciones.",

            "Expresiones racionales: simplificación, operaciones y restricciones.",

            "Ecuaciones: resolución algebraica y comprobación.",

            "Modelado con ecuaciones: planteamiento y resolución de problemas."
        ]
    },

    {
        title: "Módulo 2. Geometría analítica y rectas",

        description:
            "Estudia las coordenadas del plano y las relaciones entre rectas.",

        topics: [
            "Geometría de coordenadas: distancia, punto medio y plano cartesiano.",

            "Rectas: pendiente, ecuación, intersecciones, paralelas y perpendiculares."
        ]
    },

    {
        title: "Módulo 3. Funciones y gráficas",

        description:
            "Comprende las funciones y analiza sus representaciones gráficas.",

        topics: [
            "Funciones: concepto, notación, evaluación, dominio y rango.",

            "Análisis de funciones: dominio, rango, intervalos, máximos, mínimos e intersecciones.",

            "Funciones cuadráticas: gráfica, vértice, eje de simetría e intersecciones.",

            "Funciones polinomiales y ceros reales: comportamiento, gráficas, división de polinomios y determinación de ceros."
        ]
    }
];


/* ========================================
   ABRIR VENTANAS DE LOS MÓDULOS
======================================== */

document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
        const moduleIndex = Number(button.dataset.module);
        const selectedModule = modules[moduleIndex];

        if (!selectedModule || !moduleDialog) {
            return;
        }

        dialogTitle.textContent = selectedModule.title;
        dialogDescription.textContent = selectedModule.description;

        dialogTopics.replaceChildren();

        selectedModule.topics.forEach((topic) => {
            const item = document.createElement("li");

            item.textContent = topic;
            dialogTopics.appendChild(item);
        });

        if (!moduleDialog.open) {
            moduleDialog.showModal();
        }
    });
});


/* ========================================
   VENTANA DE LOS CREADORES
======================================== */

$("#creators-button")?.addEventListener("click", () => {
    if (creatorsDialog && !creatorsDialog.open) {
        creatorsDialog.showModal();
    }
});


/* ========================================
   CERRAR VENTANAS
======================================== */

document.querySelectorAll(".dialog-close, .dialog-ok").forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog?.open) {
            dialog.close();
        }
    });
});

[moduleDialog, creatorsDialog].forEach((dialog) => {
    dialog?.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});


/* ========================================
   AÑO AUTOMÁTICO
======================================== */

const year = $("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ========================================
   RESALTAR LA SECCIÓN ACTUAL
======================================== */

if ("IntersectionObserver" in window) {
    const navigationLinks = navLinks?.querySelectorAll(
        'a[href^="#"]'
    ) ?? [];

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                navigationLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}
