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

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.delete(currentPath);
      } else {
        newSet.add(currentPath);
      }
      return newSet;
    });
  };

  const handleSelect = () => {
    setSelectedItem(currentPath);
    node.document && onSelectDocument(node.document._id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    node.document && onDeleteDocument(node.document._id);
  };

  if (Object.keys(node.children).length === 0) {
    return (
      <li className="mb-1">
        <div
          className={`flex items-center justify-between p-2 rounded-md transition-all duration-2000 ease-in-out ${
            isSelected
              ? "bg-gray-200 shadow-inner"
              : "hover:bg-gray-100"
          }`}
          onClick={handleSelect}
        >
          <span className="truncate flex-grow cursor-pointer text-sm" title={node.name}>
            {node.name}
          </span>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors duration-2000 ml-2 p-1 rounded-full hover:bg-gray-200 flex-shrink-0"
            onClick={handleDelete}
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
        className={`cursor-pointer p-2 rounded-md flex items-center transition-all duration-2000 ease-in-out ${
          isSelected
            ? "bg-gray-200 shadow-inner"
            : "hover:bg-gray-100"
        }`}
        onClick={handleSelect}
      >
        <button
          className="mr-2 text-gray-500 focus:outline-none flex-shrink-0"
          onClick={toggleExpand}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-2000 ease-in-out ${
              isExpanded ? "transform rotate-90" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span 
          className={`truncate flex-grow ${
            isExpanded ? "font-medium text-base" : "font-normal text-sm"
          }`} 
          title={node.name}
        >
          {node.name}
        </span>
      </div>
      {isExpanded && (
        <ul className="ml-4 mt-1 border-l border-gray-200 transition-all duration-3=200 ease-in-out">
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