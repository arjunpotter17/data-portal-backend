import { Request, Response } from 'express';
import { fetchAvailableData } from '../services/dataService.js';

export const getDataForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const data = await fetchAvailableData(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};
