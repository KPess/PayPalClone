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
    deleteTransaction: (req, res) =>{

    },
    updateCurrency: (req, res) =>{

    },
    deleteCurrency: (req, res) =>{

    },
    addCurrency: (req, res) =>{

    },
    getCurrencies: (req, res) =>{

    }
}