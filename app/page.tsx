"use client";

import { useEffect, useState } from "react";
import { content, type Language } from "./content";
import WorkSlider from "./work-slider";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "ar") setLanguage("ar");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

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
    <header className="topbar"><nav className="nav shell" aria-label={copy.navLabel}><a className="wordmark" href="#home" aria-label={copy.homeLabel}><span className="mark">AB</span><span>Ahmed Badr Shaaban</span></a><div className="nav-controls"><div className="nav-links"><a href="#work">{copy.nav[0]}</a><a href="#about">{copy.nav[1]}</a><a href="#experience">{copy.nav[2]}</a><a href="#skills">{copy.nav[3]}</a><a className="nav-cta" href="#contact">{copy.nav[4]} <span aria-hidden="true">↗</span></a></div><button className="language-switch" type="button" aria-label={copy.languageLabel} onClick={() => setLanguage(language === "en" ? "ar" : "en")}>{copy.languageButton}</button></div></nav></header>
    <main id="home">
      <section className="hero shell" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">{copy.heroEyebrow}</p><h1 id="hero-title">{copy.heroTitle} <span>{copy.heroEmphasis}</span></h1><p className="hero-intro">{copy.heroIntro}</p><div className="hero-actions"><a className="button-primary" href="#work">{copy.explore} <span aria-hidden="true">↗</span></a><a className="text-link" href="/Ahmed_Badr_Shaaban.pdf" download>{copy.download} <span aria-hidden="true">↓</span></a></div><div className="hero-social" aria-label={copy.profilesLabel}><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div><div className="hero-art" aria-hidden="true"><div className="art-oval"><div className="art-sun"/><div className="art-shape"/></div><div className="art-card"><span className="art-card-label">{copy.focus}</span><strong>{copy.focusText[0]}<br/>{copy.focusText[1]}</strong></div><div className="art-note">{copy.availability}</div><span className="hero-caption">{copy.heroCaption}</span></div></section>
      <div className="intro-strip"><div className="intro-strip-inner shell"><span className="strip-label">{copy.focused}</span><div className="strip-skills">{copy.highlights.map((item) => <span className="pill" key={item}>{item}</span>)}</div></div></div>
      <section id="work" className="section shell" aria-labelledby="work-title"><div className="section-heading" data-reveal><div><p className="eyebrow">{copy.workEyebrow}</p><h2 id="work-title">{copy.workTitle} <em>{copy.workEmphasis}</em></h2></div><p className="section-aside">{copy.workAside}</p></div><WorkSlider language={language} /></section>
      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="about-grid shell"><div className="section-heading" data-reveal><p className="eyebrow">{copy.aboutEyebrow}</p><h2 id="about-title">{copy.aboutTitle} <em>{copy.aboutEmphasis}</em><br/>{copy.aboutSecond}</h2></div><div className="about-copy" data-reveal><p>{copy.aboutLead}</p><p>{copy.aboutBody}</p><a className="text-link" href="mailto:ahmedbadrr417@gmail.com">{copy.getInTouch} <span aria-hidden="true">↗</span></a></div></div></section>
      <section id="experience" className="section shell" aria-labelledby="experience-title"><div className="section-heading" data-reveal><div><p className="eyebrow">{copy.experienceEyebrow}</p><h2 id="experience-title">{copy.experienceTitle} <em>{copy.experienceEmphasis}</em></h2></div></div><div className="experience-list">{copy.experience.map((item, index) => <div className="experience-row" data-reveal key={index}><span className="experience-date">{item.date}</span><div className="experience-info"><h3>{item.title}</h3><p>{item.description}</p></div><span className="experience-place">{item.place}</span></div>)}</div></section>
      <section id="skills" className="section skills-section shell" aria-labelledby="skills-title"><div className="section-heading" data-reveal><div><p className="eyebrow">{copy.skillsEyebrow}</p><h2 id="skills-title">{copy.skillsTitle} <em>{copy.skillsEmphasis}</em></h2></div></div><div className="skills-grid">{copy.skills.map((skill, index) => <div className="skill-card" data-reveal style={{ "--delay": `${index * 75}ms` } as React.CSSProperties} key={index}><span className="skill-index">0{index + 1} / 04</span><h3>{skill.title}</h3><p>{skill.text}</p></div>)}</div></section>
      <section id="contact" className="contact-section shell" aria-labelledby="contact-title"><div className="contact-card" data-reveal><p className="eyebrow">{copy.contactEyebrow}</p><h2 id="contact-title">{copy.contactTitle} <em>{copy.contactEmphasis}</em></h2><div className="contact-bottom"><p>{copy.contactBody}</p><div className="contact-actions"><a className="button-primary" href="mailto:ahmedbadrr417@gmail.com">{copy.email} <span aria-hidden="true">↗</span></a><a className="button-secondary" href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div><div className="contact-social"><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></section>
    </main><footer className="footer"><div className="footer-inner shell"><span>© {new Date().getFullYear()} Ahmed Badr Shaaban · {copy.footerLocation}</span><div className="footer-links"><a href="mailto:ahmedbadrr417@gmail.com">{copy.email}</a><a href="tel:+201100486283">{copy.phone}</a><a href="https://wa.me/201100486283" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.linkedin.com/in/ahmedbshaban" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/AhmedBadrShaban" target="_blank" rel="noopener noreferrer">GitHub</a></div></div></footer>
  </>;
}
