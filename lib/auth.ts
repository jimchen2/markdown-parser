import { NextApiRequest, NextApiResponse } from 'next';

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const adminKey = process.env.ADMIN_KEY;
    const viewKey = process.env.VIEW_KEY;

    // If both keys are empty, don't apply any authentication
    if (!adminKey && !viewKey) {
      return handler(req, res);
    }

    const authKey = req.cookies.authKey;

    if (req.method === 'GET') {
      if (authKey !== adminKey && authKey !== viewKey) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    } else {
      if (authKey !== adminKey) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    }

    return handler(req, res);
  };
}