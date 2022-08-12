import React, { Component } from "react";
// import { ContextAlert } from "utility/context/AlertMessage.js";
import {
  Button,
  Progress,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CustomInput,
  Dropdown,
} from "reactstrap";

import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { history } from "history.js";
import XLSX from "xlsx";
import {
  Edit,
  Trash,
  Download,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Printer,
  Copy,
  CheckCircle,
  ExternalLink,
} from "react-feather";
import { connect } from "react-redux";
import {
  addData,
  getData,
  getInitialData,
  deleteData,
  filterData,
} from "redux/actions/quotation";
import Checkbox from "components/@custom/checkbox/CheckboxesAdvance";

import "assets/scss/plugins/extensions/react-paginate.scss";
import "assets/scss/pages/data-list.scss";
import Axios from "axios";
import { REACT_APP_API_URL } from "configs/index";
import { toast } from "react-toastify";

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};

const ActionsComponent = (props) => {
  return (
    <div className="d-flex data-list-action">
      <div className="dropleft mr-1 mb-1 d-inline-block">
        <UncontrolledButtonDropdown direction="left">
          <DropdownToggle color="flat">
            <MoreHorizontal className="vx-icon" size={30} />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <DropdownItem
              onClick={() => {
                props.row.copy = 1;
                props.copyInvoice(props.row);
              }}
            >
              <Copy className="cursor-pointer mr-1" size={20} /> Copy
            </DropdownItem>
            <DropdownItem
              tag="a"
              onClick={() => {
                history.push(`/quotation/${props.row.id}/edit`);
              }}
            >
              <Edit className="cursor-pointer mr-1" size={20} /> Edit
            </DropdownItem>
            {/* <DropdownItem
              onClick={() => {
                props.deleteRow(props.row);
              }}
            >
              <Trash className="cursor-pointer mr-1" size={20}/> Delete
            </DropdownItem> */}
            <DropdownItem
              tag="a"
              onClick={() => {
                history.push(`/downloadInvoice/${props.row.id}`);
              }}
            >
              <Download className="cursor-pointer mr-1" size={20} /> Download
            </DropdownItem>
            <DropdownItem
              tag="a"
              onClick={() => {
                props.changeStatus(props.row, 1);
              }}
            >
              <ExternalLink className="cursor-pointer mr-1" size={20} /> Mark As
              Paid
            </DropdownItem>
            <DropdownItem
              tag="a"
              onClick={() => {
                props.changeStatus(props.row, 21);
              }}
            >
              <ExternalLink className="cursor-pointer mr-1" size={20} /> Mark As
              Cancelled
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </div>
  );
};

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button.Ripple color="primary mr-2" onClick={props.toggleModal}>
          Export
        </Button.Ripple>
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              Show Items: {isNaN(props.rowsPerPage) ? "" : props.rowsPerPage}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

