import React from "react";
import { TreeNode } from "./types";

export interface TreeNodeProps {
  node: TreeNode;
  path: string;
  expandedNodes: Set<string>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
}