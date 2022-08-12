import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "history.js";
import { Redirect } from "react-router-dom";
import Spinner from "./components/@custom/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import axios from "axios";
import { storeUser } from "redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "configs/index";
import EditEmployee from "views/hrmanagement/EditEmployee"

// Route-based code splitting
const Users = lazy(() => import("./views/profileAndLeads/users/UserList"));
const CreateUser = lazy(() =>
  import("./views/profileAndLeads/users/CreateUser")
);
const Corporate = lazy(() =>
  import("./views/customer/corporate/CorporateList")
);
const AddCorporate = lazy(() =>
  import("./views/customer/corporate/AddCorporate")
);
const EditCorporate = lazy(() =>
  import("./views/customer/corporate/EditCorporate")
);

const AddCorporateEmployee= lazy(() =>
import("./views/customer/corporate/AddEmployee")
);
const EditCorporateEmployee= lazy(() =>
import("./views/customer/corporate/EditEmployee")
);
const AddCorporateEmployeeFamily= lazy(() =>
import("./views/customer/corporate/AddFamily")
);
const EditCorporateEmployeeFamily= lazy(() =>
import("./views/customer/corporate/EditFamily")
);

const InduvidualList= lazy(() =>
import("./views/customer/induvidual/InduvidualList")
);
const AddInduvidual= lazy(() =>
import("./views/customer/induvidual/AddInduvidual")
);
const EditInduvidual= lazy(() =>
import("./views/customer/induvidual/EditInduvidual")
);
const InduvidualFamily= lazy(() =>
import("./views/customer/induvidual/AddFamily")
);
const EditInduvidualFamily=lazy(() =>
import("./views/customer/induvidual/EditFamily")
);
const Clients = lazy(() => import("./views/profileAndLeads/clients"));
const CreateClient = lazy(() =>
  import("./views/profileAndLeads/clients/CreateClient")
);

const Employees = lazy(() => import("./views/hrmanagement"));
const Profile = lazy(() => import("./views/profileAndLeads/profile"));
const EditProfile = lazy(() =>
  import("./views/profileAndLeads/profile/editProfile")
);
const CreateEmployee = lazy(() =>
  import("./views/hrmanagement/CreateEmployee")
);
const CorporateIndex = lazy(()=>import("./views/customer/corporate/index"))

const ServiceCard = lazy(()=>import("./views/productservices/servicess/ServiceList"))
const HotelList=lazy(()=>import("./views/productservices/servicess/hotel/HotelList"))
const EditHotelList = lazy(()=>import("./views/productservices/servicess/hotel/EditHotelList"))

const FlightList=lazy(()=>import("./views/productservices/servicess/flight/FlightList"))
const TourPackageList=lazy(()=>import("./views/productservices/servicess/tourpackage/TourPackage"))
const VisaList = lazy(()=>import("./views/productservices/servicess/visa/VisaList"))
const CarHireList = lazy(()=>import("./views/productservices/servicess/carhire/CarHireList"))
const AssistList = lazy(()=>import("./views/productservices/servicess/assist/AssistList"))
const EditAssistList = lazy(()=>import("./views/productservices/servicess/assist/EditAssistList"))
const InsuranceList = lazy(()=>import("./views/productservices/servicess/insurance/InsuranceList"))

const SupplierList =  lazy(()=>import("./views/purchase/supplier/SupplierList"))
const AddSupplier =  lazy(()=>import("./views/purchase/supplier/AddSupplier"))
const EditSupplier =  lazy(()=>import("./views/purchase/supplier/EditSupplier"))


const InventoryList= lazy(()=>import("./views/productservices/inventory/InventoryList"))
const AddInventory = lazy(()=>import("./views/productservices/inventory/AddInventory"))
const EditInventory= lazy(()=>import("./views/productservices/inventory/EditInventory"))


const NonInventoryList= lazy(()=>import("./views/productservices/non_inventory/NonInventoryList"))
const AddNonInventory = lazy(()=>import("./views/productservices/non_inventory/AddNonInventory"))
const EditNonInventory= lazy(()=>import("./views/productservices/non_inventory/EditNonInventory"))

const EditInsuranceCompany= lazy(()=>import("./views/productservices/servicess/insurance/EditInsuranceCompany"))


// const AddDsrServices = lazy(()=>import("./views/dsr/dsr's/service/AddDsrServices"))

