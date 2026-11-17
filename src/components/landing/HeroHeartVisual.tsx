'use client';

import React from 'react';

interface HeroHeartVisualProps {
  className?: string;
  imageSrc?: string;
}

export function HeroHeartVisual({
  className = '',
  imageSrc = '/images/mother-child-art.jpg',
}: HeroHeartVisualProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient Radial Lighting Behind Heart */}
      <div 
        className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-[#3e6b2b]/30 via-[#F2B632]/20 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 700 630"
        className="w-full h-auto max-w-[480px] lg:max-w-[530px] select-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.01]"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Caregiver supporting elderly loved one framed inside a heart"
      >
        <defs>
          {/* Main Heart Clip Path */}
          <clipPath id="heroHeartClip">
            <path
              d="M 330,110 
                 C 285,35 175,20 90,95 
                 C 5,170 10,275 95,375 
                 C 165,455 265,530 330,580 
                 C 395,530 495,455 565,375 
                 C 650,275 655,170 570,95 
                 C 485,20 375,35 330,110 Z"
            />
          </clipPath>

          {/* Golden Butter Gradient for Stroke */}
          <linearGradient id="heartGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6C2" />
            <stop offset="45%" stopColor="#FDF1A9" />
            <stop offset="100%" stopColor="#F9DC72" />
          </linearGradient>

          {/* Reusable Small Heart Template for Flourish */}
          <g id="miniHeartDef">
            <path
              d="M 0,-15 
                 C -10,-30 -30,-30 -30,-10 
                 C -30,10 0,30 0,30 
                 C 0,30 30,10 30,-10 
                 C 30,-30 10,-30 0,-15 Z"
              fill="url(#heartGoldGrad)"
            />
          </g>
        </defs>

        {/* 1. Independent Inner Image fitted cleanly into heart clip */}
        <g clipPath="url(#heroHeartClip)">
          <image
            href={imageSrc}
            x="-30"
            y="15"
            width="720"
            height="580"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        {/* 2. Main Heart Outline Stroke (Warm Butter Gold Gradient) */}
        <path
          d="M 330,110 
             C 285,35 175,20 90,95 
             C 5,170 10,275 95,375 
             C 165,455 265,530 330,580 
             C 395,530 495,455 565,375 
             C 650,275 655,170 570,95 
             C 485,20 375,35 330,110 Z"
          fill="none"
          stroke="url(#heartGoldGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Decorative Flourish Arc along lower right perimeter */}
        <path
          d="M 430,510 
             C 510,480 580,410 610,320 
             C 625,275 635,220 635,180"
          fill="none"
          stroke="url(#heartGoldGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 4. Four Accent Hearts trailing up the right side */}
        {/* Heart 1: Largest, near bottom right curve */}
        <use href="#miniHeartDef" transform="translate(470, 480) scale(1.1) rotate(-15)" />

        {/* Heart 2: Medium-large */}
        <use href="#miniHeartDef" transform="translate(550, 415) scale(0.95) rotate(15)" />

        {/* Heart 3: Medium */}
        <use href="#miniHeartDef" transform="translate(605, 325) scale(0.8) rotate(25)" />

        {/* Heart 4: Smallest accent heart */}
        <use href="#miniHeartDef" transform="translate(628, 220) scale(0.65) rotate(35)" />
      </svg>
    </div>
  );
}
