import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const getStreak = async (req: Request, res: Response) => {
  const { data } = await supabase.from('streaks').select('*').eq('user_id', req.user?.id).single();
  const fire_visible = data.current > 3; // Fire emoji logic
  await supabase.from('streaks').update({ fire_visible }).eq('user_id', req.user?.id);
  res.json(data);
};

export const checkinStreak = async (req: Request, res: Response) => {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase.from('streaks').select('*').eq('user_id', req.user?.id).single();

  let current = data.last_post_date === today ? data.current : data.last_post_date === yesterday() ? data.current + 1 : 1;
  const longest = Math.max(current, data.longest);

  await supabase.from('streaks').update({ current, longest, last_post_date: today }).eq('user_id', req.user?.id);

  if (current === 0) {
    // Shame logic: Send notification or update profile
  }

  if (!res.headersSent) res.json({ success: true });
};

const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};
