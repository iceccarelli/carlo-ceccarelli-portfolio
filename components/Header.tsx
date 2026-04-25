'use client';

import { useEffect, useState, useRef } from 'react';

function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 80 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return hidden;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Systems', href: '#systems' },
  { label: 'Flagship', href: '#flagship' },
  { label: 'Intelligence', href: '#live-intelligence' },
  { label: 'Impact', href: '#impact' },
  { label: 'Experience', href: '#experience' },
  { label: 'Connect', href: '#connect' },
];

export default function Header() {
  const hidden = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header${hidden ? ' header-hidden' : ''}`}>
      <div className="header-inner">
        <a href="#hero" className="header-brand" aria-label="Back to top">
          <span className="brand-mark">CC</span>
          <span className="brand-text">
            <span className="brand-name">Carlo Ceccarelli</span>
            <span className="brand-sub">P.Eng. | Director of Operations</span>
          </span>
        </a>

        <nav className="header-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta"
        >
          LinkedIn
        </a>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`hamburger${menuOpen ? ' open' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-link accent"
          >
            LinkedIn
          </a>
        </div>
      )}
    </header>
  );
}
