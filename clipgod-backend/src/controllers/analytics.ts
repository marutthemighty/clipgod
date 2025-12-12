import { Request, Response } from 'express';
import { supabase } from '../config/env';
import { updateShadowMetrics } from './shadow'; // Feed moats

export const uploadAnalytics = async (req: Request, res: Response) => {
  const { clip_id, views, likes } = req.body;
  await supabase.from('performance').update({ views, likes }).eq('clip_id', clip_id);
  updateShadowMetrics(req.user?.id); // Update Money Left/Shadow moats
  res.json({ success: true });
};

export const getDashboard = async (req: Request, res: Response) => {
  // Aggregate stats with consent check
  const { data: consent } = await supabase.from('analytics_consent').select('analytics_enabled').eq('user_id', req.user?.id).single();
  if (!consent.analytics_enabled) return res.status(403).json({ error: 'Consent required' });

  const { data } = await supabase.from('performance').select('*'); // Filtered by RLS
  res.json(data);
};

export const getClipAnalytics = async (req: Request, res: Response) => {
  const { clipId } = req.params;
  const { data } = await supabase.from('performance').select('*').eq('clip_id', clipId).single();
  res.json(data);
};
