import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { NavBar, Footer, imgLogo, imgGroup, imgPaper } from './shared.jsx'

// ─── Paint canvas ─────────────────────────────────────────────────────────────
function PaintCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let painting = false
    let lastX = 0, lastY = 0
    let strokeColor = '#000'
    const paletteColors = ['#e8262a','#f47421','#f9e234','#5db533','#4dbfe8','#8c4fb5']
    const brushSize = 14

    const stamp = (x, y) => {
      ctx.fillStyle = strokeColor
      ctx.fillRect(Math.round(x - brushSize / 2), Math.round(y - brushSize / 2), brushSize, brushSize)
    }

    const drawLine = (x0, y0, x1, y1) => {
      const steps = Math.max(1, Math.floor(Math.hypot(x1 - x0, y1 - y0) / 3))
      for (let i = 0; i <= steps; i++) {
        stamp(x0 + (x1 - x0) * i / steps, y0 + (y1 - y0) * i / steps)
      }
    }

    const onDown = (e) => {
      if (!document.body.classList.contains('palette-active')) return
      painting = true
      strokeColor = paletteColors[Math.floor(Math.random() * paletteColors.length)]
      lastX = e.clientX; lastY = e.clientY
      stamp(lastX, lastY)
    }

    const onMove = (e) => {
      if (!painting) return
      drawLine(lastX, lastY, e.clientX, e.clientY)
      lastX = e.clientX; lastY = e.clientY
    }

    const onUp = () => { painting = false }

    const onTouchStart = (e) => {
      if (!document.body.classList.contains('palette-active')) return
      if (e.target.closest('.hero-palette-wrap')) return
      e.preventDefault()
      const t = e.touches[0]
      painting = true
      strokeColor = paletteColors[Math.floor(Math.random() * paletteColors.length)]
      lastX = t.clientX; lastY = t.clientY
      stamp(lastX, lastY)
    }

    const onTouchMove = (e) => {
      if (!painting) return
      e.preventDefault()
      const t = e.touches[0]
      drawLine(lastX, lastY, t.clientX, t.clientY)
      lastX = t.clientX; lastY = t.clientY
    }

    const onTouchEnd = () => { painting = false }

    document.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)

    // Clear canvas when paint mode exits (after fade-out transition)
    const observer = new MutationObserver(() => {
      if (!document.body.classList.contains('palette-active')) {
        setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 600)
      }
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="paint-canvas" />
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
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

    const onEnterPillCursor = (e) => {
      const label = e.currentTarget.dataset.cursorLabel
      cursor.classList.add('is-pill-cursor')
      cursor.querySelector('.cursor-label').textContent = label
    }

    const onLeavePillCursor = () => {
      cursor.classList.remove('is-pill-cursor')
      cursor.querySelector('.cursor-label').textContent = ''
    }

    const onTouchMove = (e) => {
      if (!document.body.classList.contains('palette-active')) return
      const t = e.touches[0]
      cursor.style.left = t.clientX + 'px'
      cursor.style.top  = t.clientY + 'px'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onTouchMove, { passive: true })

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
      document.removeEventListener('touchmove', onTouchMove)
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

// ─── Figma assets ────────────────────────────────────────────────────────────
const imgLine2          = '/Line 2.png'
const imgRectangle4     = '/tempocover.png'
const imgRectangle5     = '/echoboxcover.png'
const imgRectangle6     = '/voicebudycover.png'
const imgRectangle7     = '/thescrollcover.png'
const imgHeaderBg       = '/header-bg.png'

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    image:       imgRectangle6,
    name:        'Voice Buddy',
    tag:         'UXD',
    context:     'AmazonNEXT x CodePath',
    date:        'Spring 2025',
    cursorLabel: 'Click me!',
    link:        '/voice-buddy',
  },
  {
    image:      imgRectangle4,
    name:       'Tempo',
    tag:        'UXD',
    context:    'FigBuild Designathon',
    date:       'Winter 2026',
    comingSoon: 'Case study coming soon',
  },
  {
    image:      imgRectangle5,
    name:       'EchoBox',
    tag:        'UXD',
    context:    'Rice University Designathon',
    date:       'Winter 2026',
    comingSoon: 'Case study coming soon',
  },
  {
    image:      imgRectangle7,
    name:       'The Scroll',
    tag:        'UXE',
    context:    ['By me :D', 'in progress :))'],
    date:       'Spring 2026',
    comingSoon: 'Project under construction',
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function ProjectCard({ image, name, tag, context, date, comingSoon, cursorLabel, link }) {
  const contextLines = Array.isArray(context) ? context : [context]
  const card = (
    <article className="project-card">
      <div className="project-image-wrap" {...(cursorLabel ? { 'data-cursor-label': cursorLabel } : {})}>
        <img src={image} alt={name} />
        {comingSoon && (
          <div className="project-coming-soon">
            <p>{comingSoon}</p>
          </div>
        )}
      </div>
      <div className="project-meta-top">
        <p className="project-name">{name}</p>
        <span className="project-tag">{tag}</span>
      </div>
      <div className="project-meta-bottom">
        <div className="project-context">
          {contextLines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <p className="project-date">{date}</p>
      </div>
    </article>
  )
  return link ? <Link to={link} className="project-card-link">{card}</Link> : card
}


// ─── Card reveal on scroll ────────────────────────────────────────────────────
function useCardReveal() {
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    }, { threshold: 0.4 })

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])
}

