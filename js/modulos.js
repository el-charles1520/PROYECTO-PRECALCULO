
"use strict";

/* ========================================
   ELEMENTOS DE LA PÁGINA
======================================== */

const $ = (selector) => document.querySelector(selector);

const menuToggle = $(".menu-toggle");
const navLinks = $("#nav-links");

const moduleDialog = $("#module-dialog");
const dialogTitle = $("#dialog-title");
const dialogDescription = $("#dialog-description");
const dialogTopics = $("#dialog-topics");


/* ========================================
   MENÚ MÓVIL
======================================== */

menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open") ?? false;

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
   TEMARIO ACTUALIZADO
======================================== */

const modules = [
    {
        title: "Módulo 1. Álgebra y ecuaciones",

        description:
            "Aprende las bases del álgebra, resuelve ecuaciones y aplica los conceptos a problemas.",

        topics: [
            "Exponentes y radicales — 1 video.",
            "Expresiones racionales — 1 video.",
            "Ecuaciones — 1 video.",
            "Ecuaciones cuadráticas — 1 video.",
            "Modelado de ecuaciones — 1 video."
        ]
    },

    {
        title: "Módulo 2. Geometría de coordenadas y rectas",

        description:
            "Aprende a trabajar con el plano cartesiano, calcular distancias y puntos medios, y estudiar las rectas.",

        topics: [
            "Plano cartesiano — 1 video.",
            "Distancia entre puntos — 1 video.",
            "Punto medio — 1 video.",
            "Pendiente de una recta — 1 video.",
            "Ecuación de la recta — 1 video.",
            "Rectas paralelas — 1 video."
        ]
    },

    {
        title: "Módulo 3. Funciones y gráficas",

        description:
            "Comprende las funciones, estudia su comportamiento y aprende sobre funciones polinomiales y ceros reales.",

        topics: [
            "Funciones — Parte 1.",
            "Funciones — Parte 2.",
            "Análisis de funciones — 1 video.",
            "Funciones polinomiales — 1 video.",
            "Ceros reales — 1 video."
        ]
    }
];


/* ========================================
   ABRIR EL CONTENIDO DE UN MÓDULO
======================================== */

document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.module);
        const selectedModule = modules[index];

        if (
            !selectedModule ||
            !moduleDialog ||
            !dialogTitle ||
            !dialogDescription ||
            !dialogTopics
        ) {
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
   CERRAR LAS VENTANAS
======================================== */

document.querySelectorAll(".dialog-close, .dialog-ok").forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog?.open) {
            dialog.close();
        }
    });
});

moduleDialog?.addEventListener("click", (event) => {
    if (event.target === moduleDialog) {
        moduleDialog.close();
    }
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
    const links = navLinks?.querySelectorAll(
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

                links.forEach((link) => {
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
