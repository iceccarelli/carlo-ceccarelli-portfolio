'use client';

import { useEffect, useRef, useState } from 'react';

// ====================== TYPES ======================
type ClockEntry = {
  city: string;
  label: string;
  timeZone: string;
  time: string;
};

type RepoCard = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  language: string;
  stargazers_count: number;
  topics?: string[];
};

type Headline = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
};

// ====================== CONSTANTS ======================
const clockZones = [
  { city: 'Toronto', label: 'Operational headquarters', timeZone: 'America/Toronto' },
  { city: 'New York', label: 'Capital markets & finance', timeZone: 'America/New_York' },
  { city: 'London', label: 'Global infrastructure advisory', timeZone: 'Europe/London' },
  { city: 'Dubai', label: 'Mega-project corridor', timeZone: 'Asia/Dubai' },
  { city: 'Singapore', label: 'Asia-Pacific infrastructure', timeZone: 'Asia/Singapore' },
];

const strengths = [
  {
    title: 'Mega-Project Delivery & Operations',
    body: 'I direct end-to-end operations for billion-dollar infrastructure programs, orchestrating multi-disciplinary teams across design, procurement, construction, and commissioning to deliver on time and on budget.',
  },
  {
    title: 'Structural & Rail Engineering',
    body: 'My engineering foundation spans structural analysis, rail systems design, and tunnel engineering — translating complex geotechnical and load conditions into safe, buildable, and resilient infrastructure.',
  },
  {
    title: 'Construction Management Excellence',
    body: 'I build and lead construction management frameworks that prioritize safety, quality assurance, schedule integrity, and stakeholder alignment across the full project lifecycle.',
  },
  {
    title: 'Strategic Consulting & Integration',
    body: 'At Accenture I&CP, I bridge the gap between engineering execution and strategic advisory — embedding digital tools, data-driven decision-making, and operational intelligence into capital project delivery.',
  },
];

const architectureLayers = [
  {
    title: 'Strategic Advisory Layer',
    project: 'Accenture I&CP',
    description:
      'Enterprise-grade consulting that aligns capital project portfolios with organizational strategy, risk management, and stakeholder governance.',
  },
  {
    title: 'Project Controls Layer',
    project: 'Integrated Delivery',
    description:
      'Earned value management, schedule optimization, and cost control systems that provide real-time visibility into program health and performance.',
  },
  {
    title: 'Construction Execution Layer',
    project: 'Ontario Line & Transit Programs',
    description:
      'On-the-ground construction management for tunneling, station construction, rail systems installation, and civil works across multi-billion-dollar transit corridors.',
  },
  {
    title: 'Engineering & Design Layer',
    project: 'Structural & Rail Systems',
    description:
      'Structural analysis, geotechnical design coordination, rail alignment optimization, and systems integration that form the technical backbone of every project.',
  },
];

const flagshipInitiatives = [
  {
    title: 'Ontario Line — Toronto Transit Expansion',
    href: 'https://www.ontarioline.com/',
    summary:
      'Leading construction management operations for Toronto\'s transformative 15.6 km subway line — a $19B+ mega-project connecting the city\'s underserved communities with rapid transit.',
  },
  {
    title: 'Project of the Year Award — Tunneling Excellence',
    href: 'https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/',
    summary:
      'Recognized for delivering a tunneling project on time and on budget — a rare achievement in mega-infrastructure that demonstrates disciplined execution and team leadership.',
  },
  {
    title: 'Accenture I&CP — Construction Management Practice',
    href: 'https://www.accenture.com/ca-en/industries/capital-projects-infrastructure-index',
    summary:
      'Building and scaling Accenture\'s construction management capability across Canadian infrastructure, embedding safety-first culture and digital project controls.',
  },
  {
    title: 'End-to-End Infrastructure Delivery Framework',
    href: 'https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/',
    summary:
      'Architected an integrated delivery framework that unifies design coordination, procurement strategy, construction sequencing, and commissioning into a single operational model.',
  },
];

