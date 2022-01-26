addEventListener("click", event => {
    const target = event.target;
    if (!target.classList.contains("git")) {
        return;
    }
    const url = target.href;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const features = `width=${width},height=${height}`;
    window.open(url, "_blank", features);
    event.preventDefault();
});