const QuotationList = lazy(()=>import("./views/sales/quotation/QuotationList"))
const AddQuotation = lazy(()=>import("./views/sales/quotation/AddQuotation"))
const QuotationForm = lazy(()=>import("./views/sales/quotation/EditQuotation/EditQuotation"))
const ProFormaList = lazy(()=>import("./views/sales/proforma/ProFormaList"))
const AddProForma = lazy(()=>import("./views/sales/proforma/AddProForma"))
const ProFormaForm = lazy(()=>import("./views/sales/proforma/EditProForma/EditProForma"))
const InvoiceList = lazy(()=>import("./views/sales/invoice/InvoiceList"))
const AddInvoice  = lazy(()=>import("./views/sales/invoice/AddInvoice"))
const InvoiceForm = lazy(()=>import("./views/sales/invoice/EditInvoice/EditInvoice"))

const BillList = lazy(()=>import("./views/purchase/bills/BillList"))
const BillForm = lazy(()=>import("./views/purchase/bills/EditInvoice/EditBill"))

 const PaymentRecived=lazy(()=>import("./views/sales/paymentReceived/PaymentReceivedList"))
 const AddPaymentRecived=lazy(()=>import("./views/sales/paymentReceived/AddPaymentReceived"))
 const EditPaymentRecived=lazy(()=>import("./views/sales/paymentReceived/EditPaymentReceived"))
 const PaymentMade=lazy(()=>import("./views/purchase/paymentMade/PaymentMadeList"))
 const AddPaymentMade=lazy(()=>import("./views/purchase/paymentMade/AddPaymentMade"))
 const EditPaymentMade=lazy(()=>import("./views/purchase/paymentMade/EditPaymentMade"))
 const ExpensesList=lazy(()=>import("./views/purchase/expenses/ExpensesList"))
 const AddExpenses =lazy(()=>import("./views/purchase/expenses/AddExpenses"))
 const EditExpenses =lazy(()=>import("./views/purchase/expenses/EditExpenses"))
 
const Leads = lazy(() => import("./views/profileAndLeads/leads"));
const CreateLead = lazy(() =>
  import("./views/profileAndLeads/leads/CreateLead")
);


const Redirect1 = lazy(()=>import("./views/productservices/servicess/Redirect"))

const Accountant = lazy(()=>import("./views/accountant/chartsOfAccount/ChartsOfAccountList"))
const redirect = lazy(()=>import("./views/accountant/chartsOfAccount/AccountRedirect"))
const EditAccount=lazy(()=>import("./views/accountant/chartsOfAccount/subaccount1/EditCA"))
const EditAccount2=lazy(()=>import("./views/accountant/chartsOfAccount/subaccount2/EditAccount"))
const EditAccount3=lazy(()=>import("./views/accountant/chartsOfAccount/subaccount3/EditAccountLast"))
const accountTransaction=lazy(()=>import("./views/accountant/chartsOfAccount/Report"))
const LeadDetail = lazy(() =>
  import("./views/profileAndLeads/leads/leadDetails/LeadDetail")
);


const DSR = lazy(() =>
  import("./views/dsr/dsr's/DSRlist")
);

const AddDSR = lazy(() =>
  import("./views/dsr/dsr's/AddDSR")
);
const EditDSR= lazy(()=>import("./views/dsr/dsr's/editDSR/EditDSR"))



const MiceList=lazy(()=>import("./views/dsr/mice/MICElist"))
const AddMice=lazy(()=>import("./views/dsr/mice/AddMICE"))
const EditMice=lazy(()=>import("./views/dsr/mice/editMice/EditMice"))
const EditMicePassenger=lazy(()=>import("./views/dsr/mice/editMice/passengerANDservices/EditPassenger"))

const Inventory = lazy(() => import("./views/accounting/inventory"));

const CreateInventory = lazy(() =>
  import("./views/accounting/inventory/CreateInventory")
);

const Invoice = lazy(() => import("./views/accounting/invoice/invoiceDetails"));

const CreateInvoice = lazy(() =>
  import("./views/accounting/invoice/createInvoice/CreateInvoice")
);

const ProformaInvoice = lazy(() =>
  import("./views/accounting/proformaInvoice/invoiceDetails")
);

const CreateProformaInvoice = lazy(() =>
  import("./views/accounting/proformaInvoice/createInvoice/CreateInvoice")
);

