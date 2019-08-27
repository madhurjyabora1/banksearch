import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import BankRow from './bankRows';
import './App.css';

window.React = React;

const BankList = ({ data }) => {
  let banks;
  if (data) {
    banks = data.map(function(item, index) {
      return <div key={index}>
      <BankRow key={item.ifsc} bank={item}/>
      </div>;
    });
  }
  return (
    <div id="project-comments" className="commentList">
      <ul>{banks}</ul>
    </div>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: [],
      offset: 0,
      searchTerm: "",
      perPage: 10
    };
  }

  performSearch(searchTerm) {
    // if (searchTerm === "") return;
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=" + searchTerm)
      .then(res => res.json())
      .then(data =>
        this.setState({
          banks: data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          ),
          pageCount: Math.ceil(data.length / this.state.perPage)
        })
      );
  }

  searchChangeHandler(e) {
    const searchTerm = e.target.value.toUpperCase();
    this.setState({ searchTerm });
    this.performSearch(searchTerm);
  }

  componentDidMount() {
    this.performSearch(this.state.searchTerm);
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset }, () => {
      this.performSearch(this.state.searchTerm);
    });
  };

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <h1>Bank Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <select
          className="broad-input"
          onChange={this.searchChangeHandler.bind(this)}
        >
          <option value="Choose">Choose</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Surat">Surat</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
        </select>
        {this.state.rows}

        <div className="commentBox" >
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            nextClassName={'pagination'} 
            previousClassName	={'previous'} 
            // previousLinkClassName	={'active'} 
            // nextLinkClassName={'active'} 
            containerClassName={'pagination'} 
            subContainerClassName={'pages pagination'} 
            activeClassName={'active'} 
          />
        </div>
        <BankList data={this.state.banks} />
      </div>
    );
  }
}


