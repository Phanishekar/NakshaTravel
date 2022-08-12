import React, { Component } from "react";
import {
  Button,
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
import moment from "moment";
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
  ExternalLink,
} from "react-feather";
import { connect } from "react-redux";
import { getData, deleteData, filterData } from "redux/actions/leads";
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
    <div className="data-list-action d-flex">
      <NavLink
        to={`/leads/${props.row.id}/detail`}
        className="d-inline text-dark fonticon-container"
      >
        <ExternalLink className="fonticon-wrap mr-1" size={20} />
      </NavLink>
      <NavLink
        to={`/leads/${props.row.id}/edit`}
        className="d-inline text-dark fonticon-container"
      >
        <Edit className="fonticon-wrap cursor-pointer mr-1" size={20} />
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

const filterLeadOption = [
  { value: "org_name", label: "Organization" },
  { value: "number", label: "Phone No." },
  { value: "email", label: "Email" },
  { value: "contact_name", label: "Contact Name" },
  { value: "subject", label: "Subject" },
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
        <NavLink to="/leads/create" className="d-inline">
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
            defaultValue={filterLeadOption[0]}
            name="color"
            onChange={(e) => props.handleFilterChange(e)}
            options={filterLeadOption}
          />
        </FormGroup>
        <div className="filter-section mt-1">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

class LeadsList extends Component {
  //static contextType = ContextAlert;
  static getDerivedStateFromProps(props, state) {
    if (
      props.leadList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.leadList.data,
        totalPages: props.leadList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.leadList.totalRecords,
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
        name: "Name",
        selector: "contact_name",
        sortable: true,
        width: "200px",
      },
      {
        name: "Contact Details",
        selector: "contact_name",
        sortable: true,
        width: "350px",
        cell: (row) => (
          <p title={row.number} className="text-truncate text-bold-500 mb-0">
            {row.number} - {row.email}
          </p>
        ),
      },
      {
        name: "Organization",
        selector: "org_name",
        sortable: true,
        width: "200px",
      },
      {
        name: "Created At",
        selector: "created_at",
        sortable: true,
        width: "250px",
        cell: (row) =>
          `${moment(row.created_at).format("ddd, MMM Do YYYY, h:mm a")}`,
      },
      {
        name: "Budget",
        selector: "budget",
        sortable: true,
        cell: (row) => `$${row.budget}`,
      },
      {
        name: "Subject",
        selector: "subject",
        sortable: true,
        width: "200px",
      },
      {
        name: "Stage",
        selector: "stage",
        sortable: true,
      },

      {
        name: "Follow up date",
        selector: "follow_up_date",
        sortable: true,
        width: "200px",
      },
      {
        name: "Last comment by",
        selector: "last_comment_by",
        sortable: true,
        width: "200px",
      },
      // {
      //   name: "Whatsapp Link",
      //   selector: "whatsapp_link",
      //   sortable: true,
      //   cell: (row) => (
      //     <a
      //       target="_blank"
      //       href={`https://wa.me/91${row.whatsapp_link}`}
      //       className="text-truncate text-bold-500 mb-0"
      //     >
      //       chat
      //     </a>
      //   ),
      // },
      {
        name: "Last Internal Note",
        selector: "last_internal_note",
        sortable: true,
        width: "200px",
      },
      {
        name: "Actions",
        sortable: false,
        width: "200px",
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
    value: "",
    rowsPerPage: 4,
    currentData: null,
    selected: [],
    totalRecords: 0,
    addNew: "",
    filteredData: [],
    dataToExport: [],
    value: "",
    modal: false,
    fileName: "",
    filterSelectValue: "org_name",
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
      }, 2000),
    });
    console.log("ddd");
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
    history.push(`/leads?page=${page}&perPage=${value}`);
    this.setState({ rowsPerPage: value });
    getData({ page: parsedFilter.page, perPage: value });
  };

  handleDelete = (row) => {
    this.props.deleteData(row);
    this.props.getData(this.props.parsedFilter);
    if (this.state.data.length - 1 === 0) {
      let urlPrefix = "/leads";
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
    let urlPrefix = "/leads";
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
    leadList: state.lead,
  };
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
  filterData,
})(LeadsList);
