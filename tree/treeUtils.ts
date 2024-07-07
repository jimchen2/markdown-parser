import { DocumentMetadata, TreeNode } from "./types";

export const buildTree = (docs: DocumentMetadata[]): TreeNode => {
  const root: TreeNode = { name: "root", children: {} };
  docs.forEach((doc) => {
    const parts = doc.title.split("/");
    let currentNode = root;
    parts.forEach((part, index) => {
      if (!currentNode.children[part]) {
        currentNode.children[part] = { name: part, children: {} };
      }
      currentNode = currentNode.children[part];
      if (index === parts.length - 1) {
        currentNode.document = doc;
      }
    });
  });
  return root;
};