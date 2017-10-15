// This is where it all goes :)

/* Scroll.js */
function scrollTo(element, duration) {
  
    var e = document.documentElement;
  
    if (e.scrollTop === 0) {
  
      var t = e.scrollTop;
      ++e.scrollTop;
      e = t + 1 === e.scrollTop-- ? e : document.body;
    }
  
    scrollToC(e, e.scrollTop, element, duration);
    return false;
  }
  
  function scrollToC(element, from, to, duration) {
  
    if (duration < 0) return;
  
    if (typeof from === "object")
      from = from.offsetTop;
  
    if (typeof to === "object")
      to = to.offsetTop;
  
    scrollToX(element, from, to, 0, 1/duration, 20, easeOutCubic);
  }
  
  function scrollToX(element, x1, x2, t, v, step, operation) {
  
    if (t < 0 || t > 1 || v <= 0) return;
  
    element.scrollTop = x1 - (x1-x2)*operation(t);
    t += v * step;
  
    setTimeout(function() {
      scrollToX(element, x1, x2, t, v, step, operation);
    }, step);
  }
  
  function easeOutCubic(t) {
    t--;
    return t * t * t + 1;
  }
  
  function initSmoothScrolling() {
  
    var scrollToLinks = document.querySelectorAll('a.scrollto');
  
    if (scrollToLinks.length > 0) {
  
      for (var i = 0; i < scrollToLinks.length; i++) {
  
        var link = scrollToLinks[i];
  
        if (typeof link != 'undefined') {
  
          var target = document.querySelector(link.getAttribute('href')),
              duration = link.getAttribute('data-duration'),
              delay = link.getAttribute('data-delay');
  
          if (target != null) {
  
            if (duration == null) {
              link.setAttribute('data-duration', '800');
            } 
  
            if (delay == null) {
              link.setAttribute('data-delay', '100');
            }
  
            link.setAttribute('data-offset', target.offsetTop + 1);
  
            link.addEventListener("click", function(e) {
  
              e.preventDefault();
  
              var offset = this.getAttribute('data-offset'),
                  duration = this.getAttribute('data-duration'),
                  delay = this.getAttribute('data-delay');
  
              window.setTimeout(function() {
  
                scrollTo(offset, duration);
              }, delay);
  
            }, false);
          }
        }
      }
    }
  }
  /* END Scroll.js */
  
  
  function init() {
  
    initSmoothScrolling();
  
    // Reinit the scrolling positions after resize of the window
    window.onresize = initSmoothScrolling;
  }