'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// USE FOR EACH METHOD to select two modals. First button is at the top, second is at the bottom.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLLING
// 1. WE want to scroll, learn more will be go to features part (section--1). There are two ways.
// There is a class name for "learn more" class="btn--text btn--scroll-to"
// find the coordinates of the element that we want to scroll to
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // Find the coordinates of learn more button
  console.log(e.target.getBoundingClientRect());
  // current scroll, it changes
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //viewport

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling to features part 1. way
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + pageYOffset,
    behavior: 'smooth', });
}); */

  // 2. way
  section1.scrollIntoView({ behavior: 'smooth' });
});

//IMPLEMENTING EVENT DELEGATION
// benim section--1 class name ile linkim var. Bu linke tıkladığımda onu açmak ve oraya gitmek istiyorum. bunun için o bölüme section--1 adında bir id ekledim. ve çağırınca bu id ye gidiyor.
// Bu yöntem daha fazala link olduğunda yavaş çalışıyor. Bu sebepkle daha iyi bir yöntem kullnacağız.

/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behaviour: 'smooth' });
  });
}); */
//1. ADD EVENT LISTENER TO COMMON PARENT ELEMENT
// 2. DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
//3. the commmon element of the links is "nav__links"
// event will be happen at e.target

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//****TABBED COMPONENT****
// When we click the tab it will show us the associate context.
// the first tab will be active.
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //Remove active classes

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //activate tab

  clicked.classList.add('operations__tab--active');

  // Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION. At the nav bar when we over the mouse it fades
// we will use event delegation

// we will use MOUSEOVER and MOUSEOUT
// the first way:
/*

const nav = document.querySelector('.nav');
// chose parent and siblings

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });

    logo.style.opacity = 0.5;
  }
});
// şimdi hepsi fade kaldı bunu maousu çeknce normale döndürmemiz gerek. We will write the same code but we will change the opacity.
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });

    logo.style.opacity = 1;
  }
});
*/

// 2. the second way better way
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// STICKY NAVIGATION,
// after nav bar section1 comes, first we will find the coordinates of section1
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  // find the Y position when you scroll
  console.log(window.scrollY);

  // if scrollY > inial Coordinate make scroll sticky

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
// INTERSECTION OBSERVER API
// It is for not intersect with the section1. sticky nav will start just before section 1

/* 
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
// to find the hight. it is 90 px
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  // you can change the px.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEAL SECTİONS

// we created a section--hidden class at css file
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images. ıt is very important for perfomans of your page.
// select lazy images. alla images are not lazy so select just this property. data-src
const imgTargets = document.querySelectorAll('img[data-src]');

// check the images
console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // replace src with data-src

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {});
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER
// At THE beginning all the slides are top on of others. With the javascript they will become side by side
///////////////////////////////////////

// In the CSS our slides have trasnformX property, it enables to slide move right and left side.

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//DOM EVENTS

//1. DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

//2. LOAD EVENT

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// here  I will attach JS file with defer attribute. Defe attribute should become in head section.
