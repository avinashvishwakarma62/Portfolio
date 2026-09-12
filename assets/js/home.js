/* ============================================================
   Home page behaviour — animated counters, testimonial slider
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const value = target * eased;
      el.firstChild.textContent = decimals ? value.toFixed(decimals) : Math.round(value);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.firstChild.textContent = decimals ? target.toFixed(decimals) : target;
      }
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  }

  /* ---------- Testimonial slider ---------- */
  const track = document.querySelector('.testimonial-track');
  const dotsWrap = document.querySelector('.testimonial-nav');
  if (track && dotsWrap) {
    const slides = track.querySelectorAll('.testimonial-slide');
    const dots = dotsWrap.querySelectorAll('.testimonial-dot');
    let index = 0;
    let timer;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    };

    dots.forEach((dot, di) => {
      dot.addEventListener('click', () => {
        goTo(di);
        resetTimer();
      });
    });

    const startTimer = () => {
      timer = setInterval(() => goTo(index + 1), 5500);
    };
    const resetTimer = () => {
      clearInterval(timer);
      startTimer();
    };

    startTimer();
  }
});
