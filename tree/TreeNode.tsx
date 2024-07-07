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
      <li className="my-1">
<div 
  className={`
    ${isSelected ? "bg-gray-200" : "bg-transparent"}
    hover:bg-gray-400
    p-2 rounded flex justify-between items-center cursor-pointer
  `}
  onClick={handleSelect}
>          <span title={node.name} className="truncate">{node.name}</span>
          <button onClick={handleDelete} title="Delete" className="ml-2 text-gray-600 hover:text-red-500">
            <span>&#x1F5D1;</span>
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="my-1">
      <div
        className="p-2 rounded flex items-center cursor-pointer hover:bg-gray-100"
        onClick={(e) => {
          handleSelect();
          toggleExpand(e);
        }}
      >
        <span className="mr-2">{isExpanded ? "▼" : "►"}</span>
        <span title={node.name} className="truncate">{node.name}</span>
      </div>
      {isExpanded && (
        <ul className="pl-4 mt-1">
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