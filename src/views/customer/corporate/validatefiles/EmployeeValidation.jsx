
import { toast } from "react-toastify";

export const validateEmployee =(e) =>
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
              
              if(y=='individual_drivinglicence_attachment')   
                 
              {
                
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                            for:"individual_drivinglicence_attachment",filee:"false"} ;
  
              }
               else if(y=='individual_passport_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:"individual_passport_attachment",filee:"false"};
               
              }
              else if(y=='individual_yellowfever_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_yellowfever_attachment',filee:"false"}
                
              }
              else if(y=='individual_id_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_id_attachment',filee:"false"}
                
              }
              else if(y=='individual_covid19_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_covid19_attachment',filee:"false"}
                
              }
              else if(y=='individual_kraORpan_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_kraORpan_attachment',filee:"false"}
                
              }
              else if(y=='individual_othervacination_attachment')   
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_othervacination_attachment',filee:"false"}
                
              }
            
              else if(y=='individual_insurence_attachment') 
              {
                return {errorr:`file size is too large ${Math.round((x/1024)/1024)}MB`,
                for:'individual_insurence_attachment',filee:"false"}
                
              }
                
              
            }
        
            else if(x <2097152)
            {
              
             
              if(y=='individual_drivinglicence_attachment')   
                 
              {
                
                return {errorr:"",
                            for:"individual_drivinglicence_attachment",filee:"true"} ;
  
              }
              else if(y=='individual_passport_attachment') 
              {
                return {errorr:"",
                for:"individual_passport_attachment",filee:"true"};
               
              }
              else if(y=='individual_yellowfever_attachment') 
              {
                return {errorr:"",
                for:'individual_yellowfever_attachment',filee:"true"}
                
              }
              else if(y=='individual_id_attachment') 
              {
                return {errorr:"",
                for:'individual_id_attachment',filee:"true"}
                
              }
              else if(y=='individual_covid19_attachment') 
              {
                return {errorr:"",
                for:'individual_covid19_attachment',filee:"true"}
                
              }
              else if(y=='individual_kraORpan_attachment') 
              {
                return {errorr:"",
                for:'individual_kraORpan_attachment',filee:"true"}
                
              }
              else if(y=='individual_othervacination_attachment')   
              {
                return {errorr:"",
                for:'individual_othervacination_attachment',filee:"true"}
                
              }
            
              else if(y=='individual_insurence_attachment') 
              {
                return {errorr:"",
                for:'individual_insurence_attachment',filee:"true"}
                
              }
                
              
            }
           
        }
        else {
            return {errorr:`Invalid File Format`,
            for:y,
            filee:"false"} ;
        }


}