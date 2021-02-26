import React from "react";
import "./TermsComponent.css";

class TermsComponent extends React.Component {
  state = {
    term: "GL",
    definition: "General Ledger; contains the source transaction and balances required to generate financial reports.",
  };

  onClickButton1 = () => {
    this.setState({
      term: "GL",
      definition:
        "General Ledger; contains the source transaction and balances required to generate financial reports.",
    });
  };

  onClickButton2 = () => {
    this.setState({
      term: "SFIS",
      definition:
        "Standard Financial Information Structure; A defined structure for accounting data that provides common categorization of Department of Defense programs, assets, and liabilities.",
    });
  };

  onClickButton3 = () => {
    this.setState({
      term: "ACL",
      definition:
"Audit Control Language; Company that provides software of the same name addressing audit, compliance"    });
  };

  

  render() {
    return (
      <div className="terms-container-row">
        <div className="definition-container">
          <p>{this.state.term}</p>
          <p>{this.state.definition}</p>
        </div>
        <div className="terms-container-column">
          <button className="terms-button" onClick={this.onClickButton1}>
            GI
          </button>
          <button className="terms-button" onClick={this.onClickButton2}>
            SFIS
          </button>
          <button className="terms-button" onClick={this.onClickButton3}>
          ACL
          </button>
         
        </div>
      </div>
    );
  }
}

export default TermsComponent;
