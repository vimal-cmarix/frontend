import React from 'react';
import Link from 'next/link';
import {
  Label,
  Label1,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  FormGroup,
  FormGroupMB,
  UploadVideoWrap,
  UploadVideoBody,
  CheckboxField,
  CompensationLabel,
  CompensationRangeGroup,
} from './style';

const generalInfo = () => {
  return (
    <BoxFormSection>
      {/* About Company */}
      <div className="container">
        <BoxFormWrap>
          <form>
            <BoxFormTitle>
              <a href="/aboutcompany" className="head-back-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#1D242F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <h2>1 of 3: General Info</h2>
            </BoxFormTitle>

            <BoxFormBody>
              <h4 className="filled-title">1/6 Areas Filled</h4>
              <h3 className="form-group-title">Working at [Company Name]</h3>

              <FormGroup>
                <Label>
                  Why join us <span className="req-star">*</span>
                </Label>
                <textarea className="form-control" placeholder="Why join us">
                  This is a great place to tell people why your company would be
                  a great fit and what your mission is.
                </textarea>
                <div className="text-count">XXX/XXX</div>
              </FormGroup>

              <UploadVideoWrap>
                <h4>Upload video</h4>
                <p>Why should this candidate work here?</p>
                <p>
                  <span>80% of HR leaders</span> say sharing employer branding
                  has a significant impact on their ability to attract strong
                  talent!
                </p>
                <UploadVideoBody>
                  <div className="upload-drop-area">
                    <input type="file" />
                    {/* <img src={process.env.PUBLIC_URL + '/img/upload-cloud-icon.svg'} alt="upload-cloud-icon" />  */}
                    <svg
                      width="50"
                      height="48"
                      viewBox="0 0 50 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M34 32L26 24L18 32"
                        stroke="#485768"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M26 24V42"
                        stroke="#485768"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M42.7802 36.7799C46.7929 34.5923 48.8119 29.9624 47.6846 25.5333C46.5572 21.1042 42.5705 18.0029 38.0002 17.9999H35.4802C33.8223 11.5876 28.385 6.85948 21.8046 6.10813C15.2241 5.35678 8.86095 8.73749 5.80031 14.6111C2.73967 20.4847 3.61431 27.6369 8.00015 32.5999"
                        stroke="#485768"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M34 32L26 24L18 32"
                        stroke="#485768"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="or">
                    <span>OR</span>
                  </div>
                  <FormGroupMB>
                    <Label>Link</Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Copy-paste link here!"
                    />
                  </FormGroupMB>
                </UploadVideoBody>
              </UploadVideoWrap>

              <FormGroup>
                <Label>
                  Job Title <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Title"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Company <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search company"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Location <span className="req-star">*</span>
                </Label>
                <select className="form-control">
                  <option>In-Office</option>
                  <option>In-Office</option>
                  <option>In-Office</option>
                  <option>In-Office</option>
                  <option>In-Office</option>
                </select>
              </FormGroup>

              <FormGroup>
                <Label>
                  Job location <span className="req-star">*</span>
                </Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job location"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  Employment type <span className="req-star">*</span>
                </Label>
                <select className="form-control">
                  <option>Select an option</option>
                  <option>Select an option 1</option>
                  <option>Select an option 2</option>
                  <option>Select an option 3</option>
                  <option>Select an option 4</option>
                </select>
              </FormGroup>

              <CompensationRangeGroup>
                <CompensationLabel>
                  Compensation range <span className="req-star">*</span>
                </CompensationLabel>
                <div className="range-group">
                  <select className="form-control">
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                  </select>
                  <input
                    type="text"
                    className="form-control text-right"
                    placeholder="$"
                  />
                </div>
                <div className="range-group">
                  <input type="text" className="form-control" placeholder="$" />
                  <select className="form-control">
                    <option>Per Year</option>
                    <option>Per Year</option>
                    <option>Per Year</option>
                  </select>
                </div>
              </CompensationRangeGroup>

              <CheckboxField>
                <div className="checkbox-inner">
                  <input type="checkbox" className="checkbox" />
                  <Label1>Additional compensation</Label1>
                </div>
              </CheckboxField>

              <CompensationRangeGroup>
                <CompensationLabel>
                  Compensation range <span className="req-star">*</span>
                </CompensationLabel>
                <div className="range-group">
                  <select className="form-control">
                    <option>USD</option>
                    <option>USD</option>
                    <option>USD</option>
                  </select>
                  <input
                    type="text"
                    className="form-control text-right"
                    placeholder="$"
                  />
                </div>
                <div className="range-group">
                  <input type="text" className="form-control" placeholder="$" />
                  <select className="form-control">
                    <option>Per Year</option>
                    <option>Per Year</option>
                    <option>Per Year</option>
                  </select>
                </div>
              </CompensationRangeGroup>
            </BoxFormBody>

            <BoxFormAction>
              <Link href="/aboutcompany">
                <button type="submit" className="btn" disabled>
                  Get started
                </button>
              </Link>
            </BoxFormAction>
          </form>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );
};

export default generalInfo;
