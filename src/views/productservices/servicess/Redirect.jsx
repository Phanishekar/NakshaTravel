import React, { Component } from 'react'



export default class Redirect extends Component {

    async componentDidMount() {
let i,j=1000000;
for(i=0;i<j;i++)
{
 
}
let id=this.props.match.params.id;
let acc=this.props.match.params.acc;


if(acc=="assist"){
  this.props.history.push(`/productservices/servicess/assist`)

}
else if(acc=="carhire"){
  this.props.history.push(`/productservices/servicess/carhire`)
}
else if(acc=="visa"){
  this.props.history.push(`/productservices/servicess/visa`)
}
else if(acc=="tourpackage"){
  this.props.history.push(`/productservices/servicess/TourPackage`)
}
else if(acc=="flight"){
  this.props.history.push(`/productservices/servicess/flight`)
}
else if(acc=="hotel"){
  this.props.history.push(`/productandservice/service/hotel`)
}
else if(acc=="hotelservice"){
  this.props.history.push(`/productandservice/servicess/hotel/edit/${id}`)
}
else if(acc=="insurance"){
  this.props.history.push(`/productservices/servicess/insurance`)
}
else if(acc=="insuranceplan"){
  this.props.history.push(`/productandservice/servicess/insurance/edit/${id}`)
}
     
     
      
    }


  render() {
   
    return (
      <div>redirect </div>
    )
  }
}
