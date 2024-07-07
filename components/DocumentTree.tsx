import React, { useState } from "react";
import { DocumentTreeProps } from "../tree/types";
import { buildTree } from "../tree/treeUtils";
import TreeNodeComponent from "../tree/TreeNode";
const DocumentTree: React.FC<DocumentTreeProps> = ({ documents, onSelectDocument, onDeleteDocument }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!documents || documents.length === 0) {
    return <div className="bg-white rounded-lg shadow-md px-4 py-2"></div>;
  }

  const tree = buildTree(documents);

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <ul>
        {Object.entries(tree.children).map(([key, node]) => (
          <TreeNodeComponent
            key={key}
            node={node}
            path=""
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            onSelectDocument={onSelectDocument}
            onDeleteDocument={onDeleteDocument}
          />
        ))}
      </ul>
    </div>
  );
};

export default DocumentTree;
