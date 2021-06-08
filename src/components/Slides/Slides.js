import React, { useRef, useState, useEffect, useContext } from "react";
import { Image } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { AppContext } from "../../context/AppContext";
import Quiz from "react-quiz-component";
import { quiz } from "../Quiz/Quiz";
import Terms from "../TermsComponent/TermsComponent.js";

//Image Imports
import endtoend from "../../img/endtoend.svg";
import objectives from "../../img/objectives.svg";
import RFD1 from "../../img/RecordFinancialData.svg";
import RFD2 from "../../img/RFD 2.jpg";
import RFD3 from "../../img/RFD 3.jpg";
import RFD4 from "../../img/RFD 4.jpg";
import Checkpoint from "../../img/module_checkpoint.svg";
import Shield from "../../img/shield.png";
import ReconcileFinancialData from "../../img/ReconcileFinancialData.jpg";
import ReconcileFinancialData1 from "../../img/ReconcileFinancialData1.svg";
import ConsumeFinancialData from "../../img/ConsumeFinancialData.svg";
import ConsumeFinancialDataE from "../../img/CFD-E.svg";
import ConsumeFinancialData1 from "../../img/ConsumeFinancialData1.jpg";

function Slides() {
  // State management
  const slideRef = useRef();
  const context = useContext(AppContext);
  const [lineItem, setLineItem] = useState(RFD2);
  const [lineItem2, setLineItem2] = useState(ReconcileFinancialData);
  const [key, setKey] = useState();

  // Calculates and sets progress bar percentage after every slide change
  useEffect(() => {
    context.toggleProgress();

    // Removes back arrow on first slide
    if (context.currentSlide === 1) {
      document.querySelector("#root > div > div.mx-auto.my-auto > div > div > div.undefined.nav").style.display =
        "none";
    } else {
      document.querySelector("#root > div > div.mx-auto.my-auto > div > div > div.undefined.nav").style.display =
        "block";
    }

    // Removes next arrow on final slide
    if (context.currentSlide === context.total || context.currentSlide === context.total - 1) {
      document.querySelector("#root > div > div.mx-auto.my-auto > div > div > div.next-arrow.nav").style.display =
        "none";
    } else {
      document.querySelector("#root > div > div.mx-auto.my-auto > div > div > div.next-arrow.nav").style.display =
        "block";
    }
  }, [context]);

  // On page load, this populates the index dropdown and hides back arrow on page one to
  useEffect(() => {
    context.compileIndex();
  }, []);

  // Changes slide to specific index from dropdown menu
  useEffect(() => {
    slideRef.current.goTo(parseInt(context.currentSlide, 10));
  }, [context.currentSlide]);

  // Resets Quiz key to random number and rerenders it... there's probably a better way to do this.
  function retakeQuiz() {
    return setKey(Math.random());
  }

  function continueQuiz() {
    document.querySelector("#root > div > div.mx-auto.my-auto > div > div > div.next-arrow.nav").style.display =
      "block";
  }

  // React-Slideshow package settings
  const properties = {
    indicators: false,
    arrows: true,
    autoplay: false,
    canSwipe: false,
    defaultIndex: 0,
    transitionDuration: 300,
    prevArrow: (
      <div style={{ width: "30px", marginRight: "-30px" }}>
        <i className="fas fa-arrow-left"></i>
      </div>
    ),
    nextArrow: (
      <div className="next-arrow" style={{ width: "30px", marginLeft: "-30px" }}>
        <i className="fas fa-arrow-right"></i>
      </div>
    ),
    onChange: (previous, next) => {
      context.onSlideChange(previous, next);
    },
  };

  // // Sets post-quiz state
  // const onCompleteAction = (obj) => {
  //   document.querySelector(".next-arrow").style.display = "block";
  //   context.onQuizCompletion();
  // };

  // Renders custom results page
  const renderCustomResultPage = (obj) => {
    return (
      <div>
        <h4>Well done, you may now continue with the lesson.</h4>
        <div className="flex-row">
          <button onClick={retakeQuiz} className="btn btn-primary">
            Retake
          </button>
          <button onClick={continueQuiz} className="btn btn-primary">
            Continue
          </button>
        </div>
      </div>
    );
  };

  // Get the modal
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img1");
  // Get the images
  var images = document.querySelectorAll(".slide-image");
  // Hide the modal
  function closeModal() {
    modal.style.display = "none";
  }
  //Loop through the images and add listener to each, set src of image to modal src.
  function enlargeImage() {
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("click", (e) => {
        console.log(e.target.src);
        modal.style.display = "block";
        modalImg.src = e.target.src;
      });
    }
  }

  return (
    <>
      <div
        className="mx-auto my-auto"
        style={{
          top: "300px",
          height: "500px",
          width: "900px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div id="myModal" className="modalStyle">
          <span onClick={closeModal} className="myClose">
            &times;
          </span>
          <img id="img1" className="myModal-content" />
          <div id="myCaption"></div>
        </div>

        <Slide ref={slideRef} easing="ease" {...properties}>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <h3 className="slide-title">Welcome to End-to-End User Process</h3>
                <br />
                <span>
                  In this module we will discuss an end-to-end overview of the GFEBS financial reporting process. We
                  will discuss how GFEBS interfaces with various external systems to produce financial statements.
                </span>
              </div>
              <div className="col">
                <Image fluid className="mt-5" src={endtoend} />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col-6">
                <h3 className="slide-title">Module Objectives</h3>
                <p>After completing this lesson, you will be able to:</p>
                <ul>
                  <li>Describe the recording financial data process</li>
                  <li>Explain how to reconcile financial data</li>
                  <li>Identify how financial data is consumed</li>
                </ul>
              </div>
              <div className="col">
                <Image fluid className="mt-2 py-3" src={objectives} alt="" />
              </div>
            </div>
          </div>
          <div className="row p-3 m-3">
            <div className="col">
              <div className="slide">
                <h3 className="slide-title">Key Terms</h3>
                <br />
                <Terms />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Record Financial Data 1 of 4</h3>
                  <p>
                    GFEBS accumulates data from different sources, external systems and introduce new GL/SFIS data into
                    GFEBS ECC via interfaces. Custom programs created in GFEBS ECC for each inbound interface
                    automatically process incoming data in order to post the data into ECC tables as financial/
                    accounting entries.
                  </p>
                </div>
                <div>
                  <Image fluid className="slide-image" src={RFD1} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Record Financial Data 2 of 4</h3>
                  <p>Listed below are some of the systems that interface with GFEBS ECC:</p>
                  <div>
                    <button className="btn btn-primary ml-1" onClick={(e) => setLineItem(RFD2)}>
                      <span>G/L Account Line Item Report </span>
                    </button>
                    <button className="btn btn-primary ml-1" onClick={(e) => setLineItem(RFD3)}>
                      <span>Vendor Line Item Report</span>
                    </button>
                    <Image
                      fluid
                      className="slide-image"
                      onClick={enlargeImage}
                      src={lineItem}
                      alt="Line Item Reports"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Record Financial Data 3 of 4</h3>
                  <p>
                    Financial data is also generated from within the GFEBS environment’s integrated GFEBS Business
                    Process Area when personnel execute GFEBS ECC accounting transactions. The following table lists
                    various financial/ accounting transactions made directly in GFEBS ECC:
                  </p>
                  <Image fluid className="slide-image" src={RFD4} alt="Line Item Reports" />
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Record Financial Data 4 of 4</h3>
                  <p>
                    In addition to external systems and native GFEBS ECC transactions, GFEBS BI also creates and adjusts
                    financial transactions on a limited basis, and ultimately sends the related accounting entries back
                    to GFEBS ECC.
                  </p>
                  <p>
                    As indicated above, GFEBS ECC accumulates data from three primary sources, on which GFEBS BI will
                    later report:
                  </p>
                  <ul>
                    <li>External Interfaces</li>
                    <li>GFEBS ECC</li>
                    <li>GFEBS BI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <h3 className="slide-title">Reconcile Financial Data 1 of 4</h3> <br />
                <span>
                  For certain business processes, after recording the financial data into GFEBS ECC from external
                  systems, a reconciliation process/ procedure is initialized using tools available in both ECC and BI.
                </span>
                <span>
                  The following table lists GFEBS business processes that employ the reconciliation procedure and the
                  steps in the GFEBS reconciliation process with DCAS for payroll:
                </span>
                <br />
                <div className="col">
                  <br />
                  <button
                    className="btn btn-primary m-1 "
                    style={{ width: "200px" }}
                    onClick={(e) => setLineItem2(ReconcileFinancialData)}
                  >
                    GFEBS Business Processes
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    style={{ width: "200px" }}
                    onClick={(e) => setLineItem2(ReconcileFinancialData1)}
                  >
                    GFEBS Reconciliation process
                  </button>
                </div>
              </div>
              <div className="col">
                <Image onClick={enlargeImage} fluid className="slide-image" src={lineItem2} alt="Line Item Reports" />
                <p>Click to Enlarge Image</p>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Reconcile Financial Data 3 of 4</h3>
                  <h4>Reconciliation Process: DCAS Inbound Data & Initial Matching:</h4>
                  <p>
                    GFEBS receives multiple cash transaction files daily from DCAS to post new transactions or to
                    reconcile with existing transactions. One of the cash transaction files is the Posting file, which
                    contains disbursements and collections data.
                  </p>
                </div>
              </div>
              <div className="col">
                <p>Examples of disbursements data:</p>
                <ul>
                  <li>Interfund bill changes</li>
                  <li>Externally-entitles pre-validated contract payments</li>
                  <li>Vendor payments</li>
                  <li>Travel payments</li>
                  <li>Reimbursable sales order changes</li>
                </ul>
                <p>Examples of collections data:</p>
                <ul>
                  <li>Reimbursable billing collections</li>
                  <li>Debt collections</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Reconcile Financial Data 4 of 4</h3>
                  <h4>Reconciliation Process: Auto Recycle Program:</h4>
                  <p>
                    An Auto-Recycle program automatically searches for unmatched disbursements/collections posted by the
                    interface program and attempts to match/clear obligations/collections in GFEBS ECC.
                  </p>
                  <p>
                    GFEBS personnel work to clear unmatched disbursements/collections manually in conjunction with the
                    Auto-Recycle program.
                  </p>
                </div>
              </div>
              <div className="col">
                <h4>Reconciliation Process: Manual 1081 Transactions (GFEBS Transaction Code ZSFI_1081):</h4>
                <p>
                  GFEBS personnel execute GFEBS ECC transaction ZSFI_1081 to manually process unmatched
                  disbursements/collections. Many users can execute the 1081 transaction simultaneously.
                </p>
                <p>
                  For disbursements, this transaction allows the user to reverse the unmatched disbursement document
                  previously posted by the interface program and to clear the original Vendor obligation.
                </p>
                <h4>Reconciliation Process: Outbound to DCAS:</h4>
                <p>
                  Once the entries into the 1081 custom table completes, GFEBS ECC sends the information to DCAS, daily
                  via an outbound interface to DCAS.
                </p>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Consume Financial Data (Internal) 1 of 2</h3>
                  <p>
                    GFEBS BI regularly loads the following SFIS relevant financial data resulting from processing
                    performed or captured in GFEBS ECC:
                  </p>
                  <ul>
                    <li>SFIS Financial Data</li>
                    <li>Unmatched Items</li>
                  </ul>
                  <p>
                    NOTE: GFEBS BI loads the SFIS data daily to account for the continual flow of financial postings
                    generated by GFEBS ECC.
                  </p>
                </div>
              </div>
              <div className="col">
                <Image
                  onClick={enlargeImage}
                  fluid
                  className="slide-image mt-5 py-5"
                  src={ConsumeFinancialData1}
                  alt="ConsumerFinancialData"
                />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Consume Financial Data (Internal) 2 of 2</h3>
                  <br />
                  <p>
                    Data is made available for BI financial reporting to persons with the Financial Reporter role. The
                    Financial Reporter role provides access to SFIS reporting on both summary and detail levels. Below
                    is a partial list of financial reports available:
                  </p>
                  <ul>
                    <li>Consolidated Trial Balance</li>
                    <li>Consolidated Reconciliation and Analysis</li>
                    <li>SFIS Summary Analysis</li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <Image fluid className="slide-image mt-1 py-1" src={ConsumeFinancialData} alt="consumerfinancialdata" />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Consume Financial Data (External) 1 of 2</h3>
                  <br />
                  <p>
                    GFEBS uses data stored in GFEBS BI to provide financial data to external parties. This section
                    discusses two processes where GFEBS sends its financial data to external systems:
                  </p>
                  <ul>
                    <li>To DDRS</li>
                    <li>To ACL</li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <Image fluid onClick={enlargeImage} className="slide-image mt-5" src={ConsumeFinancialDataE} alt="" />
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Consume Financial Data (External) 2 of 2</h3>
                  <h4>To DDRS:</h4>
                  <ul>
                    <li>
                      The personnel responsible for sending GFEBS’ financial data to DDRS initiate the process by
                      executing a custom transaction manually in GFEBS BI.
                    </li>
                    <li>
                      This custom transaction (GFEBS transaction code ZFI_DDRS_BI) is not the typical GFEBS BI report
                      and has no relation to a GFEBS BI report although the transaction was created in GFEBS BI.
                    </li>

                    <li>
                      This custom transaction in GFEBS BI starts a series of other custom programs in GFEBS ECC which
                      perform the following 2 tasks:
                    </li>
                    <ul>
                      <li>
                        Gather relevant GFEBS financial data from GFEBS ECC tables (primarily the SFIS totals table).
                      </li>
                      <li>
                        Aggregate or summarize the gathered data along the SFIS related fields in accordance with the
                        SFIS requirements for reporting.
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
              <div>
                <h4>To ACL:</h4>
                <ul>
                  <li>
                    Army Audit Readiness (DASA-FOA) requires GFEBS to send financial data to the ACL system.
                    Periodically, the GFEBS Audit Support Team extracts financial data from GFEBS BI using extraction
                    methods and custom programs directly at the database level. The team applies various custom logic
                    supplied by DASA-FOA to relate the data before the team sends the data to ACL.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Lesson Checkpoint</h3>
                  <p>
                    The following exercise consists of 4 questions to test your comprehension of the previous
                    information presented.
                  </p>
                </div>
              </div>
              <div className="col">
                <Image
                  fluid
                  className="mt-2 py-3"
                  src={Checkpoint}
                  alt="checkpoint"
                  style={{ width: "350px", height: "350px" }}
                />
              </div>
            </div>
          </div>

          <div className="slide">
            <div className="row p-1 m-1">
              <div className="col">
                <div>
                  <Quiz
                    quiz={quiz}
                    key={key}
                    continueTillCorrect={true}
                    showDefaultResult={false}
                    customResultPage={renderCustomResultPage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="row p-3 m-1">
              <div className="col">
                <div>
                  <h3 className="slide-title">Summary</h3>
                  <p>
                    This concludes the End-to-End User Process module. In this module, we covered what systems interface
                    with GFEBS, how data is recorded, when the data is reconciled, and the role ECC & BI plays in the
                    process.
                  </p>
                  <p>You now should be able to:</p>
                  <ul>
                    <li>Describe the recording financial data process</li>
                    <li>Explain how to reconcile financial data</li>
                    <li>Identify how financial data is consumed</li>
                  </ul>
                  <p>
                    You may exit this module by clicking the <strong>Exit</strong> button.
                  </p>
                </div>
              </div>
              <div className="col">
                <Image fluid className="mt-5 py-3 ml-3" src={Shield} alt="" />
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
}

export default Slides;
