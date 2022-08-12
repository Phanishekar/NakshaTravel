import { combineReducers } from "redux";
import auth from "./auth/";
import customizer from "./customizer/";
import userList from "./users/";
import lead from "./leads/";
import client from "./clients/";
import business from "./business/";
import employee from "./employees/";
import invoice from "./invoice/";
import creditNotes from "./creditNotes/";
import debitNotes from "./debitNotes/";
import expenseManagement from "./expenseManagement/";
import paymentReceipts from "./paymentReceipts/";
import purchaseOrders from "./purchaseOrders";
import proformaInvoice from "./proformaInvoice/";
import deliveryChalan from "./deliveryChalan/";
import quotation from "./quotation/";
import inventory from "./inventory/";

const rootReducer = combineReducers({
  auth: auth,
  customizer: customizer,
  userList: userList,
  lead: lead,
  client: client,
  business: business,
  employee: employee,
  invoice: invoice,
  creditNotes: creditNotes,
  debitNotes: debitNotes,
  expenseManagement: expenseManagement,
  purchaseOrders: purchaseOrders,
  paymentReceipts: paymentReceipts,
  proformaInvoice: proformaInvoice,
  quotation: quotation,
  deliveryChalan: deliveryChalan,
  inventory: inventory,
});

export default rootReducer;
