import axios from "axios";
import moment from 'moment';

export const getall = async(id) =>
{
    const res=await axios.get(`/api/individualcustomer/getInduvidualById/${id}`);
    const family=await axios.get(`/api/individualfamily/getfamily/${id}`);
    const date = moment().format("YYYY-MM-DD");
    let passport='',insurance='',familyDetails=[],i=0,color="green",Individualinsurance="",Individualpassport="",FamilyPassport='',FamilyInsurance='';
    
    family.data.customerfamily.forEach(family=>{
       const names=family.individual_family_name;
       const ids=family.individual_customer_family_id;
       
     
        if(family.individual_family_passport_number == null)
        {
            passport="No Passport"
            color="Red"
        }
        else if(family.individual_family_passport_expiry_date < date)
        {
            passport="Passport Expired"
            color="Red"
        }
        if(family.individual_family_insurence_number == null)
        {
            insurance="No Insrance"
            color="Red"
        }

       else if(family.individual_family_insurence_expiry_date < date)
        {
            insurance="Insrance Expired"
            color="Red"
        }
        familyDetails[i]={id:ids,FamilyName:names,FamilyPassport:passport,FamilyInsurance:insurance,color}
        i++;
});
    

const IndividualDetails=res.data.customer;


        if(IndividualDetails.individual_passport_number == null)
        {
            Individualpassport="No Passport"
            color="Red"
        }
        else if(IndividualDetails.individual_passport_expiry_date < date)
        {
            Individualpassport="Passport Expired"
            color="Red"
        }
        if(IndividualDetails.individual_insurence_number == null)
        {
            Individualinsurance="No Insrance"
            color="Red"
        }

       else if(IndividualDetails.individual_insurence_expiry_date < date)
        {
            Individualinsurance="Insrance Expired"
            color="Red"
        }

    return{Individual:[{Details:IndividualDetails},{Insurance:Individualinsurance},{Passport:Individualpassport}],
        family:familyDetails,
       };
}

export default getall