import React, { useRef, useState, useEffect, useContext } from 'react';
import { Slide } from 'react-slideshow-image';
import { AppContext } from '../../context/AppContext';
import Quiz from 'react-quiz-component';
import { quiz } from '../Quiz/Quiz';
import QuizComponent from '../QuizComponent/QuizComponent.js';
import FlashCardList from '../Flashcard/FlashCardList.js';
import TermList from '../TermsComponent/TermsComponent.js';

function Slides() {
  // State management
  const slideRef = useRef();
  const context = useContext(AppContext);

  const [key, setKey] = useState();

  // Calculates and sets progress bar percentage after every slide change
  useEffect(() => {
    context.toggleProgress();

    // Removes back arrow on first slide
    if (context.currentSlide === 1) {
      document.querySelector(
        '#root > div > div.mx-auto.my-auto > div > div > div.undefined.nav'
      ).style.display = 'none';
    } else {
      document.querySelector(
        '#root > div > div.mx-auto.my-auto > div > div > div.undefined.nav'
      ).style.display = 'block';
    }

    // Removes next arrow on final slide
    if (context.currentSlide === context.total) {
      document.querySelector(
        '#root > div > div.mx-auto.my-auto > div > div > div.next-arrow.nav'
      ).style.display = 'none';
    } else {
      document.querySelector(
        '#root > div > div.mx-auto.my-auto > div > div > div.next-arrow.nav'
      ).style.display = 'block';
    }
  }, [context]);

  // On page load, this populates the index dropdown and hides back arrow on page one to
  useEffect(() => {
    context.compileIndex();
    console.log('compiled');
  }, []);

  // Changes slide to specific index from dropdown menu
  useEffect(() => {
    slideRef.current.goTo(parseInt(context.currentSlide, 10));
  }, [context.currentSlide]);

  // Resets Quiz key to random number and rerenders it... there's probably a better way to do this.
  function retakeQuiz() {
    return setKey(Math.random());
  }

  // React-Slideshow package settings
  const properties = {
    indicators: false,
    arrows: true,
    autoplay: false,
    defaultIndex: 0,
    prevArrow: (
      <div style={{ width: '30px', marginRight: '-30px' }}>
        <i className='fas fa-arrow-left'></i>

        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
        </svg> */}
      </div>
    ),
    nextArrow: (
      <div
        className='next-arrow'
        style={{ width: '30px', marginLeft: '-30px' }}
      >
        <i className='fas fa-arrow-right'></i>

        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        ><path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' /></svg> */}
      </div>
    ),
    onChange: (previous, next) => {
      context.onSlideChange(previous, next);
      console.log(context.currentSlide);
      console.log(slideRef);
    },
  };

  // Determines if Check on Learning has been completed and allows user to move forward
  // TODO: This keeps fudging up. Need to fix

  if (context.currentSlide === 2 && context.quizComplete === false) {
    console.log('Quiz shown');
    document.querySelector('.next-arrow').style.display = 'none';
  }

  // Sets post-quiz state
  const onCompleteAction = (obj) => {
    document.querySelector('.next-arrow').style.display = 'block';
    context.onQuizCompletion();
  };

  // Renders custom results page
  // TODO: Add button to rerender quiz.
  const renderCustomResultPage = (obj) => {
    console.log(obj);
    return (
      <div>
        <h4>Well done, you may now continue with the lesson.</h4>
        <button onClick={retakeQuiz} className='btn btn-primary'>
          Retake
        </button>
      </div>
    );
  };

  return (
    <>
      <div
        className='mx-auto my-auto'
        style={{
          top: '300px',
          height: '500px',
          width: '900px',
          backgroundColor: '#f4f4f4',
        }}
      >
        <Slide ref={slideRef} easing='ease' {...properties}>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <h3 className='slide-title'>Welcome to Financial Reporting</h3>
                <span>
                  Welcome to the lesson Financial Reporting and the introductory
                  module. Within this module you will be provided an overview of
                  material covered within the lesson. Subjects important to
                  understanding financial reporting such as key user roles, the
                  user process, reporting standards, and specific reports
                  pivotal to the process.
                </span>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col-8'>
                <div>
                  <h3 className='slide-title'>Lesson Objectives</h3>
                  <p>
                    This lesson encompasses methods necessary to performing
                    duties in the role of a Financial Reporter. The intent of
                    this lesson is to convey processes and tools needed to
                    leverage capabilities within GFEBS to produce data required
                    in the financial reporting process.
                  </p>
                  <ul>
                    <li>Describe the purpose of financial reporting.</li>
                    <li>Describe the benefits of reporting in GFEBS.</li>
                    <li>Identify important user roles.</li>
                    <li>Describe the end-to-end user process.</li>
                    <li>
                      Describe internal and external reporting capabilities in
                      GFEBS.
                    </li>
                    <li>
                      Define Standard Financial Information Structure (SFIS).
                    </li>
                    <li>Explain the purpose of SFIS.</li>
                    <li>Describe how GFEBS complies with SFIS.</li>
                    <li>
                      Define the Defense Departmental Reporting System (DDRS).
                    </li>
                    <li>Explain why GFEBS must use DDRS.</li>
                    <li>
                      Define the Business Enterprise Information System (BEIS).
                    </li>
                    <li>
                      Explain the relationship between BEIS, DDRS, and GFEBS.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Target Audience</h3>
                  <p>
                    The target audience for this course is anyone who is
                    assigned as a Financial Manager responsible for using GFEBS
                    in the production of reports according to the needs of the
                    organization.{' '}
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>GFEBS Training Disclaimer</h3>
                  <p>
                    Financial Reporting is based upon procedures and screens at
                    the time of development. Production environments are updated
                    on a regular basis and procedures and screens within this
                    lesson may not reflect the latest information.
                  </p>

                  <p>
                    For the most up to date information visit the GFEBS
                    Performance Support Website:
                  </p>

                  <a href='https://gfebs.army.mil/gm/'>
                    https://gfebs.army.mil/gm/
                  </a>
                  <br />
                  <p className='pt-3'>
                    After accessing the website, select either of the available
                    areas to find training content associated with this lesson.
                    You may be required to register your CAC to access this
                    site.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>
                    Instructional Seat Time / Prerequisites
                  </h3>
                  <p>
                    The GFEBS Financial Reporting courseware includes
                    approximately 10 hours of Interactive Multimedia
                    Instruction, including the Introduction, and 5 lessons.
                  </p>

                  <p>
                    The GFEBS Financial Reporting courseware includes lesson
                    checkpoints, practical exercises, simulations, and learning
                    assessments that provide opportunities to demonstrate
                    learning objective mastery.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Course Flow</h3>
                  <p>
                    The basic course flow and lessons contained within the GFEBS
                    Financial Reporting course are as listed below:
                  </p>
                </div>
                <ul>
                  <li>Introduction</li>
                  <li>Important User Roles</li>
                  <li>End-to-End User Process</li>
                  <li>Reporting Standards</li>
                  <li>Generated Reports Review</li>
                </ul>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Key Terms</h3>
                  <p>
                    We will start this module by going over some key terms in
                    the course.
                  </p>
                  <p>KEY TERMS</p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>
                    Background of Financial Reporting in GFEBS
                  </h3>
                  <p>
                    Prior to 1994, Federal agencies, including the Army,
                    prepared financial reports to monitor and control the
                    obligation and expenditure of budgetary resources.
                  </p>
                  <p>
                    With the enactment of the Chief Financial Officers Act of
                    1990, the Government Management Reform Act of 1994, and
                    subsequent accountability laws, Congress mandated that all
                    Federal agencies produce audited financial statements that
                    fully disclose their financial position for each year. These
                    financial statements accomplish two primary objectives:
                  </p>
                  <p>
                    <b>Accountability: </b>
                    Financial statements hold government agencies accountable
                    for their financial activities. The financial statements are
                    sent to external organizations, such as DoD, Treasury,
                    Office of Management and Budget (OMB), and Congress, as well
                    as the general public. The availability and visibility of
                    financial activities promotes a greater degree of fiscal
                    responsibility within the agency.
                  </p>
                  <p>
                    <b>Visibility: </b>
                    Financial statements provide internal management with better
                    data about their financial activities. This enables more
                    effective internal financial management practices,
                    especially in terms of budgeting, allocation of resources,
                    and procurement.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>How does GFEBS fit in?</h3>
                  <p>
                    The primary function of the Financials (FI) business process
                    area in GFEBS is to manage the Army's G/L for external
                    reporting purposes. FI ensures that all the Army's financial
                    transactions are recorded in the G/L and kept up to date so
                    that, when it comes time to send financial statements, the
                    data is current, accurate, and readily accessible.
                  </p>
                  <p>
                    By ensuring that the Army's G/L is up to date and in balance
                    at all times, FI enables GFEBS users to run reports, at any
                    time, that reflect the current financial status of the Army.
                    GFEBS' reporting capabilities enable the creation of
                    internal and external reports that meet DoD's standards for
                    timeliness, accuracy, and consistency.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>
                    Benefits of Financial Reporting in GFEBS
                  </h3>
                  <p>
                    <b>Real-time Data: </b>Reports generated in GFEBS reflect
                    real-time data. This means that GFEBS reports contain the
                    most up-to-date information in the system. A posting made to
                    the G/L appears in the G/L Account Balances Report seconds
                    after it is posted.
                  </p>
                  <p>
                    <b>On Demand Reports: </b> GFEBS also enables you to run
                    reports at any time. You do not need to wait for a nightly
                    batch job or a Month-End close to view financial
                    information. Select a report and click "execute" to produce
                    the report. To run the report later, schedule the exact time
                    that GFEBS should run the report.
                  </p>
                  <p>
                    <b>Customized Reports: </b> GFEBS allows you to save
                    different report layouts, customize individual report
                    results screens, and more in an effort to put you in control
                    of how your report results are displayed.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Types of Financial Reports</h3>
                  <p>There are two basic types of financial reports:</p>
                  <ul>
                    <li>
                      <b>External reports: </b>such as financial statements
                    </li>
                    <li>
                      <b>Internal reports: </b>such as account balance reports
                      and line item reports.
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>External Reports (1 of 2)</h3>
                  <p>
                    The FI business process area is responsible for managing the
                    G/L for external reporting purposes. However, GFEBS does not
                    create the Army’s actual financial statements. The following
                    details the exact process:
                  </p>
                  <ul>
                    <li>
                      FI sends GFEBS’ financial data via the Trial Balance to
                      the external system DDRS at the end of each month and
                      fiscal year.
                    </li>
                    <li>
                      DDRS uses the Trial Balance data to produce the Army
                      General Fund financial statements.
                    </li>
                    <li>
                      These statements are then sent to DoD, Treasury, and
                      Congress.
                    </li>
                  </ul>
                  <p>
                    DDRS is operated by the BEIS. DDRS uses the Trial Balance to
                    produce a number of financial statements for the Army. These
                    statements are then sent to DoD, Treasury, and Congress.
                  </p>
                  <p>
                    The details of this process are discussed later in this
                    course. GFEBS records and compiles the Army’s financial
                    data, then send it to DDRS at the end of each month and
                    fiscal year. DDRS uses the data to produce the Army General
                    Fund Financial Statements.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>External Reports (2 of 2)</h3>
                  <p>
                    This course will later discuss how to prepare the Trial
                    Balance in GFEBS to meet DDRS reporting standards, and how
                    to prepare two reports that are sent externally via
                    interface:
                  </p>
                  <p>
                    <b>TROR: </b>A report that the U.S. Treasury requires from
                    U.S. Government agencies that provides a status of their
                    portion of the public debt owed to the Government.
                  </p>
                  <p>
                    <b>SFIS Trial Balance: </b>A Trial Balance customized for
                    GFEBS that includes SFIS attributes required by DoD
                    reporting standards. SFIS classifications are comprehensive
                    "common business language" elements that support information
                    and data requirements for budgeting, financial accounting,
                    cost/performance management, and external reporting across
                    DoD enterprises. They identify and define data elements for
                    external reporting.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Internal Reports (1 of 2)</h3>
                  <p>
                    Internal reports are used by all business process areas in
                    GFEBS to accomplish everyday business needs. GFEBS includes
                    many standard reports, such as:
                  </p>
                  <ul>
                    <li>View an open item</li>
                    <li>
                      View summary information of transactions with a certain
                      customer or vendor
                    </li>
                    <li>Review documents posted to a certain G/L account</li>
                  </ul>
                  <p>
                    These standard reports can be customized in so many ways to
                    meet the Army's needs that it is impossible to discuss them
                    all.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Internal Reports (2 of 2)</h3>
                  <p>
                    This course will teach you how to run the key reports you
                    need on a day to day basis when performing FI transactions.
                    These reports include:
                  </p>
                  <ul>
                    <li>G/L Account Balance Report</li>{' '}
                    <li>Abnormal Balance Report</li>
                    <li>Federal Transaction Register Report</li>
                    <li>G/L Line Item Report</li>
                    <li>Vendor Line Item Report</li>{' '}
                    <li>Customer Line Item Report</li>{' '}
                    <li>
                      Trial Balance by Fund at the Standard General Ledger (SGL)
                      Account Level
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Learning Checkpoint</h3>
                  <p>
                    The following exercise consists of 6 questions to test your
                    comprehension of the previous information presented.
                  </p>
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
          <div className='slide'>
            <div className='row'>
              <div className='col-6'>
                <Quiz
                  quiz={quiz}
                  key={key}
                  continueTillCorrect={true}
                  showDefaultResult={false}
                  onComplete={onCompleteAction}
                  customResultPage={renderCustomResultPage}
                />
              </div>
              <div className='col-6 d-flex p-5 justify-content-center'>
                <img
                  style={{ height: '300px' }}
                  src='https://ssilrc.army.mil/resources/FMS/GFEBS/GFEBSLegacy/L413E/1FinancialReporting/html/images/qanda_-_info.png'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='slide'>
            <div className='row p-3 m-1'>
              <div className='col'>
                <div>
                  <h3 className='slide-title'>Summary</h3>
                  <p>
                    This concludes the introduction to the Financial Reporting
                    course. In this introduction, an overview of the course
                    flow, the background of financial reporting, the benefits of
                    reporting in GFEBS, and the two types of reports were
                    provided.
                  </p>
                  You may exit this module by clicking the <b>Exit</b> button.
                </div>
              </div>
              <div className='col'>IMAGE</div>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
}

export default Slides;
