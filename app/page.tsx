"use client";

import { useEffect } from "react";

const work = [
  { number: "01", kind: "Professional engagement", title: "E-commerce & trading", description: "Production Angular storefront and trading interfaces with real-time data integrations and responsive, bilingual experiences.", tags: ["Angular", "TypeScript", "WebSockets", "SSE"], color: "peach" },
  { number: "02", kind: "Professional engagement", title: "Enterprise billing dashboards", description: "Dashboard work for Overseas Gas and Kahraba, bringing complex billing information into clear, usable interfaces.", tags: ["Angular", "REST APIs", "Responsive UI"], color: "blue" },
  { number: "03", kind: "Professional engagement", title: "KYC & compliance systems", description: "Frontend dashboards supporting identity verification and compliance workflows, with a focus on accessible components.", tags: ["Angular", "TypeScript", "Accessibility"], color: "sage" },
  { number: "04", kind: "Freelance project", title: "Beauty clinic web application", description: "Independently designed, developed, and deployed a responsive appointment and services platform for a beauty clinic.", tags: ["Angular", "TypeScript", "REST APIs"], color: "yellow" },
];

const skills = [
  { title: "Frontend engineering", text: "Angular · TypeScript · JavaScript ES6+ · RxJS · NgRx · Angular SSR" },
  { title: "Interface craft", text: "HTML5 · CSS3 · Sass · Tailwind CSS · Zard UI · Responsive design" },
  { title: "Integration & quality", text: "REST APIs · WebSockets · SSE · Node.js · Jasmine · WCAG accessibility" },
  { title: "Delivery & reach", text: "Arabic/English RTL · SEO · Core Web Vitals · GA4 · Git · Azure · Agile" },
];

function MockWindow() {
  return <div className="mock-window" aria-hidden="true"><div className="mock-top"><i className="mock-dot"/><i className="mock-dot"/><i className="mock-dot"/><i className="mock-url"/></div><div className="mock-content"><div className="mock-copy"><div className="mock-line wide"/><div className="mock-line"/><div className="mock-line short"/><div className="mock-button"/></div><div className="mock-panel"/></div></div>;
}

