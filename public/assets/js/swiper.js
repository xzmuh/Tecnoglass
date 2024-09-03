const swiper = new Swiper('#swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    autoHeight: true,
    // slidesOffsetBefore: -250,
    // slidesOffsetAfter: -250,
    centeredSlides: true,
    direction: 'horizontal',
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 2,
        },
        400: {
            slidesPerView: 1,
        }
    }
})

const swiper2 = new Swiper('#swiper2', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    autoplay: true,
    direction: 'horizontal',
    loop: true,
    navigation: false,
    allowTouchMove: false,
})