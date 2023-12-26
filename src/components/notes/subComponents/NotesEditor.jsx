import { useTheme } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import plugins from "suneditor/src/plugins";

const NotesEditor = (props) => {
  const theme = useTheme();
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleChange = (content) => {};

  return (
    <Paper elevation={0} sx={{ borderRadius: "10px" }}>
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
          //   defaultValue="<p>The editor's default value</p>"
          setDefaultStyle="font-family:Arial; height:390px; width:100%; font-size: 14px; border-radius: 10px;"
          name="my-editor"
          setAllPlugins={false}
          placeholder="Enter Notes"
          autoFocus={true}
          getSunEditorInstance={getSunEditorInstance}
          setOptions={{
            plugins: plugins,
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                // "superscript",
              ],
              ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              "/", // Line break
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
              /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
              ["fullScreen", "showBlocks", "codeView"],
              ["preview", "print"],
              ["save", "template"],
              // ['dir', 'dir_ltr', 'dir_rtl'] // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
            ],
            colorList: [
              [
                "#ccc",
                "#dedede",
                "OrangeRed",
                "Orange",
                "RoyalBlue",
                "SaddleBrown",
              ],
            ],
          }}
        />
      </Box>
    </Paper>
  );
};
export default NotesEditor;
