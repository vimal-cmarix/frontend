import React from 'react';
import Link from 'next/link';
import {
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  FormGroup,
  CompanyBenefitsWrap,
  CardForm,
  CompanyBenefitList,
  Card,
} from './style';

const aboutCompany = () => {
  return (
    <BoxFormSection>
      {/* About Company */}
      <div className="container">
        <BoxFormWrap>
          <BoxFormTitle>
            <h2>About Company</h2>
          </BoxFormTitle>
          <BoxFormBody>
            <div className="top_selectors">
              <FormGroup>
                <Label>
                  Company size <span className="req-star">*</span>
                </Label>
                <select className="form-control">
                  <option>How many employees?</option>
                  <option>1 - 49</option>
                  <option>50 - 149</option>
                  <option>150 - 249</option>
                  <option>250 - 499</option>
                  <option>500 - 749</option>
                  <option>750 - 999</option>
                  <option>1000+</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label>Your biggest challenge</Label>
                <select className="form-control">
                  <option>Select an option</option>
                  <option>Applicant flow</option>
                  <option>Company branding</option>
                  <option>Resume screening</option>
                  <option>Writing job descriptions</option>
                  <option>Entry/Junior - level hires</option>
                  <option>Tracking applicants</option>
                  <option>Other</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label>How did you hear about us?</Label>
                <select className="form-control">
                  <option>Select an option</option>
                  <option>Search Engine (ex. Google, Bing, Yahoo)</option>
                  <option>Online Video</option>
                  <option>LinkedIn</option>
                  <option>Social Media</option>
                  <option>Email</option>
                  <option>Word of Mouth</option>
                  <option>Other</option>
                </select>
              </FormGroup>
            </div>
            <CompanyBenefitsWrap>
              <h3>Company Perks &amp; Benefits</h3>
              <div className="company-benefits-des">
                <p>
                  Organizations that list at least four noncash benefits
                  increase their applicant pool by <span>over 20%!</span>
                </p>
              </div>
              <CompanyBenefitList id="accordion">
                <Card>
                  <div className="card-header" id="headingOne">
                    <h3>
                      <button
                        type="button"
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        <svg
                          width="30"
                          height="27"
                          viewBox="0 0 30 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="a"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.306 9.94398C18.8619 9.49964 18.2594 9.25 17.6311 9.25C17.0029 9.25 16.4004 9.49964 15.9563 9.94398L15.4999 10.4004L15.0435 9.94398C14.1185 9.01898 12.6188 9.01898 11.6938 9.94398C10.7687 10.869 10.7687 12.3687 11.6938 13.2937L12.1501 13.7501L15.4999 17.0999L18.8496 13.7501L19.306 13.2937C19.7504 12.8496 20 12.2471 20 11.6189C20 10.9906 19.7504 10.3881 19.306 9.94398Z"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            className="b"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.6709 0.683772C11.5348 0.27543 11.1527 0 10.7222 0C10.2918 0 9.90965 0.27543 9.77354 0.683772L5.8348 12.5H1C0.447715 12.5 0 12.9477 0 13.5C0 14.0523 0.447715 14.5 1 14.5H6.55556C6.98599 14.5 7.36812 14.2246 7.50424 13.8162L10.7222 4.16228L11.7978 7.38889H13.9059L11.6709 0.683772ZM17.7948 19.0556H15.6866L18.1069 26.3162C18.243 26.7246 18.6251 27 19.0556 27C19.486 27 19.8681 26.7246 20.0042 26.3162L23.943 14.5H28.7778C29.3301 14.5 29.7778 14.0523 29.7778 13.5C29.7778 12.9477 29.3301 12.5 28.7778 12.5H23.2222C22.7918 12.5 22.4097 12.7754 22.2735 13.1838L19.0556 22.8377L17.7948 19.0556Z"
                            fill="#1D242F"
                          />
                        </svg>
                        Health and Wellness
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {/* <img src={process.env.PUBLIC_URL + '/img/health-icon.svg'} alt="health-icon" /> */}
                      </button>
                    </h3>
                  </div>
                  <div
                    id="collapseOne"
                    className="company-benefits-body collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <a href="/health-and-wellness" className="add-benefits-btn">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.9996 1.30518V7.00009M6.9996 7.00009H12.6945M6.9996 7.00009H1.30469M6.9996 7.00009V12.695"
                          stroke="#1D242F"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Add Health and Wellness Benefits
                    </a>
                  </div>
                </Card>
                <Card>
                  <div className="card-header" id="headingTwo">
                    <h3>
                      <button
                        type="submit"
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        {/* <img src={process.env.PUBLIC_URL + '/img/date-icon.svg'} alt="date-icon" /> */}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.75 7.5C3.75 6.11929 4.86929 5 6.25 5H23.75C25.1307 5 26.25 6.11929 26.25 7.5V25C26.25 26.3807 25.1307 27.5 23.75 27.5H6.25C4.86929 27.5 3.75 26.3807 3.75 25V7.5Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 2.5V7.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 2.5V7.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.75 12.5H26.25"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22.5 19L17.5 24"
                            stroke="black"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 19L22.5 24"
                            stroke="black"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Vacation and Time Office
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                  </div>
                  <div
                    id="collapseTwo"
                    className="company-benefits-body collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordion"
                  >
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt aliqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice
                      lomo. Leggings occaecat craft beer farm-to-table, raw
                      denim aesthetic synth nesciunt you probably havent heard
                      of them accusamus labore sustainable VHS.
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="card-header" id="headingThree">
                    <h3>
                      <button
                        type="button"
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        {/* <img src={process.env.PUBLIC_URL + '/img/financial-icon.svg'} alt="financial-icon" /> */}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                            stroke="#1D242F"
                            strokWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <g clipPath="url(#clip0)">
                            <path
                              d="M15 7.6665V22.3332"
                              stroke="#1D242F"
                              strokWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.3333 10.3335H13.3333C12.7145 10.3335 12.121 10.5793 11.6834 11.0169C11.2458 11.4545 11 12.048 11 12.6668C11 13.2857 11.2458 13.8792 11.6834 14.3167C12.121 14.7543 12.7145 15.0002 13.3333 15.0002H16.6667C17.2855 15.0002 17.879 15.246 18.3166 15.6836C18.7542 16.1212 19 16.7147 19 17.3335C19 17.9523 18.7542 18.5458 18.3166 18.9834C17.879 19.421 17.2855 19.6668 16.6667 19.6668H11"
                              stroke="#1D242F"
                              strokWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(7 7)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Financial &amp; Retirement
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                  </div>
                  <div
                    id="collapseThree"
                    className="company-benefits-body collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordion"
                  >
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt aliqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice
                      lomo. Leggings occaecat craft beer farm-to-table, raw
                      denim aesthetic synth nesciunt you probably havent heard
                      of them accusamus labore sustainable VHS.
                    </p>
                  </div>
                </Card>

                <Card className="card">
                  <div className="card-header" id="headingFour">
                    <h3>
                      <button
                        type="button"
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        {/* <img src={process.env.PUBLIC_URL + '/img/development-icon.svg'} alt="development-icon" /> */}
                        <svg
                          width="31"
                          height="29"
                          viewBox="0 0 31 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.5 27C22.4036 27 28 21.4036 28 14.5C28 7.59644 22.4036 2 15.5 2C8.59644 2 3 7.59644 3 14.5C3 21.4036 8.59644 27 15.5 27Z"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 22L15.5 12"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 16L12.5 14.5"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5 14.5L18.5 13"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.7803 17.8267C16.2392 18.133 16.7566 18.341 17.2998 18.4377C17.843 18.5345 18.4003 18.5177 18.9368 18.3886C19.4732 18.2595 19.9771 18.0208 20.4169 17.6875C20.8566 17.3542 21.2226 16.9336 21.4919 16.452C21.7612 15.9704 21.9279 15.4383 21.9816 14.8892C22.0353 14.34 21.9748 13.7857 21.8039 13.2611C21.633 12.7365 21.3554 12.2529 20.9885 11.8407C20.6217 11.4286 20.1736 11.0968 19.6723 10.8662C19.5588 10.8139 19.4691 10.721 19.4208 10.6058C19.0966 9.83367 18.5516 9.17446 17.8542 8.71088C17.1568 8.2473 16.338 8 15.5006 8C14.6631 8 13.8443 8.2473 13.1469 8.71088C12.4495 9.17446 11.9045 9.83367 11.5803 10.6058C11.532 10.721 11.4423 10.8139 11.3288 10.8662C10.8275 11.0967 10.3793 11.4285 10.0123 11.8407C9.64541 12.2528 9.36774 12.7364 9.19679 13.2611C9.02583 13.7858 8.96529 14.3401 9.01897 14.8893C9.07265 15.4385 9.23938 15.9707 9.50869 16.4523C9.778 16.9339 10.1441 17.3546 10.5838 17.6879C11.0236 18.0212 11.5276 18.2599 12.0641 18.389C12.6006 18.5181 13.158 18.5348 13.7013 18.438C14.2445 18.3412 14.7619 18.1331 15.2208 17.8267C15.3035 17.7711 15.4009 17.7415 15.5006 17.7415C15.6002 17.7415 15.6976 17.7711 15.7803 17.8267Z"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Professional Development
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                  </div>
                  <div
                    id="collapseFour"
                    className="company-benefits-body collapse"
                    aria-labelledby="headingFour"
                    data-parent="#accordion"
                  >
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt aliqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice
                      lomo. Leggings occaecat craft beer farm-to-table, raw
                      denim aesthetic synth nesciunt you probably havent heard
                      of them accusamus labore sustainable VHS.
                    </p>
                  </div>
                </Card>

                <Card>
                  <div className="card-header" id="headingFive">
                    <h3>
                      <button
                        type="button"
                        className="btn btn-link collapsed"
                        data-toggle="collapse"
                        data-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        {/* <img src={process.env.PUBLIC_URL + '/img/office-life-icon.svg'} alt="office-life-icon" /> */}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12H22C23.0609 12 24.0783 12.4214 24.8284 13.1716C25.5786 13.9217 26 14.9391 26 16C26 17.0609 25.5786 18.0783 24.8284 18.8284C24.0783 19.5786 23.0609 20 22 20H21"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12H21V21C21 22.0609 20.5786 23.0783 19.8284 23.8284C19.0783 24.5786 18.0609 25 17 25H9C7.93913 25 6.92172 24.5786 6.17157 23.8284C5.42143 23.0783 5 22.0609 5 21V12Z"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 5V8"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 5V8"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 5V8"
                            stroke="#1D242F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Office Life and Perks
                        <span className="toggle-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 12H16"
                              stroke="#1D242F"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                  </div>
                  <div
                    id="collapseFive"
                    className="company-benefits-body collapse"
                    aria-labelledby="headingFive"
                    data-parent="#accordion"
                  >
                    <p>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                      tempor, sunt aliqua put a bird on it squid single-origin
                      coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice
                      lomo. Leggings occaecat craft beer farm-to-table, raw
                      denim aesthetic synth nesciunt you probably havent heard
                      of them accusamus labore sustainable VHS.
                    </p>
                  </div>
                </Card>
              </CompanyBenefitList>
            </CompanyBenefitsWrap>
          </BoxFormBody>
          <BoxFormAction>
            <button type="submit" className="btn btn-skip-now">
              Skip for now
            </button>
            <Link href="/general-info">
              <>
                <button type="submit" className="btn">
                  Continue
                </button>
              </>
            </Link>
          </BoxFormAction>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );
};

export default aboutCompany;
