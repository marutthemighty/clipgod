'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/stores/useAppStore';
import { Card } from '@/components/ui/card';
import { FireStreak } from '@/components/FireStreak'; // Viral Streak moat
import { MoneyCard } from '@/components/MoneyCard'; // Money Left moat
import { ShadowWidget } from '@/components/ShadowWidget'; // Shadow Audience moat

export default function Dashboard() {
  const { user, setGenerations, generations } = useAppStore();

  useEffect(() => {
    const fetchGenerations = async () => {
      const { data } = await supabase.from('generations').select('*');
      setGenerations(data);
    };
    fetchGenerations();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <FireStreak />
      <MoneyCard />
      <ShadowWidget />
      {generations.map((gen) => (
        <Card key={gen.id} className="mb-4 p-4">
          <p>Source: {gen.source_url}</p>
          <p>Status: {gen.status}</p>
        </Card>
      ))}
    </div>
  );
}
