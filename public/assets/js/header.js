let menuVisible = false;
function toggleMenu() {
    const hamburguer = $('#hamburger');
    const menu = $('#mobile-menu');
    if (menuVisible) {
        menuVisible = false;
        hamburguer.removeClass('open');
        menu.fadeOut();
    } else {
        menuVisible = true;
        hamburguer.addClass('open');
        menu.fadeIn();
    }
}