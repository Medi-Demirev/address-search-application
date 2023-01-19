import { useState, useEffect } from "react";
import { CurrentAddressContext } from "../../context/CurrentAddressContext";

import Location from "../Location/Location";
import "./CurrentAddress.css";

const CurrentAddress = ({ data }) => {
  const [currentData, setCurrentData] = useState(data);
  const [currentAddress, setCurrentAddress] = useState({});

  const handleSelectClick = (address) => {
    const filteredAddress = data.filter((x) => {
      return x.address === address;
    });

    setCurrentAddress(filteredAddress);

  };
  const handleDeleteClick = (id) => {
    const filtered = data.filter((x) => {
      return x.id !== id;
    });

    setCurrentData(filtered);

  };
  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(currentData));
  }, [currentData]);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <CurrentAddressContext.Provider value={currentAddress}>
        <div onChange={handleSelectClick} className="address-body">
          <div className="addres-top">
            <img
              className="address-icon"
              alt="addres-img"
              src="https://freeiconshop.com/wp-content/uploads/edd/list-flat.png"
            ></img>
            <h2 className="title">Списък с намерените адреси </h2>
          </div>

          <div className="current-address">
            <ol className="border">
              {data.map((currentAddress) => (
                <li className="list" key={currentAddress.id}  >
                  {currentAddress.address}
                  <button className="location-btn"
                    title="Локация на адреса"
                    onClick={() => {
                      handleSelectClick(currentAddress.address);
                    }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteClick(currentAddress.id);
                      refreshPage();
                    }}
                    className="remove-btn"
                    title="Премахни от списъка"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Location />

      </CurrentAddressContext.Provider>
    </>
  );
};

export default CurrentAddress;
