import React, { Component } from 'react'
import './table.css';
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

   renderTableData() {
      return this.state.table.map((transaction, index) => {
         const {_id, type, amount, effectiveDate } = transaction
         return (
            <tr key={_id}>
               <td>{type}</td>
               <td>{amount}</td>
               <td>{effectiveDate}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.table[0])
      console.log(header)
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() {
      console.log(this.header)
      return (
         <div>
            {/* <h1 id='title'>Transactions History</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table> */}
         </div>
      )
   }
}

export default Transaction
