'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Confetti } from '@/components/Confetti'; // Winner Confetti moat
import { Card } from '@/components/ui/card';

export default function GenerateDetail() {
  const { id } = useParams();
  const [generation, setGeneration] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchGeneration = async () => {
      const { data } = await supabase.from('generations').select('*').eq('id', id).single();
      setGeneration(data);
      if (data.status === 'complete' && data.confetti_triggers) {
        setShowConfetti(true);
        navigator.vibrate(200); // Haptics
        new Audio('/success.mp3').play(); // Sound
      }
    };
    fetchGeneration();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generation {id}</h1>
      {generation && (
        <Card className="p-4">
          <p>Status: {generation.status}</p>
          <p>Winner: {JSON.stringify(generation.winner_clip)}</p>
          <p>Calendar: {JSON.stringify(generation.calendar)}</p>
        </Card>
      )}
      {showConfetti && <Confetti />}
    </div>
  );
}