export default function Home() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    let revealObserver: IntersectionObserver | undefined;

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
      revealItems.forEach((item) => revealObserver?.observe(item));
      document.documentElement.classList.add("motion-ready");
    }

    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav-links a[href^='#']")];
    const heroArt = document.querySelector<HTMLElement>(".hero-art");
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 230);
      const current = [...sections].reverse().find((section) => section.offsetTop <= marker)?.id;
      links.forEach((link) => {
        const active = link.hash === `#${current}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (heroArt && !reducedMotion.matches) {
        heroArt.style.setProperty("--scroll-shift", `${Math.min(window.scrollY * 0.12, 64)}px`);
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateScroll); };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      revealObserver?.disconnect();
      document.documentElement.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <>
    <header className="topbar"><nav className="nav shell" aria-label="Main navigation"><a className="wordmark" href="#home" aria-label="Ahmed Badr Shaaban, back to top"><span className="mark">AB</span><span>Ahmed Badr Shaaban</span></a><div className="nav-links"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a className="nav-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a></div></nav></header>
    <main id="home">
      <section className="hero shell" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">Frontend Engineer · Cairo, Egypt</p><h1 id="hero-title">Building better <span>digital spaces.</span></h1><p className="hero-intro">I&apos;m Ahmed, an Angular developer creating thoughtful, fast, and accessible interfaces for real-world products and complex workflows.</p><div className="hero-actions"><a className="button-primary" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="text-link" href="/Ahmed_Badr_Shaaban.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div><div className="hero-social" aria-label="Professional profiles"><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div></div><div className="hero-art" aria-hidden="true"><div className="art-oval"><div className="art-sun"/><div className="art-shape"/></div><div className="art-card"><span className="art-card-label">Focus</span><strong>Clear interfaces<br/>for complex products</strong></div><div className="art-note">Open to conversations</div><span className="hero-caption">DESIGNING FOR CLARITY, BUILT FOR PEOPLE</span></div></section>
      <div className="intro-strip"><div className="intro-strip-inner shell"><span className="strip-label">Focused on</span><div className="strip-skills"><span className="pill">Angular & TypeScript</span><span className="pill">Accessible interfaces</span><span className="pill">Real-time products</span><span className="pill">Arabic & English RTL</span></div></div></div>
      <section id="work" className="section shell" aria-labelledby="work-title"><div className="section-heading" data-reveal><div><p className="eyebrow">Selected work</p><h2 id="work-title">Work in <em>practice.</em></h2></div><p className="section-aside">Professional engagements and one independent freelance project. Visuals are conceptual illustrations, not product screenshots.</p></div><div className="project-grid">{work.map((item, index) => <article className="project-card" data-reveal style={{ "--delay": `${(index % 2) * 110}ms` } as React.CSSProperties} key={item.number}><div className={`project-visual ${item.color}`}><MockWindow/></div><div className="project-body"><div className="project-meta"><span>{item.kind}</span><span className="project-number">{item.number}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="project-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="about-grid shell"><div className="section-heading" data-reveal><p className="eyebrow">A little about me</p><h2 id="about-title">Curious by <em>nature.</em><br/>Precise by craft.</h2></div><div className="about-copy" data-reveal><p>I&apos;m a Cairo-based frontend engineer with nearly two years of hands-on production experience building Angular applications across e-commerce, trading, enterprise billing, and financial compliance.</p><p>I work across the details that make products feel dependable: responsive layouts, accessible components, Core Web Vitals, SEO, unit testing, and Arabic/English RTL interfaces. I also connect frontends to REST and real-time APIs, and collaborate closely with teams through delivery.</p><a className="text-link" href="mailto:ahmedbadrr417@gmail.com">Get in touch <span aria-hidden="true">↗</span></a></div></div></section>
      <section id="experience" className="section shell" aria-labelledby="experience-title"><div className="section-heading" data-reveal><div><p className="eyebrow">The path so far</p><h2 id="experience-title">Experience & <em>education.</em></h2></div></div><div className="experience-list"><div className="experience-row" data-reveal><span className="experience-date">Jan 2025 — Present</span><div className="experience-info"><h3>Front End Developer (Angular)</h3><p>Production Angular frontends for e-commerce, trading, enterprise billing, and financial compliance. REST, WebSocket, and SSE integrations; SSR, analytics, accessible bilingual/RTL components, and CI/CD collaboration.</p></div><span className="experience-place">Financial products</span></div><div className="experience-row" data-reveal><span className="experience-date">Jul 2022 — Sep 2022</span><div className="experience-info"><h3>Angular Developer Intern</h3><p>Built responsive, accessible Angular and TypeScript modules in an Agile team.</p></div><span className="experience-place">Link Development</span></div><div className="experience-row" data-reveal><span className="experience-date">Sep 2019 — May 2023</span><div className="experience-info"><h3>B.Sc. Computer Science</h3><p>Faculty of Computers and Artificial Intelligence · Very Good.</p></div><span className="experience-place">Cairo University</span></div><div className="experience-row" data-reveal><span className="experience-date">Mar 2023 — Jul 2023</span><div className="experience-info"><h3>Web Design Diploma</h3><p>Intensive 120-hour program · 90% score.</p></div><span className="experience-place">Digital Egypt Youth Program · NTI</span></div></div></section>
      <section id="skills" className="section skills-section shell" aria-labelledby="skills-title"><div className="section-heading" data-reveal><div><p className="eyebrow">The toolkit</p><h2 id="skills-title">Skills with <em>purpose.</em></h2></div></div><div className="skills-grid">{skills.map((skill, index) => <div className="skill-card" data-reveal style={{ "--delay": `${index * 75}ms` } as React.CSSProperties} key={skill.title}><span className="skill-index">0{index + 1} / 04</span><h3>{skill.title}</h3><p>{skill.text}</p></div>)}</div></section>
      <section id="contact" className="contact-section shell" aria-labelledby="contact-title"><div className="contact-card" data-reveal><p className="eyebrow">Have something in mind?</p><h2 id="contact-title">Let&apos;s make the next thing <em>work beautifully.</em></h2><div className="contact-bottom"><p>Based in Cairo, Egypt. Open to connecting about frontend engineering and thoughtful digital products.</p><div className="contact-actions"><a className="button-primary" href="mailto:ahmedbadrr417@gmail.com">Email Ahmed <span aria-hidden="true">↗</span></a><a className="button-secondary" href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div></div><div className="contact-social"><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></section>
    </main><footer className="footer"><div className="footer-inner shell"><span>© {new Date().getFullYear()} Ahmed Badr Shaaban · Cairo, Egypt</span><div className="footer-links"><a href="mailto:ahmedbadrr417@gmail.com">Email</a><a href="tel:+201100486283">Phone</a><a href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub</a></div></div></footer>
  </>;
}
