import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

export function FeedbackButton() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowFeedback(true)}
        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Give Feedback</span>
      </button>

      {showFeedback && (
        <FeedbackForm
          onClose={() => setShowFeedback(false)}
          onSubmit={() => setShowFeedback(false)}
        />
      )}
    </>
  );
}