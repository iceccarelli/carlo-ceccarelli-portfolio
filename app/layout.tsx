import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  metadataBase: new URL('https://carlo-ceccarelli-portfolio.vercel.app'),
  title: 'Carlo Ceccarelli, P.Eng. — Director of Operations | Infrastructure & Capital Projects',
  description:
    'Portfolio of Carlo Luciano Ceccarelli Grimaldi, P.Eng. — Director of Operations at Accenture Infrastructure & Capital Projects. 13+ years delivering mega-scale transit, tunneling, and structural engineering programs across Canada.',
  keywords: [
    'Carlo Ceccarelli',
    'P.Eng.',
    'Director of Operations',
    'Accenture',
    'Infrastructure',
    'Capital Projects',
    'Ontario Line',
    'Construction Management',
    'Structural Engineering',
    'Rail Infrastructure',
    'Toronto',
    'Civil Engineering',
    'Project Delivery',
  ],
  authors: [{ name: 'Carlo Luciano Ceccarelli Grimaldi' }],
  publisher: 'Carlo Ceccarelli, P.Eng.',
  openGraph: {
    title: 'Carlo Ceccarelli, P.Eng. — Director of Operations',
    description:
      'Engineering executive with 13+ years delivering mega-infrastructure programs. Director of Operations at Accenture I&CP.',
    url: 'https://carlo-ceccarelli-portfolio.vercel.app',
    siteName: 'Carlo Ceccarelli Portfolio',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carlo Ceccarelli, P.Eng.',
    description:
      'Director of Operations — Accenture Infrastructure & Capital Projects. Building the infrastructure that moves cities forward.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Carlo Luciano Ceccarelli Grimaldi',
  jobTitle: 'Director of Operations',
  worksFor: {
    '@type': 'Organization',
    name: 'Accenture Infrastructure & Capital Projects',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Toronto',
  },
  knowsAbout: [
    'Construction Management',
    'Structural Engineering',
    'Rail Infrastructure',
    'Project Delivery',
    'Tunneling',
    'Ontario Line',
  ],
  url: 'https://carlo-ceccarelli-portfolio.vercel.app',
  sameAs: ['https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <Header />
        {children}

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-col">
              <h4 className="footer-heading">Navigation</h4>
              <a href="#about">About the Work</a>
              <a href="#systems">Architecture of Value</a>
              <a href="#flagship">Flagship Initiatives</a>
              <a href="#live-intelligence">Live Intelligence</a>
              <a href="#impact">Impact Dashboard</a>
              <a href="#experience">Experience</a>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Proof of Work</h4>
              <a
                href="https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/iceccarelli"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.accenture.com/ca-en/industries/capital-projects-infrastructure-index"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accenture I&amp;CP
              </a>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Status</h4>
              <div className="footer-status">
                <span className="status-dot" />
                <span>Operational — Toronto, Canada</span>
              </div>
              <p className="footer-note">
                Building the infrastructure that moves cities forward.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact</h4>
              <a href="mailto:carlo.ceccarelli@outlook.com">carlo.ceccarelli@outlook.com</a>
              <p className="footer-copy">
                &copy; {new Date().getFullYear()} Carlo Ceccarelli, P.Eng. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
