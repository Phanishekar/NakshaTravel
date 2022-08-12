import { toast } from "react-toastify";


export const validateFeild =(e) =>
{
  var Result="true";
  
 if(e.non_inventory_name=="")
 {
var non_inventory_name=" Name is Required";
Result="false";
 }

 if(e.non_inventory_categaroy=="")
 {
  var non_inventory_categaroy=" categaroy is Required";
  Result="false";
  
 }

 if(e.non_inventory_income_account=="")
 {
  var non_inventory_income_account=" income is Required";
  Result="false";
 }
 if(e.non_inventory_asof_date=="")
 {
  var non_inventory_asof_date=" date is Required";
  Result="false";
 }
 if(e.non_inventory_quantity_on_hand=="")
 {
  var non_inventory_quantity_on_hand=" quantity is Required";
  Result="false";
 }

 if(e.non_inventory_tax=="")
 {
  var non_inventory_tax=" tax is Required";
  Result="false";
 }

 if(e.non_inventory_cost=="")
 {
  var non_inventory_cost=" cost is Required";
  Result="false";
 }

 if(e.non_inventory_expence_account=="")
 {
  var non_inventory_expence_account=" expence account is Required";
  Result="false";
 }

 if(e.non_inventory_purchase_tax=="")
 {
  var non_inventory_purchase_tax=" purchase tax is Required";
  Result="false";
 }

 if(e.non_inventory_reserve_charge=="")
 {
  var non_inventory_reserve_charge=" reserve charge is Required";
  Result="false";
 }


 if(Result == "false"){
  return {
    non_inventory_name:non_inventory_name,
    non_inventory_categaroy:non_inventory_categaroy, 
    non_inventory_income_account:non_inventory_income_account,
    non_inventory_asof_date:non_inventory_asof_date,
    non_inventory_quantity_on_hand:non_inventory_quantity_on_hand,
    non_inventory_tax:non_inventory_tax,
    non_inventory_cost:non_inventory_cost,
    non_inventory_expence_account:non_inventory_expence_account,
    non_inventory_purchase_tax:non_inventory_purchase_tax,
    non_inventory_reserve_charge:non_inventory_reserve_charge,
    Result:false
  };
 }
else{
      return {errorr:"",Result:true};
     }
}


