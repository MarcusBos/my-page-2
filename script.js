document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".page-one-menu-item, .side-menu a");
    const MENU_STATE_KEY = "portfolioMenuOpen";
    const collapsibleMenus = document.querySelectorAll(".collapse.page-one-menu, .collapse.side-menu");
    const collapseToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');

    menuLinks.forEach((link) => {
        const initialSize = parseFloat(window.getComputedStyle(link).fontSize);
        const baseSize = Number.isNaN(initialSize) ? 16 : initialSize;
        link.style.transition = "font-size 0.15s ease";

        link.addEventListener("mouseenter", () => {
            link.style.fontSize = `${baseSize + 5}px`;
        });

        link.addEventListener("mouseleave", () => {
            link.style.fontSize = `${baseSize}px`;
        });

        link.addEventListener("focus", () => {
            link.style.fontSize = `${baseSize + 5}px`;
        });

        link.addEventListener("blur", () => {
            link.style.fontSize = `${baseSize}px`;
        });
    });

    const relatedToggles = Array.from(collapseToggles).filter((toggle) => {
        const target = toggle.getAttribute("data-bs-target");
        return target && document.querySelector(target);
    });

    const setMenusOpenState = (isOpen) => {
        collapsibleMenus.forEach((menu) => {
            menu.classList.toggle("show", isOpen);
        });

        relatedToggles.forEach((toggle) => {
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.classList.toggle("collapsed", !isOpen);
        });
    };

    if (collapsibleMenus.length > 0) {
        const shouldOpenOnLoad = localStorage.getItem(MENU_STATE_KEY) === "true";
        setMenusOpenState(shouldOpenOnLoad);
    }

    collapsibleMenus.forEach((menu) => {
        menu.addEventListener("shown.bs.collapse", () => {
            localStorage.setItem(MENU_STATE_KEY, "true");
        });

        menu.addEventListener("hidden.bs.collapse", () => {
            localStorage.setItem(MENU_STATE_KEY, "false");
        });
    });

});
