module.exports = {
  getUserTransactions: async (req, res) => {
    const db = req.app.get("db");
    const userTransactions = await db.getUserTransactions();
    return res.status(200).send(userTransactions);
  },
  getSentTransactions: async (req, res) => {
    const db = req.app.get("db");
    const sentTransactions = await db.getSent(req.session.user.id);
    return res.status(200).send(sentTransactions);
  },
  getRcvdTransactions: async (req, res) => {
    const db = req.app.get("db");
    const rcvdTransactions = await db.getReceived(req.session.user.id);
    return res.status(200).send(rcvdTransactions);
  },
  addTransaction: (req, res) => {},
  updateBalance: async (req, res) => {
    const db = req.app.get('db')
    const {sendAmount, recipID, userid} = req.body
    const updatedTransaction = await db.addSendTrans(sendAmount, recipID, userid)
    // console.log(updatedTransaction)
    return res.status(200).json(updatedTransaction)
  },
  deleteAccount: (req, res) => {},
  loadDeposit: async (req, res) => {
    const db = req.app.get('db')
    const {balance} = req.body
    const updatedBalance = await db.loadDeposit(balance, req.session.user.id)
    return res.status(200).json(updatedBalance)
  }
}