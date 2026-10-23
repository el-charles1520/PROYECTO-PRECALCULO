
"use strict";

/* =========================================
   PRECALC PRO — SISTEMA DE VIDEOS
   Se conservan las clases y el CSS existente.
========================================= */

const modulesData = {
    1: {
        name: "Álgebra y ecuaciones",
        page: "modulo1.html",
        topics: [
            {
                id: "exponentes-radicales",
                title: "Exponentes y radicales",
                description: "Aprende las propiedades de los exponentes, la simplificación de radicales y las operaciones básicas.",
                videoUrl: "",
                youtubeId: "cnOU_z8qCkE"
            },
            {
                id: "expresiones-racionales",
                title: "Expresiones racionales",
                description: "Aprende a simplificar, sumar, restar, multiplicar y dividir expresiones racionales.",
                videoUrl: "",
                youtubeId: "xOpsTfJ32Bo"
            },
            {
                id: "ecuaciones",
                title: "Ecuaciones",
                description: "Resuelve ecuaciones paso a paso y comprueba las soluciones.",
                videoUrl: "",
                youtubeId: "fjP2P6KDWN8"
            },
            {
                id: "ecuaciones-cuadraticas",
                title: "Ecuaciones cuadráticas",
                description: "Aprende a resolver ecuaciones cuadráticas mediante diferentes métodos.",
                videoUrl: "",
                youtubeId: "Njuqlc6bZSY"
            },
            {
                id: "modelado-ecuaciones",
                title: "Modelado de ecuaciones",
                description: "Traduce situaciones y problemas al lenguaje algebraico para plantear ecuaciones.",
                videoUrl: "",
                youtubeId: "GB482EPzhZw"
            }
        ]
    },

    2: {
        name: "Geometría de coordenadas y rectas",
        page: "modulo2.html",
        topics: [
            {
                id: "plano",
                title: "Plano cartesiano",
                description: "Conoce el plano cartesiano y aprende a ubicar coordenadas.",
                videoUrl: "",
                youtubeId: "JJJ7wa4-suY"
            },
            {
                id: "distancia",
                title: "Distancia entre puntos",
                description: "Aprende a calcular la distancia entre dos puntos del plano cartesiano.",
                videoUrl: "",
                youtubeId: "w7UAK-CWocA"
            },
            {
                id: "punto",
                title: "Punto medio",
                description: "Aprende a encontrar el punto medio entre dos puntos.",
                videoUrl: "",
                youtubeId: "AAypYDeQqVI"
            },
            {
                id: "pendiente",
                title: "Pendiente de una recta",
                description: "Comprende qué representa la pendiente y cómo calcularla.",
                videoUrl: "",
                youtubeId: "XtB82riIREg"
            },
            {
                id: "ecuacion-recta",
                title: "Ecuación de la recta",
                description: "Aprende a encontrar y utilizar la ecuación de una recta.",
                videoUrl: "",
                youtubeId: "2-YpQ9aq7T0"
            },
            {
                id: "rectas-paralelas",
                title: "Rectas paralelas",
                description: "Identifica las rectas paralelas y comprende la relación entre sus pendientes.",
                videoUrl: "",
                youtubeId: "cvg99K3tKc4"
            }
        ]
    },

    3: {
        name: "Funciones y gráficas",
        page: "modulo3.html",
        topics: [
            {
                id: "funciones-parte-1",
                title: "Funciones — Parte 1",
                description: "Primera parte del estudio de las funciones y sus conceptos fundamentales.",
                videoUrl: "",
                youtubeId: "ef70hLgs9D4"
            },
            {
                id: "funciones-parte-2",
                title: "Funciones — Parte 2",
                description: "Segunda parte del estudio de las funciones. Continúa el aprendizaje con este video.",
                videoUrl: "",
                youtubeId: "k7SPSOSBzaI"
            },
            {
                id: "analisis-funciones",
                title: "Análisis de funciones",
                description: "Aprende a interpretar las características y el comportamiento de una función.",
                videoUrl: "",
                youtubeId: "06VTwIgS7SM"
            },
            {
                id: "funciones-polinomiales",
                title: "Funciones polinomiales",
                description: "Estudia las funciones polinomiales y las características de sus gráficas.",
                videoUrl: "",
                youtubeId: "fzYukORr4UM"
            },
            {
                id: "ceros-reales",
                title: "Ceros reales",
                description: "Aprende qué son los ceros reales de una función y cómo identificarlos.",
                videoUrl: "",
                youtubeId: "_gwzBQzEYVQ"
            },
            {
                id: "funciones-cuadraticas",
                title: "Funciones cuadráticas",
                description: "Aprende qué son las funciones cuadráticas, cómo se representan mediante parábolas y cuáles son sus principales características.",
                videoUrl: "",
                youtubeId: "tqxwrqY7u0k"
            }
        ]
    }
};

