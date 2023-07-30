import { Radio, Select, Table } from 'antd'
import React, { useState } from 'react'
import Button from '../button/button';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';


function TransactionTable({ transactions , addTransaction , fetchTransactions }) {

    const [search, setSearch] = useState("");
    const [typeFilter, setFilterType] = useState("");
    const [sortKey, setSortKey] = useState("");
    const column = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"

        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount"

        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"

        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"

        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag"

        },
    ]
    let filteredtransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter))
    

    let sortedTransactions = filteredtransactions.sort((a, b) => {
        if (sortKey == "date") {
            return new Date(a.date) - new Date(b.date)
        }
        else if (sortKey == "amount") {
            return a.amount - b.amount
        }
        else {
            return 0;
        }
    })
    
    function exportCsv() {
        const csv = unparse(data = transactions, { fields: ["name", "type", "date", "amount", "tag"], })

        var data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var csvURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'transactions.csv');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
    function importCsv(event){
        event.preventDefault();
        try {
            parse(event.target.files[0] ,{
                header:true,
                complete: async function (results){
                    console.log(results);
                    for(const transaction of results.data){
                        const newTransaction = {
                            ...transaction , 
                            amount: parseFloat(transaction.amount)
                          }
                        console.log(newTransaction);
                        await addTransaction(newTransaction , true);
                    }
                }
            });
            toast.success("All Transactions Added!");
            fetchTransactions();
            event.target.files = null;
        }
        catch(e) {
            toast.error(e.message);
        }
    }
    return (

        <div style={{ width: "95%", padding: "0rem 2rem", }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "1rem"
                    ,
                }}
            >
                <div className='input-flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input className='' type='text' placeholder='Search By Name'
                        onChange={(e) => { setSearch(e.target.value) }} />
                </div>
                <Select
                    className='select-input'
                    onChange={(value) => { setFilterType(value) }}
                    value={typeFilter}
                    placeholder="Filter"
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expence">Expense</Select.Option>
                </Select>
            </div>
            <div style={{
                boxShadow: "var(--shadow)",
                borderRadius: "1rem",

            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "95%",
                    marginBottom: "1rem",
                    padding: "2rem",

                }}>
                    <h2>My Transactions</h2>

                    <Radio.Group
                        className='radio-input'
                        onChange={(e) => { setSortKey(e.target.value) }}
                        value={sortKey}

                    >
                        <Radio.Button value="" >No Sort</Radio.Button>
                        <Radio.Button value="date" >Sort By Date</Radio.Button>
                        <Radio.Button value="amount" >Sort By Amount</Radio.Button>
                    </Radio.Group>
                    <div className='import-export'>
                        <button className='export' onClick={exportCsv}>Export to CSV</button>
                        <label htmlFor="import" className='import'>Import from CSV</label>
                        <input onChange={importCsv} type='file' accept='.csv'  required id='import' style={{display:"none"}}></input>
                    </div>

                </div>
                <div style={{ padding: "2rem" }}>
                    <Table dataSource={transactions} columns={column} />
                </div>
            </div>
        </div>
    )
}

export default TransactionTable
