export const goodTemplate = `<?xml version="1.0" encoding="utf-8"?>
<svg font-family="Arial, Helvetica, sans-serif" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
<defs>
<style>
            /* Color variables */
            :root {
                --primary-color: #0077B6;
                --secondary-color: #00B4D8;
                --background-color: #F0F8FF;
                --card-color: #FFFFFF;
                --dark-text: #333333;
                --medium-text: #585858;
                --light-text: #FFFFFF;
                --border-color: #E0E0E0;
                --chart-blue: #457b9d;
                --gray-medium: #757575;
                --gray-light: #BDBDBD;
            }

            /* Base text styles */
            text {
                fill: var(--dark-text);
                dominant-baseline: central;
                font-family: inherit;
            }
            
            /* Text style classes */
            .header-title {
                font-size: 24px;
                font-weight: bold;
                fill: var(--primary-color);
            }
            .header-subtitle {
                font-size: 14px;
                font-weight: bold;
                fill: var(--dark-text);
            }
            .section-title {
                font-size: 16px;
                font-weight: bold;
                fill: var(--secondary-color);
            }
            .body-text {
                font-size: 12px;
                fill: var(--medium-text);
            }
            .small-text {
                font-size: 10px;
                fill: var(--gray-medium);
            }
            .footer-text {
                font-size: 10px;
                fill: var(--gray-medium);
            }
            .chart-title {
                font-size: 14px;
                font-weight: bold;
                fill: var(--dark-text);
                text-anchor: middle;
            }
            .chart-subtitle {
                font-size: 12px;
                fill: var(--medium-text);
                text-anchor: middle;
            }
            .graph-axis-label {
                font-size: 10px;
                fill: var(--gray-medium);
                text-anchor: middle;
            }
            .graph-axis-label-y {
                font-size: 10px;
                fill: var(--gray-medium);
                text-anchor: end;
            }
            .data-label {
                font-size: 10px;
                fill: var(--medium-text);
                text-anchor: middle;
            }
            .stat-number {
                font-size: 20px;
                font-weight: bold;
                fill: var(--primary-color);
                text-anchor: middle;
            }
            .stat-label {
                font-size: 12px;
                fill: var(--medium-text);
                text-anchor: middle;
            }

            /* Container elements */
            .card {
                fill: var(--card-color);
                stroke: var(--border-color);
                stroke-width: 1;
                rx: 6;
                ry: 6;
            }
            .icon-bg {
                fill: var(--secondary-color);
                stroke: none;
                rx: 4;
                ry: 4;
            }
            .icon-path {
                stroke: var(--light-text);
                stroke-width: 2;
                fill: none;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            /* Visualization elements */
            .graph-line {
                stroke-width: 2;
                fill: none;
            }
            .graph-line-1 {
                stroke: var(--chart-blue);
            }
            .graph-area {
                opacity: 0.15;
            }
            .graph-area-1 {
                fill: var(--chart-blue);
            }
            .graph-axis {
                stroke: var(--gray-light);
                stroke-width: 1;
            }
            .ci-line {
                stroke: var(--gray-medium);
                stroke-width: 1;
            }
            .reference-line {
                stroke: #999;
                stroke-width: 1;
                stroke-dasharray: 4,4;
            }
        </style>
<filter height="130%" id="dropshadow">
<feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
<feOffset dx="1" dy="1" result="offsetblur"/>
<feComponentTransfer>
<feFuncA slope="0.3" type="linear"/>
</feComponentTransfer>
<feMerge>
<feMergeNode/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>
</defs>
<!-- Background -->
<rect fill="var(--background-color)" height="700" width="1200"/>
<!-- Header -->
<g id="header" transform="translate(30, 20)">
<rect fill="var(--primary-color)" height="32" rx="4" ry="4" width="32" x="0" y="0"/>
<text fill="#FFFFFF" font-size="12" font-weight="bold" x="7" y="17">EJMR</text>
<text class="header-subtitle" x="50" y="15">Visual abstract</text>
<text class="header-title" x="50" y="40">Association of sarcopenia index with incident diabetes mellitus</text>
<text class="header-subtitle" x="50" y="65">A longitudinal cohort study of 7,718 middle-aged and older adults</text>
</g>
<!-- Main content container -->
<g id="main-content" transform="translate(30, 100)">
<!-- Left column -->
<g id="left-column">
<!-- Key Findings section -->
<g id="key-findings-section" transform="translate(0, 0)">
<rect class="card" filter="url(#dropshadow)" height="125" width="520"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M8 4 V 20 M12 8 H 16 M12 13 H 16"/>
</g>
<text class="section-title" x="50" y="27">Key Findings</text>
<!-- Content area for key findings -->
<g transform="translate(20, 50)">
<text class="body-text" x="10" y="0">• Higher sarcopenia index (creatinine/cystatin C ratio) associated with lower</text>
<text class="body-text" x="15" y="20">risk of developing diabetes mellitus.</text>
<text class="body-text" x="10" y="45">• Each standard deviation increase in sarcopenia index associated with</text>
<text class="body-text" x="15" y="65">7.6% reduction in diabetes risk (HR 0.924, 95% CI 0.832-1.026).</text>
</g>
</g>
<!-- Study Design section -->
<g id="study-design-section" transform="translate(0, 140)">
<rect class="card" filter="url(#dropshadow)" height="85" width="520"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M7 4 H 17 L 19 6 V 20 H 7 Z M 16 4 V 7 H 19 M10 12 H 16 M10 16 H 14"/>
</g>
<text class="section-title" x="50" y="27">Study Design</text>
<!-- Content area for study design -->
<g transform="translate(20, 50)">
<text class="body-text" x="10" y="0">• Population-based prospective cohort study (CHARLS, 2015-2020)</text>
<text class="body-text" x="10" y="25">• 7,718 adults aged ≥45 years; mean follow-up: 5.0 years with 501 diabetes cases</text>
</g>
</g>
<!-- Demographics section -->
<g id="demographics-section" transform="translate(0, 240)">
<rect class="card" filter="url(#dropshadow)" height="85" width="520"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M12 4 A 8 8 0 0 1 12 20 A 8 8 0 0 1 12 4 M 4 28 Q 12 20 20 28"/>
</g>
<text class="section-title" x="50" y="27">Study Population</text>
<!-- Key stats display -->
<g transform="translate(45, 60)">
<g transform="translate(0, 0)">
<text class="stat-number" x="35" y="0">7,718</text>
<text class="stat-label" x="35" y="20">Participants</text>
</g>
<g transform="translate(130, 0)">
<text class="stat-number" x="25" y="0">60</text>
<text class="stat-label" x="25" y="20">Median Age</text>
</g>
<g transform="translate(250, 0)">
<text class="stat-number" x="25" y="0">46.2%</text>
<text class="stat-label" x="25" y="20">Male</text>
</g>
<g transform="translate(370, 0)">
<text class="stat-number" x="35" y="0">501</text>
<text class="stat-label" x="35" y="20">Diabetes Cases</text>
</g>
</g>
</g>
<!-- Methods section -->
<g id="methods-section" transform="translate(0, 340)">
<rect class="card" filter="url(#dropshadow)" height="160" width="520"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M7 4 L 12 9 L 17 4 L 17 20 L 7 20 Z"/>
</g>
<text class="section-title" x="50" y="27">Methods</text>
<!-- Sarcopenia Index Formula with Illustration -->
<g transform="translate(25, 50)">
<rect fill="#f8f9fa" height="60" rx="8" ry="8" stroke="#e9ecef" width="470" x="0" y="0"/>
<text class="body-text" font-weight="bold" x="15" y="15">Sarcopenia Index Formula:</text>
<text class="body-text" font-style="italic" font-weight="bold" text-anchor="middle" x="220" y="30">
                        Serum Creatinine (mg/dL)
                    </text>
<line stroke="var(--dark-text)" stroke-width="1" x1="130" x2="305" y1="35" y2="35"/>
<text class="body-text" font-style="italic" font-weight="bold" text-anchor="middle" x="220" y="50">
                        Serum Cystatin C (mg/dL)
                    </text>
<text class="body-text" font-style="italic" font-weight="bold" text-anchor="middle" x="330" y="30">
                        × 100
                    </text>
</g>
<!-- Additional Methods -->
<g transform="translate(25, 125)">
<text class="body-text" x="0" y="0">• Quartiles: Q1 &lt;81.75, Q2 81.75-93.28, Q3 93.29-106.91, Q4 &gt;106.91</text>
<text class="body-text" x="0" y="20">• Diabetes: fasting glucose ≥7.0 mmol/L or physician diagnosis</text>
</g>
</g>
</g>
<!-- Right column - Charts and Graphs -->
<g id="right-column" transform="translate(540, 0)">
<!-- Hazard Ratio Chart -->
<g id="hazard-ratio-section">
<rect class="card" filter="url(#dropshadow)" height="240" width="600"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M7 20 V 8 M 12 20 V 4 M 17 20 V 12 M 4 20 H 20"/>
</g>
<text class="section-title" x="50" y="27">Risk of Diabetes by Sarcopenia Index Quartile</text>
<!-- Hazard Ratio Forest Plot -->
<g transform="translate(20, 50)">
<text class="chart-title" x="270" y="0">Hazard Ratio for Incident Diabetes Mellitus</text>
<text class="chart-subtitle" x="270" y="20">(Adjusted for demographic and clinical factors)</text>
<!-- X-axis -->
<line class="graph-axis" x1="80" x2="450" y1="170" y2="170"/>
<text class="graph-axis-label" x="80" y="185">0.5</text>
<text class="graph-axis-label" x="172" y="185">0.75</text>
<text class="graph-axis-label" x="265" y="185">1.0</text>
<text class="graph-axis-label" x="357" y="185">1.25</text>
<text class="graph-axis-label" x="450" y="185">1.5</text>
<!-- Reference line at HR=1.0 -->
<line class="reference-line" x1="265" x2="265" y1="50" y2="170"/>
<!-- HR points and confidence intervals -->
<!-- Q1 Reference -->
<line class="ci-line" x1="265" x2="265" y1="70" y2="70"/>
<circle cx="265" cy="70" fill="var(--chart-blue)" r="5"/>
<text class="body-text" text-anchor="start" x="5" y="70">Q1 (&lt;81.75)</text>
<text class="body-text" text-anchor="end" x="520" y="70">Reference</text>
<!-- Q2 -->
<line class="ci-line" x1="235" x2="285" y1="100" y2="100"/>
<circle cx="247" cy="100" fill="var(--chart-blue)" r="5"/>
<text class="body-text" text-anchor="start" x="5" y="100">Q2 (81.75-93.28)</text>
<text class="body-text" text-anchor="end" x="520" y="100">0.930 (0.724-1.193)</text>
<!-- Q3 -->
<line class="ci-line" x1="230" x2="280" y1="130" y2="130"/>
<circle cx="242" cy="130" fill="var(--chart-blue)" r="5"/>
<text class="body-text" text-anchor="start" x="5" y="130">Q3 (93.29-106.91)</text>
<text class="body-text" text-anchor="end" x="520" y="130">0.892 (0.685-1.162)</text>
<!-- Q4 -->
<line class="ci-line" x1="227" x2="277" y1="160" y2="160"/>
<circle cx="238" cy="160" fill="var(--chart-blue)" r="5"/>
<text class="body-text" text-anchor="start" x="5" y="160">Q4 (&gt;106.91)</text>
<text class="body-text" text-anchor="end" x="520" y="160">0.869 (0.657-1.150)</text>
</g>
</g>
<!-- Spline Curve Graph -->
<g transform="translate(0, 260)">
<rect class="card" filter="url(#dropshadow)" height="240" width="600"/>
<g transform="translate(15, 15)">
<rect class="icon-bg" height="24" width="24"/>
<path class="icon-path" d="M 4 12 H 20 M 12 4 V 20"/>
</g>
<text class="section-title" x="50" y="27">Relationship Between Sarcopenia Index and Diabetes Risk</text>
<!-- Spline Curve -->
<g transform="translate(20, 50)">
<text class="chart-title" x="270" y="0">Restricted Cubic Spline Analysis</text>
<text class="chart-subtitle" x="270" y="20">Higher sarcopenia index associated with lower diabetes risk</text>
<!-- Axes -->
<line class="graph-axis" x1="80" x2="450" y1="170" y2="170"/>
<line class="graph-axis" x1="80" x2="80" y1="170" y2="30"/>
<!-- X-axis labels -->
<text class="graph-axis-label" x="80" y="185">70</text>
<text class="graph-axis-label" x="172" y="185">100</text>
<text class="graph-axis-label" x="265" y="185">150</text>
<text class="graph-axis-label" x="357" y="185">200</text>
<text class="graph-axis-label" x="450" y="185">250</text>
<text class="graph-axis-label" x="265" y="205">Sarcopenia Index</text>
<!-- Y-axis labels -->
<text class="graph-axis-label-y" x="70" y="170">0.6</text>
<text class="graph-axis-label-y" x="70" y="120">1.0</text>
<text class="graph-axis-label-y" x="70" y="70">1.4</text>
<text class="graph-axis-label-y" x="70" y="30">1.8</text>
<text class="graph-axis-label-y" transform="rotate(-90,35,100)" x="35" y="100">Hazard Ratio</text>
<!-- Reference line at HR=1.0 -->
<line class="reference-line" x1="80" x2="450" y1="120" y2="120"/>
<!-- Spline curve -->
<path class="graph-line graph-line-1" d="M 80,55 C 125,80 170,105 195,120 C 220,135 265,142 357,150 C 403,153 450,155 450,157"/>
<!-- Confidence interval shading -->
<path class="graph-area graph-area-1" d="M 80,40 C 125,65 170,90 195,105 C 220,120 265,127 357,135 C 403,138 450,140 450,142 L 450,170 C 403,167 357,165 265,162 C 180,155 125,135 80,70 Z"/>
<!-- P-values -->
<text class="small-text" x="100" y="40">P-value = 0.245</text>
<text class="small-text" x="100" y="52">P-nonlinear = 0.489</text>
</g>
</g>
</g>
</g>
<!-- Footer -->
<g id="footer" transform="translate(30, 620)">
<rect fill="var(--primary-color)" height="30" width="1140"/>
<text class="footer-text" fill="white" x="20" y="15">Wang X, et al. European Journal of Medical Research (2025) 30:151</text>
<text class="footer-text" fill="white" text-anchor="middle" x="570" y="15">https://doi.org/10.1186/s40001-025-02405-w</text>
<text class="footer-text" fill="white" text-anchor="end" x="1120" y="15">© 2025</text>
</g>
</svg>`;
