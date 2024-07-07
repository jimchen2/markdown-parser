import { TreeNode } from "./types";

export const toggleExpandedNodes = (currentPath: string, isExpanded: boolean, prevExpandedNodes: Set<string>): Set<string> => {
  const newSet = new Set(prevExpandedNodes);
  if (isExpanded) {
    newSet.delete(currentPath);
  } else {
    newSet.add(currentPath);
  }
  return newSet;
};

export const getNodePath = (path: string, nodeName: string): string => {
  return path ? `${path}/${nodeName}` : nodeName;
};

export const isNodeExpanded = (currentPath: string, expandedNodes: Set<string>): boolean => {
  return expandedNodes.has(currentPath);
};

export const isNodeSelected = (currentPath: string, selectedItem: string | null): boolean => {
  return selectedItem === currentPath;
};

export const handleNodeSelection = (
  currentPath: string,
  node: TreeNode,
  setSelectedItem: (path: string) => void,
  onSelectDocument: (id: string) => void
) => {
  setSelectedItem(currentPath);
  node.document && onSelectDocument(node.document._id);
};

export const handleNodeDeletion = (e: React.MouseEvent, node: TreeNode, onDeleteDocument: (id: string) => void) => {
  e.stopPropagation();
  node.document && onDeleteDocument(node.document._id);
};
