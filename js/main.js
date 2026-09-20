/*  FARTOOS MAIN JAVASCRIPT  */
document.addEventListener("DOMContentLoaded", () => {
    const loader =
        document.getElementById("pageLoader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("loaded");
            }
        }, 450);
    });
    const currentYear =
        document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }
    const themeToggle =
        document.getElementById("themeToggle");
    const themeIcon =
        document.querySelector(".theme-icon");
    function setTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            if (themeIcon) {
                themeIcon.textContent = "☾";
            }
            localStorage.setItem(
                "fartoos-theme",
                "dark"
            );
        } else {
            document.documentElement.classList.remove("dark");
            if (themeIcon) {
                themeIcon.textContent = "☼";
            }
            localStorage.setItem(
                "fartoos-theme",
                "light"
            );
        }
    }
    function initializeTheme() {
        const savedTheme =
            localStorage.getItem("fartoos-theme");
        if (savedTheme) {
            setTheme(savedTheme);
            return;
        }
        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
        setTheme(
            prefersDark
                ? "dark"
                : "light"
        );
    }
    initializeTheme();
    if (themeToggle) {
        themeToggle.addEventListener(
            "click",
            () => {
                const isDark =
                    document.documentElement
                        .classList.contains("dark");
                setTheme(
                    isDark
                        ? "light"
                        : "dark"
                );
            }
        );
    }
    const navLinks =
        document.querySelectorAll(
            '.nav-square[href^="#"]'
        );
    navLinks.forEach(link => {
        link.addEventListener(
            "click",
            event => {
                const targetId =
                    link.getAttribute("href");
                if (!targetId || targetId === "#") {
                    return;
                }
                const target =
                    document.querySelector(targetId);
                if (!target) {
                    return;
                }
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });
    const sections =
        document.querySelectorAll(
            "main section[id]"
        );
    const sectionLinks =
        document.querySelectorAll(
            '.nav-square[href^="#"]'
        );
    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    const id =
                        entry.target.getAttribute("id");
                    sectionLinks.forEach(link => {
                        link.classList.remove(
                            "active"
                        );
                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {
                            link.classList.add(
                                "active"
                            );
                        }
                    });
                });
            },
            {
                threshold: 0.25,
                rootMargin: "-15% 0px -55% 0px"
            }
        );
    sections.forEach(section => {
        observer.observe(section);
    });
    const revealElements =
        document.querySelectorAll(
            ".section-heading, .about-card, .map-wrapper, .barrier-card, .product-image, .coming-soon-card, .contact-card"
        );
    revealElements.forEach(element => {
        element.classList.add("reveal");
    });
    const revealObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (
                        entry.isIntersecting
                    ) {
                        entry.target.classList.add(
                            "visible"
                        );
                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.08
            }
        );
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    const imageSlots =
        document.querySelectorAll(
            ".product-image"
        );
    imageSlots.forEach((slot, index) => {
        slot.dataset.imageNumber =
            String(index + 1).padStart(2, "0");
    });
    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Escape"
            ) {
                document.activeElement?.blur();
            }
        }
    );
});




