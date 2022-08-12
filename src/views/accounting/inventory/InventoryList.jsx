import React, { Component } from "react";
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CustomInput,
} from "reactstrap";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { history } from "history.js";
import XLSX from "xlsx";
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { connect } from "react-redux";
import { getData, deleteData, filterData } from "redux/actions/inventory";
import Checkbox from "components/@custom/checkbox/CheckboxesAdvance";
import "assets/scss/plugins/extensions/react-paginate.scss";
import "assets/scss/pages/data-list.scss";

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
      <NavLink
        to={`/inventory/${props.row.id}/edit`}
        className="d-inline  text-dark fonticon-container"
      >
        <Edit className="cursor-pointer mr-1 fonticon-wrap" size={20} />
      </NavLink>
      <div className="fonticon-container">
        <Trash
          className="cursor-pointer text-dark fonticon-wrap"
          size={20}
          onClick={() => {
            props.deleteRow(props.row);
          }}
        />
      </div>
    </div>
  );
};

const filterInventoryOption = [
  { value: "item", label: "Item Name" },
  { value: "hsn_or_sac", label: "HSN/SAC" },
  { value: "buying_price", label: "Buying Price" },
  { value: "selling_price", label: "Selling Price" },
];

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button.Ripple
          className="height-fit"
          color="primary mr-2"
          onClick={props.toggleModal}
        >
          Export
        </Button.Ripple>
        <NavLink to="/inventory/create" className="d-inline">
          <Button className="add-new-btn" color="primary" outline>
            <Plus size={15} />
            <span className="align-middle">Add New</span>
          </Button>
        </NavLink>
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="mt-1 data-list-rows-dropdown mr-1 d-md-block d-none">
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
        <FormGroup className="width-200 mr-2">
          <Label for="country_id">Select Filter by</Label>
          <Select
            className="React"
            classNamePrefix="select"
            defaultValue={filterInventoryOption[0]}
            name="color"
            onChange={(e) => props.handleFilterChange(e)}
            options={filterInventoryOption}
          />
        </FormGroup>
        <div className="filter-section mt-1">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

class InventoryList extends Component {
  //static contextType = ContextAlert;
  static getDerivedStateFromProps(props, state) {
    if (
      props.inventoryList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.inventoryList.data,
        totalPages: props.inventoryList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.inventoryList.totalRecords,
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
        name: "Image",
        selector: "image",
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "Item",
        selector: "item",
        sortable: true,
        minWidth: "150px",
      },
      {
        name: "HSN/SAC",
        selector: "hsn_or_sac",
        sortable: true,
        minWidth: "150px",
      },

      {
        name: "Buying Price",
        selector: "buying_price",
        sortable: true,
      },
      {
        name: "Selling Price",
        selector: "selling_price",
        sortable: true,
      },
      {
        name: "Currency",
        selector: "currency",
        sortable: true,
      },
      {
        name: "TAX Rate",
        selector: "tax_rate",
        sortable: true,
      },
      {
        name: "Current Stock",
        selector: "current_stock",
        sortable: true,
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
      },
      {
        name: "Actions",
        sortable: true,
        minWidth: "150px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            getData={this.props.getData}
            parsedFilter={this.props.parsedFilter}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        ),
      },
    ],
    rowsPerPage: 4,
    currentData: null,
    selected: [],
    totalRecords: 0,
    addNew: "",
    filteredData: [],
    dataToExport: [],
    value: "",
    filterSelectValue: "item",
    modal: false,
    fileName: "",
    fileFormat: "xlsx",
    selectedRows: [],
    selectAll: false,
    typing: false,
    typingTimeout: 0,
  };

  thumbView = this.props.thumbView;

  componentDidMount() {
    this.props.getData(this.props.parsedFilter);
  }

  handleFilter = (e) => {
    this.setState({ value: e.target.value });
    let self = this;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    let value = e.target.value;
    this.setState({
      value: value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.applyFilter(self.state.filterSelectValue, value);
      }, 1000),
    });
  };

  applyFilter = (key, value) => {
    console.log(key, value);
    if (value.length) {
      this.props.filterData(key, value);
    }
  };

  handleFilterChange = (e) => {
    this.setState({ filterSelectValue: e.value });
    if (this.state.value.length) {
      this.props.filterData(e.value, this.state.value);
    }
  };

  handleRowsPerPage = (value) => {
    let { parsedFilter, getData } = this.props;
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
    history.push(`/inventory?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };

  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      let urlPrefix = "/inventory";
      history.push(
        `${urlPrefix}?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&perPage=${this.props.parsedFilter.perPage}`
      );
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
    let urlPrefix = "/inventory";
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`);
    getData({ page: page.selected + 1, perPage: perPage });
    this.setState({ currentPage: page.selected });
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleExport = () => {
    this.toggleModal();

    let fileName =
      this.state.fileName.length && this.state.fileFormat.length
        ? `${this.state.fileName}.${this.state.fileFormat}`
        : "excel-sheet.xlsx";
    let wb = XLSX.utils.json_to_sheet(this.state.data);
    let wbout = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbout, wb, "test");
    XLSX.writeFile(wbout, fileName);
  };

  render() {
    let { columns, data, totalPages, rowsPerPage, totalRecords } = this.state;
    return (
      <div className="data-list list-view">
        <DataTable
          columns={columns}
          data={data}
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
              handleFilterChange={this.handleFilterChange}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
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
    inventoryList: state.inventory,
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  filterData,
})(InventoryList);
