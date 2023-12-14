import React from 'react';
import { Box } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';

const loaderContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const Loader = () => {
    return (
        <Box style={{ ...loaderContainerStyle }}>
            <RotatingLines
                type="TailSpin"
                strokeColor="grey"
                height={60}
                width={60}
                visible={true}
            />
        </Box>
    );
};

export default Loader;
