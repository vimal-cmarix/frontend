import React from 'react';
import Link from 'next/link';
import {
  Label,
  BoxFormSection,
  BoxFormWrap,
  BoxFormBody,
  BoxFormTitle,
  BoxFormAction,
  InsideSelectList,
  ListBody,
  ListOne,
  BenefitSearch,
} from './style';

const healthWellness = () => {
  return (
    <BoxFormSection>
      {/* Health and Wellness */}
      <div className="container">
        <BoxFormWrap>
          <BoxFormBody>
            <InsideSelectList>
              <div className="list_header">
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
                <h3>Health and Wellness</h3>
                <a href="/aboutcompany2" className="list-save-btn">
                  Save
                </a>
              </div>
              <BenefitSearch>
                <div className="search-field">
                  <i className="search-icon" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Start typing to filter benefits..."
                  />
                </div>
              </BenefitSearch>
              <ListBody>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>Gym membership</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>HSA Account</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>FSA Account</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>Long-term disability</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>dental insurance</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>health reimbursement account</Label>
                </ListOne>
                <ListOne>
                  <input type="checkbox" className="checkbox" />
                  <Label>life insurance</Label>
                </ListOne>
              </ListBody>
            </InsideSelectList>
          </BoxFormBody>
        </BoxFormWrap>
      </div>
    </BoxFormSection>
  );
};

export default healthWellness;
