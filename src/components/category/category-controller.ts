import { Request, Response, NextFunction } from 'express';

export const validationSample = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (false) {
    res.status(400).end();
  } else {
    next();
  }
};

export const create = async (_: Request, res: Response) => {
  res.status(200).json({ yeeeee: 'yeee?' });
};
export const read = async (_: Request, res: Response) => {
  res.status(200).json({ yeeeee: 'yeee?' });
};
export const update = async (_: Request, res: Response) => {
  res.status(200).json({ yeeeee: 'yeee?' });
};
export const remove = async (_: Request, res: Response) => {
  res.status(200).json({ yeeeee: 'yeee?' });
};
export const search = (_: Request, res: Response) => {
  res.status(200).json({ yeeeee: 'yeee?' });
};
