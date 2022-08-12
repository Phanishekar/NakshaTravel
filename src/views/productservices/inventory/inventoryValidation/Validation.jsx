import { toast } from "react-toastify";


export const validateFeild =(e) =>
{
  var Result="true";
  
 if(e.inventory_name=="")
 {
var inventory_name="Name is Required";
Result="false";
 }

 if(e.inventory_categaroy=="")
 {
  var inventory_categaroy="Categaroy is Required";
  Result="false";
  
 }

 if(e.inventory_income_account=="")
 {
  var inventory_income_account="Income is Required";
  Result="false";
 }
 if(e.inventory_asof_date=="")
 {
  var inventory_asof_date="Date is Required";
  Result="false";
 }
 if(e.inventory_quantity_on_hand=="")
 {
  var inventory_quantity_on_hand="Quantity is Required";
  Result="false";
 }

 if(e.inventory_tax=="")
 {
  var inventory_tax="Tax is Required";
  Result="false";
 }


 if(Result == "false"){
  return {
    inventory_name:inventory_name,
    inventory_categaroy:inventory_categaroy, 
    inventory_income_account:inventory_income_account,
    inventory_asof_date:inventory_asof_date,
    inventory_quantity_on_hand:inventory_quantity_on_hand,
    inventory_tax:inventory_tax,
    Result:false
  };
 }
else{
      return {errorr:"",Result:true};
     }
}



