import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const deleteUser = async (req: Request, res: Response) => {
  // GDPR wipe: Cascades handle deletion
  await supabase.auth.admin.deleteUser(req.user?.id);
  res.json({ success: true });
};

export const updateConsent = async (req: Request, res: Response) => {
  const { analytics_enabled, marketing_enabled } = req.body;
  await supabase.from('analytics_consent').update({ analytics_enabled, marketing_enabled }).eq('user_id', req.user?.id);
  res.json({ success: true });
};
