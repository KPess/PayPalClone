import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";

class AllTransTable extends React.Component {
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
            </tr>
          </thead>
          <tbody>
            {this.props.transactions.map((transaction, index) => {
              return [
                <tr key={index}>
                  <th scope="transaction">{transaction.trans_id}</th>
                  <td>{transaction.username}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.trans_date}</td>
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

export default connect(mapStateToProps)(AllTransTable);
