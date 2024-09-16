import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Document from "../../models/Document";
import { withAuth } from '../../lib/auth';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { title, type } = req.body;
        const document = await Document.create({ title, type });
        res.status(201).json({ success: true, data: document });
      } catch (error) {
        res.status(400).json({ success: false, message: "Error creating document" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
});