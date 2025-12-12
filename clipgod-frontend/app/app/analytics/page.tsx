'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/stores/useAppStore';
import { Card } from '@/components/ui/card';
import { RoastModal } from '@/components/RoastModal'; // AI Roasts moat

export default function Analytics() {
  const { user, setStats, stats } = useAppStore();

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('performance').select('*');
      setStats(data);
      // Check inactive_days for roast moat
      const { data: profile } = await supabase.from('profiles').select('inactive_days').eq('id', user?.id).single();
      if (profile.inactive_days > 3) {
        // Trigger modal
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      {stats.map((stat) => (
        <Card key={stat.id} className="mb-4 p-4">
          <p>Views: {stat.views}</p>
          <p>Likes: {stat.likes}</p>
        </Card>
      ))}
      <RoastModal /> {/* Conditionally show based on inactive_days */}
    </div>
  );
}
