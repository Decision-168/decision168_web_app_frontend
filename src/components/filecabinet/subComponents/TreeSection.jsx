import React, {memo} from "react";
import { Box } from "@mui/material";

const TreeSection = ({ value, nodes }) => {
  
  return (
    <Box>
      <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          {node.name}
          {/* {node.children && <TreeSection nodes={node.children} />} */}
        </li>
      ))}
    </ul>
    </Box>
  );
};

export default memo(TreeSection)