const ExpenseManagement = lazy(() =>
  import("./views/accounting/expenseManagement/invoiceDetails")
);

const CreateExpenseManagement = lazy(() =>
  import("./views/accounting/expenseManagement/createInvoice/CreateInvoice")
);
const PurchaseOrders = lazy(() =>
  import("./views/accounting/purchaseOrders/invoiceDetails")
);

const CreatePurchaseOrders = lazy(() =>
  import("./views/accounting/purchaseOrders/createInvoice/CreateInvoice")
);

const CreditNotes = lazy(() =>
  import("./views/accounting/creditNotes/invoiceDetails")
);

const CreateCreditNotes = lazy(() =>
  import("./views/accounting/creditNotes/createInvoice/CreateInvoice")
);
const PaymentReceipts = lazy(() =>
  import("./views/accounting/paymentReceipts/invoiceDetails")
);

const CreatePaymentReceipts = lazy(() =>
  import("./views/accounting/paymentReceipts/createInvoice/CreateInvoice")
);

const DebitNotes = lazy(() =>
  import("./views/accounting/debitNotes/invoiceDetails")
);

const CreateDebitNotes = lazy(() =>
  import("./views/accounting/debitNotes/createInvoice/CreateInvoice")
);

const Quotation = lazy(() =>
  import("./views/accounting/quotation/invoiceDetails")
);

const CreateQuotation = lazy(() =>
  import("./views/accounting/quotation/createInvoice/CreateInvoice")
);

const DeliveryChalan = lazy(() =>
  import("./views/accounting/deliveryChalan/invoiceDetails")
);

const CreateDeliveryChalan = lazy(() =>
  import("./views/accounting/deliveryChalan/createInvoice/CreateInvoice")
);

const DownloadInvoice = lazy(() =>
  import("./views/accounting/downloadInvoice/Invoice")
);

const error404 = lazy(() => import("./views/pages/404"));
const Login = lazy(() => import("./views/auth/login/Login"));
const ForgotPassword = lazy(() => import("./views/auth/ForgotPassword"));

