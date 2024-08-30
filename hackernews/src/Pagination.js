import React from "react";
import { PaginationParentDiv, PaginationSpan } from "./styles";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      noOfPages: 5,
    };
  }
  goToNextPage = () => {
    const { currentPage, nPages, setCurrentPage = () => {} } = this.props;
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  goToPrevPage = () => {
    const { currentPage, setCurrentPage = () => {} } = this.props;
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  render() {
    const { currentPage, nPages, setCurrentPage = () => {} } = this.props;
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    return (
      <nav>
        <PaginationParentDiv>
          <PaginationSpan>
            <a
              onClick={() => this.goToPrevPage()}
              href="#"
            >
              Previous
            </a>
          </PaginationSpan>
          {pageNumbers.map((pgNumber) => (
            <PaginationSpan
              key={pgNumber}
            >
              <a
                onClick={() => setCurrentPage(pgNumber)}
                href="#"
              >
                {pgNumber}
              </a>
            </PaginationSpan>
          ))}
          <PaginationSpan>
            <a
              onClick={() => this.goToNextPage()}
              href="#"
            >
              Next
            </a>
          </PaginationSpan>
        </PaginationParentDiv>
      </nav>
    );
  }
}
