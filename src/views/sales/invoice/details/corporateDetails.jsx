import axios from "axios";
import moment from 'moment';

export const getall = async(id) =>
{
    const res=await axios.get(`/api/corporatecustomer/getById/${id}`);
    const employee=await axios.get(`/api/corporatecustomer/getallEmployees/${id}`);
    const date = moment().format("YYYY-MM-DD");
    let passport='',insurance='',employeeDetails=[],i=0,color="green";
    
    employee.data.customer.forEach(individual=>{
       const names=individual.individual_name;
       const ids=individual.individual_customer_id;
       
     
        if(individual.individual_passport_number == null)
        {
            passport="No Passport"
            color="Red"
        }
        else if(individual.individual_passport_expiry_date < date)
        {
            passport="Passport Expired"
            color="Red"
        }
        if(individual.individual_insurence_number == null)
        {
            insurance="No Insrance"
            color="Red"
        }

       else if(individual.individual_insurence_expiry_date < date)
        {
            insurance="Insrance Expired"
            color="Red"
        }
        employeeDetails[i]={id:ids,employeeName:names,passportExpiry:passport,insuranceExpiry:insurance,color}
        i++;
});


    return{companyDetails:res.data.customer,
        employes:employeeDetails,
       };
}

export default getall