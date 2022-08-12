
import { toast } from "react-toastify";


// export const validateFeild =(e) =>
// {
 
  
//  if(e.company_name=='')
//  {
//   return {errorr:"This Feild is Required",Result:false};
  
//  }
   
//      else{
//       return {errorr:""};
//      }
    
    

  

// }
export const validateCorporate =(e) =>
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
              
              if(y=='company_other_attachment') 
              {
                
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                            for:"company_other_attachment",filee:"false"} ;
  
              }
               else if(y=='company_tax_reg_num_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:"company_tax_reg_num_attachment",filee:"false"};
               
              }
              else if(y=='company_pan_num_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'company_pan_num_attachment',filee:"false"}
                
              }
                
              
            }
        
            else if(x <2097152)
            {
              
              if(y=='company_other_attachment') 
              {
                return {errorr:"",
                for:'company_other_attachment',filee:"true"
            }
                
              }
               else if(y=='company_pan_num_attachment') 
              {
                return {errorr:"",
                for:'company_pan_num_attachment',filee:"true"}
              
              }
              else if(y=='company_tax_reg_num_attachment') 
              {
                return {errorr:"",
                for:'company_tax_reg_num_attachment',filee:"true"}
               
              }
                
              
            }
           
        }
        else {
            return {errorr:`Invalid File Format`,
            for:y,
        filee:"false"} ;
        }


}