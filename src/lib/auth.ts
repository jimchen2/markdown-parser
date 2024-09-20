import { NextApiRequest, NextApiResponse } from "next";

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const adminKey = process.env.ADMIN_KEY;
    const viewKey = process.env.VIEW_KEY;
    const privateviewKey = process.env.PRIVATE_VIEW_KEY;

    const authKey = req.headers.authorization?.split(' ')[1];
    const method = req.method?.toUpperCase();

    // If both keys are empty, don't apply any authentication
    if (!adminKey && !viewKey) {
      return handler(req, res);
    }

    // For GET requests
    if (method === "GET") {
      // If there's no view key, allow all GET and POST requests
      if (!viewKey) {
        return handler(req, res);
      }

      // If there's a view key, check for either view key or admin key
      if (authKey === viewKey || authKey === privateviewKey || authKey === adminKey) {
        return handler(req, res);
      }
    }
    // For other methods (PUT, DELETE, etc.)
    else {
      // If there's no admin key, allow all requests
      if (!adminKey) {
        return handler(req, res);
      }

      // If there's an admin key, check for it
      if (authKey === adminKey) {
        return handler(req, res);
      }
    }

    // If we've reached this point, the authentication has failed
    return res.status(401).json({ success: false, message: "Unauthorized" });
  };
}
