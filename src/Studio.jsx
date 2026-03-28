import './Studio.css'
import { NavBar, Footer, CustomCursor, imgPaper } from './shared.jsx'

const imgHero = 'https://www.figma.com/api/mcp/asset/1427ac35-6536-405d-a7df-7f7733b6ca07'

const artworks = [
  {
    img: 'https://www.figma.com/api/mcp/asset/588fd224-9034-44e5-9343-4e21996bda4f',
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
    img: 'https://www.figma.com/api/mcp/asset/7618eb1b-d3da-4570-be0e-59e506161979',
    title: 'New Creation',
    desc: 'spontaneous butterfly doodle',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/611cf7dd-916d-4bc7-9b39-a4a6a2d3c449',
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
    img: 'https://www.figma.com/api/mcp/asset/cb6e69cd-c3ad-4c7e-a453-494b64c49275',
    title: 'Ruach HaKodesh',
    desc: 'contrasting and complementary colors experiment',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/1f2bb2dd-2a3a-4b0b-9974-46d699d05c2c',
    title: 'Much Fruit',
    desc: 'little oil pastel doodle',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/db40b5cc-9277-4171-806f-a3b3e1f727c6',
    title: 'Christ, The Strength of my Heart',
    desc: 'oil pastel experiment',
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/44e84065-34f9-44b5-b143-8e5fd3aa8c8b',
    title: 'Angels Ascending',
    desc: "design thinking project using Heck's Pictorial Archive of Nature & Science",
  },
  {
    img: 'https://www.figma.com/api/mcp/asset/b6350c79-69a6-4b90-b7c7-8eef8a98cf2e',
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
