import { primary } from "@/themes/customs/palette";
import { getTransBackgroundColor } from "@/utils/colourUtils";
import { ChevronRightRounded } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Divider } from "@mui/material";
import React, { useState } from "react";

export default function FAQDropdown({
  question,
  answer,
  colour,
}: {
  question: string;
  answer: React.JSX.Element;
  colour: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={{
        "&:before": {
          display: "none",
          borderRadius: "0.5rem",
        },
        outline: "none",
        border: 0,
        borderRadius: "0.5rem",
        borderTopLeftRadius: "0.5rem",
        borderTopRightRadius: "0.5rem",
        backgroundColor: primary.background,
      }}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <AccordionSummary
        expandIcon={
          <ChevronRightRounded
            className="w-5 h-5"
            sx={{
              transform: `rotate(90deg)`,
              color: primary.dark,
            }}
          />
        }
        sx={{
          backgroundColor: open
            ? getTransBackgroundColor(`#${colour}`, 0.8)
            : getTransBackgroundColor(`#${colour}`, 0.3),
          borderRadius: "0.5rem",
          borderBottomLeftRadius: open ? "0" : "0.5rem",
          borderBottomRightRadius: open ? "0" : "0.5rem",
          fontSize: "12px",
          paddingY: 0,
          "&:hover": {
            backgroundColor: getTransBackgroundColor(`#${colour}`, 0.8),
          },
          color: primary.dark,
          
        }}
      >
        {question}
      </AccordionSummary>

      <AccordionSummary
        sx={{
          backgroundColor: getTransBackgroundColor(`#${colour}`, 0.3),
          borderRadius: "0.5rem",
          borderTopLeftRadius: open ? "0" : "0.5rem",
          borderTopRightRadius: open ? "0" : "0.5rem",
          fontSize: "12px",
          color: primary.dark,
        }}
      >
        {answer}
      </AccordionSummary>
    </Accordion>
  );

  //   return (
  //     <div className={`${open ? "mb-1": "mb-0"}`}>
  //       <Box
  //         className="w-full max-w-500 flex flex-col p-3 cursor-pointer duration-300"
  //         onClick={() => {
  //           setOpen(!open);
  //           console.log(open);
  //         }}
  //         sx={{
  //           backgroundColor: open
  //             ? getTransBackgroundColor(`#${colour}`, 0.8)
  //             : getTransBackgroundColor(`#${colour}`, 0.3),
  //           borderRadius: "0.5rem",
  //           borderBottomLeftRadius: open ? "0" : "0.5rem",
  //           borderBottomRightRadius: open ? "0" : "0.5rem",
  //           "&:hover": {
  //             backgroundColor: getTransBackgroundColor(`#${colour}`, 0.8),
  //           },
  //         }}
  //       >
  //         <div className="flex w-full text-xs justify-between">
  //           <span>{question}</span>
  //           <ChevronRightRounded
  //             className="w-5 h-5"
  //             sx={{
  //               transform: `rotate(${open ? 270 : 90}deg)`,
  //               transition: "transform 300ms",
  //             }}
  //           />
  //         </div>

  //         {/* <Divider/> */}
  //       </Box>
  //       {open && (
  //         <div
  //           className="rounded-b-lg duration-300 p-5 text-xs overflow-hidden"
  //           style={{
  //             backgroundColor: getTransBackgroundColor(`#${colour}`, 0.3),
  //             maxHeight: open ? "10000px" : "0px",
  //             transition: "max-height 300ms",
  //           }}
  //         >
  //           {answer}
  //         </div>
  //       )}
  //     </div>
  //   );
}
