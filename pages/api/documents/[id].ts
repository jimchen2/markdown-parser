import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Document from "../../../models/Document";
import { withAuth } from '../../../lib/auth';

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const document = await Document.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!document) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }
        res.status(200).json({ success: true, data: document });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error updating document" });
      }
      break;

      case "DELETE":
        try {
          const deletedDocument = await Document.findByIdAndDelete(id);
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
        break;
  
  
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
});