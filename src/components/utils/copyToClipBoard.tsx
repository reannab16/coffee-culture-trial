import React, { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { secondary } from '@/themes/customs/palette';

const CopyButton = ({ textToCopy }:{textToCopy: string}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the tooltip after 2 seconds
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
        <IconButton color="inherit" sx={{height: "24px", width: "24px"}}
        >
            {copied ? <CheckIcon sx={{height: "16px", width: "16px"}} /> : <ContentCopyIcon sx={{height: "16px", width: "16px"}} />}
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyButton;