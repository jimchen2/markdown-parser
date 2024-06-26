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

    // If admin key is present, check for it
    if (adminKey) {
      if (authKey === adminKey) {
        return handler(req, res);
      }
    }

    // If view key is present, check for it (for both GET and POST)
    if (viewKey) {
      if (authKey === viewKey) {
        return handler(req, res);
      }
    }

    // If we've reached this point, the authentication has failed
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  };
}