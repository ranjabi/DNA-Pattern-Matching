import { useState } from "react";

const MagicButton = ({diseasesList, testResult}) => {

  const [showAdvanced, setShowAdvanced] = useState(false);

  const magicButtonHandler = () => {
    if (showAdvanced) {
        setShowAdvanced(false);
    } else {
        setShowAdvanced(true);
    }
  };

  return (
    <div class="px-8 bg-primary">
      <button class="text-white" onClick={magicButtonHandler}>
        Show Database
      </button>
      <div class={showAdvanced ? "container" : "Hide"}>
        {/* <div className="container"> */}
        <div class="bg-secondary p-8 rounded-2xl">
          <p>Loaded sql:</p>
          <p>id, disease_name, dna_sequence</p>
          {diseasesList.map((val) => {
            return (
              <div style={{ textAlign: "left" }} key={val.id}>
                <label>
                  {val.id}, {val.disease_name}, {val.dna_sequence}
                </label>
              </div>
            );
          })}
        </div>
        <div class="bg-secondary p-8 rounded-2xl mx-4">
          <p>Loaded sql:</p>
          <p>id, dates, disease, dna_sequence, similarity, isInfected</p>
          {testResult.map((val) => {
            return (
              <div style={{ textAlign: "left" }} key={val.id}>
                <label>
                  {val.id}, {val.dates}, {val.username}, {val.disease},{" "}
                  {val.dna_sequence}, {val.similarity}%, {val.isinfected}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MagicButton;
