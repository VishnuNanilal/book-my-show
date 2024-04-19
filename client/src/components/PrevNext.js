import React, { useState } from 'react';
import './PrevNext.css'; // Import your CSS file for styling

const PrevNext = ({ stageElements }) => {
  const [currentStage, setCurrentStage] = useState(1);

  const nextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const prevStage = () => {
    setCurrentStage((prevStage) => prevStage - 1);
  };

  const renderStageContent = stageElements[currentStage - 1]

  return (
    <div className="pn-cont">
      <div className="stage-elem-cont">{renderStageContent}</div>
      <div className="pn-nav-btns">
        <button onClick={prevStage} disabled={currentStage===1}>
          Previous
        </button>
        <button onClick={nextStage} disabled={currentStage===stageElements.length}>
          Next
        </button>
      </div>
    </div>
  );
};

// ... (same as before)

export default PrevNext;
