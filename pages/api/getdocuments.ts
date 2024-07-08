import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Document from "../../models/Document";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      if (query.id) {
        // Fetch a single document by ID
        const document = await Document.findById(query.id);
        if (!document) {
          return res.status(404).json({ success: false, message: "Document not found" });
        }
        return res.status(200).json(document);
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: "Error fetching document(s)" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
