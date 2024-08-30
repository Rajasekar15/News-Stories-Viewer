/**
 *
 * SectionLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 19;
  justify-content: center;
  align-items: center;
  > .bg-container {
    width: 100%;
    height: 100%;
    background-color: #F9F9FA;
    opacity: 0.5;
  }
  > img {
    position: absolute;
    height: '40px';
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const pageLoader =   'https://assets.cltstatic.com/images/responsive/section-loader.gif';
/* eslint-disable react/prefer-stateless-function */
export class PageLoader extends React.PureComponent {
    
  render() {
    return (
      <Wrapper className="section-loader">
        <div className="bg-container" />
          <img src={pageLoader} alt="loader" />
      </Wrapper>
    );
  }
}

PageLoader.propTypes = {
  backgroundColor: PropTypes.string,
  imageHeight: PropTypes.string,
  circular: PropTypes.bool,
};

export default PageLoader;
