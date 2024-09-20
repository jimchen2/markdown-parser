import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Document from "../../models/Document";

interface DocumentResponse {
  _id: string;
  title: string;
  date: Date;
  type: string;
  access: number;
  body: string;
  ACCESS_DENIED?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, cookies } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      if (query.id) {
        const document = await Document.findById(query.id);
        if (!document) {
          return res.status(404).json({ success: false, message: "Document not found" });
        }

        const authKey = req.headers.authorization?.split(' ')[1];
        const viewKey = process.env.VIEW_KEY;
        const privateViewKey = process.env.PRIVATE_VIEW_KEY;
        const adminKey = process.env.ADMIN_KEY;

        let documentResponse: DocumentResponse = {
          _id: document._id,
          title: document.title,
          date: document.date,
          type: document.type,
          access: document.access,
          body: document.body,
        };

        if (document.access === 3 && authKey !== adminKey && authKey !== privateViewKey) {
          documentResponse = {
            ...documentResponse,
            ACCESS_DENIED: true,
            body: "Access denied",
          };
        } else if (document.access === 2) {
          if (viewKey && authKey !== adminKey && authKey !== privateViewKey && authKey !== viewKey) {
            documentResponse = {
              ...documentResponse,
              ACCESS_DENIED: true,
              body: "Access denied",
            };
          }
        }

        return res.status(200).json(documentResponse);
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: "Error fetching document" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
