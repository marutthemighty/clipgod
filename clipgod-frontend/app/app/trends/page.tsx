'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Assume trends from backend proxy

export default function Trends() {
  const [globalTrends, setGlobalTrends] = useState<any[]>([]);
  const [personalTrends, setPersonalTrends] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      // Call backend /trends/global and /personal
      setGlobalTrends([]); // Placeholder
      setPersonalTrends([]); // Placeholder
    };
    fetchTrends();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trends</h1>
      <h2>Global</h2>
      {/* List trends */}
      <h2>Personal</h2>
      {/* List trends */}
    </div>
  );
}
