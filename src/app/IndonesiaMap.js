'use client';

import { motion } from 'framer-motion';
import {
  INDONESIA_PATH,
  MAP_VIEWBOX,
  SUMBAWA_BESAR,
  DESTINATIONS,
} from './indonesiaMapData';

// Membuat garis lengkung dari Sumbawa Besar ke kota tujuan.
// "Q" = quadratic curve: titik kontrol diangkat ke atas supaya garisnya melengkung.
function buildArc(from, to) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const controlY = midY - dist * 0.3; // makin jauh, makin melengkung
  return `M ${from.x} ${from.y} Q ${midX} ${controlY} ${to.x} ${to.y}`;
}

export default function IndonesiaMap() {
  const hub = SUMBAWA_BESAR;

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      className="w-full h-full filter drop-shadow-[0_0_10px_rgba(217,26,42,0.35)]"
      role="img"
      aria-label="Peta Indonesia dengan pusat operasional di Sumbawa Besar"
    >
      {/* 1. Bentuk pulau-pulau Indonesia */}
      <path
        d={INDONESIA_PATH}
        fill="rgba(255,255,255,0.07)"
        stroke="#D91A2A"
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 2. Garis lengkung dari Sumbawa Besar (animasi menggambar garis) */}
      {DESTINATIONS.map((dest, i) => (
        <motion.path
          key={dest.name}
          d={buildArc(hub, dest)}
          fill="none"
          stroke="#D91A2A"
          strokeWidth="1.3"
          strokeOpacity="0.75"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
        />
      ))}

      {/* 3. Titik-titik kota tujuan */}
      {DESTINATIONS.map((dest) => (
        <circle
          key={dest.name}
          cx={dest.x}
          cy={dest.y}
          r="3.5"
          fill="#FFFFFF"
          className="drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
        />
      ))}

      {/* 4. Titik utama: SUMBAWA BESAR */}
      <g transform={`translate(${hub.x}, ${hub.y})`}>
        <circle
          r="22"
          fill="#D91A2A"
          className="animate-ping opacity-40 origin-center [transform-box:fill-box]"
        />
        <circle r="11" fill="#D91A2A" opacity="0.6" />
        <circle r="5.5" fill="#FFFFFF" />
        <text
          y="38"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="19"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          {hub.name}
        </text>
      </g>
    </svg>
  );
}
