import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', width: '100%', flex: 1, textAlign: 'left' }}>
      <aside style={{ width: '250px', borderRight: '1px solid var(--border)', padding: '32px 20px', flexShrink: 0 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>导航菜单</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}>
              <a href={`#menu${i + 1}`} style={{ display: 'block', padding: '12px 16px', background: 'var(--social-bg)', borderRadius: '8px', color: 'var(--text-h)', textDecoration: 'none', fontWeight: 500, transition: 'all 0.3s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-bg)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--social-bg)';
                  e.currentTarget.style.color = 'var(--text-h)';
                }}
              >
                一级菜单 {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', textAlign: 'center' }}>
        <section id="center">
          <div className="hero">
            <img src={heroImg} className="base" width="170" height="179" alt="" />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
          <div>
            <h1>zhf783313350</h1>
            <p>
              Edit <code>src/App.tsx</code>我在学习react+TypeScript开发<code>HMR</code>
            </p>
          </div>
          <button
            type="button"
            className="counter"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </section>

        <div className="ticks"></div>

        <section id="next-steps">
          <div id="docs">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h1>左侧内容</h1>
            <h2>Documentation</h2>
            <p>Your questions is here</p>
            <ul>
              <li>
                <a href="https://aistudio.google.com/prompts/new_chat" target="_blank">
                  <img className="logo" src={viteLogo} alt="" />
                  Explore Vite
                </a>
              </li>
              <li>
                <a href="https://chatgpt.com/" target="_blank">
                  <img className="button-icon" src={reactLogo} alt="" />
                  Learn more
                </a>
              </li>
            </ul>
          </div>
          <div id="social">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h1>右侧内容</h1>
            <h2>Connect with us</h2>
            <p>Join the Vite community</p>
            <ul>
              <li>
                <a href="https://github.com/vitejs/vite" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#github-icon"></use>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chat.vite.dev/" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#discord-icon"></use>
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <a href="https://x.com/vite_js" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#x-icon"></use>
                  </svg>
                  X.com
                </a>
              </li>
              <li>
                <a href="https://bsky.app/profile/vite.dev" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#bluesky-icon"></use>
                  </svg>
                  Bluesky
                </a>
              </li>
            </ul>
          </div>
        </section>

        <div className="ticks"></div>
        <section id="spacer"></section>
      </main>
    </div>
  )
}

export default App
