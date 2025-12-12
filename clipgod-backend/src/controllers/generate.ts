import { Request, Response } from 'express';
import { supabase, generateQueue } from '../config/env';
import { v4 as uuidv4 } from 'uuid';
import { triggerConfetti } from '../utils/confetti';

export const generate = async (req: Request, res: Response) => {
  const { source_url } = req.body;
  const workspace_id = req.user?.app_metadata.workspace_id || uuidv4(); // Assume from auth
  const generationId = uuidv4();

  await supabase.from('generations').insert({ id: generationId, workspace_id, source_url, status: 'pending' });

  await generateQueue.add('processVideo', { generationId, source_url }); // Queue job

  res.json({ jobId: generationId });
};

export const getStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase.from('generations').select('*').eq('id', id).single();
  res.json(data);
};

export const getClips = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase.from('clips').select('*').eq('generation_id', id);
  res.json(data);
};

export const getWinner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase.from('generations').select('winner_clip, confetti_triggers').eq('id', id).single();
  if (data.confetti_triggers) triggerConfetti(req.user?.id); // Winner Confetti moat
  res.json(data);
};

export const getCalendar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase.from('generations').select('calendar').eq('id', id).single();
  res.json(data);
};
