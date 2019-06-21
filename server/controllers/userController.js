module.exports = {
    getUserTransactions: async (req, res) =>{
        const db = req.app.get('db')
        const userTransactions = await db.getUserTransactions();
        return res.status(200).send(userTransactions)
    },
    getSentTransactions: async (req, res) =>{
        const db = req.app.get('db')
        const sentTransactions = await db.getSent(req.session.user.id);
        return res.status(200).send(sentTransactions)
    },
    getRcvdTransactions: async (req, res) =>{
        const db = req.app.get('db')
        const rcvdTransactions = await db.getReceived(req.session.user.id);
        return res.status(200).send(rcvdTransactions)
    },
    addTransaction: (req, res) =>{

    },
    updateEmail: (req, res) => {

    },
    deleteAccount: (req, res) => {
        
    }
}