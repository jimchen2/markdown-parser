import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Document from "../../../models/Document";
import { withAuth } from '../../../lib/auth';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { title } = req.query;
        if (!title) {
          return res
            .status(400)
            .json({ success: false, message: "Title parameter is required" });
        }
        const document = await Document.findOne({ title: title });
        if (!document) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }
        res.status(200).json({ success: true, data: document });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error fetching document" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
});
