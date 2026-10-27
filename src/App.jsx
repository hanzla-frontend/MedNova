import { useEffect } from "react";
import "./index.css";

function handleFaqClick(event) {
  const button = event.currentTarget;
  const content = button.nextElementSibling;
  if (!content) return;
  const wasHidden = content.classList.contains("hidden");
  document.querySelectorAll(".faq-content").forEach((item) => item.classList.add("hidden"));
  document.querySelectorAll("#faq-accordion-group .material-symbols-outlined").forEach((icon) => { icon.style.transform = "rotate(0deg)"; });
  if (wasHidden) {
    content.classList.remove("hidden");
    const icon = button.querySelector(".material-symbols-outlined");
    if (icon) icon.style.transform = "rotate(180deg)";
  }
}

export default function App() {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const hero = document.getElementById("home");
    const doctor = hero?.querySelector(".mh-doctor");
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pupils = hero.querySelectorAll(".mh-pupil");
    let width = 0, height = 0, particles = [], mouse = { x: -1000, y: -1000 }, frame = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth; height = hero.clientHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: Math.min(95, Math.floor(width / 13)) }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.7 + .5 }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i], dx = mouse.x - p.x, dy = mouse.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) { const force = (150 - distance) / 150; p.vx += dx / distance * force * .018; p.vy += dy / distance * force * .018; }
        p.vx *= .993; p.vy *= .993;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > .9) { p.vx *= .9 / speed; p.vy *= .9 / speed; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x)); p.y = Math.max(0, Math.min(height, p.y));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(8,127,140,.3)"; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) { const q = particles[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 95) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(8,127,140,${.1 * (1 - d / 95)})`; ctx.stroke(); } }
      }
      frame = requestAnimationFrame(draw);
    }
    function onPointerMove(event) {
      const rect = hero.getBoundingClientRect(); mouse.x = event.clientX - rect.left; mouse.y = event.clientY - rect.top;
      if (doctor) { const box = doctor.getBoundingClientRect(), cx = box.left + box.width / 2, cy = box.top + box.height * .26; const x = Math.max(-2.5, Math.min(2.5, (event.clientX - cx) / 90)); const y = Math.max(-2, Math.min(2, (event.clientY - cy) / 100)); pupils.forEach((pupil) => pupil.setAttribute("transform", `translate(${x} ${y})`)); }
    }
    function onPointerLeave() { mouse = { x: -1000, y: -1000 }; pupils.forEach((pupil) => pupil.setAttribute("transform", "translate(0 0)")); }
    function start() { cancelAnimationFrame(frame); resize(); if (!motionReduced) draw(); }
    hero.addEventListener("pointermove", onPointerMove); hero.addEventListener("pointerleave", onPointerLeave); window.addEventListener("resize", start); start();
    return () => { cancelAnimationFrame(frame); hero.removeEventListener("pointermove", onPointerMove); hero.removeEventListener("pointerleave", onPointerLeave); window.removeEventListener("resize", start); };
  }, []);

  return (
    <>
<header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-20 max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><a className="flex items-center gap-3" data-path="home" href="#home"><span className="font-title-lg text-title-lg text-primary tracking-tight">MedNova</span></a><div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-micro-badge text-micro-badge tracking-wide"><span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>Educational Platform • Not Medical Advice</div></div><nav className="hidden lg:flex items-center gap-space-lg" data-active-classes="text-primary font-title-lg"><a aria-current="page" className="transition-colors py-2 text-primary font-title-lg" data-path="home" href="#home">Home</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="services" href="#services">Services</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="ai-assistant" href="#ai-assistant">AI Assistant</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="health-library" href="#health-library">Health Library</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="about" href="#about">About</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="get-started" href="#get-started">Contact</a></nav><div className="flex items-center gap-space-md shrink-0"><a className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-[0_2px_8px_-2px_rgba(8,127,140,0.25)] hover:bg-primary transition-colors" data-path="ai-assistant" href="#ai-assistant">Explore Platform</a><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-background"><div className="flex flex-col w-full">
{/* SECTION 1: HERO (replaced with the newly supplied animated hero) */}
<section className="mh-hero" id="home">
<canvas id="particles"></canvas>
<div className="mh-container mh-hero-inner">
<div className="mh-hero-copy">
<div className="mh-eyebrow">
<span className="mh-pulse-dot"></span>
        SMARTER HEALTHCARE FOR EVERYONE
      </div>
<h1>
        Better health<br/>
        starts with<br/>
<span>better information.</span>
</h1>
<p className="mh-hero-description">
        Explore reliable health education, discover helpful medical
        resources, and take informed next steps on your healthcare journey.
      </p>
<div className="mh-hero-buttons">
<a className="mh-btn mh-btn-primary" href="#services">Explore Services ↗</a>
<a className="mh-btn mh-btn-outline" href="#about">Discover Our Mission</a>
</div>
<div className="mh-hero-trust">
<div className="mh-icon">✚</div>
<div>
<strong>Knowledge for healthier decisions</strong><br/>
          Accessible educational resources for everyone
        </div>
</div>
</div>
<div className="mh-hero-visual">
<div className="mh-hero-glow"></div>
<div className="mh-orbit"><div className="mh-orbit-dot"></div></div>
{/* Original vector mh-doctor illustration */}
<div className="mh-doctor">
<svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg">
<defs>
<lineargradient id="skin" x1="0" x2="1" y1="0" y2="1">
<stop stopColor="#f8d7bb"></stop>
<stop offset="1" stopColor="#e5ad8b"></stop>
</lineargradient>
<lineargradient id="coat" x1="0" x2="1" y1="0" y2="1">
<stop stopColor="#fff"></stop>
<stop offset="1" stopColor="#dff5ed"></stop>
</lineargradient>
</defs>
<path d="M125 150V185Q160 210 195 185V150Z" fill="url(#skin)"></path>
<ellipse cx="99" cy="111" fill="#eab995" rx="14" ry="21"></ellipse>
<ellipse cx="221" cy="111" fill="#eab995" rx="14" ry="21"></ellipse>
<path d="M101 75Q101 30 160 30Q219 30 219 75L214 129Q205 172 160 184Q115 172 106 129Z" fill="url(#skin)"></path>
<path d="M98 111Q75 47 115 24Q153 0 193 20Q234 37 222 99L218 112Q207 92 204 66Q172 79 128 66Q119 87 98 111Z" fill="#27474b"></path>
<path d="M111 65Q124 28 159 34Q183 28 207 50Q177 60 147 55Q130 56 111 65Z" fill="#35595b"></path>
<path d="M119 92Q134 84 147 92M173 92Q187 84 201 92" fill="none" stroke="#684d41" strokeLinecap="round" strokeWidth="4"></path>
<g className="mh-eyes">
<ellipse cx="134" cy="108" fill="#fff" rx="13" ry="10"></ellipse>
<ellipse cx="186" cy="108" fill="#fff" rx="13" ry="10"></ellipse>
<circle className="mh-pupil" cx="135" cy="108" fill="#24484d" r="6"></circle>
<circle cx="137" cy="105" fill="#fff" r="2"></circle>
<circle className="mh-pupil" cx="187" cy="108" fill="#24484d" r="6"></circle>
<circle cx="189" cy="105" fill="#fff" r="2"></circle>
</g>
<path d="M159 108L153 128Q160 135 168 128" fill="none" stroke="#d69b7d" strokeLinecap="round" strokeWidth="3"></path>
<path d="M143 145Q160 159 178 145" fill="none" stroke="#a65e57" strokeLinecap="round" strokeWidth="3.5"></path>
<path d="M123 176Q103 178 87 197L50 257Q42 272 56 281L83 294L68 392Q160 414 252 392L237 294L264 281Q278 272 270 257L233 197Q217 178 197 176L180 192L160 220L140 192Z" fill="url(#coat)" stroke="#d7ebe6" strokeWidth="2"></path>
<path d="M126 178L160 220L194 178L211 205L198 283L207 394H113L122 283L109 205Z" fill="#0b9693"></path>
<path d="M123 177L160 220L143 246L113 199Z" fill="#fff" stroke="#d5e9e5" strokeWidth="2"></path>
<path d="M197 177L160 220L177 246L207 199Z" fill="#fff" stroke="#d5e9e5" strokeWidth="2"></path>
<path d="M128 204V237Q128 262 151 262Q174 262 174 237V220" fill="none" stroke="#087b7b" strokeLinecap="round" strokeWidth="5"></path>
<circle cx="174" cy="220" fill="#087b7b" r="9" stroke="#dff9ef" strokeWidth="4"></circle>
<path d="M189 278H224L228 318Q208 326 192 316Z" fill="#fff" stroke="#d5e9e5" strokeWidth="2"></path>
<circle cx="209" cy="297" fill="#e0f8ef" r="10"></circle>
<path d="M209 291V303M203 297H215" stroke="#087f89" strokeLinecap="round" strokeWidth="3"></path>
<circle cx="181" cy="275" fill="#d3e8e3" r="3"></circle>
<circle cx="182" cy="293" fill="#d3e8e3" r="3"></circle>
</svg>
</div>
<div className="mh-float-card mh-float-card-top">
<div className="mh-card-row">
<div className="mh-icon">✚</div>
<div><small>HEALTH EDUCATION</small><strong>Medical resources</strong></div>
</div>
<div className="mh-status">● Explore and learn</div>
</div>
<div className="mh-float-card mh-float-card-bottom">
<div className="mh-card-row">
<div className="mh-icon">♡</div>
<div><small>YOUR WELLBEING</small><strong>Health comes first</strong></div>
</div>
<div className="mh-status">Personal health knowledge</div>
</div>
</div>
</div>
</section>
{/* SECTION 2: TRUST STRIP */}
<section className="py-12 bg-surface-container-lowest shadow-sm" id="trust-strip">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low/50">
<div className="p-2.5 rounded-xl bg-primary-container text-on-primary shrink-0">
<span className="material-symbols-outlined text-xl">menu_book</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Health Education</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Plain-language summaries verified against clinical guidelines.</p>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low/50">
<div className="p-2.5 rounded-xl bg-secondary text-on-secondary shrink-0">
<span className="material-symbols-outlined text-xl">group</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">People First</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Designed for patients, caregivers, and everyday health literacy.</p>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low/50">
<div className="p-2.5 rounded-xl bg-tertiary-container text-on-tertiary shrink-0">
<span className="material-symbols-outlined text-xl">psychology</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Digital Innovation</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Intelligent query models designed for contextual learning.</p>
</div>
</div>
<div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low/50">
<div className="p-2.5 rounded-xl bg-primary text-on-primary shrink-0">
<span className="material-symbols-outlined text-xl">accessibility_new</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Easy Access</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">WCAG 2.2 AA compliant typography, readable by all screen sizes.</p>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 3: HEALTHCARE SERVICES / LEARNING PILLARS */}
<section className="py-20 lg:py-28 bg-surface" id="services">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="max-w-2xl mb-14">
<span className="font-micro-badge text-micro-badge uppercase text-primary tracking-widest font-semibold">Curated Offerings</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">
          Comprehensive Educational Services
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
          Explore structured modules created to demystify complex medical terminology, clinical encounters, and ongoing lifestyle health.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Service Card 1 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">clinical_notes</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Health Information</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Comprehensive, peer-checked primers on chronic conditions, symptoms, and preventive health screenings.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="health-library" href="#health-library">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
{/* Service Card 2 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">neurology</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">AI Health Assistant</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Conversational interactive educator built strictly to help prepare clinical questions and clarify medical terms.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="ai-assistant" href="#ai-assistant">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
{/* Service Card 3 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">spa</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Wellness Education</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Evidence-based breakdowns of dietary science, sleep physiology, ergonomic movement, and mindful recovery.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="wellness" href="#health-library">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
{/* Service Card 4 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">directions_walk</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Care Navigation</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Step-by-step guides on locating specialists, coordinating referrals, and interpreting basic lab panel formats.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="services" href="#services">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
{/* Service Card 5 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">folder_shared</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Medical Resources</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Downloadable visit organizers, medication schedule sheets, and communication sheets for caregiver discussions.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="patient-guides" href="#health-library">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
{/* Service Card 6 */}
<div className="group p-7 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
<div>
<div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-2xl">devices</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Digital Health Access</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Tutorials on using telehealth platforms, unlocking patient portals, and safely accessing electronic health records.
            </p>
</div>
<div className="pt-6 mt-6">
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold group-hover:text-primary-container transition-colors" data-path="services" href="#services">
<span>Learn more</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 4: AI HEALTH ASSISTANT SHOWCASE */}
<section className="py-20 lg:py-28 bg-surface-container-low/60 relative" id="ai-assistant">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
{/* AI Showcase Left Column */}
<div className="lg:col-span-6 space-y-6">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-micro-badge text-micro-badge">
<span className="material-symbols-outlined text-sm">smart_toy</span>
<span>Interactive Patient Companion</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Ask questions naturally. Receive clear, educational answers.
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Our specialized conversational engine simplifies complex clinical research into empathetic, structured guides. Formulated strictly for educational literacy and preparation.
          </p>
