import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Document from "../../models/Document";
import { withAuth } from "../../lib/auth";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const documents = await Document.find({}, "_id title").lean();
      res.status(200).json({ success: true, data: documents });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "Error fetching document metadata." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
});
