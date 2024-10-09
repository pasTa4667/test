import Modal from "react-modal";
import { brand, isValidPlz, Product } from '../../shared/definitions';
import { useState } from "react";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface PopupFormProps {
    product: Product | null;
    onClose: () => void;
}

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export default function PopupForm(props: PopupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [plz, setPlz] = useState("");
  const [street, setStreet] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const [isPlz, ValidPlzObject] = brand(isValidPlz, 'ValidPlz');
  type ValidPlz = typeof ValidPlzObject;

  function handleBuyClick(e: any) {
    e.preventDefault();
    if(isPlz(plz) && firstName && lastName && city && street) {
      const resp = sendStuffToCustomer(plz, firstName, lastName, city, street);
      if(resp) {
        toast.success("Your delivery is on the way!", toastOptions);
        props.onClose();
      } else {
        toast("Something went wrong, please try again!", toastOptions);
      }
    } else {
      setIsInputValid(false);
    }
  }

  function sendStuffToCustomer(plz: ValidPlz, firstName: string, lastName: string, city: string, street: string) {
    return (Math.random() * 100) > 50;
  }
  
  return (
    <div>
      {props.product ? (
        <Modal
          ariaHideApp={false}
          isOpen={props.product ? true : false}
          onRequestClose={props.onClose}
          style={modalStyle}
        >
          <form className="modal-form" onSubmit={handleBuyClick}>
            <div style={{ fontWeight: "bold" }}>{props.product.name}</div>
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label>City</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <label>PLZ</label>
            <input
              type="text"
              onChange={(e) => setPlz(e.target.value)}
            ></input>
            <label>Street</label>
            <input
              type="text"
              onChange={(e) => setStreet(e.target.value)}
            ></input>
            {isInputValid ? (
              <div></div>
            ) : (
              <div
                style={{ color: "red", fontSize: "small", marginTop: "5px" }}
              >
                Input is not valid!
              </div>
            )}
            <button style={{ marginTop: "5px" }}>
              Buy
            </button>
          </form>
        </Modal>
      ) : (
        <div />
      )}
      <ToastContainer />
    </div>
  );
}