const ResetPassword = lazy(() => import("./views/auth/ResetPassword"));
const Register = lazy(() => import("./views/auth/register/Register"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const AppRoute = RouteConfig;

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
         
          <AppRoute exact path="/users" component={Users} />
          <AppRoute exact path="/users/create" component={CreateUser} />
          <AppRoute exact path="/profile" component={Profile} />
          <AppRoute exact path="/editProfile/:id" component={EditProfile} />
          <AppRoute exact path="/clients" component={Clients} />
          <AppRoute exact path="/clients/create" component={CreateClient} />
          <AppRoute exact path="/clients/:id/edit" component={CreateClient} />
          <AppRoute exact path="/leads" component={Leads} />
          <AppRoute exact path="/leads/create" component={CreateLead} />
          <AppRoute exact path="/leads/:id/detail" component={LeadDetail} />
          <AppRoute exact path="/leads/:id/edit" component={CreateLead} />
          <AppRoute exact path="/invoice" component={Invoice} />
          <AppRoute exact path="/invoice/create" component={CreateInvoice} />
          <AppRoute exact path="/inventory" component={Inventory} />
          <AppRoute exact path="/productandservice/servicess/Redirect1/:id/:acc" component={Redirect1}/>
          <AppRoute exact path="/Accountant/chartsOfAccount/" component={Accountant}/>
          <AppRoute exact path="/accountant/redirect/:id/:acc" component={redirect}/>
          



          <AppRoute exact path="/customer/corporate" component={CorporateIndex} />
          <AppRoute exact path="/customer/corporate/add" component={AddCorporate} />
          <AppRoute exact path="/customer/corporate/edit/:id" component={EditCorporate} />
          <AppRoute exact path="/customer/corporate/addemployee/:id" component={AddCorporateEmployee} />
          <AppRoute exact path="/customer/corporate/editemployee/:id" component={EditCorporateEmployee} />
          <AppRoute exact path="/customer/corporate/addemployeefamily/:id" component={AddCorporateEmployeeFamily} />
          <AppRoute exact path="/customer/corporate/editemployeefamily/:id" component={EditCorporateEmployeeFamily} />
          <AppRoute exact path="/customer/induvidual" component={InduvidualList} />
          <AppRoute exact path="/customer/induvidual/add" component={AddInduvidual} />
          <AppRoute exact path="/customer/induvidual/edit/:id" component={EditInduvidual} />
          <AppRoute exact path="/customer/induvidual/addfamily/:id" component={InduvidualFamily} /> 
          <AppRoute exact path="/customer/induvidual/editfamily/:id" component={EditInduvidualFamily} /> 
          <AppRoute exact path="/productandservice/service/hotel" component={HotelList}/>
          <AppRoute exact path="/productservices/servicess/flight" component={FlightList}/> 
          <AppRoute exact path="/productservices/servicess/TourPackage" component={TourPackageList}/>
          <AppRoute exact path="/productservices/servicess" component={ServiceCard}/>
          <AppRoute exact path="/productservices/servicess/visa" component={VisaList}/>
          <AppRoute exact path="/productservices/servicess/carhire" component={CarHireList}/>
          <AppRoute exact path="/productservices/servicess/assist" component={AssistList}/>
          <AppRoute exact path="/productservices/servicess/assist/edit/:id" component={EditAssistList}/>
          <AppRoute exact path="/productservices/servicess/insurance" component={InsuranceList}/>
          <AppRoute exact path="/productandservice/servicess/hotel/edit/:id" component={EditHotelList}/>
          <AppRoute exact path="/productandservice/servicess/insurance/edit/:id" component={EditInsuranceCompany}/>


          <AppRoute exact path="/dsr" component={DSR} />
          <AppRoute exact path="/dsr/add" component={AddDSR} />
          <AppRoute exact path="/dsr/edit/:id" component={EditDSR} />


          <AppRoute exact path="/mice" component={MiceList}/>
          <AppRoute exact path="/mice/add" component={AddMice}/>
          <AppRoute exact path="/mice/edit/:id" component={EditMice}/>
          <AppRoute exact path="/mice/:id/Passenger/:emp/edit/:mice" component={EditMicePassenger}/>


          <AppRoute exact path="/accountant/ChartsOfAccount" component={Accountant}/>
          <AppRoute exact path="/accountant/ChartsOfAccount/EditCofA/:id" component={EditAccount}/>
          <AppRoute exact path="/accountant/ChartsOfAccount/EditCofA1/:id" component={EditAccount2}/>
          <AppRoute exact path="/accountant/ChartsOfAccount/EditCofA2/:id" component={EditAccount3}/>
          <AppRoute exact path="/Accountant/chartsOfAccount/Report/:id/:name" component={accountTransaction}/>
          

          <AppRoute exact path="/purchase/supplier" component={SupplierList}/>
          <AppRoute exact path="/purchase/supplier/add" component={AddSupplier}/>
          <AppRoute exact path="/purchase/supplier/edit/:id" component={EditSupplier}/>


          <AppRoute exact path="/productservices/nonInventory" component={NonInventoryList}/>
          <AppRoute exact path="/productservices/non_inventory/add" component={AddNonInventory}/>
          <AppRoute exact path="/productservices/noninventory/edit/:id" component={EditNonInventory}/>


          <AppRoute exact path="/productservices/inventory" component={InventoryList}/>
          <AppRoute exact path="/productservices/inventory/add" component={AddInventory}/>
          <AppRoute exact path="/productservices/inventory/edit/:id" component={EditInventory}/>
          

          <AppRoute exact path="/sales/quotation" component={QuotationList}/>
          <AppRoute exact path="/sales/quotation/add" component={AddQuotation}/>
          <AppRoute exact path="/addQuotation/:id/form" component={QuotationForm}/>

          <AppRoute exact path="/sales/proforma" component={ProFormaList}/>
          <AppRoute exact path="/sales/proforma/add" component={AddProForma}/>
          <AppRoute exact path="/addproforma/:id/form" component={ProFormaForm}/>

          <AppRoute exact path="/sales/invoice" component={InvoiceList}/>
          <AppRoute exact path="/sales/invoice/add" component={AddInvoice}/>
          <AppRoute exact path="/addinvoiceform/:id/form" component={InvoiceForm}/>


   


          <AppRoute exact path="/sales/paymentRecived" component={PaymentRecived}/>
          <AppRoute exact path="/sales/AddPaymentRecived" component={AddPaymentRecived}/>
          <AppRoute exact path="/sales/EditPaymentRecived/:id" component={EditPaymentRecived}/>
          <AppRoute exact path="/purchase/paymentMade" component={PaymentMade}/>
          <AppRoute exact path="/purchase/AddPaymentMade" component={AddPaymentMade}/>
          <AppRoute exact path="/purchase/EditPaymentMade/:id" component={EditPaymentMade}/>
          <AppRoute exact path="/purchase/Expenses" component={ExpensesList}/>
          <AppRoute exact path="/purchase/AddExpenses" component={AddExpenses}/>
          <AppRoute exact path="/purchase/EditExpenses/:id" component={EditExpenses}/>
         
          <AppRoute exact path="/purchase/bill" component={BillList}/>
          <AppRoute exact path="/addbill/:id/form" component={BillForm}/>



          
          <AppRoute
            exact
            path="/inventory/create"
            component={CreateInventory}
          />
          <AppRoute
            exact
            path="/inventory/:id/edit"
            component={CreateInventory}
          />
          <AppRoute exact path="/invoice/:id/edit" component={CreateInvoice} />
          <AppRoute exact path="/employee" component={Employees} />
          <AppRoute exact path="/employee/create" component={CreateEmployee} />
          <AppRoute exact path="/employee/edit/:id" component={EditEmployee} />
          <AppRoute exact path="/proformaInvoice" component={ProformaInvoice} />
          <AppRoute
            exact
            path="/proformaInvoice/create"
            component={CreateProformaInvoice}
          />
          <AppRoute
            exact
            path="/proformaInvoice/:id/edit"
            component={CreateProformaInvoice}
          />

          <AppRoute
            exact
            path="/expenseManagement"
            component={ExpenseManagement}
          />
          <AppRoute
            exact
            path="/expenseManagement/create"
            component={CreateExpenseManagement}
          />
          <AppRoute
            exact
            path="/expenseManagement/:id/edit"
            component={CreateExpenseManagement}
          />
          <AppRoute exact path="/purchaseOrders" component={PurchaseOrders} />
          <AppRoute
            exact
            path="/purchaseOrders/create"
            component={CreatePurchaseOrders}
          />
          <AppRoute
            exact
            path="/purchaseOrders/:id/edit"
            component={CreatePurchaseOrders}
          />
          <AppRoute exact path="/creditNotes" component={CreditNotes} />
          <AppRoute
            exact
            path="/creditNotes/create"
            component={CreateCreditNotes}
          />
          <AppRoute
            exact
            path="/creditNotes/:id/edit"
            component={CreateCreditNotes}
          />
          <AppRoute exact path="/paymentReceipts" component={PaymentReceipts} />
          <AppRoute
            exact
            path="/paymentReceipts/create"
            component={CreatePaymentReceipts}
          />
          <AppRoute
            exact
            path="/paymentReceipts/:id/edit"
            component={CreatePaymentReceipts}
          />
          <AppRoute exact path="/debitNotes" component={DebitNotes} />
          <AppRoute
            exact
            path="/debitNotes/create"
            component={CreateDebitNotes}
          />
          <AppRoute
            exact
            path="/debitNotes/:id/edit"
            component={CreateDebitNotes}
          />
          <AppRoute exact path="/quotation" component={Quotation} />
          <AppRoute
            exact
            path="/quotation/create"
            component={CreateQuotation}
          />
          <AppRoute
            exact
            path="/quotation/:id/edit"
            component={CreateQuotation}
          />
          <AppRoute exact path="/deliveryChalan" component={DeliveryChalan} />
          <AppRoute
            exact
            path="/deliveryChalan/create"
            component={CreateDeliveryChalan}
          />
          <AppRoute
            exact
            path="/deliveryChalan/:id/edit"
            component={CreateDeliveryChalan}
          />
          <AppRoute
            exact
            path="/downloadInvoice/:id"
            component={DownloadInvoice}
          />
          <AppRoute
            exact
            path="/employee/:id/edit"
            component={CreateEmployee}
          />

          <AppRoute exact path="/login" component={Login} fullLayout />
          <AppRoute exact path="/register" component={Register} fullLayout />
          <AppRoute
            exact
            path="/resetPassword"
            component={ResetPassword}
            fullLayout
          />
          <AppRoute
            path="/forgotPassword"
            component={ForgotPassword}
            fullLayout
          />
          <Redirect to="/login" />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.login,
  };
};

export default connect(mapStateToProps, { storeUser })(AppRouter);
