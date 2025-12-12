import { Request, Response } from 'express';
import { supabase } from '../config/env';
import { calculateProjections } from '../utils/simulations';

export const getShadowMetrics = async (req: Request, res: Response) => {
  const { data } = await supabase.from('shadow_metrics').select('*').eq('user_id', req.user?.id).single();
  res.json(data);
};

export const updateShadowMetrics = async (userId: string) => {
  const projections = calculateProjections(userId); // Weekly projected/missed views from sims
  await supabase.from('shadow_metrics').update(projections).eq('user_id', userId);
};
