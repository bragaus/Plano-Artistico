// Dynamic font sizing based on viewport height
function adjustFontSize() {
    const menu = document.querySelector('.menu-mobilea');
    const menuHeight = menu.offsetHeight;
    const items = document.querySelectorAll('.menu-mobilea a');
    const totalItems = items.length;
    
    // Calculate ideal font size based on available height
    const availableHeight = menuHeight - 40; // Account for padding
    const fontSize = Math.min(32, Math.floor(availableHeight / (totalItems * 2))); // Limit max font size to 32px
    
    items.forEach(item => {
        item.style.fontSize = `${fontSize}px`;
    });
}

// Run on load and resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);