/* =========================================
   PREPARAR TODOS LOS TEMAS
========================================= */

const allTopics = Object.entries(modulesData).flatMap(
    ([moduleId, module]) =>
        module.topics.map(topic => ({
            ...topic,
            moduleId: Number(moduleId),
            moduleName: module.name,
            modulePage: module.page
        }))
);

/* =========================================
   INICIAR EL REPRODUCTOR
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const currentModuleId = Number(document.body.dataset.module);
    const currentModule = modulesData[currentModuleId];

    if (!currentModule) {
        console.error("No se encontró la información del módulo.");
        return;
    }

    const player = document.getElementById("video-player");
    const videoTitle = document.getElementById("video-title");
    const videoDescription = document.getElementById("video-description");
    const videoModuleLabel = document.getElementById("video-module-label");
    const topicList = document.getElementById("topic-list");
    const topicCount = document.getElementById("topic-count");
    const recommendationsGrid = document.getElementById("recommendations-grid");
    const previousButton = document.getElementById("previous-video");
    const nextButton = document.getElementById("next-video");

    if (
        !player ||
        !videoTitle ||
        !videoDescription ||
        !videoModuleLabel ||
        !topicList ||
        !topicCount ||
        !recommendationsGrid
    ) {
        console.error("Faltan elementos necesarios en el HTML del módulo.");
        return;
    }

    let currentTopicIndex = 0;

    /* =====================================
       MOSTRAR MENSAJE EN EL REPRODUCTOR
    ===================================== */

    function showPlaceholder(message, detail) {
        const placeholder = document.createElement("div");
        placeholder.className = "video-placeholder";

        const play = document.createElement("div");
        play.className = "play-symbol";
        play.textContent = "▶";

        const heading = document.createElement("h2");
        heading.textContent = message;

        const paragraph = document.createElement("p");
        paragraph.textContent = detail;

        placeholder.append(play, heading, paragraph);
        player.replaceChildren(placeholder);
    }

    /* =====================================
       LISTA DE TEMAS DEL MÓDULO
    ===================================== */

    function renderTopicList() {
        topicList.replaceChildren();

        currentModule.topics.forEach((topic, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "topic-item";
            button.dataset.topicId = topic.id;

            const number = document.createElement("span");
            number.className = "topic-number";
            number.textContent = String(index + 1).padStart(2, "0");

            const textContainer = document.createElement("span");
            textContainer.className = "topic-item-text";

            const title = document.createElement("span");
            title.className = "topic-item-title";
            title.textContent = topic.title;

            const subtitle = document.createElement("span");
            subtitle.className = "topic-item-subtitle";
            subtitle.textContent = `Módulo ${currentModuleId}`;

            textContainer.append(title, subtitle);
            button.append(number, textContainer);

            button.addEventListener("click", () => {
                showTopic(index);
            });

            topicList.appendChild(button);
        });

        topicCount.textContent = `${currentModule.topics.length} temas`;
        updateNavigationButtons();
    }

    /* =====================================
       ACTUALIZAR BOTONES DE NAVEGACIÓN
    ===================================== */

    function updateNavigationButtons() {
        if (previousButton) {
            previousButton.disabled = currentTopicIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled =
                currentTopicIndex === currentModule.topics.length - 1;
        }
    }

    /* =====================================
       REPRODUCIR UN TEMA
    ===================================== */

    function showTopic(index) {
        if (index < 0 || index >= currentModule.topics.length) {
            return;
        }

        currentTopicIndex = index;

        const topic = currentModule.topics[index];

        videoTitle.textContent = topic.title;
        videoDescription.textContent = topic.description;

        videoModuleLabel.textContent =
            `Módulo ${currentModuleId} · ${currentModule.name}`;

        const localUrl = (topic.videoUrl || "").trim();
        const youtubeId = (topic.youtubeId || "").trim();

        if (localUrl) {
            const video = document.createElement("video");

            video.controls = true;
            video.preload = "metadata";
            video.playsInline = true;
            video.setAttribute("aria-label", topic.title);

            const source = document.createElement("source");
            source.src = localUrl;
            source.type = "video/mp4";

            video.appendChild(source);

            video.addEventListener("error", () => {
                showPlaceholder(
                    "No se pudo cargar el video",
                    `Verifica que el archivo exista en esta ruta: ${localUrl}`
                );
            }, { once: true });

            player.replaceChildren(video);
            video.load();

        } else if (
            youtubeId &&
            youtubeId !== "REEMPLAZAR_CON_ID_DE_YOUTUBE"
        ) {
            const iframe = document.createElement("iframe");

            iframe.src =
                `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`;

            iframe.title = topic.title;
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.allowFullscreen = true;

            player.replaceChildren(iframe);

        } else {
            showPlaceholder(
                "Video próximamente",
                "El video de este tema todavía no tiene una ruta configurada."
            );
        }

        topicList.querySelectorAll(".topic-item").forEach((button, i) => {
            button.classList.toggle("active", i === index);
            button.setAttribute(
                "aria-current",
                i === index ? "true" : "false"
            );
        });

        updateNavigationButtons();
    }

    /* =====================================
       ABRIR UN TEMA DE OTRO MÓDULO
    ===================================== */

    function openTopic(topic) {
        const destination =
            `${topic.modulePage}?tema=${encodeURIComponent(topic.id)}`;

        if (topic.moduleId === currentModuleId) {
            const index = currentModule.topics.findIndex(
                item => item.id === topic.id
            );

            if (index !== -1) {
                showTopic(index);
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
        }

        window.location.href = destination;
    }

    /* =====================================
       RECOMENDACIONES DE OTROS MÓDULOS
       Miniaturas de YouTube o vistas previas MP4
    ===================================== */

    function renderRecommendations() {
        recommendationsGrid.replaceChildren();

        const recommendations = allTopics.filter(
            topic => topic.moduleId !== currentModuleId
        );

        recommendations.forEach(topic => {
            const card = document.createElement("article");
            card.className = "recommendation-card";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "recommendation-open";
            button.setAttribute(
                "aria-label",
                `Reproducir ${topic.title}`
            );

            const thumbnail = document.createElement("div");
            thumbnail.className = "recommendation-thumbnail";

            const localUrl = (topic.videoUrl || "").trim();
            const youtubeId = (topic.youtubeId || "").trim();

            /* Mantener las vistas previas MP4 existentes. */
            if (localUrl) {
                const preview = document.createElement("video");

                preview.src = localUrl;
                preview.muted = true;
                preview.loop = true;
                preview.autoplay = true;
                preview.playsInline = true;
                preview.preload = "metadata";
                preview.setAttribute("aria-hidden", "true");

                preview.addEventListener("error", () => {
                    preview.remove();
                }, { once: true });

                thumbnail.appendChild(preview);

            /* Mostrar la miniatura de YouTube. */
            } else if (
                youtubeId &&
                youtubeId !== "REEMPLAZAR_CON_ID_DE_YOUTUBE"
            ) {
                const image = document.createElement("img");

                image.src =
                    `https://img.youtube.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg`;

                image.alt = `Miniatura del video: ${topic.title}`;
                image.loading = "lazy";

                image.style.position = "absolute";
                image.style.inset = "0";
                image.style.width = "100%";
                image.style.height = "100%";
                image.style.objectFit = "cover";

                image.addEventListener("error", () => {
                    image.remove();
                }, { once: true });

                thumbnail.appendChild(image);
            }

            const play = document.createElement("span");
            play.className = "recommendation-play";
            play.textContent = "▶";

            thumbnail.appendChild(play);

            const content = document.createElement("div");
            content.className = "recommendation-content";

            const moduleLabel = document.createElement("span");
            moduleLabel.className = "recommendation-module";
            moduleLabel.textContent =
                `Módulo ${topic.moduleId} · ${topic.moduleName}`;

            const title = document.createElement("h3");
            title.textContent = topic.title;

            const description = document.createElement("p");
            description.textContent = topic.description;

            content.append(moduleLabel, title, description);
            button.append(thumbnail, content);

            button.addEventListener("click", () => {
                openTopic(topic);
            });

            card.appendChild(button);
            recommendationsGrid.appendChild(card);
        });
    }

    /* =====================================
       CARGAR TEMA DESDE LA URL
       Ejemplo: modulo2.html?tema=pendiente
    ===================================== */

    function loadRequestedTopic() {
        const params = new URLSearchParams(window.location.search);
        const requestedId = params.get("tema");

        if (!requestedId) {
            showTopic(0);
            return;
        }

        const requestedIndex = currentModule.topics.findIndex(
            topic => topic.id === requestedId
        );

        if (requestedIndex !== -1) {
            showTopic(requestedIndex);
            return;
        }

        const requestedTopic = allTopics.find(
            topic => topic.id === requestedId
        );

        if (requestedTopic) {
            window.location.replace(
                `${requestedTopic.modulePage}?tema=${encodeURIComponent(requestedTopic.id)}`
            );
            return;
        }

        showTopic(0);
    }

    /* =====================================
       BOTONES ANTERIOR Y SIGUIENTE
    ===================================== */

    previousButton?.addEventListener("click", () => {
        if (currentTopicIndex > 0) {
            showTopic(currentTopicIndex - 1);
        }
    });

    nextButton?.addEventListener("click", () => {
        if (currentTopicIndex < currentModule.topics.length - 1) {
            showTopic(currentTopicIndex + 1);
        }
    });

    /* =====================================
       MENÚ PARA CELULARES
    ===================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            });
        });
    }

    /* =====================================
       AÑO AUTOMÁTICO
    ===================================== */

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* =====================================
       INICIAR
    ===================================== */

    renderTopicList();
    renderRecommendations();
    loadRequestedTopic();
});