const trustedSources = [
  {
    title: 'Engineering News-Record',
    href: 'https://www.enr.com/',
    focus: 'The definitive source for construction industry intelligence, project rankings, and engineering innovation.',
  },
  {
    title: 'Infrastructure Ontario',
    href: 'https://www.infrastructureontario.ca/',
    focus: 'Crown agency overseeing Ontario\'s public infrastructure pipeline and P3 delivery models.',
  },
  {
    title: 'Accenture Infrastructure & Capital Projects',
    href: 'https://www.accenture.com/ca-en/industries/capital-projects-infrastructure-index',
    focus: 'Global consulting perspective on digital transformation in capital project delivery.',
  },
  {
    title: 'Professional Engineers Ontario',
    href: 'https://www.peo.on.ca/',
    focus: 'Regulatory body governing engineering practice, ethics, and professional standards in Ontario.',
  },
  {
    title: 'Canadian Construction Association',
    href: 'https://www.cca-acc.com/',
    focus: 'National voice of the construction industry — policy, workforce development, and best practices.',
  },
  {
    title: 'World Tunnelling Congress',
    href: 'https://www.ita-aites.org/',
    focus: 'International tunnelling and underground space association — advancing subsurface infrastructure globally.',
  },
];

const marketThemes = [
  {
    title: 'Infrastructure & Construction Materials',
    body: 'Tracking commodity prices, steel indices, and construction material costs that directly impact project budgets and procurement strategies.',
  },
  {
    title: 'Canadian Transit & Public Works',
    body: 'Monitoring government infrastructure spending, transit expansion announcements, and P3 pipeline developments across Canada.',
  },
  {
    title: 'Global Engineering & Construction Firms',
    body: 'Following the performance of major E&C firms, consulting companies, and infrastructure funds that shape the competitive landscape.',
  },
];

const fallbackHeadlines: Headline[] = [
  {
    title: 'ENR — Top 400 Contractors: How mega-projects are reshaping the construction landscape',
    link: 'https://www.enr.com/',
    pubDate: 'Live source',
    source: 'Engineering News-Record',
    category: 'Construction',
  },
  {
    title: 'Infrastructure Ontario — Ontario Line progress update and community impact milestones',
    link: 'https://www.infrastructureontario.ca/',
    pubDate: 'Live source',
    source: 'Infrastructure Ontario',
    category: 'Transit',
  },
  {
    title: 'Accenture — Digital twins and AI-driven project controls transforming capital delivery',
    link: 'https://www.accenture.com/',
    pubDate: 'Live source',
    source: 'Accenture',
    category: 'Digital Construction',
  },
];

const fallbackRepos: RepoCard[] = [
  {
    id: 1,
    name: 'construction-analytics',
    description: 'Data-driven construction performance analytics and earned value management dashboard.',
    html_url: 'https://github.com/iceccarelli',
    updated_at: new Date().toISOString(),
    language: 'Python',
    stargazers_count: 0,
  },
  {
    id: 2,
    name: 'project-controls-toolkit',
    description: 'Integrated project controls toolkit for schedule, cost, and risk management.',
    html_url: 'https://github.com/iceccarelli',
    updated_at: new Date().toISOString(),
    language: 'TypeScript',
    stargazers_count: 0,
  },
];

// ====================== UTILITIES ======================
function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone,
  }).format(new Date());
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

// ====================== 7 ORIGINAL CANVAS VISUALIZERS ======================

// 1. Structural Load Distribution — animated beam with force vectors
function StructuralLoadVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Beam
      const beamY = 45;
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(40, beamY);
      ctx.lineTo(canvas.width - 40, beamY);
      ctx.stroke();

      // Supports (triangles)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(52, 211, 153, 0.8)';
      [80, canvas.width - 80].forEach(sx => {
        ctx.beginPath();
        ctx.moveTo(sx, beamY + 2);
        ctx.lineTo(sx - 10, beamY + 18);
        ctx.lineTo(sx + 10, beamY + 18);
        ctx.closePath();
        ctx.fill();
      });

      // Force arrows
      const numForces = 6;
      for (let i = 0; i < numForces; i++) {
        const fx = 100 + (i / (numForces - 1)) * (canvas.width - 200);
        const magnitude = 12 + Math.sin(time * 0.04 + i * 1.2) * 8;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fx, beamY - magnitude - 10);
        ctx.lineTo(fx, beamY - 4);
        ctx.stroke();
        // Arrowhead
        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.beginPath();
        ctx.moveTo(fx, beamY - 2);
        ctx.lineTo(fx - 4, beamY - 8);
        ctx.lineTo(fx + 4, beamY - 8);
        ctx.closePath();
        ctx.fill();
      }

      // Deflection curve
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (let x = 80; x <= canvas.width - 80; x += 2) {
        const t = (x - 80) / (canvas.width - 160);
        const deflection = Math.sin(t * Math.PI) * (8 + Math.sin(time * 0.03) * 4);
        const y = beamY + 28 + deflection;
        if (x === 80) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Moment diagram
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 80; x <= canvas.width - 80; x += 2) {
        const t = (x - 80) / (canvas.width - 160);
        const moment = Math.sin(t * Math.PI) * 18 * (1 + Math.sin(time * 0.02) * 0.3);
        const y = beamY + 55 + moment;
        if (x === 80) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += 1.5;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Structural load distribution analysis" />;
}

