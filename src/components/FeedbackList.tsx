import React, { useEffect, useState } from 'react';
import { Star, StarOff, Calendar, FileText, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Feedback {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  visual_abstract_id: string | null;
  user_name: string;
  is_pre_generation: boolean;
}

interface VisualAbstract {
  id: string;
  title: string;
  template: string;
}

export function FeedbackList() {
  const [feedback, setFeedback] = useState<(Feedback & { visual_abstract?: VisualAbstract })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPreGenerationFeedback, setShowPreGenerationFeedback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('feedbackDashboardAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      fetchFeedback();
    } else {
      setLoading(false);
    }
  }, [showPreGenerationFeedback]);

  async function fetchFeedback() {
    try {
      let query = supabase
        .from('feedback')
        .select(`
          *,
          visual_abstract:visual_abstracts (
            id,
            title,
            template
          )
        `)
        .order('created_at', { ascending: false });

      if (showPreGenerationFeedback) {
        query = query.eq('is_pre_generation', true);
      } else {
        query = query.eq('is_pre_generation', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      setFeedback(data || []);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SamvedyaAI_health@2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('feedbackDashboardAuth', 'true');
      fetchFeedback();
      setAuthError(null);
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('feedbackDashboardAuth');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-100 p-3 rounded-full mb-4">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 text-sm mt-1">Enter password to view feedback</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>

            {authError && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Feedback Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPreGenerationFeedback(!showPreGenerationFeedback)}
              className={`text-sm ${
                showPreGenerationFeedback 
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {showPreGenerationFeedback ? 'Show Usage Feedback' : 'Show Template Feedback'}
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {showPreGenerationFeedback ? 'Template Feedback' : 'Usage Feedback'}
              </h2>
              <span className="text-sm text-gray-500">{feedback.length} responses</span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {feedback.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        i < item.rating ? (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff key={i} className="w-5 h-5 text-gray-300" />
                        )
                      ))}
                    </div>
                    
                    {item.comment && (
                      <p className="text-gray-600 mt-2">{item.comment}</p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                      
                      {item.visual_abstract && !item.is_pre_generation && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FileText className="w-4 h-4" />
                          {item.visual_abstract.title} ({item.visual_abstract.template})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {feedback.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No feedback available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}