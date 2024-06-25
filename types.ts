export interface DocumentMetadata {
  _id: string;
  title: string;
}

export interface DocumentType extends DocumentMetadata {
  date: string;
  type: string;
  body: string;
}