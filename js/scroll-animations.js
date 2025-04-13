/**
 * Enhanced Scroll Animations
 * This script handles all scroll-based animations and effects
 */
document.addEventListener("DOMContentLoaded", function() {
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Create scroll down indicator for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-down-indicator';
    scrollIndicator.innerHTML = `
      <span>Scroll</span>
      <div class="chevron"></div>
      <div class="chevron"></div>
      <div class="chevron"></div>
    `;
    heroSection.appendChild(scrollIndicator);
    
    // Scroll down when indicator is clicked
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('#about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Get all elements with data-scroll attribute
  const scrollElements = document.querySelectorAll('[data-scroll]');
  
  // Convert existing fade-in elements to use the new system
  document.querySelectorAll('.fade-in').forEach(el => {
    if (!el.hasAttribute('data-scroll')) {
      el.setAttribute('data-scroll', 'fade-up');
      // Keep any existing transition delays
      const style = window.getComputedStyle(el);
      const delay = style.getPropertyValue('transition-delay');
      if (delay && delay !== '0s') {
        const delayMs = parseFloat(delay) * 1000;
        const roundedDelay = Math.round(delayMs / 100) * 100;
        if (roundedDelay <= 1000) {
          el.setAttribute('data-delay', roundedDelay.toString());
        }
      }
    }
  });

  // Apply staggered animations to grid items
  const applyStaggeredAnimations = () => {
    // Projects grid
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.classList.add('stagger-item');
      card.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
    });
    
    // Skills grid
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      category.classList.add('stagger-item');
      category.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
    });
  };
  
  applyStaggeredAnimations();

  // Throttle function to limit how often a function can be called
  const throttle = (callback, delay = 100) => {
    let isThrottled = false;
    
    return function(...args) {
      if (isThrottled) return;
      
      isThrottled = true;
      callback.apply(this, args);
      
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    };
  };

  // Check if an element is in viewport
  const isElementInViewport = (el, offset = 0) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
  };

  // Handle scroll animations
  const handleScrollAnimations = () => {
    // Update scroll progress bar
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollProgress}%`;
    
    // Handle scroll down indicator visibility
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
      if (scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
        setTimeout(() => {
          scrollIndicator.style.display = 'none';
        }, 300);
      } else {
        scrollIndicator.style.display = 'flex';
        setTimeout(() => {
          scrollIndicator.style.opacity = '0.7';
        }, 10);
      }
    }
    
    // Handle parallax effects
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.2;
      const yPos = -(scrollTop * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
    
    // Handle scroll animations
    scrollElements.forEach(el => {
      if (isElementInViewport(el, 50)) {
        el.classList.add('in-view');
      }
    });
    
    // Handle staggered animations
    document.querySelectorAll('.stagger-item').forEach(el => {
      if (isElementInViewport(el, 50)) {
        el.classList.add('in-view');
      }
    });
  };

  // Optimize Three.js performance while scrolling
  const optimizeThreeJsOnScroll = () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        // Reduce quality while scrolling
        canvas.style.opacity = '0.7';
      }
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        // Restore quality when scrolling stops
        canvas.style.opacity = '1';
      }, 200);
    });
  };
  
  // Initialize optimizations
  optimizeThreeJsOnScroll();
  
  // Add throttled scroll event listener
  window.addEventListener('scroll', throttle(handleScrollAnimations, 50));
  
  // Initial check
  setTimeout(handleScrollAnimations, 100);
  
  // Recheck on window resize
  window.addEventListener('resize', throttle(() => {
    handleScrollAnimations();
  }, 100));
});
