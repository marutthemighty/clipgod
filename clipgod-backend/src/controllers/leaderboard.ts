import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const getLeaderboard = async (req: Request, res: Response) => {
  // Opt-in only, rank by views/likes
  const { data } = await supabase.from('leaderboard_optin')
    .select('display_name, performance.views, performance.likes')
    .eq('opted_in', true)
    .order('performance.views', { ascending: false })
    .limit(50)
    .join('performance', 'user_id'); // Simplified, use RPC for aggregate
  res.json(data);
};
