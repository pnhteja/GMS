import { useNavigate } from "react-router-dom";
import { ADMIN_HOME_PATH } from "../../routes";
const AddHandlerModal = (props) => {
  const navigate = useNavigate();
  const proceedHandler = async () => {
    const selectElement = document.querySelector("#addHandlerLevel");
    const emailElement = document.querySelector("#addHandlerEmail");
    const response = await fetch("/category/new", {
      method: "POST",
      body: JSON.stringify({
        categoryName: props.category.name,
        handlerEmail: emailElement.value,
        escalationLevel: selectElement.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(selectElement.value);
    // console.log(emailElement.value);
    // console.log(props.category.name);
    selectElement.value = "Select";
    emailElement.value = "";
    navigate(ADMIN_HOME_PATH);
  };

  const cancelHandler = () => {
    const selectElement = document.querySelector("#addHandlerLevel");
    const emailElement = document.querySelector("#addHandlerEmail");
    selectElement.value = "Select";
    emailElement.value = "";
  };

  let selectContent = [];
  for (
    let index = 0;
    index <= props.category.escalationChain.length;
    index += 1
  ) {
    selectContent.push(
      <option key={index} value={index}>
        {index}
      </option>
    );
  }
  return (
    <div
      className="modal fade"
      id={`${props.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add new handler
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <label
                htmlFor="addHandlerEmail"
                className="col-sm-2 col-form-label"
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  id="addHandlerEmail"
                  name="addHandlerEmail"
                  aria-label="addHandlerEmail"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Escalation Level
              </label>
              <div className="col-sm-4">
                <select
                  id="addHandlerLevel"
                  name="addHandlerLevel"
                  className="form-select"
                  aria-label="handler"
                >
                  <option defaultValue>Select</option>
                  {/* {props.category.escalationChain.map((email, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))} */}
                  {selectContent}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={cancelHandler}
            >
              No, Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={proceedHandler}
            >
              Yes, Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHandlerModal;
