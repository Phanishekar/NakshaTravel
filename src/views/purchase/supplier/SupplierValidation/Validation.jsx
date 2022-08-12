import { toast } from "react-toastify";
export const validateFeild =(e) =>
{
  var Result="true";
  
 if(e.supplier_company_name=="")
 {
var supplier_company_name="Company Name is Required";
Result="false";

  
 }
 console.log('error')

 if(e.supplier_alias_name=="")
 {
  var supplier_alias_name="Alias Name is Required";
  Result="false";
  
 }

 if(e.supplier_email=="")
 {
  var supplier_email="Email is Required";
  Result="false";
 }

 if(e.supplier_phone_number=="")
 {
  var supplier_phone_number="Phone Number is Required";
  Result="false";
 }

 if(e.supplier_mobile_number=="")
 {
  var supplier_mobile_number="Mobile Number is Required";
  Result="false";
 }

 if(e.supplier_registration_type=="")
 {
  var supplier_registration_type="Mobile Number is Required";
  Result="false";
 }

 if(e.supplier_prefered_payment_method=="")
 {
  var supplier_prefered_payment_method="payment method is Required";
  Result="false";
 }
 

 if(e.supplier_terms=="")
 {
  var supplier_terms="Terms is Required";
  Result="false";
 }

 if(e.supplier_creditlimit=="")
 {
  var supplier_creditlimit="Cridit Limit is Required";
  Result="false";
 }

 if(e.supplier_bank_currency=="")
 {
  var supplier_bank_currency="Cridit Limit is Required";
  Result="false";
 }

 if(e.supplier_tax_reg_num=="")
 {
  var supplier_tax_reg_num="Registration Number is Required";
  Result="false";
 }

 if(e.supplier_pan_num=="")
 {
  var supplier_pan_num="Pan Number is Required";
  Result="false";
 }

 if(e.supplier_other_document=="")
 {
  var supplier_other_document="Other Document Number is Required";
  Result="false";
 }

 if(Result == "false"){
  return {
    supplier_company_name:supplier_company_name,
    supplier_alias_name:supplier_alias_name, 
    supplier_email:supplier_email,
    supplier_phone_number:supplier_phone_number,
    supplier_mobile_number:supplier_mobile_number,
    supplier_registration_type:supplier_registration_type,
    supplier_prefered_payment_method:supplier_prefered_payment_method,
    supplier_terms:supplier_terms,
    supplier_creditlimit:supplier_creditlimit,
    supplier_bank_currency:supplier_bank_currency,
    supplier_tax_reg_num:supplier_tax_reg_num,
    supplier_pan_num:supplier_pan_num,
    supplier_other_document:supplier_other_document,
    Result:false
  };
 }
else{
      return {errorr:"",Result:true};
     }
}



export const validate =(e) =>
{
    let x=  e.target.files[0].size;
    let y=e.target.name;
    let z=  e.target.files[0].type;
    console.log(z);
    let error=[];
    console.log(y)
    if(z=="image/jpeg"||z=="image/jpg"||z=="image/png"||z=="application/pdf")
        {
             if(x >2097152)
            {
                toast.error("Uploded File Size is greater than 2 Mb");
              if(y=='supplier_tax_reg_num_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                            for:"supplier_tax_reg_num_attachment",filee:"false"} ;
              }
               else if(y=='supplier_pan_num_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:"supplier_pan_num_attachment",filee:"false"};
              }
              else if(y=='supplier_other_document_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'supplier_other_document_attachment',filee:"false"} 
              } 
            }
            else if(x <2097152)
            {
              if(y=='supplier_tax_reg_num_attachment') 
              {
                return {errorr:"",
                for:'supplier_tax_reg_num_attachment',filee:"true"
            }
                
              }
               else if(y=='supplier_pan_num_attachment') 
              {
                return {errorr:"",
                for:'supplier_pan_num_attachment',filee:"true"}
              
              }
              else if(y=='supplier_other_document_attachment') 
              {
                return {errorr:"",
                for:'supplier_other_document_attachment',filee:"true"}
              }
            }
        }
        else {
            return {errorr:`Invalid File Format`,
            for:y,
        filee:"false"} ;
        }
} 