class InvoiceList extends Component {
  //static contextType = ContextAlert;
  static getDerivedStateFromProps(props, state) {
    if (
      props.invoiceList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.invoiceList.data,
        allData: props.invoiceList.filteredData,
        totalPages: props.invoiceList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.invoiceList.totalRecords,
        sortIndex: props.invoiceList.sortIndex,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Date",
        selector: "invoice_date",
        sortable: true,
        minWidth: "200px",
      },
      {
        name: "Quotation",
        selector: "invoice_no",
        sortable: true,
        minWidth: "200px",
      },
      {
        name: "Billed To",
        selector: "billed_to.business_name",
        sortable: true,
        minWidth: "200px",
      },
      {
        name: "Amount",
        selector: "final_amount",
        sortable: true,
        minWidth: "200px",
      },
      {
        name: "Status",
        selector: "status_name",
        sortable: true,
        minWidth: "200px",
      },
      {
        name: "Actions",
        sortable: true,
        minWidth: "340px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            copyInvoice={this.handleCopyInvoice}
            deleteRow={this.handleDelete}
            changeStatus={this.handleChangeStatus}
            dropdownOpen={this.state.dropdownOpen}
            toggleDropdown={this.toggleDropdown}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    filteredData: [],
    dataToExport: [],
    value: "",
    modal: false,
    fileName: "",
    fileFormat: "xlsx",
    selectedRows: [],
    selectAll: false,
    dropdownOpen: false,
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData(this.props.parsedFilter);
  }

  handleCopyInvoice = async (row) => {
    let response = await Axios.post(`${REACT_APP_API_URL}/invoices/copy`, row);
    if (response.data.status == 1) {
      toast.success("Copied successfull");
      history.push("/quotation/" + response.data.data.id + "/edit");
    }
  };
  handleChangeStatus = async (obj, status) => {
    obj.status = status;
    let response = await Axios.post(
      `${REACT_APP_API_URL}/invoices/changeInvoiceStatus`,
      obj
    );
    if (response.data.status == 1) {
      toast.success("Status change successfull");
      this.props.getData(this.props.parsedFilter);
      history.push(`/quotation`);
    }
  };

  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    this.props.filterData(e.target.value);
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;

    let filterObject = parsedFilter;
    let searchFilter = "";
    filterObject["page"] = page;
    filterObject["perPage"] = value;
    const queryString = new URLSearchParams(filterObject).toString();
    if (queryString.length) {
      searchFilter = queryString;
    }
    history.push(`/quotation?${searchFilter}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };

  handleDelete = (row) => {
    const { parsedFilter } = this.props;
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      let filterObject = parsedFilter;
      let searchFilter = "";
      filterObject["page"] = parseInt(this.props.parsedFilter.page - 1);
      filterObject["perPage"] = this.props.parsedFilter.perPage;
      const queryString = new URLSearchParams(filterObject).toString();
      if (queryString.length) {
        searchFilter = queryString;
      }
      history.push(`/quotation?${searchFilter}`);

      this.props.getData({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage,
      });
    }
  };

  handleCurrentData = (obj) => {
    this.setState({ currentData: obj });
  };

  handlePagination = (page) => {
    let { parsedFilter, getData } = this.props;
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4;
    let filterObject = parsedFilter;
    let searchFilter = "";
    filterObject["page"] = page.selected + 1;
    filterObject["perPage"] = perPage;
    const queryString = new URLSearchParams(filterObject).toString();
    if (queryString.length) {
      searchFilter = queryString;
    }
    history.push(`/quotation?${searchFilter}`);

    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  togggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  handleExport = () => {
    this.toggleModal();

    let fileName =
      this.state.fileName.length && this.state.fileFormat.length
        ? `${this.state.fileName}.${this.state.fileFormat}`
        : "excel-sheet.xlsx";
    let wb = XLSX.utils.json_to_sheet(
      this.state.value.length ? this.state.allData : this.state.data
    );
    let wbout = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbout, wb, "test");
    XLSX.writeFile(wbout, fileName);
  };

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      totalRecords,
      sortIndex,
    } = this.state;
    return (
      <div className="data-list list-view">
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={(data) =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
              toggleModal={this.toggleModal}
            />
          }
          sortIcon={<ChevronDown />}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={{
            color: "primary",
            icon: <Check className="vx-icon" size={12} />,
            label: "",
            size: "sm",
          }}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Export To Excel</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                value={this.state.fileName}
                onChange={(e) => this.setState({ fileName: e.target.value })}
                placeholder="Enter File Name"
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="select"
                id="selectFileFormat"
                name="customSelect"
                value={this.state.fileFormat}
                onChange={(e) => this.setState({ fileFormat: e.target.value })}
              >
                <option>xlsx</option>
                <option>csv</option>
                <option>txt</option>
              </CustomInput>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleExport}>
              Export
            </Button>
            <Button color="flat-danger" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invoiceList: state.quotation,
  };
};

export default connect(mapStateToProps, {
  addData,
  getData,
  deleteData,
  getInitialData,
  filterData,
})(InvoiceList);
