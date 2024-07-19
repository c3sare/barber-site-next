import { useEditorReturnType, type Node } from "@craftjs/core";
import { getRandomId } from "@craftjs/utils";

const copyNode = (
  query: useEditorReturnType["query"],
  node: Node,
  newId: string
) => {
  const newNode: Node = {
    ...node,
    id: newId,
    events: {
      dragged: false,
      hovered: false,
      selected: false,
    },
  };
  return query.parseFreshNode(newNode).toNode();
};

export const duplicateNode = (
  addToHistory: (
    nodeToAdd: Node | Node[],
    parentId?: string | undefined,
    index?: number | undefined
  ) => void,
  query: useEditorReturnType["query"],
  node: Node,
  parentId: string,
  index?: number
) => {
  if (!node || !parentId) return;
  const newId = getRandomId();
  const newNode = copyNode(query, node, newId);
  newNode.data.nodes = [];
  addToHistory(newNode, parentId, index);
  node.data.nodes.forEach((childNodeId) => {
    const childNode = query.node(childNodeId).get();
    const newChildNode = copyNode(query, childNode, getRandomId());
    duplicateNode(addToHistory, query, newChildNode, newId);
  });
};

export const getMaxAvailableWidth = (
  minWidth: number,
  leftBar: boolean,
  rightBar: boolean
) => {
  const width =
    window.innerWidth - 16 - (leftBar ? 300 : 0) - (rightBar ? 300 : 0);

  return width < minWidth ? minWidth : width;
};
