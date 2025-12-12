import { Request, Response } from 'express';

export const getGlobalTrends = async (req: Request, res: Response) => {
  // Placeholder: Aggregate from DB or external API
  res.json({ hooks: [], sounds: [] });
};

export const getPersonalTrends = async (req: Request, res: Response) => {
  // Placeholder: Based on user data
  res.json({ hooks: [], sounds: [] });
};
