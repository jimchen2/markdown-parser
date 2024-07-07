import React from "react";
import { TreeNodeProps } from "./TreeNodeTypes";
import { toggleExpandedNodes, getNodePath, isNodeExpanded, isNodeSelected, handleNodeSelection, handleNodeDeletion } from "./TreeNodeUtils";

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, path, expandedNodes, setExpandedNodes, selectedItem, setSelectedItem, onSelectDocument, onDeleteDocument }) => {
  const currentPath = getNodePath(path, node.name);
  const isExpanded = isNodeExpanded(currentPath, expandedNodes);
  const isSelected = isNodeSelected(currentPath, selectedItem);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => toggleExpandedNodes(currentPath, isExpanded, prev));
  };

  const handleSelect = () => handleNodeSelection(currentPath, node, setSelectedItem, onSelectDocument);
  const handleDelete = (e: React.MouseEvent) => handleNodeDeletion(e, node, onDeleteDocument);

  if (Object.keys(node.children).length === 0) {
    return (
      <li className={`hover:bg-gray-100 ${isSelected ? "bg-gray-200" : ""}`} onClick={handleSelect}>
        <span title={node.name}>{node.name}</span>
        <button onClick={handleDelete} title="Delete">
          <span>&#x1F5D1;</span>
        </button>
      </li>
    );
  } else
    return (
      <li className="p-2">
        <div
          className="hover:bg-gray-200"
          onClick={(e) => {
            handleSelect();
            toggleExpand(e);
          }}
        >
          {isExpanded ? "▼" : "►"}
          <span title={node.name}>{node.name}</span>
        </div>
        {isExpanded && (
          <ul className="px-4">
            {Object.entries(node.children).map(([key, childNode]) => (
              <TreeNodeComponent
                key={key}
                node={childNode}
                path={currentPath}
                expandedNodes={expandedNodes}
                setExpandedNodes={setExpandedNodes}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                onSelectDocument={onSelectDocument}
                onDeleteDocument={onDeleteDocument}
              />
            ))}
          </ul>
        )}
      </li>
    );
};

export default TreeNodeComponent;
