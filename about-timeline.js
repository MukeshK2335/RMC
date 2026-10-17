const historyTimeline = document.querySelector(".about-history");
const historyItems = [...document.querySelectorAll(".about-history-item")];
const historyMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (historyTimeline && historyItems.length && !historyMotionPreference.matches) {
  historyTimeline.classList.add("has-timeline-motion");

  const pendingItems = new Set(historyItems);
  let itemObserver;
  let timelineObserver;

  const revealVisibleItems = () => {
    const timelineBounds = historyTimeline.getBoundingClientRect();
    if (timelineBounds.top < window.innerHeight * 0.9 && timelineBounds.bottom > window.innerHeight * 0.1) {
      historyTimeline.classList.add("is-visible");
    }

    pendingItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > window.innerHeight * 0.1) {
        item.classList.add("is-visible");
        pendingItems.delete(item);
        if (itemObserver) itemObserver.unobserve(item);
      }
    });

    if (pendingItems.size === 0) {
      if (itemObserver) itemObserver.disconnect();
      if (timelineObserver) timelineObserver.disconnect();
      window.removeEventListener("scroll", revealVisibleItems);
      window.removeEventListener("resize", revealVisibleItems);
    }
  };

  if ("IntersectionObserver" in window) {
    itemObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          pendingItems.delete(entry.target);
          observer.unobserve(entry.target);
        }
      });
      revealVisibleItems();
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          historyTimeline.classList.add("is-visible");
          timelineObserver.disconnect();
        }
      });
      revealVisibleItems();
    }, { threshold: 0.05 });

    historyItems.forEach((item) => itemObserver.observe(item));
    timelineObserver.observe(historyTimeline);
    window.addEventListener("scroll", revealVisibleItems, { passive: true });
    window.addEventListener("resize", revealVisibleItems);
    revealVisibleItems();
  } else {
    historyTimeline.classList.add("is-visible");
    historyItems.forEach((item) => item.classList.add("is-visible"));
  }
}
