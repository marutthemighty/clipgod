import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const BadgeGenerator = () => {
  const [days, setDays] = useState(0);
  const [badgeUrl, setBadgeUrl] = useState('');

  const generate = async () => {
    // Call backend /commitment
    const { data } = await supabase.from('commitments').insert({ days_goal: days, start_date: new Date() }).select('badge_url').single();
    setBadgeUrl(data.badge_url);
  };

  return (
    <div>
      <Input type="number" value={days} onChange={(e) => setDays(parseInt(e.target.value))} />
      <Button onClick={generate}>Generate Badge</Button>
      {badgeUrl && <img src={badgeUrl} alt="badge" />}
    </div>
  );
};
