/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const increaseCount = (obj, type) => {
  // If the type is already in the object, increase its count, otherwise set it to 1
  if (obj.hasOwnProperty(type)) {
    obj[type] += 1;
  } else {
    obj[type] = 1;
  }
};

const getNodeData = (node, nodeData = {}) => {
  if (node.type === "MediaContainer") {
    return nodeData;
  }
  // Check if the current node has children and if they are not an empty array
  if (node.allChildren && node.allChildren.length > 0) {
    // Iterate over all children
    node.allChildren.forEach((child) => {
      // Increase the count for the current type
      increaseCount(nodeData, child.type);
      // Recursively call getNodeData for each child that has its own children
      // ... unless it's a MediaContainer
      if (child.type === "MediaContainer") {
        return;
      }
      if (child.allChildren && child.allChildren.length > 0) {
        getNodeData(child, nodeData);
      }
    });
  }
  return nodeData;
};

export { getNodeData };
