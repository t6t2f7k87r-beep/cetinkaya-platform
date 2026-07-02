"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const revealNow = (element: HTMLElement) => {
      element.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => revealNow(element));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    const attach = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      elements.forEach((element, index) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 60}ms`);

        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          revealNow(element);
          return;
        }

        observer?.observe(element);
      });
    };

    const frame = window.requestAnimationFrame(attach);
    const mutationObserver = new MutationObserver(() => attach());

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
