if (window.location.protocol === 'http:') {
    window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    console.log(images.length)

    function imageLoaded() {
        loadedImages++;
        console.log(loadedImages)

        if (loadedImages === images.length) {
            document.getElementById('loading-screen').style.display = 'none';
        }
    }

    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
        }
        img.addEventListener('error', imageLoaded); // Handle error cases
    });

    setTimeout(() => {
        if (loadedImages <= images.length) {
            document.getElementById('loading-screen').style.display = 'none';
        }
    }, 5000);
});