<div className="space-y-3.5 pt-2">
<div className="flex items-center gap-3">
<div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm">check</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-medium">Contextual explanation of medical terminology without jargon</span>
</div>
<div className="flex items-center gap-3">
<div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm">check</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-medium">Structured preparation for primary care visits and consultations</span>
</div>
<div className="flex items-center gap-3">
<div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-sm">check</span>
</div>
<span className="font-body-md text-body-md text-on-surface font-medium">Transparent references linked to established medical literature</span>
</div>
</div>
{/* Prominent Disclaimer Badge */}
<div className="p-4 rounded-2xl bg-amber-50 text-amber-900 shadow-sm flex items-start gap-3">
<span className="material-symbols-outlined text-amber-600 text-xl shrink-0 mt-0.5">warning</span>
<p className="font-body-sm text-body-sm text-amber-800">
<strong className="font-semibold text-amber-950">Educational Tool Only:</strong> MedNova AI does not diagnose, prescribe, or provide medical triage. Always consult a licensed clinical professional for medical concerns.
            </p>
</div>
<div className="pt-2">
<a className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-colors" data-path="ai-assistant" href="#ai-assistant">
<span>Open Assistant Workspace</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</a>
</div>
</div>
{/* AI Showcase Right Column: Realistic Interactive Chat UI */}
<div className="lg:col-span-6">
<div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden flex flex-col">
{/* Chat Window Header */}
<div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-lg">psychology</span>
</div>
<div>
<p className="font-title-lg text-title-lg text-on-surface leading-snug">MedNova Assistant</p>
<p className="font-micro-badge text-micro-badge text-secondary flex items-center gap-1 font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Online • Educational Mode
                  </p>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-micro-badge text-micro-badge">
                Source: Clinical Literacy Index
              </span>
