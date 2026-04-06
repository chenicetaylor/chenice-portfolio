import { useState, useEffect } from 'react'
import './About.css'
import { NavBar, Footer, CustomCursor, imgPaper } from './shared.jsx'

const headshots = [
  '/aboutheadshot.jpeg',
  '/headshot-2.png',
  '/headshot-3.png',
]

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % headshots.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {headshots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Chenice Taylor"
          className={`about-photo${i === current ? ' about-photo-active' : ''}`}
        />
      ))}
    </>
  )
}

const sections = [
  {
    initial: 'W', rest: 'ho',
    body: "I'm a product designer and design engineer who designs at the intersection of art, technology, and people. I'm especially drawn to projects that make technology more accessible and meaningful for real communities.",
  },
  {
    initial: 'W', rest: 'hat',
    body: "I design and build user-centered products from early research and wireframes to interactive prototypes. My work lives at the intersection of product design and creative experimentation.",
  },
  {
    initial: 'W', rest: 'hen',
    body: "I began exploring design and technology during my studies in computer science, where I discovered a passion for shaping how people interact with digital products. Since then, I've been developing my skills through designathons, hackathons, and personal projects.",
  },
  {
    initial: 'W', rest: 'here',
    body: "I'm based in Atlanta and study UX design at the Savannah College of Art and Design (SCAD), where I continue developing my skills through coursework, collaboration, and independent projects.",
  },
  {
    initial: 'W', rest: 'hy',
    body: "I'm inspired by the intersection of art, technology, and human experience. Product design gives me a way to translate creativity and curiosity into digital products that genuinely improve how people interact with technology.",
  },
  {
    initial: 'H', rest: 'ow',
    body: "I approach design with curiosity and collaboration, focusing on understanding people and the problems they face. I enjoy turning insights into thoughtful, intuitive experiences through research, iteration, and experimentation.",
  },
  {
    initial: 'M', rest: 'ore',
    body: "Outside of product design, I explore creative projects like painting, crafting, and building small ventures that keep my creativity active and constantly evolving.",
  },
]

const hebrewChars = ['יְ', 'ה', 'וָ', 'ה', '\u00A0', 'אֱ', 'לֹ', 'הִ', 'י', 'ם']
const rainbowHues = [0, 30, 60, 100, 150, 190, 230, 270, 310, 340]

export default function About() {

  return (
    <div className="about-page">
      <CustomCursor />
      {/* Paper texture */}
      <div
        className="about-paper-bg"
        style={{ backgroundImage: `url('${imgPaper}')` }}
        aria-hidden="true"
      />

      <NavBar />

      {/* Hero */}
      <header className="about-header">
        <div className="about-header-inner">
          <div className="about-photo-wrap">
            <PhotoSlideshow />
          </div>
          <div className="about-intro">
            <p className="about-greeting">
              Hi hi, I'm{' '}
              <span className="font-pixelscript">C</span><span className="font-argent-lc">henice</span><span className="font-argent-lc">!</span>
              {' '}♡
            </p>
            <div className="about-created">
              <span className="about-created-text">Created by</span>
              <div className="about-created-pill-wrap">
                <span className="about-created-pill">
                  {hebrewChars.map((char, i) => (
                    <span
                      key={i}
                      className="rainbow-letter"
                      style={{
                        animationDelay: `${i * 0.12}s`,
                        '--hue': `${rainbowHues[i]}deg`,
                      }}
                    >{char}</span>
                  ))}
                </span>
                <div className="about-created-tooltip">
                  <p className="about-created-tooltip-name">Yahweh Elohim</p>
                  <p className="about-created-tooltip-desc">The LORD God, the Creator of the universe</p>
                </div>
              </div>
              <span className="about-created-text">to create.</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="about-sections">
        {sections.map(({ initial, rest, body }) => (
          <div key={initial + rest} className="about-section">
            <h2 className="about-section-title">
              <span className="font-pixelscript">{initial}</span>
              <span className="font-argent-lc">{rest}</span>
            </h2>
            <p className="about-section-body">{body}</p>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}
