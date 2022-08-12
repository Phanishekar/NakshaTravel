import React, { Component } from 'react'



export default class AccountRedirect extends Component {

    async componentDidMount() {
let i,j=1000000;
for(i=0;i<j;i++)
{

}

let id=this.props.match.params.id;
let acc=this.props.match.params.acc;
if(acc=="list")
{

  this.props.history.push(`/accountant/ChartsOfAccount`)

}
    
if(acc=="edit")
{

  this.props.history.push(`/accountant/ChartsOfAccount/EditCofA/${id}`)

}
if(acc=="editsub")
{

  this.props.history.push(`/accountant/ChartsOfAccount/EditCofA1/${id}`)

}


    }


  render() {
    return (
      <div></div>
    )
  }
}
