import React, { useEffect, useState } from 'react'
import Header from '../Componenets/header/header'
import '../App.css'
import Cards from '../Componenets/Cards/cards';
import Addincome from './Modals/addincome.js';
import Addexpence from './Modals/addexpense.js';
import { addDoc, collection, getDoc, getDocs, query, } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';
import { db, auth } from '../firebase';
import TransactionTable from '../Componenets/TransactionTable';
import NoTransaction from '../Componenets/Notransactions/noTransaction';
import Charts from '../Componenets/Charts/charts.js';
function Dashboard() {
  const [users] = useAuthState(auth);
  const [loader, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showIncomeModal, setshowIncomeModal] = useState(false);
  const [showExpenseModal, setshowExpenseModal] = useState(false);

  function modalIncome() {
    setshowIncomeModal(true);
  }
  function modalExpense() {
    setshowExpenseModal(true);
  }
  function cancleModalIncome() {
    setshowIncomeModal(false);

  }
  function cancleModalExpense() {
    setshowExpenseModal(false);
  }

  function onFinish(values, type) {
    const newTransaction = {
      type: type,
      date: values.Date.format("YYYY-MM-DD"),
      amount: parseFloat(values.Amount),
      name: values.Name,
      tag: values.Tag,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction , many) {
    try {

      console.log("hey", users.uid);
      const docRef = await addDoc(collection(db, `users/${users.uid}/transactions`), transaction);
      fetchTransactions();
      console.log("hey", docRef.id)
      if(!many) toast.success("Transaction Added!")
      if(transaction.type === "income"){
        setshowIncomeModal(false);
      }
      else{
        setshowExpenseModal(false);
      }
    }
    catch (e) {
      if(!many) toast.error(e.message)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [users])

  async function fetchTransactions() {
    if (users) {
      const q = query(collection(db, `users/${users.uid}/transactions`));
      const querySnapShot = await getDocs(q);
      let transactionsArray = [];
      querySnapShot.forEach((doc) => {
        transactionsArray.push(doc.data())
      });
      setTransactions(transactionsArray);
    }
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions])


  function calculateBalance(){
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction)=>{
      if(transaction.type === "income"){
        incomeTotal += transaction.amount;
      }
      else{
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setBalance(incomeTotal - expenseTotal);
  };

  const sortedTrans = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    });

  return (
    <div>
      <Header logout={true} />
      {loader ? (<p>Loading....</p>) :
        (<>
          <Cards 
          showmodalIncome={modalIncome} 
          showmodalExpense={modalExpense}
          income={income}
          expense={expense}
          balance={balance}
           />
          <Addincome showIncomeModals={showIncomeModal} cancleModalIncomes={cancleModalIncome} onFinish={(values) => onFinish(values, "income")} />
          <Addexpence showExpenseModals={showExpenseModal} cancleModalExpenses={cancleModalExpense} onFinish={(values) => onFinish(values, "expence")} />
          {transactions.length==0 ? <NoTransaction/> : <Charts sortedTrans={sortedTrans}/>}
        
          <TransactionTable 
          transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}
            />
        </>
        )}
    </div>
  )
}
export default Dashboard