// 2. Tunnel Boring Machine Progress — cross-section with rotating cutter
function TunnelBoringVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let angle = 0;
    let progress = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soil layers
      const layers = [
        { y: 0, h: 35, color: 'rgba(139, 92, 42, 0.15)' },
        { y: 35, h: 40, color: 'rgba(107, 114, 128, 0.12)' },
        { y: 75, h: 35, color: 'rgba(75, 85, 99, 0.18)' },
      ];
      layers.forEach(l => {
        ctx.fillStyle = l.color;
        ctx.fillRect(0, l.y, canvas.width, l.h);
      });

      // Tunnel bore
      const cx = 60 + (progress % (canvas.width - 120));
      const cy = canvas.height / 2;
      const radius = 28;

      // Excavated tunnel
      ctx.fillStyle = 'rgba(7, 17, 31, 0.9)';
      ctx.fillRect(0, cy - radius, cx, radius * 2);

      // Tunnel lining segments
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.3)';
      ctx.lineWidth = 1;
      for (let sx = 20; sx < cx; sx += 30) {
        ctx.beginPath();
        ctx.arc(sx, cy, radius - 2, -Math.PI * 0.8, Math.PI * 0.8);
        ctx.stroke();
      }

      // TBM cutter head
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f59e0b';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating cutter arms
      ctx.shadowBlur = 0;
      for (let i = 0; i < 6; i++) {
        const a = angle + (i / 6) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
        ctx.stroke();

        // Cutter disc
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center point
      ctx.fillStyle = '#7dd3fc';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Progress label
      ctx.fillStyle = 'rgba(125, 211, 252, 0.6)';
      ctx.font = '10px Inter, sans-serif';
      const pct = Math.round(((progress % (canvas.width - 120)) / (canvas.width - 120)) * 100);
      ctx.fillText(`${pct}% advance`, cx + radius + 8, cy + 4);

      angle += 0.04;
      progress += 0.8;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Tunnel boring machine progress simulation" />;
}

// 3. Transit Network Flow — animated trains on rail network
function TransitNetworkVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const stations = [
      { x: 0.08, y: 0.5 }, { x: 0.22, y: 0.3 }, { x: 0.38, y: 0.5 },
      { x: 0.52, y: 0.7 }, { x: 0.65, y: 0.4 }, { x: 0.78, y: 0.6 },
      { x: 0.92, y: 0.45 },
    ];

    const routes = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [2, 4], [1, 4],
    ];

    const trains = routes.map(() => ({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      forward: Math.random() > 0.5,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.06)';
      ctx.lineWidth = 0.5;
      for (let x = 20; x < canvas.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      const pos = stations.map(s => ({ x: s.x * canvas.width, y: s.y * (canvas.height - 20) + 10 }));

      // Routes
      routes.forEach(([a, b]) => {
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
        ctx.stroke();
      });

      // Stations
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      pos.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Trains
      ctx.shadowBlur = 0;
      trains.forEach((train, i) => {
        const [a, b] = routes[i];
        const start = pos[a];
        const end = pos[b];
        const p = train.forward ? train.progress : 1 - train.progress;
        const tx = start.x + (end.x - start.x) * p;
        const ty = start.y + (end.y - start.y) * p;

        ctx.fillStyle = '#34d399';
        ctx.fillRect(tx - 4, ty - 2, 8, 4);

        train.progress += train.speed;
        if (train.progress > 1) {
          train.progress = 0;
          train.forward = !train.forward;
        }
      });

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Transit network flow simulation" />;
}

// 4. Concrete Curing Strength Curve
function ConcreteCuringVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let scanX = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 25; x < canvas.width; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Target line (28-day strength)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(canvas.width, 18);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText("f'c = 35 MPa", canvas.width - 80, 14);

      // Curing curve (logarithmic)
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.beginPath();
      for (let x = 0; x <= Math.min(scanX, canvas.width); x += 2) {
        const t = x / canvas.width;
        const strength = 1 - Math.exp(-3.5 * t);
        const y = canvas.height - 10 - strength * (canvas.height - 28);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Scan line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, canvas.height);
      ctx.stroke();

      // Day markers
      ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
      ctx.font = '8px Inter, sans-serif';
      [3, 7, 14, 28].forEach(day => {
        const dx = (day / 28) * canvas.width;
        if (dx < scanX) {
          ctx.fillText(`${day}d`, dx - 6, canvas.height - 2);
        }
      });

      scanX += 1.2;
      if (scanX > canvas.width + 20) scanX = 0;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Concrete curing strength curve" />;
}

// 5. Soil Compaction Waveform
function SoilCompactionVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soil layers
      const numLayers = 5;
      for (let i = 0; i < numLayers; i++) {
        const layerY = (i / numLayers) * canvas.height;
        const layerH = canvas.height / numLayers;
        const density = 0.6 + (i / numLayers) * 0.35 + Math.sin(time * 0.03 + i) * 0.05;

        ctx.fillStyle = `rgba(139, 92, 42, ${0.08 + density * 0.15})`;
        ctx.fillRect(0, layerY, canvas.width, layerH);

        // Particle dots
        ctx.fillStyle = `rgba(125, 211, 252, ${density * 0.6})`;
        const particleCount = Math.floor(density * 40);
        for (let p = 0; p < particleCount; p++) {
          const px = (p / particleCount) * canvas.width + Math.sin(time * 0.02 + p + i) * 3;
          const py = layerY + layerH * 0.5 + Math.cos(time * 0.015 + p * 2) * (layerH * 0.3);
          ctx.fillRect(px, py, 2, 2);
        }

        // Density label
        ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(`${Math.round(density * 100)}%`, canvas.width - 35, layerY + layerH / 2 + 3);
      }

      // Compaction wave
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin((x + time * 3) * 0.04) * 15 * Math.exp(-((x - (time * 2) % canvas.width) ** 2) / 8000);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Soil compaction density waveform" />;
}

