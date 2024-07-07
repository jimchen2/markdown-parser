export interface DocumentMetadata {
    _id: string;
    title: string;
  }
  
  export interface DocumentTreeProps {
    documents: DocumentMetadata[];
    onSelectDocument: (id: string) => void;
    onDeleteDocument: (id: string) => void;
  }
  
  export interface TreeNode {
    name: string;
    children: { [key: string]: TreeNode };
    document?: DocumentMetadata;
  }