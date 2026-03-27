import { useEffect, useRef } from 'react'
import './App.css'

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

    document.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)

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

// ─── Figma assets ────────────────────────────────────────────────────────────
const imgLogo           = 'https://www.figma.com/api/mcp/asset/2af1ebbe-8d99-4598-94ef-4589fd7eb84c'
const imgLine2          = 'https://www.figma.com/api/mcp/asset/ec2c8760-7e04-40a7-836b-1b533581fb4b'
const imgGroup          = 'https://www.figma.com/api/mcp/asset/12e10611-fb70-4339-87f5-69587cb0766e'
const imgPaper          = 'https://www.figma.com/api/mcp/asset/33ceeb3c-5554-41b3-96fe-12d56056bbdc'
const imgRectangle4     = 'https://www.figma.com/api/mcp/asset/65c3de9a-2663-4116-82a4-c65d1d7f95b8'
const imgRectangle5     = 'https://www.figma.com/api/mcp/asset/abbdb667-5c33-48d8-95fa-27e1024d8230'
const imgRectangle6     = 'https://www.figma.com/api/mcp/asset/676179e8-3bf7-4b5a-9b2d-e38f95207075'
const imgRectangle7     = 'https://www.figma.com/api/mcp/asset/cdd99653-ccc2-4cbd-87c9-8946bc2774d2'
const imgHeaderBg       = '/header-bg.png'

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
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
    image:       imgRectangle6,
    name:        'Voice Buddy',
    tag:         'UXD',
    context:     'AmazonNEXT x CodePath',
    date:        'Spring 2025',
    cursorLabel: 'Click me!',
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
function NavBar() {
  return (
    <nav className="navbar">
      {/* Mobile: logo left + hamburger right */}
      <img src={imgLogo} alt="Chenice Taylor" className="navbar-logo mobile-only" />
      <button className="navbar-menu mobile-only" aria-label="Open menu">
        <img src={imgGroup} alt="" />
      </button>

      {/* Tablet: left pills | centered logo | right pills */}
      <div className="nav-pills tablet-only">
        <a href="#work" className="nav-pill">Work</a>
        <a href="#studio" className="nav-pill">Studio</a>
      </div>
      <img src={imgLogo} alt="Chenice Taylor" className="navbar-logo tablet-only" />
      <div className="nav-pills tablet-only">
        <a href="#about" className="nav-pill">About</a>
        <a href="#resume" className="nav-pill">Resume</a>
      </div>
    </nav>
  )
}

function ProjectCard({ image, name, tag, context, date, comingSoon, cursorLabel }) {
  const contextLines = Array.isArray(context) ? context : [context]
  return (
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
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-wrap">
        <img src={imgLogo} alt="Chenice Taylor" />
      </div>

      <div className="footer-divider" />

      <div className="footer-nav">
        <div className="footer-nav-col">
          <p>Back to Top</p>
          <p>&nbsp;</p>
          <p>Work</p>
          <p>&nbsp;</p>
          <p>Studio</p>
          <p>&nbsp;</p>
          <p>About</p>
        </div>
        <div className="footer-nav-col">
          <p>Resume</p>
          <p>&nbsp;</p>
          <p>Email</p>
          <p>&nbsp;</p>
          <p>LinkedIn</p>
          <p>&nbsp;</p>
          <p>GitHub</p>
        </div>
      </div>

      <div className="footer-quote">
        <p>Let all you do be done with love.</p>
        <p>1 Corinthians 16:14</p>
        <p>&nbsp;</p>
        <p>© 2026. Created with love by Chenice Taylor ♡</p>
      </div>
    </footer>
  )
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function App() {
  useSpringScroll()

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
            wrap.classList.toggle('is-active')
            document.body.classList.toggle('palette-active')
            wrap.classList.remove('is-sparkling')
            void wrap.offsetWidth // force reflow to restart animation
            wrap.classList.add('is-sparkling')
            setTimeout(() => wrap.classList.remove('is-sparkling'), 500)
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
