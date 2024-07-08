export interface DocumentType {
  _id: string;
  title: string;
  body: string;
  date: Date;
  type: string;
  access?: number;
}