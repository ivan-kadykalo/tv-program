import type { NextApiRequest, NextApiResponse } from 'next';

export function withGetHandler(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);

      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error('Error in GET handler:', error);
      res.status(500).end('Internal Server Error');
    }
  };
}