</div>
{/* Chat Message Thread */}
<div className="p-6 space-y-5 bg-surface-container-lowest/80 overflow-y-auto max-h-[460px]">
{/* User Prompt Bubble */}
<div className="flex justify-end">
<div className="max-w-[85%] bg-primary-container text-on-primary rounded-3xl rounded-br-sm px-5 py-3.5 shadow-sm">
<p className="font-body-md text-body-md text-on-primary">
                    I have my annual checkup tomorrow. What questions should I prepare for my doctor?
                  </p>
</div>
</div>
{/* AI Response Bubble */}
<div className="flex justify-start">
<div className="max-w-[90%] bg-surface-container-low text-on-surface rounded-3xl rounded-bl-sm p-5 space-y-3 shadow-sm">
<div className="flex items-center gap-2 mb-1">
<span className="font-micro-badge text-micro-badge text-primary uppercase font-bold tracking-wider">Educational Guide</span>
<span className="text-xs text-on-surface-variant">• General Preparation</span>
</div>
<p className="font-body-md text-body-md leading-relaxed">
                    Here is a structured framework to make the most of your preventative checkup:
                  </p>
<ol className="space-y-2 font-body-sm text-body-sm text-on-surface-variant list-decimal pl-4">
<li><strong className="text-on-surface">Symptoms &amp; Changes:</strong> Note any subtle shifts in energy, sleeping patterns, or digestion over the past 6 months.</li>
<li><strong className="text-on-surface">Medication Review:</strong> Bring an exact list of all over-the-counter supplements and current prescriptions.</li>
<li><strong className="text-on-surface">Family History Updates:</strong> Mention any new health events or diagnoses among immediate relatives.</li>
</ol>
<div className="pt-2 text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-secondary">info</span>
<span>Reminder: Always share your complete medical history directly with your provider.</span>
</div>
</div>
</div>
{/* Suggested Quick Prompt Chips */}
<div className="pt-2">
<p className="font-micro-badge text-micro-badge text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">Suggested Questions:</p>
<div className="flex flex-wrap gap-2">
<button className="text-left px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors" type="button">
                    Explain “Lipid Panel” results
                  </button>
