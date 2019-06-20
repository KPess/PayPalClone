module.exports = {
    getUserTransactions: async (req, res) =>{
        const db = req.app.get('db')
        const userTransactions = await db.getUserTransactions();
        return res.status(200).send(userTransactions)
    },
    addTransaction: (req, res) =>{

    },
    updateEmail: (req, res) => {

    },
    deleteAccount: (req, res) => {
        
    }
}