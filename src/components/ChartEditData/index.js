import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {  editGraphdata } from "../../redux/reducer";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { type } from "@testing-library/user-event/dist/type";
import "./index.css"
import store from "../../redux/store";

export default function ChartEditData({ tab }) {

    const customStyles = {
        content: {
          top: '35%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          width: '60%',
          transform: 'translate(-40%, -10%)',
        },
      };
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state);

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState();
  const [keyid, setKeyid] = useState();
  const [ind, setInd] = useState();
  const [currentValue, setCurrentValue] = useState();
  function stateUpdate(e) {
    setModal(false);
    dispatch(editGraphdata({type:"edit", tab, keyid, edit, ind }));
  }

  function addKey(e) {
 
    setKeyid(e.target.id);
    setCurrentValue(e.target.name);
    setModal(true);
    setInd(e.target.value);
  }


  function deleteKey(e){
    setKeyid(e.target.id);
    setCurrentValue(e.target.name);
 
    setInd(e.target.value);
    dispatch(editGraphdata({type:"delete", tab, keyid, edit, ind }));

  }

  function getItems(arr) {
    return arr.map((item, index) => {
      return (
        <div>

            <div className="myDiv">
          <span>{Object.keys(item)[0] + "  :    "}</span>
          <span>{Object.values(item)[0]}</span>
          </div>
          {tab == "income" ? (
            <div>
              <span>
                <button classNme="button-8" 
                  id={Object.keys(item)[0]}
                  value={index}
                  name={Object.values(item)[0]}
                  onClick={(e) => addKey(e)}
                >
                  Edit Amount
                </button>
              </span>
            </div>
          ) : (
            <div>
              <span>
                <button classNme="button-8" 
                  name={Object.values(item)[0]}
                  id={Object.keys(item)[0]}
                  value={index}
                  onClick={(e) => addKey(e)}
                >
                  Edit Amount
                </button>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                <button classNme="button-8" 
                  onClick={(e) => deleteKey(e)}
                  name={Object.values(item)[0]}
                  value={index}
                  id={Object.keys(item)[0]}
                >
                  Delete
                </button>
              </span>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div>
        <Provider store={store}>
      {getItems(graphData.addGraphdata[tab])}

      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        contentLabel="Edit Modal"
        
        style={customStyles}
      >
        <div>
            <div className="myDiv">
          <span>{keyid + "   :   "}</span>
          <span>Current Value: &nbsp;{currentValue}</span>{" "}
          <span>New Value :</span>
          <span>
            <input
              type="number"
              onChange={(e) => setEdit(e.target.value)}
            ></input>
          </span>
          </div>
          <div>
            <button classNme="button-8"  onClick={(e) => stateUpdate(e)}>OK</button>
            &nbsp;&nbsp;&nbsp;{" "}
            <button classNme="button-8"  onClick={() => setModal(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      </Provider>
    </div>
  );
}
