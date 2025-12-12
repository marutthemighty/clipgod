import { Request, Response } from 'express';
import { supabase } from '../config/env';
import { sendDopaminePush } from '../utils/dopaminePush';
import { checkinStreak } from './streak'; // Update streak moat

export const postClip = async (req: Request, res: Response) => {
  const { clip_id, platform } = req.body;
  // Placeholder: Integrate with platform APIs (TikTok/IG/YouTube)
  const postDate = new Date();
  await supabase.from('performance').insert({ clip_id, post_date });

  await checkinStreak(req, res); // Viral Streak Fire moat
  sendDopaminePush(req.user?.id, 'Live!'); // Dopamine moat

  res.json({ success: true });
};

export const schedulePosts = async (req: Request, res: Response) => {
  const { generation_id, dates } = req.body;
  // Placeholder: Schedule via cron or queue
  res.json({ success: true });
};
