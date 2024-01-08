import { useTheme } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import plugins from "suneditor/src/plugins";

const Editor = (props) => {
  const theme = useTheme();
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleChange = (content) => {
    console.log(content); //Get Content Inside Editor
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          mt: 0,
          pt: 0,
          "& .sun-editor": {
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            borderRadius: "10px",
            fontSize: "14px",
            border: 0,
          },
          "& .se-toolbar": { borderRadius: "10px", border: 0 },
        }}
      >
        <SunEditor
          onChange={handleChange}
          setDefaultStyle="font-family:Arial; height:150px; width:100%; font-size: 14px; border-radius: 10px;"
          name="my-editor"
          setAllPlugins={false}
          placeholder="Enter Notes"
          getSunEditorInstance={getSunEditorInstance}
          setOptions={{
            plugins: plugins,
            buttonList: [["undo", "redo"], ["bold", "italic", "underline", "strike"], ["link", "table"], ["align", "lineHeight"], ["removeFormat"]],

            colorList: [["#ccc", "#dedede", "OrangeRed", "Orange", "RoyalBlue", "SaddleBrown"]],
          }}
        />
      </Box>
    </Paper>
  );
};
export default Editor;
