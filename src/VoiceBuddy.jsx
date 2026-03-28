import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './VoiceBuddy.css'
import { NavBar, Footer, imgPaper } from './shared.jsx'

// ─── Custom cursor (same as homepage) ────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mx = -100, my = -100

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top  = my + 'px'
    }

    const onEnterPillCursor = (e) => {
      const label = e.currentTarget.dataset.cursorLabel
      cursor.classList.add('is-pill-cursor')
      cursor.querySelector('.cursor-label').textContent = label
    }

    const onLeavePillCursor = () => {
      cursor.classList.remove('is-pill-cursor')
      cursor.querySelector('.cursor-label').textContent = ''
    }

    const onEnterPill = () => {
      cursor.style.transition = 'none'
      cursor.style.opacity = '0'
    }

    const onLeavePill = () => {
      cursor.style.left = mx + 'px'
      cursor.style.top  = my + 'px'
      requestAnimationFrame(() => {
        cursor.style.transition = 'opacity 0.15s ease'
        cursor.style.opacity = '1'
      })
    }

    document.addEventListener('mousemove', onMove)

    const pillCursorEls = document.querySelectorAll('[data-cursor-label]')
    pillCursorEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterPillCursor)
      el.addEventListener('mouseleave', onLeavePillCursor)
    })

    const pills = document.querySelectorAll('.nav-pill')
    pills.forEach(p => {
      p.addEventListener('mouseenter', onEnterPill)
      p.addEventListener('mouseleave', onLeavePill)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      pillCursorEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnterPillCursor)
        el.removeEventListener('mouseleave', onLeavePillCursor)
      })
      pills.forEach(p => {
        p.removeEventListener('mouseenter', onEnterPill)
        p.removeEventListener('mouseleave', onLeavePill)
      })
    }
  }, [])

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <img src="/brush.png" alt="" className="cursor-brush" aria-hidden="true" />
      <span className="cursor-label" />
    </div>
  )
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.vb-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Ideation lightbox ────────────────────────────────────────────────────────
function IdeationLightbox({ src, alt, origin, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // origin is the card's bounding rect — used to set the transform-origin
  const originX = origin ? `${origin.left + origin.width / 2}px` : '50%'
  const originY = origin ? `${origin.top + origin.height / 2}px` : '50%'

  return (
    <div
      className="vb-lightbox-overlay"
      ref={overlayRef}
      onClick={onClose}
      style={{ '--origin-x': originX, '--origin-y': originY }}
    >
      <div className="vb-lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={src} alt={alt} />
        <button className="vb-lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  )
}

// ─── VoiceBuddy page ──────────────────────────────────────────────────────────
export default function VoiceBuddy() {
  useScrollReveal()
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, []) // { src, alt, origin }

  const openLightbox = (e, src, alt) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLightbox({ src, alt, origin: rect })
  }

  return (
    <div className="vb-page">
      <CustomCursor />
      {lightbox && (
        <IdeationLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          origin={lightbox.origin}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Paper texture */}
      <div
        className="vb-paper-bg"
        style={{ backgroundImage: `url('${imgPaper}')` }}
        aria-hidden="true"
      />

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <NavBar />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <header className="vb-hero vb-reveal">
        <div className="vb-hero-eyebrow">
          <span className="vb-label">AmazonNEXT x CodePath&nbsp;&nbsp;—&nbsp;&nbsp;Spring 2025</span>
        </div>
        <h1 className="vb-hero-title">
          <span className="font-pixelscript">V</span>
          <span className="font-argent">OICE&nbsp;BUDDY</span>
        </h1>
        <p className="vb-hero-sub">
          A voice-powered AI assistant for multilingual grocery shoppers
        </p>
      </header>

      <div className="vb-hero-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, 'https://www.figma.com/api/mcp/asset/676179e8-3bf7-4b5a-9b2d-e38f95207075', 'Voice Buddy final mockup')}>
        <img
          src="https://www.figma.com/api/mcp/asset/676179e8-3bf7-4b5a-9b2d-e38f95207075"
          alt="Voice Buddy final mockup"
          className="vb-full-img"
        />
      </div>

      {/* ── Meta strip ──────────────────────────────────────────────────────── */}
      <section className="vb-meta-strip vb-reveal">
        <div className="vb-meta-item">
          <p className="vb-meta-label">Role</p>
          <p className="vb-meta-value">UX Designer</p>
          <p className="vb-meta-value">UX Researcher</p>
        </div>
        <div className="vb-meta-divider" />
        <div className="vb-meta-item">
          <p className="vb-meta-label">Tools</p>
          <p className="vb-meta-value">Figma</p>
          <p className="vb-meta-value">Adobe Illustrator</p>
        </div>
        <div className="vb-meta-divider" />
        <div className="vb-meta-item">
          <p className="vb-meta-label">Timeline</p>
          <p className="vb-meta-value">4 Weeks</p>
          <p className="vb-meta-value">Spring 2025</p>
        </div>
        <div className="vb-meta-divider" />
        <div className="vb-meta-item">
          <p className="vb-meta-label">Team</p>
          <p className="vb-meta-value">Chenice Taylor</p>
          <p className="vb-meta-value">Kayla Thornton</p>
          <p className="vb-meta-value">Sweeya Ghanta</p>
        </div>
      </section>

      {/* ── Overview ────────────────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="overview">
        <p className="vb-section-label">01 — OVERVIEW</p>
        <h2 className="vb-section-title">
          The Problem
        </h2>
        <div className="vb-text-block">
          <p>
            Non-English-speaking shoppers face significant barriers in grocery stores — from
            navigating unfamiliar store layouts to deciphering product labels and asking for
            help without fear of miscommunication or embarrassment.
          </p>
          <p>
            Existing apps and in-store resources rarely account for language diversity, leaving
            millions of shoppers underserved and reliant on family members to mediate even
            routine tasks.
          </p>
        </div>
        <div className="vb-hmw">
          <p className="vb-hmw-text">
            How might we help non-English speaking shoppers navigate grocery stores more
            independently and confidently?
          </p>
        </div>
      </section>

      {/* ── Research ────────────────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="research">
        <p className="vb-section-label">02 — RESEARCH</p>
        <h2 className="vb-section-title">
          What We Found
        </h2>

        <p className="vb-subsection-label">Survey Findings</p>
        <div className="vb-stats-row">
          <div className="vb-stat vb-reveal">
            <p className="vb-stat-num">60<span className="vb-stat-pct">%</span></p>
            <p className="vb-stat-desc">of respondents said language barriers make grocery shopping more stressful</p>
          </div>
          <div className="vb-stat vb-reveal">
            <p className="vb-stat-num">50<span className="vb-stat-pct">%</span></p>
            <p className="vb-stat-desc">regularly rely on a family member to help translate during shopping trips</p>
          </div>
          <div className="vb-stat vb-reveal">
            <p className="vb-stat-num">30<span className="vb-stat-pct">%</span></p>
            <p className="vb-stat-desc">have left a store without getting what they needed due to communication difficulties</p>
          </div>
        </div>

        <p className="vb-subsection-label vb-mt">Interview Findings</p>
        <div className="vb-stats-row vb-stats-row--two">
          <div className="vb-stat vb-reveal">
            <p className="vb-stat-num">25<span className="vb-stat-pct">%</span></p>
            <p className="vb-stat-desc">of interviewees felt current apps adequately address language barriers in store</p>
          </div>
          <div className="vb-stat vb-reveal">
            <p className="vb-stat-num">75<span className="vb-stat-pct">%</span></p>
            <p className="vb-stat-desc">would feel more confident shopping independently with a reliable voice translation feature</p>
          </div>
        </div>

        <figure className="vb-pull-quote vb-reveal">
          <blockquote>
            "I've relied on my children to translate or avoided asking for help altogether
            due to fear of embarrassment or being misunderstood."
          </blockquote>
          <figcaption>— Research participant</figcaption>
        </figure>
      </section>

      {/* ── Problem restatement ─────────────────────────────────────────────── */}
      <section className="vb-section vb-section--accent vb-reveal" id="problem">
        <p className="vb-section-label vb-section-label--light">03 — REFINED PROBLEM</p>
        <p className="vb-refined-hmw">
          How might we design a grocery app feature that gives non-English speaking shoppers
          the language support they need — so they can shop with confidence, without
          depending on someone else?
        </p>
      </section>

      {/* ── User Persona ────────────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="persona">
        <p className="vb-section-label">04 — USER PERSONA</p>
        <h2 className="vb-section-title">
          Meet Carmen
        </h2>

        <div className="vb-persona-card">
          <div className="vb-persona-header">
            <div className="vb-persona-avatar" aria-hidden="true">C</div>
            <div>
              <p className="vb-persona-name">Carmen Rivera</p>
              <p className="vb-persona-role">Primary Shopper &amp; Home Cook</p>
            </div>
          </div>
          <div className="vb-persona-grid">
            <div className="vb-persona-section">
              <p className="vb-persona-section-title">Background</p>
              <p>52 years old, originally from Oaxaca, Mexico. Has lived in the US for 14 years. Primary language is Spanish; speaks limited English. Does the grocery shopping for her family of five, often bringing her youngest child along to help translate.</p>
            </div>
            <div className="vb-persona-section">
              <p className="vb-persona-section-title">Goals</p>
              <ul className="vb-persona-list">
                <li>Shop independently without needing to rely on her children</li>
                <li>Find items quickly without asking store staff</li>
                <li>Understand product labels, especially allergen info</li>
                <li>Feel respected and not embarrassed in public</li>
              </ul>
            </div>
            <div className="vb-persona-section">
              <p className="vb-persona-section-title">Pain Points</p>
              <ul className="vb-persona-list">
                <li>Can't read English product labels or signs</li>
                <li>Afraid to ask staff for help due to communication anxiety</li>
                <li>Spends extra time searching for items</li>
                <li>Existing apps don't support her language needs</li>
              </ul>
            </div>
            <div className="vb-persona-section">
              <p className="vb-persona-section-title">Quote</p>
              <p className="vb-persona-quote">"I just want to shop for my family without feeling lost."</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="timeline">
        <p className="vb-section-label">05 — PROCESS</p>
        <h2 className="vb-section-title">
          Timeline
        </h2>
        <p className="vb-timeline-context">For the extreme time constraint that we were left with after pivoting our research focus and design idea, this design project went very well and taught me a lot about collaboration in UX Design.</p>
        <div className="vb-timeline">
          <div className="vb-timeline-track">
            <div className="vb-timeline-line" />
            <div className="vb-timeline-item">
              <div className="vb-timeline-dot" />
              <p className="vb-timeline-week">Week 1</p>
              <p className="vb-timeline-task">User Research</p>
            </div>
            <div className="vb-timeline-item">
              <div className="vb-timeline-dot" />
              <p className="vb-timeline-week">Week 2</p>
              <p className="vb-timeline-task">Established a Solution</p>
            </div>
            <div className="vb-timeline-item">
              <div className="vb-timeline-dot" />
              <p className="vb-timeline-week">Week 3</p>
              <p className="vb-timeline-task">Pivoted &amp; Redesigned</p>
              <p className="vb-timeline-detail">Established a new solution and designed it</p>
            </div>
            <div className="vb-timeline-item">
              <div className="vb-timeline-dot" />
              <p className="vb-timeline-week">Week 4</p>
              <p className="vb-timeline-task">Tested &amp; Submitted</p>
              <p className="vb-timeline-detail">Tested the product and sent in our submission</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ideation ────────────────────────────────────────────────────────── */}
      <section className="vb-section" id="ideation">
        <p className="vb-section-label vb-reveal">06 — IDEATION</p>
        <h2 className="vb-section-title vb-reveal">
          Sketching & Concepts
        </h2>

        <div className="vb-full-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-7.png', 'Early sketches and ideation')}>
          <img
            src="/voice-buddy/mockup-7.png"
            alt="Early sketches and ideation"
            className="vb-full-img"
          />
          <p className="vb-img-caption">Early sketches exploring the feature space</p>
        </div>

        <div className="vb-ideation-grid">
          {[
            { src: '/voice-buddy/mockup-1.png',  alt: 'Voice Buddy chatbot concept',          label: 'Voice Buddy: A chat-bot experience',  desc: 'An AI-powered conversational interface letting shoppers ask questions naturally in their native language.' },
            { src: '/voice-buddy/mockup-11.png', alt: 'Voice-powered AI branding variants',   label: 'Voice-powered AI',                    desc: 'Branding exploration and identity system for the Voice Buddy feature within the Kroger app.' },
            { src: '/voice-buddy/mockup-5.png',  alt: 'Store directory view',                 label: 'Viewing the store directory',         desc: 'A translated, voice-accessible directory showing aisle locations for items in the shopper\'s language.' },
            { src: '/voice-buddy/mockup-6.png',  alt: 'More menu',                            label: 'More menu',                           desc: 'Surfacing the Voice Buddy entry point within the app\'s navigation for easy access.' },
            { src: '/voice-buddy/mockup-8.png',  alt: 'Accessing the feature in Kroger app',  label: 'Accessing the feature',               desc: 'How Voice Buddy integrates into the existing Kroger app experience without disrupting the flow.' },
            { src: '/voice-buddy/mockup-9.png',  alt: 'Introduction and onboarding',          label: 'Introduction / Onboarding',           desc: 'A warm, language-first onboarding flow that sets preferred language and introduces capabilities.' },
            { src: '/voice-buddy/mockup-4.png',  alt: 'Returning use flow',                   label: 'Returning use',                       desc: 'Streamlined experience for returning users — quick access to recent queries and saved items.' },
          ].map(({ src, alt, label, desc }) => (
            <div
              key={src}
              className="vb-ideation-item"
              data-cursor-label="View Image"
              onClick={(e) => openLightbox(e, src, alt)}
            >
              <div className="vb-img-wrap">
                <img src={src} alt={alt} />
              </div>
              <p className="vb-ideation-label">{label}</p>
              <p className="vb-ideation-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Branding ────────────────────────────────────────────────────────── */}
      <section className="vb-section" id="branding">
        <p className="vb-section-label vb-reveal">07 — BRANDING</p>
        <h2 className="vb-section-title vb-reveal">
          Visual Identity
        </h2>
        <div className="vb-full-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-11.png', 'Voice Buddy branding and white label system')}>
          <img
            src="/voice-buddy/mockup-11.png"
            alt="Voice Buddy branding and white label system"
            className="vb-full-img"
          />
          <p className="vb-img-caption">
            Voice Buddy was designed as a white-label feature — the visual system is flexible
            enough to be adopted by any grocery retailer, with Kroger as the primary pilot. Here, we designed for Walmart, Publix, and Sam's Club.
          </p>
        </div>
      </section>

      {/* ── Usability Testing ───────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="testing">
        <p className="vb-section-label">08 — USABILITY TESTING</p>
        <h2 className="vb-section-title">
          What We Learned
        </h2>
        <div className="vb-text-block">
          <p>
            We ran moderated usability tests via video calls with five participants across two rounds
            of testing, using a mid-to-high fidelity prototype. Key findings:
          </p>
        </div>
        <ul className="vb-findings-list">
          <li className="vb-finding-item">
            <span className="vb-finding-num">01</span>
            <div>
              <p className="vb-finding-title">Voice activation was intuitive</p>
              <p className="vb-finding-desc">All participants successfully activated the voice assistant on their first attempt with no prompting.</p>
            </div>
          </li>
          <li className="vb-finding-item">
            <span className="vb-finding-num">02</span>
            <div>
              <p className="vb-finding-title">Language selection needed clearer entry</p>
              <p className="vb-finding-desc">3 of 5 users didn't notice the language toggle during onboarding. We moved it to a more prominent position in iteration 2.</p>
            </div>
          </li>
          <li className="vb-finding-item">
            <span className="vb-finding-num">03</span>
            <div>
              <p className="vb-finding-title">Real-time translation was the most valued feature</p>
              <p className="vb-finding-desc">Participants rated the live product label translation as the single most useful capability — especially for allergen information.</p>
            </div>
          </li>
          <li className="vb-finding-item">
            <span className="vb-finding-num">04</span>
            <div>
              <p className="vb-finding-title">Users wanted confirmation feedback</p>
              <p className="vb-finding-desc">When Voice Buddy processed a request, users wanted visual + audio confirmation that it had heard them correctly before proceeding.</p>
            </div>
          </li>
          <li className="vb-finding-item">
            <span className="vb-finding-num">05</span>
            <div>
              <p className="vb-finding-title">Emotional response was strongly positive</p>
              <p className="vb-finding-desc">Post-test surveys showed high emotional satisfaction — participants described feeling "seen," "respected," and "less anxious" using the feature.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* ── Final Solution ──────────────────────────────────────────────────── */}
      <section className="vb-section" id="solution">
        <p className="vb-section-label vb-reveal">09 — FINAL SOLUTION</p>
        <h2 className="vb-section-title vb-reveal">
          The Result
        </h2>

        <div className="vb-solution-stats vb-reveal">
          <div className="vb-solution-stat">
            <p className="vb-solution-num">4.25<span className="vb-solution-unit">/5</span></p>
            <p className="vb-solution-desc">Average usability rating from test participants</p>
          </div>
          <div className="vb-solution-stat">
            <p className="vb-solution-num">100<span className="vb-solution-unit">%</span></p>
            <p className="vb-solution-desc">of users reported feeling more independent and confident shopping with Voice Buddy</p>
          </div>
        </div>

        <div className="vb-solution-imgs">
          <div className="vb-solution-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-12.png', 'Voice Buddy final design — main screen')}>
            <img src="/voice-buddy/mockup-12.png" alt="Voice Buddy final design — main screen" />
          </div>
          <div className="vb-solution-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-3.png', 'Voice Buddy final design — detail screens')}>
            <img src="/voice-buddy/mockup-3.png" alt="Voice Buddy final design — detail screens" />
          </div>
        </div>

        <div className="vb-solution-imgs vb-mt">
          <div className="vb-solution-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-2.png', 'Voice Buddy final design — onboarding')}>
            <img src="/voice-buddy/mockup-2.png" alt="Voice Buddy final design — onboarding" />
          </div>
          <div className="vb-solution-img-wrap vb-reveal" data-cursor-label="View Image" onClick={(e) => openLightbox(e, '/voice-buddy/mockup-10.png', 'Voice Buddy final design — translation flow')}>
            <img src="/voice-buddy/mockup-10.png" alt="Voice Buddy final design — translation flow" />
          </div>
        </div>
      </section>

      {/* ── Reflection ──────────────────────────────────────────────────────── */}
      <section className="vb-section vb-reveal" id="reflection">
        <p className="vb-section-label">10 — REFLECTION</p>
        <h2 className="vb-section-title">
          What I Learned
        </h2>
        <ul className="vb-reflection-list">
          <li>
            <span className="vb-reflection-marker">—</span>
            <p><strong>Designing for underserved users requires intentional empathy.</strong> This project pushed me to move beyond assumptions and lean into real user voices — especially when the population you're designing for isn't always visible in mainstream tech narratives.</p>
          </li>
          <li>
            <span className="vb-reflection-marker">—</span>
            <p><strong>White-label thinking from day one changes your decisions.</strong> Designing Voice Buddy as a system that any retailer could adopt — not just Kroger — shaped our branding, color choices, and component structure significantly.</p>
          </li>
          <li>
            <span className="vb-reflection-marker">—</span>
            <p><strong>Craft is a form of care.</strong> Designing the voice UI elements in Adobe Illustrator taught me that when you pour intention into the craft, it shows up in the person's experience.</p>
          </li>
          <li>
            <span className="vb-reflection-marker">—</span>
            <p><strong>Emotion is a valid usability metric.</strong> When users say they feel "seen" and "respected" — that's a UX outcome worth measuring and designing toward, just like task completion rate.</p>
          </li>
          <li>
            <span className="vb-reflection-marker">—</span>
            <p><strong>Team dynamics shape design quality.</strong> Working with a collaborative, communicative team made rapid iteration feel energizing rather than exhausting. Good process + good people = better work.</p>
          </li>
        </ul>
        <div className="vb-closing vb-reveal">
          <p className="vb-closing-text">
            Thanks for checking it out<span className="font-pixelscript vb-closing-comma">,</span>
          </p>
          <p className="vb-closing-sig">
            <span className="font-pixelscript">C</span>
            <span className="font-argent-lc">henice</span>
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
