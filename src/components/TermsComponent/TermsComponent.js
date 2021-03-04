import React, { useState } from "react";
import "./Terms.css";

const terms = [
  [
    "GL",
    "General Ledger; contains the source transaction and balances required to generate financial reports.",
  ],
  [
    "SFIS",
    "Standard Financial Information Structure; A defined structure for accounting data that provides common categorization of Department of Defense programs, assets, and liabilities.",
  ],
  [
    "ACL",
    "Audit Control Language; Company that provides software of the same name addressing audit, compliance",
  ],
];

const Terms = () => {
  const [clickedText, setClickedText] = useState([]);
  const [showClicked, setShowClicked] = useState(false);

  var handleClick = (i) => {
    setClickedText(terms[i]);
    setShowClicked(true);
  };

  return (
    <div className="terms-container-row">
      <div>
        <div className="definition-container">
          <div>
            {showClicked ? null : (
              <div>
                <p>{terms[0][0]}</p>
                <p>{terms[0][1]}</p>
              </div>
            )}
          </div>
          <div>
            {clickedText.map((t, i) => (
              <div>
                <p key={i}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="terms-container-column">
        {terms.map((text, i) => (
          <button
            className="terms-button"
            key={i}
            onClick={() => handleClick(i)}
          >
            {terms[i][0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terms;
