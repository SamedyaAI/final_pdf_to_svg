export const medicalTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 1000 750" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif" font-size="12px">
  <defs>
    <!-- Enhanced header gradient with more modern blue tones -->
    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A237E;" /> 
      <stop offset="100%" style="stop-color:#3949AB;" />
    </linearGradient>
    
    <!-- Summary bar gradient -->
    <linearGradient id="summaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F57C00;" />
      <stop offset="100%" style="stop-color:#FFB74D;" />
    </linearGradient>
    
    <!-- Icon gradients -->
    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D32F2F;" />
      <stop offset="100%" style="stop-color:#EF5350;" />
    </linearGradient>
    
    <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#303F9F;" />
      <stop offset="100%" style="stop-color:#5C6BC0;" />
    </linearGradient>
    
    <linearGradient id="equipmentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00897B;" />
      <stop offset="100%" style="stop-color:#4DB6AC;" />
    </linearGradient>
    
    <!-- Chart styles -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#00000033"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1000" height="750" fill="#FFFFFF"/>
  
  <!-- Background pattern for visual interest -->
  <pattern id="bgPattern" width="50" height="50" patternUnits="userSpaceOnUse">
    <rect width="50" height="50" fill="#FFFFFF"/>
    <circle cx="25" cy="25" r="1" fill="#E3F2FD"/>
  </pattern>
  <rect width="1000" height="750" fill="url(#bgPattern)"/>
  
  <!-- Header and footer bars -->
  <rect width="1000" height="80" fill="url(#headerGradient)" filter="url(#shadow)"/>
  <rect y="610" width="1000" height="70" fill="url(#summaryGradient)" filter="url(#shadow)"/>

  <!-- Title -->
  <text x="500" y="40" font-size="22px" fill="#FFFFFF" text-anchor="middle" font-weight="bold">AI-Powered ECG: Predicting Outcomes in</text>
  <text x="500" y="65" font-size="22px" fill="#FFFFFF" text-anchor="middle" font-weight="bold">Patients With Heart Failure</text>

  <!-- Left Column -->
  <g id="left-column" transform="translate(30, 120)">
    <!-- Heart Context with enhanced styling -->
    <g id="heart-context">
      <rect x="0" y="0" width="240" height="100" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <g transform="translate(15, 20)">
        <path d="M30,10 C10,10 0,25 0,40 C0,60 20,75 30,85 C40,75 60,60 60,40 C60,25 50,10 30,10 Z" fill="url(#heartGradient)"/>
        <path d="M28,30 L32,30 L32,55 L28,55 Z M28,60 L32,60 L32,65 L28,65 Z" fill="#FFFFFF" transform="rotate(10, 30, 47.5)"/>
      </g>
      <text x="90" y="35" fill="#424242" font-size="12px" font-weight="bold">Heart failure is a</text>
      <text x="90" y="50" fill="#424242" font-size="12px" font-weight="bold">serious condition with</text>
      <text x="90" y="65" fill="#424242" font-size="12px" font-weight="bold">varied outcomes</text>
    </g>

    <!-- Prediction Limits -->
    <g id="prediction-limits" transform="translate(0, 120)">
      <rect x="0" y="0" width="240" height="100" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <g transform="translate(15, 20)">
        <polygon points="30,0 60,50 0,50" fill="#5C6BC0"/>
        <path d="M28,15 L32,15 L32,35 L28,35 Z M28,40 L32,40 L32,45 L28,45 Z" fill="#FFFFFF"/>
      </g>
      <text x="90" y="35" fill="#424242" font-size="12px">Current methods for</text>
      <text x="90" y="50" fill="#424242" font-size="12px">predicting patient</text>
      <text x="90" y="65" fill="#424242" font-size="12px">outcomes can be limited</text>
    </g>

    <!-- Study Details -->
    <g id="study-details" transform="translate(0, 240)">
      <rect x="0" y="0" width="240" height="130" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="40" height="26" fill="#FFFFFF" stroke="#BDBDBD" rx="3" ry="3"/>
        <circle cx="20" cy="13" r="8" stroke="#000000" stroke-width="0.5" fill="none"/>
        <path d="M20,5 A8,8 0 0,1 20,21" fill="#D32F2F"/>
        <path d="M20,5 A8,8 0 0,0 20,21" fill="#3949AB"/>
        <rect x="3" y="3" width="5" height="1.5" fill="#000000"/>
        <rect x="3" y="6" width="5" height="1.5" fill="#000000"/>
        <rect x="3" y="9" width="5" height="1.5" fill="#000000"/>
        <rect x="32" y="15.5" width="5" height="1.5" fill="#000000"/>
        <rect x="32" y="18.5" width="5" height="1.5" fill="#000000"/>
        <rect x="32" y="21.5" width="5" height="1.5" fill="#000000"/>
        
        <g transform="translate(45, 0)">
          <rect x="0" y="5" width="20" height="15" fill="#00897B"/>
          <rect x="7" y="0" width="6" height="20" fill="#00897B"/>
          <rect x="9" y="7" width="3" height="3" fill="#FFFFFF"/>
          <rect x="9" y="12" width="3" height="3" fill="#FFFFFF"/>
        </g>
        
        <g transform="translate(25, 30)">
          <rect x="0" y="5" width="20" height="15" fill="#00897B"/>
          <rect x="7" y="0" width="6" height="20" fill="#00897B"/>
          <rect x="9" y="7" width="3" height="3" fill="#FFFFFF"/>
          <rect x="9" y="12" width="3" height="3" fill="#FFFFFF"/>
        </g>
      </g>
      <text x="90" y="30" fill="#424242" font-size="12px">Retrospective study in</text>
      <text x="90" y="45" fill="#424242" font-size="12px">two tertiary hospitals</text>
      <text x="90" y="60" fill="#424242" font-size="12px">in <tspan font-weight="bold">South Korea</tspan></text>
      <text x="90" y="75" fill="#424242" font-size="12px">(Mar 2011-Feb 2014)</text>
    </g>
  </g>

  <!-- Center Column -->
  <g id="center-column" transform="translate(290, 120)">
    <!-- Data Collection -->
    <g id="data-collection">
      <rect x="0" y="0" width="280" height="100" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <text x="20" y="35" fill="#424242" font-size="12px">Data from 1254 patients</text>
      <text x="20" y="50" fill="#424242" font-size="12px">with acute heart failure</text>
      <text x="20" y="65" fill="#424242" font-size="12px">were collected</text>
      <g transform="translate(180, 20)">
        <circle cx="30" cy="30" r="25" fill="#E3F2FD" stroke="#BBDEFB" stroke-width="1"/>
        <circle cx="30" cy="30" r="18" fill="#FFFFFF" stroke="#BBDEFB" stroke-width="1"/>
        <rect x="20" y="20" width="5" height="15" fill="#3949AB"/>
        <rect x="28" y="15" width="5" height="20" fill="#3949AB"/>
        <rect x="36" y="25" width="5" height="10" fill="#3949AB"/>
        <line x1="48" y1="48" x2="65" y2="65" stroke="#BBDEFB" stroke-width="8" stroke-linecap="round"/>
      </g>
    </g>

    <!-- ECG Analysis -->
    <g id="ecg-analysis" transform="translate(0, 120)">
      <rect x="0" y="0" width="280" height="100" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <text x="20" y="35" fill="#424242" font-size="12px">Baseline ECGs were</text>
      <text x="20" y="50" fill="#424242" font-size="12px">analyzed using a</text>
      <text x="20" y="65" fill="#424242" font-size="12px">deep learning system called</text>
      <text x="20" y="80" fill="#424242" font-size="12px" font-weight="bold">Quantitative ECG (QCG)</text>
      <g transform="translate(180, 20)">
        <rect x="0" y="0" width="60" height="40" rx="5" ry="5" fill="url(#ecgGradient)"/>
        <rect x="5" y="5" width="50" height="30" fill="#000000"/>
        <polyline points="8,20 15,20 18,15 22,25 25,20 30,20 32,18 35,22 40,20 52,20" stroke="#76FF03" stroke-width="1.5" fill="none"/>
      </g>
    </g>

    <!-- QCG Design -->
    <g id="qcg-design" transform="translate(0, 240)">
      <rect x="0" y="0" width="280" height="100" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <text x="20" y="35" fill="#424242" font-size="12px">QCG-Critical was designed</text>
      <text x="20" y="50" fill="#424242" font-size="12px">to predict severe outcomes</text>
      <g transform="translate(180, 20)">
        <rect x="0" y="0" width="60" height="50" rx="5" ry="5" fill="#E3F2FD" stroke="#BBDEFB"/>
        <polyline points="5,45 15,30 25,35 35,20 45,25 55,10" stroke="#3949AB" stroke-width="2" fill="none"/>
        <circle cx="55" cy="10" r="3" fill="#3949AB"/>
        <polyline points="50,5 55,10 50,15" stroke="#3949AB" stroke-width="2" fill="none"/>
      </g>
    </g>
  </g>

  <!-- Results Column -->
  <g id="results-column" transform="translate(590, 120)">
    <text x="170" y="20" fill="#424242" font-weight="bold" text-anchor="middle" font-size="14px">QCG-Critical accurately predicted:</text>

    <!-- In-hospital Cardiac Death Chart -->
    <g id="roc-chart" transform="translate(20, 40)">
      <rect x="0" y="0" width="300" height="200" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <text x="150" y="20" fill="#424242" font-size="13px" text-anchor="middle" font-weight="bold">In-hospital cardiac death</text>
      
      <!-- Chart content -->
      <rect x="20" y="35" width="220" height="150" fill="#F8F8F8" stroke="#E0E0E0"/>
      <line x1="20" y1="185" x2="240" y2="185" stroke="#424242"/> 
      <line x1="20" y1="35" x2="20" y2="185" stroke="#424242"/> 
      <text x="130" y="200" text-anchor="middle" font-size="10px">1 - Specificity</text>
      <text x="-75" y="45" transform="rotate(-90)" text-anchor="middle" font-size="10px">Sensitivity</text>
      
      <line x1="20" y1="110" x2="240" y2="110" stroke="#E0E0E0" stroke-dasharray="2,2"/> 
      <line x1="130" y1="35" x2="130" y2="185" stroke="#E0E0E0" stroke-dasharray="2,2"/> 
      
      <path d="M20,185 C 40,95 80,55 150,40" stroke="#D32F2F" stroke-width="2.5" fill="none"/> 
      <path d="M20,185 C 50,115 90,75 180,50" stroke="#4CAF50" stroke-width="2.5" fill="none"/> 
      <path d="M20,185 C 60,135 100,95 200,65" stroke="#3949AB" stroke-width="2.5" fill="none"/> 
      <path d="M20,185 L240,35" stroke="#9E9E9E" stroke-width="1" fill="none"/> 
      
      <rect x="150" y="45" width="85" height="55" fill="#FFFFFF" stroke="#E0E0E0" fill-opacity="0.9"/>
      <text x="155" y="60" font-size="10px" font-weight="bold">AUC</text>
      <circle cx="160" cy="73" r="3" fill="#D32F2F"/> 
      <text x="168" y="77" font-size="9px">QCG-Critical</text> 
      <text x="210" y="77" font-size="9px" text-anchor="end" font-weight="bold">0.821</text>
      
      <circle cx="160" cy="85" r="3" fill="#4CAF50"/> 
      <text x="168" y="89" font-size="9px">NT-proBNP</text> 
      <text x="210" y="89" font-size="9px" text-anchor="end" font-weight="bold">0.720</text>
      
      <circle cx="160" cy="97" r="3" fill="#3949AB"/> 
      <text x="168" y="101" font-size="9px">LVEF</text> 
      <text x="210" y="101" font-size="9px" text-anchor="end" font-weight="bold">0.642</text>
      
      <g transform="translate(250, 145)">
        <rect x="0" y="0" width="40" height="30" fill="#3949AB" rx="5" ry="5"/>
        <polyline points="5,15 10,15 12,10 15,20 18,15 35,15" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
      </g>
    </g>

    <!-- Long-term Mortality Chart -->
    <g id="km-chart" transform="translate(20, 260)">
      <rect x="0" y="0" width="300" height="200" fill="#FAFAFA" rx="10" ry="10" stroke="#E0E0E0" stroke-width="1"/>
      <text x="150" y="20" fill="#424242" font-size="13px" text-anchor="middle" font-weight="bold">Long-term all-cause mortality</text>
      
      <!-- Chart content -->
      <rect x="20" y="35" width="220" height="150" fill="#F8F8F8" stroke="#E0E0E0"/>
      <line x1="20" y1="185" x2="240" y2="185" stroke="#424242"/> 
      <line x1="20" y1="35" x2="20" y2="185" stroke="#424242"/> 
      <text x="130" y="200" text-anchor="middle" font-size="10px">Follow-up (years)</text>
      <text x="-75" y="45" transform="rotate(-90)" text-anchor="middle" font-size="10px">Survival (%)</text>
      
      <text x="15" y="40" text-anchor="end" font-size="9px">100%</text> 
      <line x1="17" y1="35" x2="23" y2="35" stroke="#424242"/>
      
      <text x="15" y="113" text-anchor="end" font-size="9px">50</text> 
      <line x1="17" y1="110" x2="23" y2="110" stroke="#424242"/>
      
      <text x="15" y="188" text-anchor="end" font-size="9px">0</text>
      <text x="20" y="195" text-anchor="middle" font-size="9px">0</text>
      
      <text x="130" y="195" text-anchor="middle" font-size="9px">2</text> 
      <line x1="130" y1="182" x2="130" y2="188" stroke="#424242"/>
      
      <text x="240" y="195" text-anchor="middle" font-size="9px">4</text> 
      <line x1="240" y1="182" x2="240" y2="188" stroke="#424242"/>
      
      <!-- Survival curves -->
      <path d="M20,40 L70,40 L70,50 L120,50 L120,60 L180,60 L180,70 L240,70" stroke="#3949AB" stroke-width="2.5" fill="none"/> 
      <path d="M20,45 L60,45 L60,65 L110,65 L110,80 L170,80 L170,95 L240,95" stroke="#9C27B0" stroke-width="2.5" fill="none"/> 
      <path d="M20,50 L50,50 L50,75 L100,75 L100,100 L160,100 L160,125 L240,125" stroke="#D32F2F" stroke-width="2.5" fill="none"/> 
      
      <rect x="150" y="45" width="85" height="50" fill="#FFFFFF" stroke="#E0E0E0" fill-opacity="0.9"/>
      <text x="155" y="60" font-size="10px" font-weight="bold">QCG-Critical</text>
      <line x1="160" y1="73" x2="170" y2="73" stroke="#3949AB" stroke-width="2.5"/> 
      <text x="175" y="76" font-size="9px">QCG value below 0.25</text>
      
      <line x1="160" y1="83" x2="170" y2="83" stroke="#9C27B0" stroke-width="2.5"/> 
      <text x="175" y="86" font-size="9px">0.25-0.50</text>
      
      <line x1="160" y1="93" x2="170" y2="93" stroke="#D32F2F" stroke-width="2.5"/> 
      <text x="175" y="96" font-size="9px">QCG value above 0.5</text>
      
      <g transform="translate(250, 145)">
        <circle cx="20" cy="12" r="10" fill="#3949AB"/>
        <rect x="10" y="20" width="20" height="8" fill="#3949AB"/>
        <circle cx="15" cy="12" r="3" fill="#000000"/> 
        <circle cx="25" cy="12" r="3" fill="#000000"/>
        <polygon points="18,18 22,18 20,22" fill="#000000"/>
        <line x1="12" y1="22" x2="12" y2="26" stroke="#000000" stroke-width="1"/> 
        <line x1="16" y1="22" x2="16" y2="26" stroke="#000000" stroke-width="1"/>
        <line x1="24" y1="22" x2="24" y2="26" stroke="#000000" stroke-width="1"/> 
        <line x1="28" y1="22" x2="28" y2="26" stroke="#000000" stroke-width="1"/>
      </g>
    </g>
  </g>

  <!-- Summary Bar -->
  <g id="summary-bar" transform="translate(0, 610)">
    <text x="40" y="40" fill="#212121" font-size="18px" font-weight="bold">Summary:</text>
    <text x="150" y="30" fill="#212121" font-size="14px">This AI-powered ECG analysis may serve as a novel biomarker for patients with acute heart failure</text>
    <text x="150" y="50" fill="#212121" font-size="14px">who are at high risk, potentially improving care decisions.</text>
  </g>

  <!-- Footer -->
  <g id="footer" transform="translate(30, 695)">
    <text x="0" y="0" fill="#424242" font-size="10px">Cho Y, Yoon M, Kim J, et al. Artificial Intelligence-Based Electrocardiographic Biomarker for</text>
    <text x="0" y="15" fill="#424242" font-size="10px">Outcome Prediction in Patients With Acute Heart Failure: Prospective Cohort Study</text>
    <text x="0" y="30" fill="#424242" font-size="10px">J Med Internet Res 2024;26:e52139</text>
    <text x="0" y="45" fill="#424242" font-size="10px">URL: https://www.jmir.org/2024/1/e52139</text>
    <text x="0" y="60" fill="#424242" font-size="10px">DOI: 10.2196/52139</text>

    <g id="jmir-logo" transform="translate(750, -5)">
      <rect x="0" y="0" width="200" height="50" fill="none"/>
      <text x="100" y="15" text-anchor="middle" font-size="18px" font-weight="bold" fill="#1A237E">JMIR Publications</text>
      <text x="100" y="35" text-anchor="middle" font-size="10px" fill="#F57C00">Advancing Digital Health &amp; Open Science</text>
      <circle cx="25" cy="25" r="18" fill="#3949AB"/>
      <path d="M15,15 Q25,5 35,15 Q45,25 35,35 Q25,45 15,35 Q5,25 15,15" fill="#FFFFFF"/>
      <circle cx="25" cy="25" r="5" fill="#F57C00"/>
    </g>
  </g>
</svg>`;