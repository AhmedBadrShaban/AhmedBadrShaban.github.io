"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "./content";

const colors = ["peach", "blue", "sage", "yellow"];

function MockWindow() {
  return <div className="mock-window" aria-hidden="true"><div className="mock-top"><i className="mock-dot" /><i className="mock-dot" /><i className="mock-dot" /><i className="mock-url" /></div><div className="mock-content"><div className="mock-copy"><div className="mock-line wide" /><div className="mock-line" /><div className="mock-line short" /><div className="mock-button" /></div><div className="mock-panel" /></div></div>;
}

export default function WorkSlider() {
  const items = content.en.work;
  const viewport = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const paused = useRef(false);
  const visible = useRef(false);
  const [active, setActive] = useState(0);

  const goTo = (index: number, smooth = true) => {
    const next = (index + items.length) % items.length;
    const card = viewport.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "nearest", inline: "start" });
    activeRef.current = next;
    setActive(next);
  };

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: 0.35 });
    observer.observe(element);
    const timer = window.setInterval(() => {
      if (visible.current && !paused.current && !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        goTo(activeRef.current + 1);
      }
    }, 6000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  // The number of slides is fixed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActive = () => {
    const element = viewport.current;
    if (!element) return;
    const start = element.getBoundingClientRect().left;
    const positions = [...element.children].map((child) => {
      const box = child.getBoundingClientRect();
      return Math.abs(box.left - start);
    });
    const index = positions.indexOf(Math.min(...positions));
    if (index !== activeRef.current) { activeRef.current = index; setActive(index); }
  };

  return <div className="work-slider" onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} onFocusCapture={() => { paused.current = true; }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) paused.current = false; }}>
    <div className="project-grid" ref={viewport} onScroll={updateActive} aria-label="Selected work, swipe to browse">
      {items.map((item, index) => <article className="project-card" key={index}><div className={`project-visual ${colors[index]}`}><MockWindow /></div><div className="project-body"><div className="project-meta"><span>{item.kind}</span><span className="project-number">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="project-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}
    </div>
    <div className="slider-controls"><span className="slider-count"><strong>0{active + 1}</strong> / 0{items.length}</span><div className="slider-progress" aria-hidden="true">{items.map((_, index) => <span className={index === active ? "is-active" : ""} key={index} />)}</div><div className="slider-buttons"><button type="button" onClick={() => goTo(activeRef.current - 1)} aria-label="Previous work">←</button><button type="button" onClick={() => goTo(activeRef.current + 1)} aria-label="Next work">→</button></div></div>
  </div>;
}
