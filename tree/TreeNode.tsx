import React from "react";
import { TreeNode } from "./types";

interface TreeNodeProps {
  node: TreeNode;
  path: string;
  expandedNodes: Set<string>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  path,
  expandedNodes,
  setExpandedNodes,
  selectedItem,
  setSelectedItem,
  onSelectDocument,
  onDeleteDocument,
}) => {
  const currentPath = path ? `${path}/${node.name}` : node.name;
  const isExpanded = expandedNodes.has(currentPath);
  const isSelected = selectedItem === currentPath;

  if (Object.keys(node.children).length === 0) {
    return (
      <li
        className={`hover:bg-gray-200 rounded-md p-2 transition-colors duration-200 ${
          isSelected ? "bg-gray-200" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className="truncate flex-grow cursor-pointer"
            title={node.name}
            onClick={() => {
              setSelectedItem(currentPath);
              node.document && onSelectDocument(node.document._id);
            }}
          >
            {node.name}
          </span>
          <button
            className="text-red-500 hover:text-red-700 ml-2 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              node.document && onDeleteDocument(node.document._id);
            }}
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="mb-2">
      <div
        className={`cursor-pointer hover:bg-gray-200 rounded-md p-1 flex items-center transition-colors duration-200 ${
          isSelected ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          setSelectedItem(currentPath);
          setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (isExpanded) {
              newSet.delete(currentPath);
            } else {
              newSet.add(currentPath);
            }
            return newSet;
          });
        }}
      >
        <span className="mr-2 text-gray-500">{isExpanded ? "▼" : ">"}</span>
        <span className="truncate flex-grow" title={node.name}>
          {node.name}
        </span>
      </div>
      {isExpanded && (
        <ul className="ml-2">
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