<button className="text-left px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-body-sm transition-colors" type="button">
                    How to evaluate online health info?
                  </button>
</div>
</div>
</div>
{/* Simulated Interactive Input Field */}
<div className="p-4 bg-surface-container-low/60 flex items-center gap-3">
<input className="flex-1 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm placeholder:text-outline" placeholder="Ask about symptoms, terminology, or appointment prep..." type="text" />
<button className="w-11 h-11 rounded-full bg-primary-container hover:bg-primary text-on-primary flex items-center justify-center shadow-md transition-colors" type="button">
<span className="material-symbols-outlined text-lg">send</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 5: PLATFORM CAPABILITIES & PRINCIPLES */}
<section className="py-20 lg:py-28 bg-surface-container-low/40" id="about">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="font-micro-badge text-micro-badge uppercase text-primary tracking-widest font-semibold">Ethical Standards</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">
          Core Educational Pillars
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
          Our foundation is grounded in pedagogical integrity, clear boundaries, and patient dignity.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="p-7 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="w-11 h-11 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-2xl">verified_user</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">100% Non-Commercial</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Neutral, ad-free educational material vetted strictly for scientific objectivity and independence from pharma sponsorship.
            </p>
</div>
</div>
<div className="p-7 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="w-11 h-11 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-2xl">translate</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Plain Language</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Complex anatomical and pharmacological studies translated accurately into clear, 6th-to-8th grade reading levels.
            </p>
