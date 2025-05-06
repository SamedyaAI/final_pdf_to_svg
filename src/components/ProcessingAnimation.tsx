import React, { useState, useEffect } from 'react';

interface ProcessingAnimationProps {
  onComplete?: () => void;
  startTime: number;
}

export function ProcessingAnimation({ onComplete, startTime }: ProcessingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExtendedMessage, setShowExtendedMessage] = useState(false);
  
  const EXPECTED_TIME = 120; // 5 minutes in seconds
  const UPDATE_INTERVAL = 1000; // Update every second instead of 100ms

  useEffect(() => {
    let lastTime = Date.now();
    
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - lastTime) / 1000);
      
      setTimeElapsed(prev => {
        const newTime = prev + delta;
        // Calculate progress percentage (max 99% until complete)
        const newProgress = Math.min(99, (newTime / EXPECTED_TIME) * 100);
        setProgress(newProgress);

        // Show extended message after 80% of expected time
        if (newTime > EXPECTED_TIME * 0.8) {
          setShowExtendedMessage(true);
        }

        // Call onComplete when processing is done
        if (newTime >= EXPECTED_TIME && onComplete) {
          onComplete();
        }

        return newTime;
      });

      lastTime = now;
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [startTime, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimeRemaining = (seconds: number) => {
    const remaining = EXPECTED_TIME - seconds;
    if (remaining <= 0) return "Processing...";
    const minutes = Math.floor(remaining / 60);
    const remainingSeconds = remaining % 60;
    return `Estimated ${minutes}:${remainingSeconds.toString().padStart(2, '0')} remaining`;
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-sm">
      <div className="loader mb-6"></div>

      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gray-900">
          Processing your document...
        </p>
        <p className="text-sm text-gray-600">
          Time elapsed: {formatTime(timeElapsed)}
        </p>
        <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#CF4647] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          {showExtendedMessage
            ? "Taking longer than usual... Please wait"
            : formatTimeRemaining(timeElapsed)}
        </p>
      </div>
    </div>
  );
}
