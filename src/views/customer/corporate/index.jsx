import BreadCrumbs from 'components/@custom/breadCrumbs/BreadCrumb'
import React, { Component } from 'react'

import CorporateList from "./CorporateList"

var breadcrumbactive="";

export default class index extends Component {
  
    getComponent() {
         
          console.log("hai")
          console.log("jji");
       
      };

  render() {
    return (<React.Fragment>
        <BreadCrumbs
        breadCrumbTitle= "Customer"
        breadCrumbParent="Corporate "
        breadCrumbActive= "Corporate List"
      />
      <CorporateList/>
   
      </React.Fragment>
    )
  }
}

// export  class index2 extends Component {
  
//     getComponent() {
         
//           console.log("hai")
       
//       };

//   render() {
//     return (<React.Fragment>
     
   
//       </React.Fragment>
//     )
//   }
// }
