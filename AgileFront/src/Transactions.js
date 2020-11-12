import React, { Component } from 'react'
import './transaction.css';
// eslint-disable-next-line
const axios = require('axios').default;

class Transaction extends Component {
   constructor(props) {
      super(props)
      this.state = {
         table: []
      }
   }

  componentDidMount = () => {
      axios.get("/api/gettransactionshistory").then( response => {
          this.setState({
            isLoaded: true,
            table: response.data
          });
      });
  }

//   renderTableHeader() {
//       if (!this.state.table.length) { return null }
//       let header = Object.keys(this.state.table[0])
//       return header.map((key, index) => {
//          return <th key={index}>{key.toUpperCase()}</th>
//       })
//    }

   renderTableData() {
      return this.state.table.map((transaction, index) => {
         const {_id, type, amount, effectiveDate} = transaction
         return (
            <tr key={_id}>
               <td>{type}</td>
               <td>{amount}</td>
               <td>{effectiveDate}</td>
            </tr>
         )
      })
   }

   render() {
      console.log(this.state.table)
      return (
         <div>
            <h1 id='title'>Transactions History</h1>
            <table id='students'>
               <thead>
                  <tr>
                     <th>type</th>
                     <th>amount</th>
                     <th>effectiveDate</th>
                  </tr>
               </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Transaction