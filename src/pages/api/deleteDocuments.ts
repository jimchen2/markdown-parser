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

  if (method === "DELETE") {
    try {
      const { title } = req.body;
      const deletedDocument = await Document.findOneAndDelete({ title: title });
      if (!deletedDocument) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" });
      }
      res.status(200).json({ success: true, data: deletedDocument });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error deleting document" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});