// 6. Project Schedule Gantt Flow
function GanttFlowVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const tasks = [
      { name: 'Design', start: 0.0, end: 0.25, color: '#7dd3fc' },
      { name: 'Procurement', start: 0.15, end: 0.45, color: '#38bdf8' },
      { name: 'Excavation', start: 0.3, end: 0.6, color: '#f59e0b' },
      { name: 'Structure', start: 0.5, end: 0.8, color: '#34d399' },
      { name: 'Systems', start: 0.65, end: 0.9, color: '#c084fc' },
      { name: 'Commission', start: 0.82, end: 1.0, color: '#fb7185' },
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barH = 12;
      const gap = 4;
      const startY = 8;
      const progressLine = (time * 0.002) % 1.2;

      tasks.forEach((task, i) => {
        const y = startY + i * (barH + gap);
        const x1 = task.start * canvas.width;
        const x2 = task.end * canvas.width;

        // Background bar
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(x1, y, x2 - x1, barH);

        // Progress fill
        const fillEnd = Math.min(progressLine, task.end);
        if (fillEnd > task.start) {
          ctx.fillStyle = task.color;
          ctx.globalAlpha = 0.6;
          ctx.fillRect(x1, y, (Math.min(fillEnd, task.end) - task.start) * canvas.width, barH);
          ctx.globalAlpha = 1;
        }

        // Border
        ctx.strokeStyle = task.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x1, y, x2 - x1, barH);

        // Label
        ctx.fillStyle = 'rgba(244, 248, 255, 0.5)';
        ctx.font = '8px Inter, sans-serif';
        ctx.fillText(task.name, x1 + 4, y + barH - 3);
      });

      // Progress cursor
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(progressLine * canvas.width, 0);
      ctx.lineTo(progressLine * canvas.width, canvas.height);
      ctx.stroke();

      // Critical path connections
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      for (let i = 0; i < tasks.length - 1; i++) {
        const y1 = startY + i * (barH + gap) + barH / 2;
        const y2 = startY + (i + 1) * (barH + gap) + barH / 2;
        const x = tasks[i].end * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(tasks[i + 1].start * canvas.width, y2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Project schedule Gantt flow" />;
}

// 7. Blueprint Grid Plotter — AutoCAD-style drawing
function BlueprintGridVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 110;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Blueprint grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 15) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 15) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Drawing elements — walls
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.7)';
      ctx.lineWidth = 2;
      const offset = Math.sin(time * 0.01) * 5;

      // Floor plan outline
      ctx.beginPath();
      ctx.rect(60 + offset, 15, canvas.width * 0.35, 80);
      ctx.stroke();

      // Interior walls
      ctx.beginPath();
      ctx.moveTo(60 + offset + canvas.width * 0.12, 15);
      ctx.lineTo(60 + offset + canvas.width * 0.12, 65);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(60 + offset, 55);
      ctx.lineTo(60 + offset + canvas.width * 0.25, 55);
      ctx.stroke();

      // Column grid
      ctx.fillStyle = 'rgba(52, 211, 153, 0.7)';
      const colSpacing = canvas.width * 0.35 / 3;
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c <= 3; c++) {
          const cx = 60 + offset + c * colSpacing;
          const cy = 15 + r * 80;
          ctx.fillRect(cx - 3, cy - 3, 6, 6);
        }
      }

      // Dimension lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(60 + offset, 100);
      ctx.lineTo(60 + offset + canvas.width * 0.35, 100);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.font = '8px Inter, sans-serif';
      ctx.fillText('12.5m', 60 + offset + canvas.width * 0.15, 108);

      // Cursor crosshair
      const cursorX = canvas.width * 0.6 + Math.sin(time * 0.02) * 80;
      const cursorY = 55 + Math.cos(time * 0.015) * 30;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cursorX - 12, cursorY);
      ctx.lineTo(cursorX + 12, cursorY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cursorX, cursorY - 12);
      ctx.lineTo(cursorX, cursorY + 12);
      ctx.stroke();

      // Coordinate readout
      ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
      ctx.font = '9px Inter, monospace';
      ctx.fillText(`X:${Math.round(cursorX)} Y:${Math.round(cursorY)}`, cursorX + 14, cursorY - 4);

      // Second structure (right side)
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.4)';
      ctx.lineWidth = 1.5;
      const rx = canvas.width * 0.62;
      ctx.beginPath();
      ctx.arc(rx + 40, 50, 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx + 15, 50);
      ctx.lineTo(rx + 65, 50);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rx + 40, 25);
      ctx.lineTo(rx + 40, 75);
      ctx.stroke();

      time += 1;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, []);

  return <canvas ref={canvasRef} className="system-waveform" aria-label="Blueprint grid plotter" />;
}

