import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Modal from "../components/UI/Modal";
import AddCategoryModal from "../components/Category/AddCategoryModal";
import { ADMIN_HOME_PATH } from "../routes";

const AllEscalationChainsPage = () => {
  const categories = useLoaderData();
  const navigate = useNavigate();

  const deleteHandler = async (params) => {
    const response = await fetch("/categories/delete", {
      method: "DELETE",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate(ADMIN_HOME_PATH);
    }
  };

  // const content = categories.map((category, index) => (
  //   <li key={index}>
  //     <Link to={`/admin/escalationChain/${category.name}`}>
  //       {category.name.toUpperCase()}
  //     </Link>
  //   </li>
  // ));
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h6 className="bg-light p-2 border-top border-bottom">
                {"Categories"}
              </h6>
              <ul className="list-group list-group-light mb-4">
                {categories.map((category, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      {/* <img
                        src={imgLinks[index % 3]}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      /> */}
                      <div className="ms-3">
                        {/* <p className="fw-bold mb-1">John Doe</p> */}
                        <p className="fw-bold mb-1">
                          {category.name.toUpperCase()}
                        </p>
                        {/* <p className="text-muted mb-0">john.doe@gmail.com</p> */}
                        {/* <p className="text-muted mb-0">
                          {"Level" + index.toString()}
                        </p> */}
                      </div>
                    </div>
                    <span>
                      <button
                        className="btn btn-light btn-sm"
                        style={{ marginRight: "10px" }}
                      >
                        <Link to={`/admin/escalationChain/${category.name}`}>
                          View
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteHandler${category.name}StaticBackdrop`}
                      >
                        Delete
                      </button>
                      <Modal
                        id={`deleteHandler${category.name}StaticBackdrop`}
                        proceedHandler={deleteHandler.bind(this, {
                          name: category.name,
                        })}
                      />
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryStaticBackdrop"
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        style={{ marginRight: "15px" }}
                      >
                        <span>+</span>
                      </button>
                      <span className="fw mb-1">Add new category</span>
                      <AddCategoryModal id="addCategoryStaticBackdrop" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEscalationChainsPage;

export async function loader() {
  const response = await fetch("/categories/all");
  const data = await response.json();
  return data;
}
