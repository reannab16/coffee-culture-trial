import React, { useState } from "react";

const TruncateText = ({text, limit} : {text: string, limit: number}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    console.log(text, 'passing')

    const toggleText = () => {
        setIsExpanded(!isExpanded);
      };

      return (
        <span>
          {/* Show truncated text or full text based on state */}
          <span>
            {isExpanded ? text : `${text.slice(0, limit)}... `}
          </span>
    
          {/* Show the "See More" or "See Less" button */}
          {text.length > limit && (
            <button onClick={toggleText} className="underline pl-1">
              {isExpanded ? 'See Less' : 'See More'}
            </button>
          )}
        </span>
      );
    };

    export {TruncateText}