// ─── Spring scroll ────────────────────────────────────────────────────────────
function useSpringScroll() {
  useEffect(() => {
    const springEase = (t) => 1 - Math.pow(1 - t, 4)

    const scrollTo = (targetY) => {
      const startY = window.scrollY
      const distance = targetY - startY
      const duration = 1200
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        window.scrollTo(0, startY + distance * springEase(progress))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const onClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href?.startsWith('#')) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      scrollTo(target.getBoundingClientRect().top + window.scrollY)
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(l => l.addEventListener('click', onClick))
    return () => links.forEach(l => l.removeEventListener('click', onClick))
  }, [])
}

// ─── Palette attention nudge ──────────────────────────────────────────────────
function usePaletteAttention() {
  useEffect(() => {
    const trigger = () => {
      if (document.body.classList.contains('palette-active')) return
      const wrap = document.querySelector('.hero-palette-wrap')
      if (!wrap) return
      wrap.classList.remove('is-attention')
      void wrap.offsetWidth
      wrap.classList.add('is-attention')
      setTimeout(() => wrap.classList.remove('is-attention'), 700)
    }

    const timeout = setTimeout(trigger, 2500)
    const interval = setInterval(trigger, 7000)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [])
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function App() {
  useSpringScroll()
  useCardReveal()
  usePaletteAttention()

  return (
    <div className="portfolio">
      <CustomCursor />
      <PaintCanvas />
      {/* Paper texture */}
      <div
        className="paper-bg"
        style={{ backgroundImage: `url('${imgPaper}')` }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="header">
        <div className="header-blur" aria-hidden="true">
          <img src={imgHeaderBg} alt="" />
        </div>

        <NavBar />

        <div className="hero">
          <div className="hero-name">
            {/* Mobile: two lines */}
            <p className="mobile-only">
              <span className="font-pixelscript">C</span>
              <span className="font-argent">HENICE</span>
            </p>
            <p className="font-argent mobile-only">TAYLOR</p>
            {/* Tablet: one line */}
            <p className="tablet-only">
              <span className="font-pixelscript">C</span>
              <span className="font-argent">HENICE&nbsp;&nbsp;TAYLOR</span>
            </p>
          </div>

          <p className="hero-bio">
            A multifaceted creative designing at the intersection of art,
            technology, and people.
          </p>

          <div className="hero-titles">
            <p>Product Designer + Design Engineer</p>
            <p>Currently → UXD Student @ SCAD</p>
          </div>

          <div className="hero-palette-wrap" onClick={(e) => {
            const wrap = e.currentTarget
            const activating = !wrap.classList.contains('is-active')
            wrap.classList.toggle('is-active')
            wrap.classList.remove('is-sparkling')
            void wrap.offsetWidth
            wrap.classList.add('is-sparkling')
            setTimeout(() => wrap.classList.remove('is-sparkling'), 500)
            if (activating) {
              const scrollDelay = window.scrollY > 10 ? 600 : 0
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => document.body.classList.add('palette-active'), scrollDelay)
            } else {
              document.body.classList.remove('palette-active')
            }
          }}>
            <img src="/palette.png" alt="" className="hero-palette" aria-hidden="true" />
            {[...Array(7)].map((_, i) => <span key={i} className={`sparkle sparkle-${i + 1}`} />)}
          </div>
        </div>
      </header>

      {/* Work */}
      <section className="work" id="work">
        <h2 className="work-title">
          <span className="font-pixelscript">M</span>
          <span className="font-argent-lc">y work</span>
        </h2>

        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </section>

      <Footer />
    </div>
  )
}
