import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import TempContent from '../../models/TempContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { htmlContent } = req.body;
      const trimmedHtmlContent = htmlContent.trim().replace(/\n/g, '');
            
      await TempContent.deleteMany({});
      
      // Store new content
      await TempContent.create({ content: trimmedHtmlContent });
      
      res.status(200).json({ message: 'HTML content stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store HTML content' });
    }
  } else if (req.method === 'GET') {
    try {
      const tempContent = await TempContent.findOne().sort({ createdAt: -1 });
      
      if (!tempContent) {
        return res.status(404).json({ error: 'No content found' });
      }
      
      res.status(200).json({ htmlContent: tempContent.content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve HTML content' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}