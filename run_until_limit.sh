#!/bin/bash
# Script to test rate limiting by repeatedly calling the API until a 500 error
# Usage: ./rate_limit_test.sh /path/to/your/pdf/file.pdf

# Check if PDF path is provided
if [ $# -eq 0 ]; then
    echo "Please provide the path to your PDF file"
    echo "Usage: $0 /path/to/your/pdf/file.pdf"
    exit 1
fi

PDF_PATH=$1
SERVER_URL="http://localhost:3000/api/process-pdf"
COUNTER=1
MAX_ATTEMPTS=1000  # Set a reasonable upper limit to prevent infinite loops

# SVG template - using the complex BMJ visual abstract template
SVG_TEMPLATE='<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <style>
      /* Color palette */
      :root {
        --primary-blue: #0072BC;
        --light-blue: #F0F4F7;
        --medium-blue: #50A0D0;
        --dark-blue: #005B94;
        --orange: #FDB913;
        --purple: #5B5FAE;
        --coral: #FF6F61;
        --dark-gray: #333333;
        --light-gray: #F5F5F5;
        --medium-gray: #AAAAAA;
        --stroke-gray: #E0E0E0;
        --white: #FFFFFF;
        --chart-area-purple: #A8A2D1;
        --chart-area-orange: #FDDC9A;
      }

      /* Text styles */
      text {
        font-family: Arial, Helvetica, sans-serif;
        fill: var(--dark-gray);
        dominant-baseline: central;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
      }

      .subtitle {
        font-size: 20px;
        font-weight: bold;
        fill: var(--primary-blue);
      }

      .body-text {
        font-size: 15px;
        line-height: 1.4;
      }

      .data-point {
        font-size: 16px;
        font-weight: bold;
      }

      .chart-title {
        font-size: 18px;
        font-weight: bold;
      }

      .chart-label {
        font-size: 13px;
      }

      .chart-data {
        font-size: 11px;
      }

      .stat-highlight {
        font-size: 22px;
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
        rx: 8;
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
        rx: 6;
        ry: 6;
      }

      .orange-box {
        fill: var(--orange);
        rx: 6;
        ry: 6;
      }

      .survival-line {
        fill: none;
        stroke: var(--purple);
        stroke-width: 2;
      }

      .survival-area {
        fill: var(--chart-area-purple);
        opacity: 0.6;
      }

      .admission-line {
        fill: none;
        stroke: var(--orange);
        stroke-width: 2;
      }

      .admission-area {
        fill: var(--chart-area-orange);
        opacity: 0.6;
      }

      .divider-line {
        stroke: var(--medium-gray);
        stroke-width: 1;
      }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="800" fill="var(--light-blue)" />
  
  <!-- Header -->
  <g id="header" transform="translate(20, 20)">
    <rect x="0" y="0" width="100" height="50" class="header-bg" rx="5" ry="5" />
    <text x="10" y="26" fill="white" font-size="18px" font-weight="bold">BMJ</text>
    <circle cx="130" cy="15" r="7" fill="none" stroke="var(--primary-blue)" stroke-width="1.5" />
    <circle cx="130" cy="15" r="3" fill="var(--primary-blue)" />
    <text x="150" y="15" font-size="14px">Visual abstract</text>
    <text x="450" y="15" class="title">Effects of intensive blood pressure treatment</text>
    <text x="450" y="45" class="title">on orthostatic hypertension</text>
  </g>
  
  <!-- Summary Section -->
  <g id="summary-section" transform="translate(20, 90)">
    <rect x="0" y="0" width="1160" height="100" class="card" />
    <g id="summary-icon" transform="translate(25, 30)">
      <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape" />
      <path d="M5 10 L 35 10 M5 20 L 25 20 M5 30 L 30 30" class="icon-path-white" />
    </g>
    <text x="85" y="51" class="subtitle">Summary</text>
    <g id="orthostatic-hypertension-definition" transform="translate(200, 20)">
      <text x="0" y="10" class="body-text">Orthostatic hypertension:</text>
      <text x="0" y="35" class="body-text">Increase in systolic BP ≥20 mm Hg or</text>
      <text x="0" y="60" class="body-text">diastolic BP ≥10 mm Hg after standing</text>
    </g>
    <line x1="450" y1="15" x2="450" y2="85" class="divider-line" />
    <g id="key-finding" transform="translate(480, 25)">
      <text x="0" y="10" class="body-text">Intensive blood pressure treatment</text>
      <text x="0" y="35" class="body-text">modestly reduced the occurrence</text>
      <text x="0" y="60" class="body-text">of orthostatic hypertension</text>
    </g>
    <line x1="780" y1="15" x2="780" y2="85" class="divider-line" />
    <g id="risk-reduction" transform="translate(810, 35)">
      <text x="0" y="10" class="stat-highlight">7%</text>
      <text x="75" y="10" class="body-text">reduced odds of</text>
      <text x="0" y="35" class="body-text">orthostatic hypertension with intensive treatment</text>
    </g>
  </g>
  
  <!-- Study Design -->
  <g id="study-design" transform="translate(20, 210)">
    <rect x="0" y="0" width="1160" height="80" class="card" />
    <g id="study-design-icon" transform="translate(25, 20)">
      <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape" />
      <path d="M10 5 L 30 5 M10 12 L 30 12 M10 19 L 30 19 M10 26 L 20 26 M10 33 L 25 33" class="icon-path-white" />
    </g>
    <text x="85" y="41" class="subtitle">Study design</text>
    <g transform="translate(300, 25)">
      <rect x="0" y="0" width="30" height="30" fill="#EEEEEE" stroke="var(--primary-blue)" stroke-width="1" rx="3" ry="3" />
      <path d="M7 15 L 23 15 M15 7 L 15 23" stroke="var(--primary-blue)" stroke-width="2" />
      <text x="45" y="8" class="body-text">Individual participant data meta-analysis</text>
      <text x="45" y="28" class="body-text">of 9 randomized controlled trials</text>
    </g>
    <line x1="620" y1="15" x2="620" y2="65" class="divider-line" />
    <g transform="translate(660, 25)">
      <text x="0" y="8" class="body-text">Participants:</text>
      <text x="0" y="28" class="body-text">31,124 adults with hypertension</text>
    </g>
    <g transform="translate(900, 25)">
      <text x="0" y="8" class="body-text">Measurements:</text>
      <text x="0" y="28" class="body-text">315,497 standing BP assessments</text>
    </g>
  </g>
  
  <!-- Participant Characteristics -->
  <g id="participant-characteristics" transform="translate(20, 310)">
    <rect x="0" y="0" width="1160" height="120" class="card" />
    <g id="data-sources-icon" transform="translate(25, 40)">
      <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape" />
      <circle cx="13" cy="15" r="6" fill="white" />
      <path d="M5 35 C 5 25, 21 25, 21 35 Z" fill="white" />
      <circle cx="27" cy="15" r="6" fill="white" />
      <path d="M19 35 C 19 25, 35 25, 35 35 Z" fill="white" />
    </g>
    <text x="85" y="61" class="subtitle">Participant characteristics</text>
    <g transform="translate(280, 25)">
      <rect x="0" y="0" width="30" height="30" fill="var(--primary-blue)" rx="3" ry="3" />
      <path d="M7 8 L 12 8 M 16 8 L 23 8 M 7 15 L 12 15 M 16 15 L 23 15 M 7 22 L 12 22 M 16 22 L 23 22" stroke="white" stroke-width="1.5" />
      <text x="45" y="8" class="body-text">Mean age: 67.6 years (SD 10.4)</text>
      <text x="45" y="28" class="body-text">47.4% women, 26.1% black</text>
    </g>
    <line x1="580" y1="15" x2="580" y2="105" class="divider-line" />
    <g transform="translate(620, 25)">
      <circle cx="10" cy="10" r="8" fill="var(--primary-blue)" />
      <path d="M3 25 C 3 18, 17 18, 17 25 Z" fill="var(--primary-blue)" />
      <circle cx="25" cy="10" r="8" fill="var(--primary-blue)" />
      <path d="M18 25 C 18 18, 32 18, 32 25 Z" fill="var(--primary-blue)" />
      <text x="45" y="8" class="stat-highlight">152.6/80.9</text>
      <text x="160" y="8" class="body-text">mm Hg</text>
      <text x="45" y="32" class="body-text">Mean seated blood pressure</text>
    </g>
    <line x1="860" y1="15" x2="860" y2="105" class="divider-line" />
    <g transform="translate(900, 20)">
      <circle cx="50" cy="40" r="35" fill="var(--primary-blue)" />
      <path d="M50 5 A 35 35 0 0 1 96.5 60 L 50 40 Z" fill="var(--white)" transform="rotate(-120, 50, 40)" />
      <text x="110" y="30" class="stat-highlight" fill="var(--primary-blue)">16.7%</text>
      <text x="110" y="55" class="body-text" fill="var(--primary-blue)">had orthostatic hypertension</text>
    </g>
  </g>
  
  <!-- Results -->
  <g id="results-section" transform="translate(20, 450)">
    <g id="results-header">
      <g id="results-icon" transform="translate(25, 0)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape" />
        <path d="M5 35 V 20 H 15 V 35 Z M 17 35 V 10 H 27 V 35 Z M 29 35 V 25 H 39 V 35 Z" stroke="white" fill="white" />
      </g>
      <text x="85" y="21" class="subtitle">Results</text>
    </g>
    
    <!-- Charts Area -->
    <g id="charts-area" transform="translate(0, 50)">
      <!-- Odds Ratios Chart -->
      <g id="odds-ratios-chart">
        <rect x="0" y="0" width="570" height="250" class="card" />
        <text x="25" y="30" class="chart-title">Odds Ratios for Orthostatic Hypertension</text>
        <rect x="350" y="15" width="190" height="80" class="purple-box" />
        <text x="360" y="35" class="small-white-text">Intensive treatment</text>
        <text x="360" y="55" class="small-white-text">reduced odds of</text>
        <text x="360" y="75" class="small-white-text">orthostatic hypertension</text>
        
        <!-- Odds Ratio Plot -->
        <g id="odds-ratios-plot" transform="translate(50, 110)">
          <rect x="0" y="0" width="500" height="120" fill="var(--white)" stroke="var(--stroke-gray)" />
          <!-- Y-axis labels -->
          <text x="-10" y="20" class="chart-label" text-anchor="end">1.2</text>
          <text x="-10" y="60" class="chart-label" text-anchor="end">1.0</text>
          <text x="-10" y="100" class="chart-label" text-anchor="end">0.8</text>
          
          <!-- Horizontal reference lines -->
          <line x1="0" y1="60" x2="500" y2="60" stroke="var(--medium-gray)" stroke-width="1" stroke-dasharray="5,5" />
          
          <!-- Plot points -->
          <circle cx="250" cy="65" r="6" fill="var(--purple)" />
          <line x1="200" y1="65" x2="300" y2="65" stroke="var(--purple)" stroke-width="2" />
          
          <!-- X-axis label -->
          <text x="250" y="140" class="chart-label" text-anchor="middle">Odds Ratio: 0.93 (95% CI 0.89-0.97)</text>
        </g>
      </g>
      
      <!-- Additional chart (on the right) -->
      <g id="second-chart" transform="translate(590, 0)">
        <rect x="0" y="0" width="570" height="250" class="card" />
        <text x="25" y="30" class="chart-title">Effects by Baseline Blood Pressure</text>
        
        <!-- Simple bar chart -->
        <g transform="translate(50, 60)">
          <rect x="0" y="0" width="500" height="170" fill="var(--white)" stroke="var(--stroke-gray)" />
          <!-- Bars -->
          <rect x="50" y="20" width="30" height="100" fill="var(--purple)" />
          <rect x="150" y="40" width="30" height="80" fill="var(--purple)" />
          <rect x="250" y="50" width="30" height="70" fill="var(--purple)" />
          <rect x="350" y="60" width="30" height="60" fill="var(--purple)" />
          
          <!-- Labels -->
          <text x="65" y="140" class="chart-data" text-anchor="middle">≤120</text>
          <text x="165" y="140" class="chart-data" text-anchor="middle">121-140</text>
          <text x="265" y="140" class="chart-data" text-anchor="middle">141-160</text>
          <text x="365" y="140" class="chart-data" text-anchor="middle">>160</text>
          <text x="250" y="160" class="chart-label" text-anchor="middle">Baseline Systolic Blood Pressure (mm Hg)</text>
        </g>
      </g>
    </g>
    
    <!-- Conclusions Section -->
    <g id="conclusions" transform="translate(0, 320)">
      <rect x="0" y="0" width="1160" height="80" class="card" />
      <g id="conclusions-icon" transform="translate(25, 20)">
        <rect x="0" y="0" width="40" height="40" rx="5" ry="5" class="icon-shape" />
        <path d="M10 10 L 30 10 M 10 20 L 30 20 M 10 30 L 30 30" class="icon-path-white" />
      </g>
      <text x="85" y="41" class="subtitle">Conclusions</text>
      <g transform="translate(300, 15)">
        <text x="0" y="15" class="body-text">Among adults with hypertension, intensive BP treatment modestly reduced the odds of</text>
        <text x="0" y="40" class="body-text">orthostatic hypertension, suggesting that concerns about orthostatic hypertension should not</text>
        <text x="0" y="65" class="body-text">be a barrier to implementing guideline-recommended intensive BP treatment.</text>
      </g>
    </g>
  </g>
  
  <!-- Footer -->
  <g id="footer" transform="translate(20, 760)">
    <text x="0" y="0" class="body-text">Source: Juraschek SP, et al. BMJ 2023;382:e074112</text>
  </g>
</svg>'

# Save the SVG template to a file
echo "$SVG_TEMPLATE" > template.svg

echo "Starting API call loop - will continue until error 500 or maximum attempts reached"
echo "Press Ctrl+C to stop manually"

while [ $COUNTER -le $MAX_ATTEMPTS ]; do
    echo "Attempt #$COUNTER..."
    
    # Make the API call and capture the HTTP response code
    HTTP_CODE=$(curl -s -o response.json -w "%{http_code}" \
        -X POST \
        -F "pdfFile=@$PDF_PATH" \
        -F "template=default" \
        -F "svgTemplate=@template.svg" \
        $SERVER_URL)
    
    # Check if we got a 500 error
    if [ "$HTTP_CODE" -eq 500 ]; then
        echo "Received HTTP 500 error on attempt #$COUNTER"
        echo "Response body:"
        cat response.json
        echo "Test completed - rate limit reached"
        break
    elif [ "$HTTP_CODE" -ne 200 ]; then
        echo "Received HTTP $HTTP_CODE error on attempt #$COUNTER"
        echo "Response body:"
        cat response.json
    else
        echo "Attempt #$COUNTER successful (HTTP 200)"
    fi
    
    # Increment counter and wait briefly to avoid hammering the server too hard
    COUNTER=$((COUNTER+1))
    sleep 0.5
done

# Clean up
rm -f response.json template.svg

if [ $COUNTER -gt $MAX_ATTEMPTS ]; then
    echo "Reached maximum number of attempts ($MAX_ATTEMPTS) without hitting rate limit"
fi