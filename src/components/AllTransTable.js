import React from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { getTransactions } from "../redux/reducer";
import Axios from "axios";

class AllTransTable extends React.Component {
  handleDelete = trans_id => {
    Axios.delete(`/transactions/${trans_id}`).then(() =>
      this.getAllTransactions()
    );
  };
  getAllTransactions = e => {
    Axios.get("/transactions")
      .then(response => {
        this.props.getTransactions(response.data);
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };

  render(props) {
    return (
      <div id="table_container">
        <h1>All Transactions</h1>
        <Table hover className="responsive-table">
          <thead>
            <tr>
              <th>Transaction #</th>
              <th>Username</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.transactions.map((transaction, index) => {
              var date = transaction.trans_date;
              var shortdate = date.slice(0, 10);
              return [
                <tr key={index}>
                  <th scope="transaction">{transaction.trans_id}</th>
                  <td>{transaction.username}</td>
                  <td>${transaction.amount}</td>
                  <td>{shortdate}</td>
                  <td>
                    <Button
                      className="delete-trans"
                      onClick={() => this.handleDelete(transaction.trans_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(
  mapStateToProps,
  { getTransactions }
)(AllTransTable);
