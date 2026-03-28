import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Shared assets ────────────────────────────────────────────────────────────
export const imgLogo  = 'https://www.figma.com/api/mcp/asset/2af1ebbe-8d99-4598-94ef-4589fd7eb84c'
export const imgGroup = 'https://www.figma.com/api/mcp/asset/12e10611-fb70-4339-87f5-69587cb0766e'
export const imgClose = 'https://www.figma.com/api/mcp/asset/b58e7a64-b524-43e1-9aef-c592a0a25d92'
export const imgPaper = 'https://www.figma.com/api/mcp/asset/33ceeb3c-5554-41b3-96fe-12d56056bbdc'

// ─── NavBar ───────────────────────────────────────────────────────────────────
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`navbar${menuOpen ? ' navbar-open' : ''}`}>
      {/* Mobile: collapsed bar */}
      <div className="navbar-mobile mobile-only">
        <img src={imgLogo} alt="Chenice Taylor" className="navbar-logo" />
        <button
          className="navbar-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <div className="navbar-menu-icon">
            <img src={imgGroup} alt="" className={menuOpen ? 'icon-hidden' : ''} />
            <img src={imgClose} alt="" className={menuOpen ? '' : 'icon-hidden'} />
          </div>
        </button>
      </div>

      {/* Mobile: expanded drawer */}
      <div className={`navbar-drawer mobile-only${menuOpen ? ' navbar-drawer-open' : ''}`}>
        <div className="navbar-drawer-divider" />
        <a href="/#work"   className="navbar-drawer-link" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="/studio" className="navbar-drawer-link" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="/about"   className="navbar-drawer-link" onClick={() => setMenuOpen(false)}>About</a>
        <a href="https://drive.google.com/file/d/11tKxntt6_Y-qKdXvkadC0Og8ixhKixXh/view"
           className="navbar-drawer-link" target="_blank" rel="noreferrer">Resume</a>
        <div className="navbar-drawer-bottom-line" />
      </div>

      {/* Tablet+: left pills | centered logo | right pills */}
      <div className="nav-pills tablet-only">
        <a href="/#work" className="nav-pill">Work</a>
        <a href="/studio" className="nav-pill">Studio</a>
      </div>
      <Link to="/">
        <img src={imgLogo} alt="Chenice Taylor" className="navbar-logo tablet-only" />
      </Link>
      <div className="nav-pills tablet-only">
        <a href="/about" className="nav-pill">About</a>
        <a href="https://drive.google.com/file/d/11tKxntt6_Y-qKdXvkadC0Og8ixhKixXh/view" className="nav-pill" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </nav>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-wrap">
        <img src={imgLogo} alt="Chenice Taylor" />
      </div>

      <div className="footer-divider" />

      <div className="footer-nav">
        <div className="footer-nav-col">
          <a href="#" className="footer-link">Back to Top</a>
          <p>&nbsp;</p>
          <a href="/#work" className="footer-link">Work</a>
          <p>&nbsp;</p>
          <a href="/studio" className="footer-link">Studio</a>
          <p>&nbsp;</p>
          <a href="/about" className="footer-link">About</a>
        </div>
        <div className="footer-nav-col">
          <a href="https://drive.google.com/file/d/11tKxntt6_Y-qKdXvkadC0Og8ixhKixXh/view" className="footer-link" target="_blank" rel="noreferrer">Resume</a>
          <p>&nbsp;</p>
          <a href="mailto:" className="footer-link">Email</a>
          <p>&nbsp;</p>
          <a href="https://www.linkedin.com/in/chenice-taylor/" className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
          <p>&nbsp;</p>
          <a href="https://github.com/chenicetaylor" className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
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

// ─── Custom Cursor ────────────────────────────────────────────────────────────
export function CustomCursor() {
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
      <span className="cursor-label" />
    </div>
  )
}
