import { Link, useLoaderData } from "react-router-dom";
import { GRIEVANCE_INFO_PATH } from "../routes";
import cardClasses from "../assets/css/Card.module.css";
import { Fragment } from "react";
import { useReducer } from "react";

const pageSize = 5;

const tableInitializer = (initialState) => {
  return {
    filteredTableContent: initialState,
    pageIndex: 1,
  };
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case "PREV_PAGE":
      return {
        ...state,
        pageIndex: state.pageIndex - 1,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      };

    case "FILTER":
      return {
        filteredTableContent: action.payload,
        pageIndex: 1,
      };

    default:
      return state;
  }
};

const AllGrievancesPage = () => {
  const grievances = useLoaderData();

  const [tableState, tableDispatch] = useReducer(
    tableReducer,
    grievances,
    tableInitializer
  );

  const prevPageHandler = () => {
    if (tableState.pageIndex - 1 >= 1) {
      tableDispatch({ type: "PREV_PAGE" });
    }
  };

  const nextPageHandler = () => {
    const noOfPages = Math.ceil(
      tableState.filteredTableContent.length / pageSize
    );
    if (tableState.pageIndex + 1 <= noOfPages) {
      tableDispatch({ type: "NEXT_PAGE" });
    }
  };

  const filterHandler = (event) => {
    event.preventDefault();
    const selectedFilter = event.target.category.value.toLowerCase();
    const enteredTerm = event.target.searchField.value.toLowerCase();
    if (selectedFilter === "select") {
      tableDispatch({
        type: "FILTER",
        payload: grievances,
      });
    } else if (
      selectedFilter === "category" ||
      selectedFilter === "status" ||
      selectedFilter === "title"
    ) {
      tableDispatch({
        type: "FILTER",
        payload: grievances.filter((grievance) =>
          grievance[selectedFilter].toLowerCase().includes(enteredTerm)
        ),
      });
    } else if (selectedFilter === "name") {
      tableDispatch({
        type: "FILTER",
        payload: grievances.filter((grievance) =>
          grievance.user[selectedFilter].toLowerCase().includes(enteredTerm)
        ),
      });
    }

    event.target.searchField.value = "";
  };

  let tableContent = <p>No Grievances</p>;
  if (tableState.filteredTableContent.length !== 0) {
    tableContent = (
      <table
        className="table table-borderless datatable"
        // style={{ color: "#B3B3B3" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Grievance Title</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Posted at</th>
          </tr>
        </thead>
        <tbody>
          {tableState.filteredTableContent
            .slice(
              (tableState.pageIndex - 1) * pageSize,
              Math.min(
                tableState.pageIndex * pageSize,
                tableState.filteredTableContent.length
              )
            )
            .map((grievance, index) => (
              <tr key={index}>
                <th scope="row">
                  {(tableState.pageIndex - 1) * pageSize + index + 1}
                </th>
                <td>{grievance.user.name}</td>
                <td>
                  <Link to={`${GRIEVANCE_INFO_PATH}/${grievance._id}`}>
                    {grievance.title}
                  </Link>
                </td>
                <td>{grievance.category}</td>
                <td>
                  <span
                    className={`badge bg-${
                      grievance.status === "pending" ? "warning" : "success"
                    }`}
                  >
                    {grievance.status}
                  </span>
                </td>
                <td>{new Date(grievance.createdAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  return (
    <Fragment>
      <div>
        <h1 style={{ marginBottom: "25px" }}>All Grievances</h1>
        <div className="'row">
          <div className="col-12">
            <div className={`card recent-sales overflow-auto`}>
              <div className="card-body">
                <form onSubmit={filterHandler}>
                  <div className="row mb-3">
                    <label className="col-sm-1 col-form-label">
                      Filter Category
                    </label>
                    <div className="col-sm-2">
                      <select name="category" className="form-select">
                        <option defaultValue>Select</option>
                        <option value="name">Name</option>
                        <option value="title">Title</option>
                        <option value="category">Category</option>
                        <option value="status">Status</option>
                      </select>
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        id="searchField"
                        name="searchField"
                        placeholder="Enter"
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-2">
                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                {tableContent}
              </div>
            </div>
            <div
              className="row mb-3 justify-content-center"
              style={{ marginTop: "25px" }}
            >
              <span className="col-sm-1" style={{ marginTop: "5px" }}>
                {`${(tableState.pageIndex - 1) * pageSize + 1} - ${Math.min(
                  tableState.pageIndex * pageSize,
                  tableState.filteredTableContent.length
                )} of ${tableState.filteredTableContent.length}`}
              </span>
              <div className="pagination col-sm-4">
                <li className="page-item" onClick={prevPageHandler}>
                  <button className="page-link">&laquo;</button>
                </li>
                <li className="page-item">
                  <span className="page-link">{tableState.pageIndex}</span>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={nextPageHandler}>
                    &raquo;
                  </button>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllGrievancesPage;

export async function loader() {
  const response = await fetch("/grievances/all");
  const data = await response.json();
  return data;
}