</div>
</div>
<div className="p-7 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="w-11 h-11 rounded-2xl bg-tertiary-fixed/50 text-tertiary flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-2xl">notification_important</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Clear Boundaries</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Explicit clinical guardrails that route urgent scenarios to local emergency services and professional healthcare providers.
            </p>
</div>
</div>
<div className="p-7 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="w-11 h-11 rounded-2xl bg-secondary-fixed-dim/40 text-secondary flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-2xl">shield_person</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Zero Data Selling</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
              Privacy-first framework where user queries are never stored with personal identifiers or repurposed for commercial profiling.
            </p>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 6: HOW IT WORKS (3-STEP TIMELINE) */}
<section className="py-20 lg:py-28 bg-surface" id="how-it-works">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="font-micro-badge text-micro-badge uppercase text-primary tracking-widest font-semibold">User Journey</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">
          How MedNova Works
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
          A seamless three-step educational cycle that turns confusion into organized questions for your doctor.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
{/* Step 1 */}
<div className="relative p-8 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col">
<div className="flex items-center justify-between mb-6">
<span className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center">1</span>
<span className="material-symbols-outlined text-outline-variant text-2xl">search</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Explore a Topic</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
            Search symptoms, medical procedures, or preventive lifestyle topics in conversational, everyday English without needing clinical terms.
          </p>
</div>
{/* Step 2 */}
<div className="relative p-8 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col">
<div className="flex items-center justify-between mb-6">
<span className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-headline-sm text-headline-sm flex items-center justify-center">2</span>
<span className="material-symbols-outlined text-outline-variant text-2xl">auto_stories</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Review Reliable Info</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
            Read structured summaries supported by peer-reviewed citations, plain-language glossaries, and evidence-based guidance.
          </p>
</div>
{/* Step 3 */}
<div className="relative p-8 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col">
<div className="flex items-center justify-between mb-6">
<span className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary font-headline-sm text-headline-sm flex items-center justify-center">3</span>
<span className="material-symbols-outlined text-outline-variant text-2xl">co_present</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Decide on Next Steps</h3>
<p className="font-body-md text-body-md text-on-surface-variant">
            Organize informed questions, download appointment checklists, and collaborate with your personal primary care clinician.
          </p>
