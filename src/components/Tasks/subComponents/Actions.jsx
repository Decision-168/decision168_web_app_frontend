import React from 'react'
import { Stack, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";


export default function Actions() {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <IconButton>
                <CommentIcon />
            </IconButton>
            <IconButton>
                <AttachmentIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </Stack>
    )
}
