module.exports = {
    getAllTransactions: async (req, res) =>{
        const db = req.app.get('db')
        const allTransactions = await db.getAllTransactions();
        return res.status(200).send(allTransactions)
    },
    addTransaction: (req, res) =>{

    },
    updateTransaction: (req, res) =>{

    },
    deleteTransaction: async (req, res) =>{
        const db =   req.app.get('db')
        const {id} = req.params
        let deletedTransaction = await db.deleteTransaction(id)
        return res.status(200).send(deletedTransaction)
    },
    updateBalance: async (req, res) =>{
        const db = req.app.get('db')
        const {balance} = req.body
        const updatedBalance = await db.setBalance(balance)
        return res.status(200).json(updatedBalance)

    },
    deleteCurrency: (req, res) =>{

    },
    addCurrency: (req, res) =>{

    },
    getCurrencies: (req, res) =>{

    }
}