import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

class UserRcvdTable extends React.Component {
  render(props) {
    // console.log(this.props.rcvdTransactions);
    return (
      <div>
        <h1>Received Transactions</h1>
        <Table hover className="responsive-table">
          <thead>
            <tr>
              <th>Transaction #</th>
              <th>Amount Received</th>
              <th>Sender's Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.rcvdTransactions.map((transaction, index) => {
              var date = transaction.trans_date;
              var shortdate = date.slice(0, 10);
              return [
                <tr key={index}>
                  <th scope="transaction">{transaction.trans_id}</th>
                  <td>${transaction.amount}</td>
                  <td>{transaction.email}</td>
                  <td>{shortdate}</td>
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

export default connect(mapStateToProps)(UserRcvdTable);