</div>
</div>
</div>
</section>
{/* SECTION 7: HEALTH RESOURCE LIBRARY (CURATED CARDS) */}
<section className="py-20 lg:py-28 bg-surface-container-low/50" id="health-library">
<div className="max-w-[1280px] mx-auto px-6 lg:px-10">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
<div>
<span className="font-micro-badge text-micro-badge uppercase text-primary tracking-widest font-semibold">Evidence-Based Reading</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">
            Curated Health Library
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-xl">
            Read comprehensive pedagogical overviews organized by our clinical literacy review committee.
          </p>
</div>
<a className="mt-4 md:mt-0 inline-flex items-center gap-2 font-label-md text-label-md text-primary font-semibold hover:text-primary-container transition-colors" data-path="health-library" href="#health-library">
<span>View entire library</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Card 1 */}
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
<div className="h-48 w-full bg-surface-container relative overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A clean, calm clinical photography composition of modern medical diagnostic tools and notes on a crisp table in soft teal ambient light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKVX52T7ivItM7bYHGQTrhZdZe9QLBciQzfU3LJWshUutSH0susjm8iEWuSPng1jVpCVNW8o9GBW_lNNqWdnhycklC8bo9_TdhgGgVZ5H2jnd4jXcgO8tvP9c5F71W2tSzM_xb1PnK83r9YPrAD0AFx0xcsbpuHD2qSLNPCWT4wKqR_ZZuZDnhk9gvAZJP8Uz_Ap7F23kPFtFQMcZrHDlNG7V27vOQDKlAOemkRy7ptlE_LKQWRg" />
<span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur text-primary font-micro-badge text-micro-badge shadow-sm">
              General Health
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-micro-badge text-micro-badge mb-2">
<span className="material-symbols-outlined text-xs">schedule</span>
<span>6 min read</span>
<span>•</span>
<span>Peer-Reviewed</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">
                Understanding Blood Pressure: Systolic vs. Diastolic
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                A simple guide to what the two numbers actually mean for your cardiovascular health and how to track them accurately at home.
              </p>
</div>
<a className="mt-5 inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold" data-path="health-library" href="#health-library">
              Read guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
{/* Card 2 */}
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
<div className="h-48 w-full bg-surface-container relative overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Warm serene aesthetic photography of a healthy lifestyle with herbal tea, water carafe, and mindfulness journal in bright teal and natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvp65XOSbhYRk9MW1g9nHwYcIm9XfybPx9oTr0SLUM5jLJn66tSanqwyTKFkOWS48ohbsSxCB4ZRkBz0sXl8YEY28Z9NGzwEWzeWGlg0fg_f0YZkOnLedQB6h0YDtleGQgcGN6R1xVyG6D4iwAv6EwX6RZKty6Wdc-XO1CcJNX1HWSCPGixmpmNTTQ2Cm0mWAb3P3aE-olpt9gTWIXzzs8s6ZTbW7O2w90fkGJul0C4ZigQCGhAg" />
<span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur text-secondary font-micro-badge text-micro-badge shadow-sm">
              Wellness &amp; Lifestyle
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-micro-badge text-micro-badge mb-2">
<span className="material-symbols-outlined text-xs">schedule</span>
<span>8 min read</span>
<span>•</span>
<span>Updated Feb 2025</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">
                Circadian Rhythms: The Science of Restorative Sleep
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                How light exposure, body temperature cycles, and evening habits influence neurological recovery and cellular repair.
              </p>
</div>
<a className="mt-5 inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold" data-path="wellness" href="#health-library">
              Read guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
{/* Card 3 */}
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
<div className="h-48 w-full bg-surface-container relative overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Modern healthcare doctor and patient holding an appointment planning checklist in a bright modern educational clinic setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQk7LTFtoJrhzr_IO95Y2NdMxCuE_JznZKtzPkUZaNNftDCudRIQNy9YySX9q6SXI5j1ifUTN49WuScgnXF7B4rB6nqY6aIymYtzzrwk2zW54ZEiY5gQ6RgrPdHxpyKzyH9d412uuXV7D3HZIoGrhB821yD0XDuA_6zv926jVinUkITJkL9L5yfCXNgZ89YHyhDpAsf9pEeqJ5BleiELNNAIbYLG_7nG02K62Af3sFNMeOFR1lnA" />
<span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur text-tertiary font-micro-badge text-micro-badge shadow-sm">
              Patient Education
            </span>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-micro-badge text-micro-badge mb-2">
