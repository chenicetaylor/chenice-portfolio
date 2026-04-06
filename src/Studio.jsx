import './Studio.css'
import { NavBar, Footer, CustomCursor, imgPaper } from './shared.jsx'

const imgHero = '/studioheadshot.jpeg'

const artworks = [
  {
    img: '/studio-images/dwell.png',
    title: 'Dwell',
    desc: (
      <>
        for an album cover for an instrumental by my friend,{' '}
        <a
          href="https://www.youtube.com/watch?v=xiFG5vO6CV8&list=OLAK5uy_nk-5tdcNhc6ZEOcQmWWm1TKOF-eA7AR7Y&index=2"
          target="_blank"
          rel="noreferrer"
        >
          Victor Perez↗
        </a>
      </>
    ),
  },
  {
    img: '/studio-images/newcreation.png',
    title: 'New Creation',
    desc: 'spontaneous butterfly doodle',
  },
  {
    img: '/studio-images/shephardsstaff.jpeg',
    title: "The Shepherd's Staff",
    desc: (
      <>
        work in progress of an album cover for an instrumental by my friend,{' '}
        <a
          href="https://www.youtube.com/watch?v=xiFG5vO6CV8&list=OLAK5uy_nk-5tdcNhc6ZEOcQmWWm1TKOF-eA7AR7Y&index=2"
          target="_blank"
          rel="noreferrer"
        >
          Victor Perez↗
        </a>
      </>
    ),
  },
  {
    img: '/studio-images/ruach.png',
    title: 'Ruach HaKodesh',
    desc: 'contrasting and complementary colors experiment',
  },
  {
    img: '/studio-images/muchfruit.png',
    title: 'Much Fruit',
    desc: 'little oil pastel doodle',
  },
  {
    img: '/studio-images/heart.png',
    title: 'Christ, The Strength of my Heart',
    desc: 'oil pastel experiment',
  },
  {
    img: '/studio-images/angelsascending.png',
    title: 'Angels Ascending',
    desc: "design thinking project using Heck's Pictorial Archive of Nature & Science",
  },
  {
    img: '/studio-images/lamb.png',
    title: 'Little Lamb',
    desc: 'cutesy doodle',
  },
]

export default function Studio() {
  return (
    <div className="studio-page">
      <CustomCursor />
      <div
        className="studio-paper-bg"
        style={{ backgroundImage: `url('${imgPaper}')` }}
        aria-hidden="true"
      />

      <NavBar />

      {/* Hero */}
      <header className="studio-header">
        <div className="studio-header-inner">
          <div className="studio-hero-photo-wrap">
            <img src={imgHero} alt="Chenice Taylor" className="studio-hero-photo" />
          </div>
          <div className="studio-hero-text">
            <h1 className="studio-title">
              Welcome to my{' '}
              <span className="font-pixelscript">S</span>
              <span className="font-argent-lc">tudio</span>!
            </h1>
            <p className="studio-desc">
              Here are some of my projects, doodles and crafts that I work on offline ♡
            </p>
            <p className="studio-desc">
              Check out{' '}
              <a
                href="https://www.instagram.com/thelordspoiema/"
                target="_blank"
                rel="noreferrer"
                className="studio-link"
              >
                The Lord's Poiema↗
              </a>{' '}
              on Instagram (my art page!!)
            </p>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <main className="studio-grid-wrap">
        <div className="studio-grid">
          {/* Left col: even indices — Dwell, Shepherd's Staff, Much Fruit, Angels Ascending */}
          <div className="studio-col">
            {artworks.filter((_, i) => i % 2 === 0).map(({ img, title, desc }) => (
              <div key={title} className="studio-card">
                <img src={img} alt={title} className="studio-card-img" />
                <p className="studio-card-title">{title}</p>
                <p className="studio-card-desc">{desc}</p>
              </div>
            ))}
          </div>
          {/* Right col: odd indices — New Creation, Ruach HaKodesh, Christ Strength, Little Lamb */}
          <div className="studio-col">
            {artworks.filter((_, i) => i % 2 === 1).map(({ img, title, desc }) => (
              <div key={title} className="studio-card">
                <img src={img} alt={title} className="studio-card-img" />
                <p className="studio-card-title">{title}</p>
                <p className="studio-card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
