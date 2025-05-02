export const urologyTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" font-family="Arial, sans-serif">
  <defs>
    <style>
      .journal-title { font-family: serif; font-size: 24px; font-weight: bold; fill: #FFFFFF; }
      .header-question { font-size: 18px; font-weight: bold; fill: #FFFFFF; }
      .section-title { font-size: 16px; font-weight: bold; fill: #ffffff; text-anchor: middle; }
      .subsection-title { font-size: 14px; font-weight: bold; fill: #000000; text-anchor: middle; }
      .body-text { font-size: 14px; fill: #000000; }
      .body-text-light { font-size: 14px; fill: #ffffff; }
      .small-text { font-size: 12px; fill: #424242; }
      .value-text { font-size: 14px; font-weight: bold; fill: #000000; text-anchor: middle;}
      .hr-text { font-size: 14px; font-weight: bold; fill: #000000; text-anchor: middle; }
      .p-value-text { font-size: 12px; fill: #424242; text-anchor: middle; }
      .conclusion-text { font-size: 14px; fill: #ffffff; }

      /* New vibrant colors */
      .bg-header { fill: #2C3E50; }
      .bg-section-primary { fill: #3498DB; }
      .bg-caucasian { fill: #9B59B6; }
      .bg-hispanic { fill: #2ECC71; }
      .bg-african-american { fill: #F1C40F; }
      .bg-exposure { fill: #ECF0F1; }
      .bg-conclusion { fill: #16A085; }

      .chart-axis { stroke: #34495E; stroke-width: 1; }
      .chart-label { font-size: 10px; fill: #34495E; text-anchor: middle; }
      .chart-bar-caucasian { fill: #9B59B6; }
      .chart-bar-hispanic { fill: #2ECC71; }
      .chart-bar-african-american { fill: #F1C40F; }

      /* Gradient definitions */
      .section-gradient { fill: url(#section-gradient); }
      .exposure-gradient { fill: url(#exposure-gradient); }
      .conclusion-gradient { fill: url(#conclusion-gradient); }
    </style>

    <!-- Gradients -->
    <linearGradient id="section-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3498DB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980B9;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="exposure-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ECF0F1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#BDC3C7;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="conclusion-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16A085;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1ABC9C;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2C3E50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34495E;stop-opacity:1" />
    </linearGradient>

    <!-- Define radial gradients for ethnic group boxes -->
    <radialGradient id="caucasian-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#9B59B6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8E44AD;stop-opacity:1" />
    </radialGradient>

    <radialGradient id="hispanic-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#2ECC71;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#27AE60;stop-opacity:1" />
    </radialGradient>

    <radialGradient id="african-american-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#F1C40F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F39C12;stop-opacity:1" />
    </radialGradient>

    <symbol id="icon-people" viewBox="0 0 40 24">
        <circle cx="7" cy="7" r="4" fill="#ffffff"/>
        <path d="M 7 11 c -2.67 0 -8 1.34 -8 4 v 2 h 10 v -2 c 0 -2.66 -3 -4 -5 -4 z" transform="translate(2.5, -1)" fill="#ffffff"/>
        <circle cx="18" cy="7" r="4" fill="#ffffff"/>
        <path d="M 18 11 c -2.67 0 -8 1.34 -8 4 v 2 h 10 v -2 c 0 -2.66 -3 -4 -5 -4 z" transform="translate(7.5, -1)" fill="#ffffff"/>
        <circle cx="29" cy="7" r="4" fill="#ffffff" opacity="0.7"/>
        <path d="M 29 11 c -2.67 0 -8 1.34 -8 4 v 2 h 10 v -2 c 0 -2.66 -3 -4 -5 -4 z" transform="translate(12.5, -1)" fill="#ffffff" opacity="0.7"/>
    </symbol>
    <symbol id="icon-prostate" viewBox="0 0 24 24">
        <path d="M12,2C7.58,2,4,5.58,4,10c0,2.85,1.5,5.36,3.76,6.82C6.88,18.08,6,19.82,6,21.75V22h12v-0.25 c0,-1.93-0.88,-3.67-2.76,-4.93C17.5,15.36,19,12.85,19,10C19,5.58,15.42,2,12,2z M12,14c-2.21,0-4-1.79-4-4s1.79-4,4-4 s4,1.79,4,4S14.21,14,12,14z" fill="#ffffff"/>
    </symbol>
    <symbol id="icon-bladder" viewBox="0 0 24 24">
        <path d="M12,2C8.13,2,5,5.13,5,9c0,3.16,1.87,5.88,4.45,7.15L9,22h6l-0.45-5.85C17.13,14.88,19,12.16,19,9 C19,5.13,15.87,2,12,2z M12,14c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,14,12,14z" fill="#ffffff"/>
    </symbol>
    <symbol id="icon-bottle" viewBox="0 0 24 24">
        <path d="M16 4h-6v2h6V4zm-8 14h10v-2H8v2zm8-12H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H8V8h8v8z" fill="#2C3E50"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke="#2C3E50" stroke-width="2"/>
        <line x1="10" y1="14" x2="14" y2="10" stroke="#2C3E50" stroke-width="2"/>
    </symbol>
  </defs>

  <!-- Background with subtle pattern -->
  <rect x="0" y="0" width="800" height="550" fill="#FFFFFF"/>
  
  <!-- Add subtle pattern -->
  <pattern id="subtle-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
    <rect width="20" height="20" fill="#FFFFFF"/>
    <circle cx="10" cy="10" r="1" fill="#EEEEEE"/>
  </pattern>
  <rect x="0" y="0" width="800" height="550" fill="url(#subtle-pattern)"/>

  <!-- Header -->
  <g id="header">
    <rect x="0" y="0" width="800" height="70" fill="url(#header-gradient)"/>
    <text x="20" y="30" class="journal-title" font-style="italic">THE JOURNAL</text>
    <text x="20" y="55" class="journal-title">UROLOGY</text>
    <text x="250" y="40" class="header-question">Does finasteride's chemoprotective effect against bladder</text>
    <text x="250" y="60" class="header-question">cancer vary by race/ethnicity?</text>
  </g>

  <!-- Main Content -->
  <g id="main-content" transform="translate(20, 90)">
    <!-- Methods and Cohort Section -->
    <g id="methods-cohort">
      <rect x="0" y="0" width="240" height="350" fill="url(#section-gradient)" rx="5" ry="5"/>
      <text x="120" y="25" class="section-title">Methods and Cohort</text>
      <use xlink:href="#icon-people" x="190" y="40" width="40" height="25"/>
      <use xlink:href="#icon-prostate" x="190" y="155" width="30" height="30"/>
      <use xlink:href="#icon-bladder" x="190" y="255" width="30" height="30"/>

      <text x="15" y="60" class="body-text-light">
        <tspan x="15" dy="0em">Single-center,</tspan>
        <tspan x="15" dy="1.2em">retrospective cohort</tspan>
        <tspan x="15" dy="1.2em">of 42,406 men with BPH</tspan>
      </text>
      <text x="15" y="150" class="body-text-light">
        Mean age: 67±12.9 yrs.
      </text>
      <text x="15" y="220" class="body-text-light">
        <tspan x="15" dy="0em">27.7% Caucasian</tspan>
        <tspan x="15" dy="1.2em">27.7% African American</tspan>
        <tspan x="15" dy="1.2em">14.8% Hispanic</tspan>
      </text>
    </g>

    <!-- Exposure Section -->
    <g id="exposure" transform="translate(260, 0)">
      <rect x="0" y="0" width="150" height="350" fill="url(#exposure-gradient)" rx="5" ry="5"/>
      <text x="75" y="25" class="subsection-title">Exposure</text>
      <rect x="30" y="45" width="90" height="90" fill="#FFFFFF" rx="5" ry="5" stroke="#BDC3C7" stroke-width="2"/>
      <use xlink:href="#icon-bottle" x="55" y="70" width="40" height="40"/>

      <text x="75" y="170" class="body-text" text-anchor="middle">
        Finasteride used
      </text>
      <text x="75" y="190" class="body-text" text-anchor="middle">
        by: 5,698 men
      </text>

      <text x="75" y="270" class="body-text" text-anchor="middle">
        <tspan x="75" dy="0em">Median</tspan>
        <tspan x="75" dy="1.2em">follow-up:</tspan>
        <tspan x="75" dy="1.2em" font-weight="bold">64.4 months</tspan>
      </text>
    </g>

    <!-- Bladder Cancer Risk Section -->
    <g id="bca-risk" transform="translate(430, 0)">
      <rect x="0" y="0" width="330" height="350" fill="none"/>
      <text x="165" y="25" class="subsection-title">Bladder Cancer (BCa) Risk</text>

      <!-- Race/Ethnicity Risk Boxes with shadows -->
      <g id="risk-boxes">
        <!-- Shadow effects for boxes -->
        <rect x="3" y="48" width="100" height="80" rx="5" ry="5" fill="#000000" opacity="0.1"/>
        <rect x="118" y="48" width="100" height="80" rx="5" ry="5" fill="#000000" opacity="0.1"/>
        <rect x="233" y="48" width="100" height="80" rx="5" ry="5" fill="#000000" opacity="0.1"/>
        
        <!-- Caucasian -->
        <g id="caucasian-risk" transform="translate(0, 45)">
          <rect x="0" y="0" width="100" height="80" fill="url(#caucasian-gradient)" rx="5" ry="5"/>
          <text x="50" y="18" class="subsection-title" fill="#FFFFFF">Caucasian</text>
          <text x="50" y="45" class="hr-text" fill="#FFFFFF">HR: 0.61</text>
          <text x="50" y="65" class="p-value-text" fill="#FFFFFF">p = 0.005</text>
        </g>
        
        <!-- Hispanic -->
        <g id="hispanic-risk" transform="translate(115, 45)">
          <rect x="0" y="0" width="100" height="80" fill="url(#hispanic-gradient)" rx="5" ry="5"/>
          <text x="50" y="18" class="subsection-title" fill="#FFFFFF">Hispanic</text>
          <text x="50" y="45" class="hr-text" fill="#FFFFFF">HR: 0.44</text>
          <text x="50" y="65" class="p-value-text" fill="#FFFFFF">p = 0.026</text>
        </g>
        
        <!-- African-American -->
        <g id="african-american-risk" transform="translate(230, 45)">
          <rect x="0" y="0" width="100" height="80" fill="url(#african-american-gradient)" rx="5" ry="5"/>
          <text x="50" y="18" class="subsection-title" fill="#000000">African-</text>
          <text x="50" y="32" class="subsection-title" fill="#000000">American</text>
          <text x="50" y="52" class="hr-text" fill="#000000">HR: 1.01</text>
          <text x="50" y="72" class="p-value-text" fill="#000000">p = 0.964</text>
        </g>
      </g>

      <!-- Chart background with subtle grid -->
      <rect x="15" y="160" width="300" height="150" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="1" rx="3" ry="3"/>
      
      <!-- Subtle grid lines -->
      <line x1="15" y1="197.5" x2="315" y2="197.5" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="15" y1="235" x2="315" y2="235" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="15" y1="272.5" x2="315" y2="272.5" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="2,2"/>

      <!-- BCa Chart -->
      <g id="bca-chart" transform="translate(15, 160)">
        <line x1="0" y1="0" x2="0" y2="150" class="chart-axis" stroke-width="2"/>
        <line x1="0" y1="150" x2="300" y2="150" class="chart-axis" stroke-width="2"/>

        <!-- Y-axis labels -->
        <text x="-15" y="150" class="chart-label">0</text>
        <text x="-15" y="112.5" class="chart-label">1</text>
        <text x="-15" y="75" class="chart-label">2</text>
        <text x="-15" y="37.5" class="chart-label">3</text>
        <text x="-15" y="0" class="chart-label">4</text>
        <text x="-30" y="75" class="chart-label" transform="rotate(-90, -30, 75)">BCa Cases (%)</text>

        <!-- Caucasian bars -->
        <rect x="20" y="24" width="30" height="126" class="chart-bar-caucasian" rx="2" ry="2"/>
        <rect x="55" y="79" width="30" height="71" class="chart-bar-caucasian" rx="2" ry="2"/>
        <text x="35" y="165" class="chart-label">-</text>
        <text x="70" y="165" class="chart-label">+</text>

        <!-- Hispanic bars -->
        <rect x="105" y="97.5" width="30" height="52.5" class="chart-bar-hispanic" rx="2" ry="2"/>
        <rect x="140" y="127.5" width="30" height="22.5" class="chart-bar-hispanic" rx="2" ry="2"/>
        <text x="120" y="165" class="chart-label">-</text>
        <text x="155" y="165" class="chart-label">+</text>

        <!-- African-American bars -->
        <rect x="190" y="93.75" width="30" height="56.25" class="chart-bar-african-american" rx="2" ry="2"/>
        <rect x="225" y="93.75" width="30" height="56.25" class="chart-bar-african-american" rx="2" ry="2"/>
        <text x="205" y="165" class="chart-label">-</text>
        <text x="240" y="165" class="chart-label">+</text>

        <!-- X-axis label -->
        <text x="135" y="185" class="chart-label" font-size="12">Finasteride use</text>
      </g>
    </g>
  </g>

  <!-- Conclusions Section -->
  <g id="conclusions" transform="translate(20, 460)">
    <rect x="0" y="0" width="760" height="70" fill="url(#conclusion-gradient)" rx="5" ry="5"/>
    <rect x="3" y="3" width="754" height="70" fill="url(#conclusion-gradient)" rx="5" ry="5" opacity="0.2"/>
    <text x="15" y="30" class="conclusion-text">
      <tspan font-weight="bold">Conclusions:</tspan> Finasteride was associated with reduced incidence of
    </text>
    <text x="15" y="50" class="conclusion-text">
      bladder cancer in Hispanic and Caucasian men, but not in African American men.
    </text>
  </g>
</svg>`;