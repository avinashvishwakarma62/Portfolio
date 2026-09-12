/* ============================================================
   HOME PAGE BEHAVIOUR
   Animated stat counters + testimonial slider

   IMPORTANT:
   Stats are dynamically rendered by content-loader.js.
   This file therefore initializes counters both on initial
   page load and whenever content-loader.js finishes rendering.
   ============================================================ */

(function () {

  /* ==========================================================
     ANIMATED STAT COUNTERS
     ========================================================== */

  let counterObserver = null;

  const animateCounter = (el) => {
    if (!el || el.dataset.counterAnimated === '1') return;

    const numberEl = el.querySelector('span:first-child');
    if (!numberEl) return;

    const target = parseFloat(el.getAttribute('data-target'));

    if (!Number.isFinite(target)) {
      numberEl.textContent = '0';
      return;
    }

    const decimalsAttr = el.getAttribute('data-decimals');
    const decimals = decimalsAttr
      ? parseInt(decimalsAttr, 10)
      : 0;

    const duration = 1600;
    const startValue = 0;
    const startTime = performance.now();

    el.dataset.counterAnimated = '1';

    const tick = (now) => {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);

      const value =
        startValue + (target - startValue) * eased;

      numberEl.textContent =
        decimals > 0
          ? value.toFixed(decimals)
          : Math.round(value).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        numberEl.textContent =
          decimals > 0
            ? target.toFixed(decimals)
            : Math.round(target).toString();
      }
    };

    requestAnimationFrame(tick);
  };


  const setupCounters = () => {

    const counters = document.querySelectorAll(
      '.stat-number[data-target]'
    );

    if (!counters.length) return;

    /*
     * Disconnect the previous observer so dynamically
     * rendered counters can be observed again.
     */
    if (counterObserver) {
      counterObserver.disconnect();
      counterObserver = null;
    }

    if ('IntersectionObserver' in window) {

      counterObserver = new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              animateCounter(entry.target);

              counterObserver.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.5
        }
      );

      counters.forEach((counter) => {

        /*
         * If already animated, don't reset it.
         */
        if (counter.dataset.counterAnimated === '1') {
          return;
        }

        counterObserver.observe(counter);

      });

    } else {

      /*
       * Fallback for browsers without IntersectionObserver.
       */
      counters.forEach((counter) => {
        animateCounter(counter);
      });

    }
  };


  /* ==========================================================
     TESTIMONIAL SLIDER
     ========================================================== */

  const setupTestimonials = () => {

    const track = document.querySelector(
      '.testimonial-track'
    );

    const dotsWrap = document.querySelector(
      '.testimonial-nav'
    );

    if (!track || !dotsWrap) return;

    const slides = track.querySelectorAll(
      '.testimonial-slide'
    );

    const dots = dotsWrap.querySelectorAll(
      '.testimonial-dot'
    );

    if (!slides.length || !dots.length) return;

    let index = 0;
    let timer = null;


    const goTo = (i) => {

      index =
        (i + slides.length) % slides.length;

      track.style.transform =
        `translateX(-${index * 100}%)`;

      dots.forEach((dot, dotIndex) => {

        dot.classList.toggle(
          'is-active',
          dotIndex === index
        );

      });

    };


    const startTimer = () => {

      clearInterval(timer);

      timer = setInterval(() => {
        goTo(index + 1);
      }, 5500);

    };


    const resetTimer = () => {

      clearInterval(timer);
      startTimer();

    };


    dots.forEach((dot, dotIndex) => {

      if (dot.dataset.testimonialBound === '1') {
        return;
      }

      dot.dataset.testimonialBound = '1';

      dot.addEventListener('click', () => {

        goTo(dotIndex);
        resetTimer();

      });

    });


    goTo(0);
    startTimer();

  };


  /* ==========================================================
     INITIAL LOAD
     ========================================================== */

  document.addEventListener(
    'DOMContentLoaded',
    () => {

      setupCounters();
      setupTestimonials();

    }
  );


  /* ==========================================================
     CONTENT LOADER SUPPORT
     
     content-loader.js dynamically replaces the homepage
     stats HTML and then dispatches "content-loaded".
     Re-initialize the counters after that happens.
     ========================================================== */

  document.addEventListener(
    'content-loaded',
    () => {

      setupCounters();

    }
  );


})();