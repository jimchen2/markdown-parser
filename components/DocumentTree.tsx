import React, { useState } from "react";
import { DocumentMetadata, DocumentTreeProps, TreeNode } from "../tree/types";
import { buildTree } from "../tree/treeUtils";
import TreeNodeComponent from "../tree/TreeNode";
const DocumentTree: React.FC<DocumentTreeProps> = ({
  documents,
  onSelectDocument,
  onDeleteDocument,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md px-4 py-2">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Documents</h2>
        <p className="text-gray-500"> No documents available.</p>
      </div>
    );
  }

  const tree = buildTree(documents);

  return (
    <div className="bg-white p-2 rounded-lg shadow-md max-h-[600px] overflow-y-auto">
      <ul className="font-normal">
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
