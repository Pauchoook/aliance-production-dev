import Swiper, { Navigation, Mousewheel, Autoplay } from 'swiper';

const sliderBlogExpert = new Swiper('.blog-expert__slider', {
   modules: [Navigation, Autoplay],
   slidesPerView: 'auto',
   simulateTouch: false,
   navigation: {
      nextEl: '.blog-expert__arrow--next',
      prevEl: '.blog-expert__arrow--prev',
   },
   autoplay: {
      delay: 3500
   }
});
const slideResearchCenter = new Swiper('.research-center__slider', {
   modules: [Navigation, Autoplay],
   slidesPerView: 'auto',
   simulateTouch: false,
   loop: true,
   navigation: {
      nextEl: '.research-center__arrow-next',
      prevEl: '.research-center__arrow-prev',
   },
   autoplay: {
      delay: 3500
   }
});

if(window.matchMedia("(max-width: 1200px)").matches) {
   const heroSlider = new Swiper(('.facts-slider'), {
      modules: [Navigation, Mousewheel],
      slidesPerView: 'auto',
      mousewheel: true,
      navigation: {
         nextEl: '.facts-slider__slider-arrow--next',
         prevEl: '.facts-slider__slider-arrow--prev',
      }
   });

   const shemeWorkSlider = new Swiper(('.sheme-work__slider'), {
      modules: [Navigation],
      slidesPerView: 'auto',
      simulateTouch: false,
      navigation: {
         nextEl: '.sheme-work__arrow--next',
         prevEl: '.sheme-work__arrow--prev',
      }
   });
}