<span className="material-symbols-outlined text-xs">schedule</span>
<span>5 min read</span>
<span>•</span>
<span>Includes Checklist</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">
                Preparing for Consultations: The 15-Minute Strategy
              </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                How to prioritize your most pressing concerns so you and your physician leave no critical questions unanswered.
              </p>
</div>
<a className="mt-5 inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold" data-path="patient-guides" href="#health-library">
              Read guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
{/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
<section className="py-20 lg:py-28 bg-surface" id="faq">
<div className="max-w-[840px] mx-auto px-6 lg:px-10">
<div className="text-center mb-14">
<span className="font-micro-badge text-micro-badge uppercase text-primary tracking-widest font-semibold">Got Questions?</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-2">
          Frequently Asked Questions
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Clarity on how MedNova operates, safeguards your privacy, and grounds its answers in medical science.
        </p>
</div>
<div className="space-y-4" id="faq-accordion-group">
{/* FAQ Item 1 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-200">
<button className="w-full flex items-center justify-between text-left font-title-lg text-title-lg text-on-surface font-semibold" onClick={handleFaqClick} type="button">
<span>Is MedNova a substitute for seeing a doctor?</span>
<span className="material-symbols-outlined text-primary transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-3 hidden text-on-surface-variant font-body-md text-body-md leading-relaxed">
            No. MedNova is strictly an educational literacy platform. We do not provide clinical medical advice, individualized diagnoses, or treatment plans. We empower you to understand health concepts and vocabulary so you can have more productive conversations with your personal healthcare team.
          </div>
</div>
{/* FAQ Item 2 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-200">
<button className="w-full flex items-center justify-between text-left font-title-lg text-title-lg text-on-surface font-semibold" onClick={handleFaqClick} type="button">
<span>How does the AI assistant verify information?</span>
<span className="material-symbols-outlined text-primary transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-3 hidden text-on-surface-variant font-body-md text-body-md leading-relaxed">
            Our AI educational models are grounded in peer-reviewed clinical guidelines, public medical literature, and verified health communication standards. The system is programmed with strict safety guardrails that decline to make diagnostic assertions and instead surface explanatory pedagogical context.
          </div>
</div>
{/* FAQ Item 3 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-200">
<button className="w-full flex items-center justify-between text-left font-title-lg text-title-lg text-on-surface font-semibold" onClick={handleFaqClick} type="button">
<span>Is my consultation and query data private?</span>
<span className="material-symbols-outlined text-primary transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-3 hidden text-on-surface-variant font-body-md text-body-md leading-relaxed">
            Yes. We enforce a zero-commercialization data model. MedNova does not build commercial health profiles, and we never sell user query histories to advertisers, insurers, or data brokers.
          </div>
</div>
{/* FAQ Item 4 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-200">
<button className="w-full flex items-center justify-between text-left font-title-lg text-title-lg text-on-surface font-semibold" onClick={handleFaqClick} type="button">
<span>Who reviews the educational content?</span>
<span className="material-symbols-outlined text-primary transition-transform duration-200">expand_more</span>
</button>
<div className="faq-content mt-3 hidden text-on-surface-variant font-body-md text-body-md leading-relaxed">
            All curriculum tracks and core reference glossaries are audited by our Medical Review Board, composed of licensed physicians, certified nursing educators, and health communication specialists.
          </div>
</div>
</div>
</div>
</section>
{/* SECTION 9: BOTTOM CALL TO ACTION BANNER */}
<section className="max-w-[1280px] mx-auto px-6 lg:px-10 mb-16 w-full" id="get-started">
<div className="rounded-3xl bg-primary-container p-10 md:p-16 text-on-primary shadow-xl relative overflow-hidden">
{/* Decorative Backdrop Glow in CTA */}
<div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-2xl"></div>
<div className="max-w-2xl relative z-10 space-y-6">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/10 text-on-primary font-micro-badge text-micro-badge">
<span className="material-symbols-outlined text-xs">rocket_launch</span>
          Empowering Health Literacy
        </span>
<h2 className="font-headline-lg text-headline-lg tracking-tight text-on-primary">
          Take control of your health literacy today.
        </h2>
<p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
          Join thousands of proactive individuals learning how to navigate healthcare with confidence, clarity, and evidence-based peace of mind.
        </p>
<div className="flex flex-wrap items-center gap-4 pt-4">
<a className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-md hover:bg-surface-container-low transition-colors font-semibold" data-path="ai-assistant" href="#ai-assistant">
<span>Start Exploring Free</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</a>
<a className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-on-primary font-label-md text-label-md shadow-sm hover:bg-on-primary/10 transition-colors font-semibold" data-path="health-library" href="#health-library">
<span>Browse Health Library</span>
</a>
</div>
</div>
</div>
</section>
</div>
</main><footer className="w-full bg-surface-container-lowest mt-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.02)]"><div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-space-xl pb-10"><div className="p-space-lg mb-space-xl rounded-xl bg-surface-container-low flex flex-col md:flex-row items-start md:items-center gap-space-md"><div className="p-2.5 rounded-full bg-surface-container text-primary shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-2xl">emergency_home</span></div><div className="flex-1"><p className="font-label-md text-label-md text-primary font-semibold">Important Notice &amp; Safety Disclaimer</p><p className="font-body-sm text-body-sm text-on-surface-variant mt-1">MedNova provides health education information only and is not a substitute for professional medical diagnosis, treatment, or clinical advice. If you are experiencing a medical emergency, call 911 or your local emergency services immediately.</p></div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl"><div className="lg:col-span-1"><div className="flex items-center gap-2 mb-4"><span className="font-title-lg text-title-lg text-primary">MedNova</span></div><p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">Empowering patients, clinicians, and learners with verified health literacy through evidence-based educational artificial intelligence.</p><div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-micro-badge text-micro-badge"><span className="material-symbols-outlined text-xs">verified_user</span>Educational Compliance Grade</div></div><div><p className="font-label-md text-label-md text-on-surface font-semibold mb-4">Solutions &amp; Tools</p><ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="ai-assistant" href="#ai-assistant">AI Assistant</a></li><li><a className="hover:text-primary transition-colors" data-path="health-library" href="#health-library">Health Library</a></li><li><a className="hover:text-primary transition-colors" data-path="symptom-decoder" href="#ai-assistant">Symptom Decoder</a></li><li><a className="hover:text-primary transition-colors" data-path="drug-interaction-guide" href="#ai-assistant">Drug Interaction Guide</a></li></ul></div><div><p className="font-label-md text-label-md text-on-surface font-semibold mb-4">Topics</p><ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="general-health" href="#health-library">General Health</a></li><li><a className="hover:text-primary transition-colors" data-path="wellness" href="#health-library">Wellness</a></li><li><a className="hover:text-primary transition-colors" data-path="preventive-care" href="#health-library">Preventive Care</a></li><li><a className="hover:text-primary transition-colors" data-path="patient-guides" href="#health-library">Patient Guides</a></li></ul></div><div><p className="font-label-md text-label-md text-on-surface font-semibold mb-4">Company</p><ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="about" href="#about">About Us</a></li><li><a className="hover:text-primary transition-colors" data-path="medical-review-board" href="#about">Medical Review Board</a></li><li><a className="hover:text-primary transition-colors" data-path="principles" href="#about">Principles</a></li><li><a className="hover:text-primary transition-colors" data-path="editorial-policy" href="#about">Editorial Policy</a></li></ul></div><div><p className="font-label-md text-label-md text-on-surface font-semibold mb-4">Support &amp; Legal</p><ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant"><li><a className="hover:text-primary transition-colors" data-path="get-started" href="#get-started">Contact &amp; Support</a></li><li><a className="hover:text-primary transition-colors" data-path="accessibility" href="#home">Accessibility Statement</a></li><li><a className="hover:text-primary transition-colors" data-path="privacy-policy" href="#home">Privacy Policy</a></li><li><a className="hover:text-primary transition-colors" data-path="terms-of-service" href="#home">Terms of Service</a></li></ul></div></div><div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 MedNova Health Inc. All rights reserved.</p><div className="flex items-center gap-4 font-micro-badge text-micro-badge text-on-surface-variant"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">check_circle</span>WCAG 2.2 AA Compliant</span><span>•</span><span>HIPAA Education Protocol</span></div></div></div></footer>

    </>
  );
}