// ====================== VISUALIZER ROTATOR ======================
const visualizers = [
  { component: StructuralLoadVisualizer, label: 'Structural Load Distribution' },
  { component: TunnelBoringVisualizer, label: 'Tunnel Boring Machine Progress' },
  { component: TransitNetworkVisualizer, label: 'Transit Network Flow' },
  { component: ConcreteCuringVisualizer, label: 'Concrete Curing Strength Curve' },
  { component: SoilCompactionVisualizer, label: 'Soil Compaction Waveform' },
  { component: GanttFlowVisualizer, label: 'Project Schedule Gantt Flow' },
  { component: BlueprintGridVisualizer, label: 'Blueprint Grid Plotter' },
];

function VisualizerRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx(prev => (prev + 1) % visualizers.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const Current = visualizers[idx].component;

  return (
    <div>
      <Current />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <small style={{ color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {visualizers[idx].label}
        </small>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {visualizers.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Visualizer ${i + 1}`}
              style={{
                width: i === idx ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                background: i === idx ? 'var(--accent)' : 'rgba(125, 211, 252, 0.2)',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ====================== MAIN PAGE ======================
export default function Home() {
  const [clocks, setClocks] = useState<ClockEntry[]>([]);
  const [repos, setRepos] = useState<RepoCard[]>(fallbackRepos);
  const [headlines, setHeadlines] = useState<Headline[]>(fallbackHeadlines);
  const [tvLoaded, setTvLoaded] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  // Clock tick
  useEffect(() => {
    const tick = () =>
      setClocks(clockZones.map(z => ({ ...z, time: formatTime(z.timeZone) })));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/iceccarelli/repos?sort=updated&per_page=6')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: RepoCard[]) => { if (data.length) setRepos(data); })
      .catch(() => {});
  }, []);

  // RSS headlines
  useEffect(() => {
    const feeds = [
      'https://www.enr.com/rss',
      'https://www.constructiondive.com/feeds/news/',
    ];
    const proxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
    Promise.allSettled(
      feeds.map(url =>
        fetch(`${proxy}${encodeURIComponent(url)}`)
          .then(r => r.json())
          .then(d =>
            (d.items || []).slice(0, 3).map((item: { title: string; link: string; pubDate: string }) => ({
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              source: d.feed?.title || 'Industry Source',
              category: 'Construction',
            }))
          )
      )
    ).then(results => {
      const all = results
        .filter((r): r is PromiseFulfilledResult<Headline[]> => r.status === 'fulfilled')
        .flatMap(r => r.value);
      if (all.length) setHeadlines(all.slice(0, 6));
    });
  }, []);

  // TradingView widgets
  useEffect(() => {
    if (tvLoaded) return;
    const loadTV = () => {
      // Ticker tape
      if (tickerRef.current && !tickerRef.current.hasChildNodes()) {
        const s = document.createElement('script');
        s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        s.async = true;
        s.innerHTML = JSON.stringify({
          symbols: [
            { proName: 'NYSE:ACN', title: 'Accenture' },
            { proName: 'NYSE:CAT', title: 'Caterpillar' },
            { proName: 'TSX:SNC', title: 'SNC-Lavalin' },
            { proName: 'NYSE:X', title: 'US Steel' },
            { proName: 'NYSE:VMC', title: 'Vulcan Materials' },
            { proName: 'TSX:ARE', title: 'Aecon Group' },
          ],
          showSymbolLogo: true,
          isTransparent: true,
          displayMode: 'adaptive',
          colorTheme: 'dark',
          locale: 'en',
        });
        tickerRef.current.appendChild(s);
      }

      // Market overview
      if (overviewRef.current && !overviewRef.current.hasChildNodes()) {
        const s = document.createElement('script');
        s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        s.async = true;
        s.innerHTML = JSON.stringify({
          colorTheme: 'dark',
          dateRange: '1M',
          showChart: true,
          locale: 'en',
          isTransparent: true,
          showSymbolLogo: true,
          showFloatingTooltip: false,
          width: '100%',
          height: '360',
          tabs: [
            {
              title: 'Infrastructure & E&C',
              symbols: [
                { s: 'NYSE:ACN', d: 'Accenture' },
                { s: 'NYSE:CAT', d: 'Caterpillar' },
                { s: 'NYSE:VMC', d: 'Vulcan Materials' },
                { s: 'TSX:ARE', d: 'Aecon Group' },
                { s: 'NYSE:J', d: 'Jacobs Solutions' },
              ],
            },
            {
              title: 'Materials & Commodities',
              symbols: [
                { s: 'NYSE:X', d: 'US Steel' },
                { s: 'NYSE:NUE', d: 'Nucor' },
                { s: 'COMEX:HG1!', d: 'Copper Futures' },
                { s: 'NYMEX:CL1!', d: 'Crude Oil' },
              ],
            },
          ],
        });
        overviewRef.current.appendChild(s);
      }
      setTvLoaded(true);
    };
    loadTV();
  }, [tvLoaded]);

  return (
    <main>
      {/* ==================== HERO ==================== */}
      <section id="hero" className="section-shell hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="section-kicker">Director of Operations — Accenture I&amp;CP</span>
            <h1>
              <span className="gradient-text">Building the Infrastructure That Moves Cities Forward</span>
            </h1>
            <p>
              I am Carlo Ceccarelli, P.Eng. — a Professional Engineer and Director of Operations at Accenture
              Infrastructure &amp; Capital Projects. With over thirteen years of experience in construction management,
              structural engineering, and mega-project delivery, I lead the teams and systems that transform
              billion-dollar infrastructure visions into operational reality. From the Ontario Line to award-winning
              tunneling programs, my work is defined by disciplined execution, safety-first culture, and an unwavering
              commitment to building infrastructure that endures.
            </p>
            <div className="hero-actions">
              <a href="#flagship" className="primary-button">View Flagship Projects</a>
              <a href="#experience" className="secondary-button">Professional Experience</a>
              <a href="#connect" className="secondary-button">Connect With Me</a>
            </div>
            <VisualizerRotator />
          </div>
          <div className="hero-portrait-shell">
            <img
              src="/portrait.jpg"
              alt="Carlo Ceccarelli, P.Eng. — Director of Operations"
              className="hero-portrait"
              width={600}
              height={750}
            />
          </div>
        </div>
      </section>

      {/* ==================== GLOBAL ORIENTATION ==================== */}
      <section className="section-shell">
        <div className="glass-panel signal-ribbon">
          <span className="panel-topline">
            <span className="live-dot" />
            Global Orientation — Live Operational Clocks
          </span>
          <div className="clock-marquee">
            <div className="clock-marquee-track">
              {[...clocks, ...clocks].map((c, i) => (
                <div key={`${c.city}-${i}`} className="signal-chip">
                  <span className="chip-city">{c.city}</span>
                  <strong>{c.time}</strong>
                  <small>{c.label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT THE WORK ==================== */}
      <section id="about" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Core Competencies</span>
          <h2 className="gradient-text">About the Work</h2>
          <p className="section-intro">
            Every project I lead is grounded in engineering rigor, operational discipline, and a relentless focus on
            delivering measurable outcomes. These are the pillars of my professional practice.
          </p>
        </div>
        <div className="card-grid feature-stack">
          {strengths.map(s => (
            <div key={s.title} className="glass-panel feature-card">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ARCHITECTURE OF VALUE CREATION ==================== */}
      <section id="systems" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Operational Framework</span>
          <h2 className="gradient-text">Architecture of Value Creation</h2>
          <p className="section-intro">
            Infrastructure delivery is a layered discipline. Each layer of my operational architecture compounds value —
            from strategic advisory through engineering design to on-the-ground construction execution.
          </p>
        </div>
        <div className="card-grid four-up">
          {architectureLayers.map(layer => (
            <div key={layer.title} className="glass-panel glow-card">
              <span className="card-topline">
                <span className="live-dot muted" />
                {layer.project}
              </span>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FLAGSHIP INITIATIVES ==================== */}
      <section id="flagship" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Signature Achievements</span>
          <h2 className="gradient-text">Flagship Initiatives</h2>
          <p className="section-intro">
            These are the programs and milestones that define my career — each one a testament to what disciplined
            engineering leadership can achieve at scale.
          </p>
        </div>
        <div className="card-grid two-up">
          {flagshipInitiatives.map(f => (
            <a
              key={f.title}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel immersive-card"
            >
              <h3>{f.title}</h3>
              <p>{f.summary}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ==================== LIVE INTELLIGENCE HUB ==================== */}
      <section id="live-intelligence" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Real-Time Market Signals</span>
          <h2 className="gradient-text">Live Intelligence Hub</h2>
          <p className="section-intro">
            Infrastructure is shaped by commodity prices, policy decisions, and global capital flows. I monitor these
            signals continuously to inform strategic project decisions.
          </p>
        </div>

        {/* Ticker Tape */}
        <div className="glass-panel tradingview-widget-shell">
          <span className="panel-topline">
            <span className="live-dot" />
            Infrastructure &amp; Construction Markets — Live
          </span>
          <div ref={tickerRef} className="tradingview-widget-container" />
        </div>

        {/* Market Overview */}
        <div className="glass-panel market-overview-shell" style={{ marginBottom: '1.25rem' }}>
          <span className="panel-topline">
            <span className="live-dot" />
            Market Overview — E&amp;C Sector
          </span>
          <div ref={overviewRef} className="market-widget" />
        </div>

        {/* Market Themes */}
        <div className="card-grid three-up" style={{ marginBottom: '1.25rem' }}>
          {marketThemes.map(t => (
            <div key={t.title} className="glass-panel glow-card">
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>

        {/* Headlines & Repos */}
        <div className="insight-grid">
          <div className="glass-panel data-column">
            <h3>Industry Headlines</h3>
            <div className="data-list">
              {headlines.map((h, i) => (
                <a
                  key={i}
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="data-list-item"
                >
                  <strong>{h.title}</strong>
                  <small>
                    {h.source} · {h.category} · {formatDate(h.pubDate)}
                  </small>
                </a>
              ))}
            </div>
          </div>
          <div className="glass-panel data-column">
            <h3>GitHub Repositories</h3>
            <div className="data-list">
              {repos.slice(0, 4).map(r => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="data-list-item"
                >
                  <strong>{r.name}</strong>
                  <small>
                    {r.language || 'Multi'} · Updated {formatDate(r.updated_at)}
                  </small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUANTIFIED IMPACT DASHBOARD ==================== */}
      <section id="impact" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Measured Outcomes</span>
          <h2 className="gradient-text">Quantified Impact Dashboard</h2>
        </div>
        <div className="impact-dashboard">
          {[
            { metric: '13+', label: 'Years of Engineering & Construction Leadership' },
            { metric: '$19B+', label: 'Aggregate Project Value Under Management' },
            { metric: '15.6 km', label: 'Ontario Line Subway Corridor' },
            { metric: '100%', label: 'Safety-First Delivery Track Record' },
          ].map(m => (
            <div key={m.label} className="impact-card">
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success)', marginBottom: '0.5rem' }}>
                {m.metric}
              </div>
              <div style={{ color: 'var(--muted-strong)', fontSize: '0.95rem' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PROFESSIONAL EXPERIENCE ==================== */}
      <section id="experience" className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Career Trajectory</span>
          <h2 className="gradient-text">Professional Experience</h2>
        </div>
        <div className="card-grid" style={{ gap: '1.25rem' }}>
          {[
            {
              role: 'Director of Operations',
              org: 'Accenture — Infrastructure & Capital Projects',
              period: 'Current',
              desc: 'Leading end-to-end construction management operations for major Canadian infrastructure programs including the Ontario Line. Directing multi-disciplinary teams across design coordination, procurement, construction execution, and commissioning. Building and scaling Accenture\'s construction management practice with a safety-first, digitally-enabled approach.',
            },
            {
              role: 'Senior Construction Manager',
              org: 'Major Transit & Infrastructure Programs',
              period: 'Previous',
              desc: 'Managed complex tunneling, station construction, and rail systems installation projects. Delivered award-winning programs on time and on budget. Coordinated structural engineering, geotechnical design, and systems integration across multi-billion-dollar transit corridors.',
            },
            {
              role: 'Structural & Rail Engineer',
              org: 'Engineering & Construction Firms',
              period: 'Foundation',
              desc: 'Built the technical foundation in structural analysis, rail alignment design, and infrastructure engineering. Developed expertise in load analysis, reinforced concrete design, steel connections, and rail systems that continues to inform every project decision.',
            },
          ].map(exp => (
            <div key={exp.role} className="glass-panel glow-card">
              <span className="card-topline">
                <span className="live-dot muted" />
                {exp.period}
              </span>
              <h3>{exp.role}</h3>
              <p style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                {exp.org}
              </p>
              <p>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== STANDARDS & CERTIFICATIONS ==================== */}
      <section className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Professional Standards</span>
          <h2 className="gradient-text">Standards &amp; Certifications</h2>
        </div>
        <div className="standards-grid">
          {[
            'P.Eng. — Professional Engineers Ontario',
            'University of Toronto — Engineering',
            'Construction Management',
            'Structural Engineering',
            'Rail & Transit Systems',
            'Project Delivery & Controls',
            'Safety Management Systems',
            'Tunneling & Underground Works',
          ].map(s => (
            <div key={s} className="standards-card">{s}</div>
          ))}
        </div>
      </section>

      {/* ==================== TRUSTED ECOSYSTEM ==================== */}
      <section className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Intelligence Network</span>
          <h2 className="gradient-text">Trusted Ecosystem</h2>
          <p className="section-intro">
            The organizations and institutions that inform my professional perspective and shape the standards I uphold.
          </p>
        </div>
        <div className="card-grid three-up">
          {trustedSources.map(s => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel source-card"
            >
              <h3>{s.title}</h3>
              <p>{s.focus}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ==================== RESEARCH / THOUGHT LEADERSHIP ==================== */}
      <section className="section-shell content-section">
        <div className="section-header centered-header">
          <span className="section-kicker">Industry Perspective</span>
          <h2 className="gradient-text">Thought Leadership</h2>
        </div>
        <div className="glass-panel hero-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>On the Future of Infrastructure Delivery</h3>
          <p>
            The infrastructure industry stands at an inflection point. As cities grow and aging systems demand
            replacement, the convergence of digital project controls, advanced tunneling technology, and integrated
            delivery models is redefining what is possible. My work at the intersection of engineering execution and
            strategic consulting positions me to drive this transformation — embedding data-driven decision-making,
            safety intelligence, and operational excellence into every phase of the project lifecycle.
          </p>
          <p style={{ marginTop: '1rem' }}>
            The Ontario Line is not merely a transit project — it is a proving ground for the next generation of
            infrastructure delivery. By integrating construction management with digital twins, real-time project
            controls, and cross-functional team alignment, we are establishing a new standard for how mega-projects
            are conceived, executed, and delivered to the communities they serve.
          </p>
          <div className="metric-pills">
            <span className="metric-pill">#ConstructionManagement</span>
            <span className="metric-pill">#Infrastructure</span>
            <span className="metric-pill">#OntarioLine</span>
            <span className="metric-pill">#DigitalConstruction</span>
            <span className="metric-pill">#ProjectDelivery</span>
          </div>
        </div>
      </section>

      {/* ==================== CONNECT ==================== */}
      <section id="connect" className="section-shell content-section">
        <div className="glass-panel cta-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <span className="section-kicker">Open to Strategic Conversations</span>
          <h2 className="gradient-text">Let&apos;s Build Something That Endures</h2>
          <p style={{ maxWidth: '42rem', margin: '0 auto' }}>
            Whether you are leading a mega-infrastructure program, exploring construction management partnerships,
            or seeking engineering leadership for complex capital projects — I welcome the conversation. The best
            infrastructure is built on strong professional relationships.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <a href="mailto:carlo.ceccarelli@outlook.com" className="primary-button">
              Email Me Directly
            </a>
            <a
              href="https://www.linkedin.com/in/carlo-ceccarelli-p-eng-44551b7b/"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/iceccarelli"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
