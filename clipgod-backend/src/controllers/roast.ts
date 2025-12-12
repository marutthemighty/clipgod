import { Request, Response } from 'express';
import { supabase } from '../config/env';
import { generateRoast } from '../utils/roastGenerator';

export const getRoast = async (req: Request, res: Response) => {
  const { data: profile } = await supabase.from('profiles').select('inactive_days').eq('id', req.user?.id).single();
  if (profile.inactive_days > 3) {
    const roast = generateRoast(profile.inactive_days); // AI roast moat
    res.json({ roast });
  } else {
    res.json({ message: 'Active user' });
  }
};
