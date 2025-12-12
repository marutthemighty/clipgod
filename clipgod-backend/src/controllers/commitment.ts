import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const createCommitment = async (req: Request, res: Response) => {
  const { days_goal, start_date } = req.body;
  const badge_url = generateBadgeUrl(); // Placeholder: Generate shareable badge
  await supabase.from('commitments').insert({ user_id: req.user?.id, days_goal, start_date, badge_url });
  res.json({ badge_url });
};
