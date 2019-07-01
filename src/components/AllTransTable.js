import React from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import {getTransactions} from '../redux/reducer';
import Axios from "axios";

class AllTransTable extends React.Component {
  handleDelete = trans_id => {
    Axios.delete(`/transactions/${trans_id}`).then(() =>
      this.getAllTransactions()
    )
  };
  getAllTransactions = e => {
    Axios.get("/transactions").then(response => {
      this.props.getTransactions(response.data);
    }).catch(error => {
      console.log('Request failed', error)
    });
  };
  

  // Delete ERROR:
  // Page does not update with refreshed transaction
  // list on admin dashboard when a transaction is deleted.

  render(props) {
    // console.log(this.props.transactions);
    return (
      <div>
        <h1>All Transactions</h1>
        <Table hover>
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
              return [
                <tr key={index}>
                  <th scope="transaction">{transaction.trans_id}</th>
                  <td>{transaction.username}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.trans_date}</td>
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

export default connect(mapStateToProps, {getTransactions})(AllTransTable);
