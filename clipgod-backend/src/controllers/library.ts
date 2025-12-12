import { Request, Response } from 'express';
import { supabase } from '../config/env';

export const getLibrary = async (req: Request, res: Response) => {
  const { search } = req.query;
  const { data } = await supabase.from('clips').select('*').ilike('hook', `%${search}%`); // Searchable
  res.json(data);
};
