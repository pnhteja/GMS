import { useNavigate } from "react-router-dom";
import { ADMIN_HOME_PATH } from "../../routes";
import Modal from "../UI/Modal";
import AddHandlerModal from "./AddHandlerModal";

const imgLinks = [
  "https://icon-library.com/images/professor-icon-png/professor-icon-png-20.jpg",
  "https://cdn-icons-png.flaticon.com/512/475/475262.png",
  "https://cdn-icons-png.flaticon.com/512/1155/1155223.png",
];

const EscalationChain = (props) => {
  const navigate = useNavigate();
  const deleteHandler = async (params) => {
    const response = await fetch("/category/delete", {
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h6 className="bg-light p-2 border-top border-bottom">
                {props.category.name.toUpperCase()}
              </h6>
              <ul className="list-group list-group-light mb-4">
                {props.category.escalationChain.map((handler, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={imgLinks[index % 3]}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        {/* <p className="fw-bold mb-1">John Doe</p> */}
                        <p className="fw-bold mb-1">{handler}</p>
                        {/* <p className="text-muted mb-0">john.doe@gmail.com</p> */}
                        <p className="text-muted mb-0">
                          {"Level" + index.toString()}
                        </p>
                      </div>
                    </div>
                    <span>
                      <button
                        className="btn btn-light btn-sm"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteHandler${handler}StaticBackdrop`}
                      >
                        Delete
                      </button>
                      <Modal
                        id={`deleteHandler${handler}StaticBackdrop`}
                        proceedHandler={deleteHandler.bind(this, {
                          handlerEmail: handler,
                          escalationLevel: index,
                          categoryName: props.category.name,
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
                        data-bs-target="#addHandlerStaticBackdrop"
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        style={{ marginRight: "15px" }}
                      >
                        <span>+</span>
                      </button>
                      <span className="fw mb-1">Add new member</span>
                      <AddHandlerModal
                        id="addHandlerStaticBackdrop"
                        category={props.category}
                      />
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

export default EscalationChain;
