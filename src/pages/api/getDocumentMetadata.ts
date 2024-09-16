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
      
      // Fetch all documents
      const documents = await Document.find({}, "_id title type date").lean();
      
      // Count documents by type
      const typeCounts = documents.reduce((acc, doc) => {
        acc[doc.type] = (acc[doc.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Sort documents
      const sortedDocuments = documents.sort((a, b) => {
        if (typeCounts[b.type] !== typeCounts[a.type]) {
          return typeCounts[b.type] - typeCounts[a.type];
        }
        
        return - new Date(b.date).getTime() + new Date(a.date).getTime();
      });
      
      res.status(200).json(sortedDocuments);
    } catch (error) {
      res.status(400).json({ message: "Error fetching document metadata." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});
