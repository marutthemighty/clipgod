import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const getWorkspace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = await supabase.from('workspaces').select('*').eq('id', id).single();
  res.json(data);
};
