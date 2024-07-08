export interface DocumentType {
  _id: string;
  title: string;
  body: string;
  date: string;
  type: string;
  access?: number;
}