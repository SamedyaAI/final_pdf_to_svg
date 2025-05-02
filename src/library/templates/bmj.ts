export const bmjTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1100">
  <defs>
    <style>
      /* Color palette (Using provided names, ensure hex values match original if possible) */
      :root {
        --primary-blue: #0072BC; /* BMJ Blue Approx */
        --light-blue: #F0F4F7; /* Lighter background than original, adjust if needed */
        --medium-blue: #50A0D0;
        --dark-blue: #005B94;
        --orange: #FDB913; /* Approx chart orange */
        --purple: #5B5FAE; /* Approx chart purple */
        --coral: #FF6F61; /* Illustration color */
        --dark-gray: #333333; /* Standard dark text */
        --light-gray: #F5F5F5; /* Card background - okay */
        --medium-gray: #AAAAAA; /* Lines */
        --stroke-gray: #E0E0E0; /* Card Stroke */
        --white: #FFFFFF;
        --chart-area-purple: #A8A2D1; /* Approx IQR Purple */
        --chart-area-orange: #FDDC9A; /* Approx IQR Orange */
      }

      /* Text styles */
      text {
        font-family: Arial, Helvetica, sans-serif; /* Added Helvetica as fallback */
        fill: var(--dark-gray);
        dominant-baseline: central; /* Better vertical alignment control */
      }
      .title {
        font-size: 24px; /* Slightly adjusted */
        font-weight: bold;
      }
      .subtitle {
        font-size: 20px; /* Adjusted */
        font-weight: bold;
        fill: var(--primary-blue);
      }
      .body-text {
        font-size: 15px; /* Adjusted */
        line-height: 1.4; /* Added for potential multi-line text */
      }
      .data-point {
        font-size: 16px; /* Adjusted */
        font-weight: bold;
      }
      .chart-title {
        font-size: 18px; /* Adjusted */
        font-weight: bold;
      }
      .chart-label {
        font-size: 13px; /* Adjusted */
      }
      .chart-data {
        font-size: 11px; /* Adjusted */
      }
      .stat-highlight {
        font-size: 22px; /* Adjusted */
        font-weight: bold;
        fill: var(--primary-blue);
      }
      .small-white-text {
         font-family: Arial, Helvetica, sans-serif;
         font-size: 13px;
         fill: var(--white);
         dominant-baseline: central;
      }
      .small-blue-text {
         font-family: Arial, Helvetica, sans-serif;
         font-size: 13px;
         fill: var(--primary-blue);
         dominant-baseline: central;
      }
      .footer-text {
        font-size: 13px;
      }

      /* Shape styles */
      .card {
        fill: var(--white);
        stroke: var(--stroke-gray);
        stroke-width: 1;
        rx: 8; /* Adjusted */
        ry: 8;
      }
      .header-bg {
        fill: var(--primary-blue);
      }
      /* Base Icon Styling */
      .icon-shape {
         fill: var(--primary-blue);
         stroke: none;
      }
      .icon-path-white {
          stroke: var(--white);
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
      }
      .summary-quote {
        fill: none;
        stroke: var(--primary-blue);
        stroke-width: 3;
      }
      .purple-box {
        fill: var(--purple);
        rx: 6; /* Adjusted */
        ry: 6;
      }
      .orange-box {
        fill: var(--orange);
        rx: 6; /* Adjusted */
        ry: 6;
      }
      .survival-line {
        fill: none;
        stroke: var(--purple);
        stroke-width: 2;
      }
      .survival-area {
        fill: var(--chart-area-purple); /* Use specific color */
        opacity: 0.6; /* Adjusted opacity */
      }
      .admission-line {
        fill: none;
        stroke: var(--orange);
        stroke-width: 2;
      }
      .admission-area {
        fill: var(--chart-area-orange); /* Use specific color */
        opacity: 0.6; /* Adjusted opacity */
      }
      .divider-line {
          stroke: var(--medium-gray);
          stroke-width: 1;
      }
    </style>
  </defs>

  <rect width="1200" height="1100" fill="var(--light-blue)" />

  <g id="header" transform="translate(20, 20)">
    <rect x="0" y="0" width="100" height="50" class="header-bg" rx="5" ry="5" />
    <text x="10" y="26" fill="white" font-size="18px" font-weight="bold">EJMR</text>
    <circle cx="130" cy="15" r="7" fill="none" stroke="var(--primary-blue)" stroke-width="1.5"/>
    <circle cx="130" cy="15" r="3" fill="var(--primary-blue)"/>
    <text x="150" y="15" font-size="14px">Visual abstract</text>

    <text x="450" y="15" class="title">Association of sarcopenia index</text>
    <text x="450" y="45" class="title">with incident diabetes mellitus</text>
  </g>

  <g id="summary-section" transform="translate(20, 90)">
    <rect x="0" y="0" width="1160" height="100" class="card" />

    <g id="summary-icon" transform="translate(25, 30)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <path d="M5 10 L 35 10 M5 20 L 25 20 M5 30 L 30 30" class="icon-path-white"/>
     </g>
    <text x="85" y="51" class="subtitle">Summary</text>

    <g id="sarcopenia-definition" transform="translate(200, 20)">
        <text x="0" y="10" class="body-text">Sarcopenia index =</text>
        <text x="0" y="35" class="body-text">serum creatinine (mg/dL) /</text>
        <text x="0" y="60" class="body-text">serum cystatin C (mg/dL) × 100</text>
    </g>

    <line x1="450" y1="15" x2="450" y2="85" class="divider-line" />

    <g id="key-finding" transform="translate(480, 25)">
      <text x="0" y="10" class="body-text">Higher sarcopenia index</text>
      <text x="0" y="35" class="body-text">associated with lower risk of</text>
      <text x="0" y="60" class="body-text">incident diabetes mellitus</text>
    </g>

    <line x1="780" y1="15" x2="780" y2="85" class="divider-line" />

    <g id="risk-reduction" transform="translate(810, 35)">
      <text x="0" y="10" class="stat-highlight">7.6%</text>
      <text x="75" y="10" class="body-text">reduced risk of diabetes</text>
      <text x="0" y="35" class="body-text">per 1-SD increase in sarcopenia index</text>
    </g>
  </g>

  <g id="study-design" transform="translate(20, 210)">
    <rect x="0" y="0" width="1160" height="80" class="card" />

    <g id="study-design-icon" transform="translate(25, 20)">
       <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
       <path d="M10 5 L 30 5 M10 12 L 30 12 M10 19 L 30 19 M10 26 L 20 26 M10 33 L 25 33" class="icon-path-white"/>
    </g>
    <text x="85" y="41" class="subtitle">Study design</text>

    <g transform="translate(300, 25)">
       <rect x="0" y="0" width="30" height="30" fill="#EEEEEE" stroke="var(--primary-blue)" stroke-width="1" rx="3" ry="3"/>
       <path d="M7 15 L 23 15 M15 7 L 15 23" stroke="var(--primary-blue)" stroke-width="2" />
       <text x="45" y="8" class="body-text">Prospective cohort study</text>
       <text x="45" y="28" class="body-text">CHARLS 2015-2020</text>
    </g>

    <line x1="620" y1="15" x2="620" y2="65" class="divider-line" />

    <g transform="translate(660, 25)">
      <text x="0" y="8" class="body-text">Follow-up period:</text>
      <text x="0" y="28" class="body-text">5.0 years (mean)</text>
    </g>

    <g transform="translate(900, 25)">
      <text x="0" y="8" class="body-text">Chinese adults</text>
      <text x="0" y="28" class="body-text">aged ≥45 years</text>
    </g>
  </g>

  <g id="data-sources" transform="translate(20, 310)">
    <rect x="0" y="0" width="1160" height="120" class="card" />

    <g id="data-sources-icon" transform="translate(25, 20)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <circle cx="13" cy="15" r="6" fill="white"/>
        <path d="M5 35 C 5 25, 21 25, 21 35 Z" fill="white"/>
        <circle cx="27" cy="15" r="6" fill="white"/>
        <path d="M19 35 C 19 25, 35 25, 35 35 Z" fill="white"/>
     </g>
    <text x="85" y="41" class="subtitle">Data sources</text>

    <g transform="translate(280, 25)">
        <rect x="0" y="0" width="30" height="30" fill="var(--primary-blue)" rx="3" ry="3" />
         <path d="M7 8 L 12 8 M 16 8 L 23 8 M 7 15 L 12 15 M 16 15 L 23 15 M 7 22 L 12 22 M 16 22 L 23 22" stroke="white" stroke-width="1.5"/>
        <text x="45" y="8" class="body-text">China Health and Retirement</text>
        <text x="45" y="28" class="body-text">Longitudinal Study (CHARLS)</text>
    </g>

    <line x1="580" y1="15" x2="580" y2="105" class="divider-line" />

    <g transform="translate(620, 25)">
       <circle cx="10" cy="10" r="8" fill="var(--primary-blue)" />
       <path d="M3 25 C 3 18, 17 18, 17 25 Z" fill="var(--primary-blue)"/>
       <circle cx="25" cy="10" r="8" fill="var(--primary-blue)" />
       <path d="M18 25 C 18 18, 32 18, 32 25 Z" fill="var(--primary-blue)"/>
      <text x="45" y="8" class="stat-highlight">7,718</text>
      <text x="130" y="8" class="body-text">participants</text>
      <text x="45" y="32" class="body-text">without diabetes at baseline</text>
    </g>

    <line x1="860" y1="15" x2="860" y2="105" class="divider-line" />

    <g transform="translate(900, 20)">
        <circle cx="50" cy="40" r="35" fill="var(--primary-blue)" />
        <path d="M50 5 A 35 35 0 0 1 96.5 60 L 50 40 Z" fill="var(--white)" transform="rotate(-120, 50, 40)" />
        <text x="110" y="30" class="stat-highlight" fill="var(--primary-blue)">501</text>
        <text x="110" y="55" class="body-text" fill="var(--primary-blue)">incident diabetes cases</text>
     </g>
  </g>

  <g id="outcomes" transform="translate(20, 450)">
    <g id="outcomes-icon" transform="translate(25, 0)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape"/>
        <path d="M5 35 V 20 H 15 V 35 Z M 17 35 V 10 H 27 V 35 Z M 29 35 V 25 H 39 V 35 Z" stroke="white" fill="white"/>
     </g>
    <text x="85" y="21" class="subtitle">Results</text>
  </g>

  <g id="charts-area" transform="translate(20, 500)">

      <g id="hazard-ratios-chart">
        <rect x="0" y="0" width="570" height="520" class="card" />
        <text x="25" y="30" class="chart-title">Hazard Ratios by Sarcopenia Index Quartiles</text>

        <rect x="350" y="15" width="190" height="80" class="purple-box" />
        <text x="360" y="35" class="small-white-text">Median sarcopenia index</text>
        <text x="360" y="55" class="small-white-text">was <tspan font-weight="bold">93</tspan></text>
        <text x="360" y="75" class="small-white-text">(IQR: 82-107)</text>

        <g id="hazard-ratios-plot" transform="translate(50, 110)">
            <rect x="0" y="0" width="500" height="320" fill="var(--white)" stroke="var(--stroke-gray)" />

            <text x="-10" y="5" class="chart-label" text-anchor="end">1.4</text>
            <line x1="0" y1="5" x2="500" y2="5" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="-10" y="85" class="chart-label" text-anchor="end">1.2</text>
            <line x1="0" y1="85" x2="500" y2="85" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="-10" y="165" class="chart-label" text-anchor="end">1.0</text>
            <line x1="0" y1="165" x2="500" y2="165" stroke="var(--stroke-gray)" stroke-width="1" />
            <text x="-10" y="245" class="chart-label" text-anchor="end">0.8</text>
            <line x1="0" y1="245" x2="500" y2="245" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="-10" y="320" class="chart-label" text-anchor="end">0.6</text>
            <line x1="0" y1="0" x2="0" y2="320" stroke="var(--dark-gray)" stroke-width="1" />

            <text x="100" y="340" class="chart-label" text-anchor="middle">Q1</text>
            <text x="100" y="360" class="chart-label" text-anchor="middle">(&lt;81.75)</text>
            <text x="200" y="340" class="chart-label" text-anchor="middle">Q2</text>
            <text x="200" y="360" class="chart-label" text-anchor="middle">(81.75-93.28)</text>
            <text x="300" y="340" class="chart-label" text-anchor="middle">Q3</text>
            <text x="300" y="360" class="chart-label" text-anchor="middle">(93.29-106.91)</text>
            <text x="400" y="340" class="chart-label" text-anchor="middle">Q4</text>
            <text x="400" y="360" class="chart-label" text-anchor="middle">(&gt;106.91)</text>
            <text x="250" y="390" class="chart-label" text-anchor="middle">Sarcopenia Index Quartiles</text>

            <!-- Reference line at 1.0 -->
            <line x1="0" y1="165" x2="500" y2="165" stroke="var(--dark-gray)" stroke-dasharray="5,5" stroke-width="1" />

            <!-- Hazard ratio points with error bars -->
            <!-- Q1 (Reference) -->
            <circle cx="100" cy="165" r="6" fill="var(--purple)" />
            <text x="100" y="140" class="chart-data" text-anchor="middle">1.00</text>
            <text x="100" y="190" class="chart-data" text-anchor="middle">(Reference)</text>

            <!-- Q2 -->
            <circle cx="200" cy="170" r="6" fill="var(--purple)" />
            <line x1="200" y1="140" x2="200" y2="200" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="190" y1="140" x2="210" y2="140" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="190" y1="200" x2="210" y2="200" stroke="var(--purple)" stroke-width="1.5" />
            <text x="200" y="125" class="chart-data" text-anchor="middle">0.930</text>
            <text x="200" y="220" class="chart-data" text-anchor="middle">(0.724-1.193)</text>

            <!-- Q3 -->
            <circle cx="300" cy="175" r="6" fill="var(--purple)" />
            <line x1="300" y1="145" x2="300" y2="205" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="290" y1="145" x2="310" y2="145" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="290" y1="205" x2="310" y2="205" stroke="var(--purple)" stroke-width="1.5" />
            <text x="300" y="125" class="chart-data" text-anchor="middle">0.892</text>
            <text x="300" y="220" class="chart-data" text-anchor="middle">(0.685-1.162)</text>

            <!-- Q4 -->
            <circle cx="400" cy="180" r="6" fill="var(--purple)" />
            <line x1="400" y1="150" x2="400" y2="210" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="390" y1="150" x2="410" y2="150" stroke="var(--purple)" stroke-width="1.5" />
            <line x1="390" y1="210" x2="410" y2="210" stroke="var(--purple)" stroke-width="1.5" />
            <text x="400" y="125" class="chart-data" text-anchor="middle">0.869</text>
            <text x="400" y="220" class="chart-data" text-anchor="middle">(0.657-1.150)</text>

        </g>
      </g>

      <g id="spline-chart" transform="translate(610, 0)">
        <rect x="0" y="0" width="570" height="520" class="card" />
        <text x="25" y="30" class="chart-title">Restricted Cubic Spline Association</text>
        <text x="25" y="55" class="chart-title">Sarcopenia Index and Diabetes Risk</text>

        <rect x="350" y="15" width="190" height="80" class="orange-box" />
        <text x="360" y="35" class="small-white-text">Linear negative</text>
        <text x="360" y="55" class="small-white-text">association</text>
        <text x="360" y="75" class="small-white-text">(P for nonlinearity = 0.489)</text>

        <g id="spline-plot" transform="translate(50, 130)">
             <rect x="0" y="0" width="500" height="320" fill="var(--white)" stroke="var(--stroke-gray)" />

             <text x="-10" y="30" class="chart-label" text-anchor="end">2.0</text>
            <line x1="0" y1="30" x2="500" y2="30" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="-10" y="115" class="chart-label" text-anchor="end">1.5</text>
            <line x1="0" y1="115" x2="500" y2="115" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="-10" y="200" class="chart-label" text-anchor="end">1.0</text>
            <line x1="0" y1="200" x2="500" y2="200" stroke="var(--dark-gray)" stroke-width="1" />
            <text x="-10" y="285" class="chart-label" text-anchor="end">0.5</text>
            <line x1="0" y1="285" x2="500" y2="285" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <line x1="0" y1="0" x2="0" y2="320" stroke="var(--dark-gray)" stroke-width="1" />

            <text x="100" y="340" class="chart-label" text-anchor="middle">100</text>
            <line x1="100" y1="0" x2="100" y2="320" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="200" y="340" class="chart-label" text-anchor="middle">150</text>
            <line x1="200" y1="0" x2="200" y2="320" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="300" y="340" class="chart-label" text-anchor="middle">200</text>
            <line x1="300" y1="0" x2="300" y2="320" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x1="400" y1="0" x2="400" y2="320" stroke="var(--stroke-gray)" stroke-width="0.5" />
            <text x="400" y="340" class="chart-label" text-anchor="middle">250</text>
            <text x="250" y="370" class="chart-label" text-anchor="middle">Sarcopenia Index</text>

            <path d="M50 140 Q100 160 150 180 T250 195 T350 200 T450 205" class="admission-line" />

            <!-- Confidence interval area -->
            <path d="M50 110 Q100 130 150 155 T250 175 T350 185 T450 195 L450 215 T350 215 T250 215 T150 205 Q100 190 50 170 Z" class="admission-area" />

            <!-- Reference line at 1.0 -->
            <line x1="0" y1="200" x2="500" y2="200" stroke="var(--dark-gray)" stroke-dasharray="5,5" stroke-width="1" />
         </g>
      </g>
  </g>

  <g id="footer" transform="translate(20, 1040)">
    <rect x="0" y="0" width="230" height="30" fill="var(--primary-blue)" rx="5" ry="5" />
    <text x="10" y="16" fill="white" class="footer-text">DOI: 10.1186/s40001-025-02405-w</text>

    <text x="450" y="16" class="footer-text">Wang et al. European Journal of Medical Research (2025) 30:151</text>

    <text x="900" y="16" class="footer-text">© 2025 The Author(s)</text>
  </g>
</svg>`;

