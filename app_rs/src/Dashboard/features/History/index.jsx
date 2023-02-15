import ReceiptContent from "./ReceiptContent";
import GreenCard from "./../common/GreenCard";
import EmptyContent from "../common/EmptyContent";
import LoadingAnimation from "../common/LoadingAnimation";

import { makeState } from "../../../utils";
import { useSelector, useDispatch } from 'react-redux';

import "./style.scss";
import {invoke} from "@tauri-apps/api";
import {setShouldRefresh} from "../../../stateController/dashboard";

function History() {
  const receiptContent = makeState([])
  const itemContent = makeState([]);
  const categoryContent = makeState([]);

  // Determines whether the contents should keep refreshing or not
  const contents = {
    receiptContent,
    itemContent,
    categoryContent,
  };

  return (
    <div className="dashboard-history">
      <div className="header">
        <span className="primary"> History </span>
        <span className="secondary"> Receipts </span>
      </div>
      <GreenCard>
        <HistoryContent contents={contents}/>
      </GreenCard>
    </div>
  )
}

function HistoryContent ( { contents } ) {
  const dataMap = useSelector(state => state.userData.data);
  const shouldRefresh = useSelector(state => state.dashboard.shouldRefresh);
  const dispatch = useDispatch();

  if (dataMap.receipts === null) {
    return <EmptyContent />
  }

  if (shouldRefresh) {
    updateContents(contents, dataMap, dispatch);
    return <LoadingAnimation />
  }

  // If a refresh isn't required, then it is safe to load the content
  console.debug("[Loading]    ReceiptContent history");
  return <ReceiptContent data={contents.receiptContent} />
}

function updateContents(contents, dataMap, dispatch) {
  let receiptKeys = Object.keys(dataMap.receipts);
  let receiptPromises = receiptKeys.map(async key => {
    return await invoke("get_receipt_history", {key, dataMap});
  });

  Promise.all(receiptPromises)
    .then(arr => {
      contents.receiptContent.set(arr);
      console.debug("[state.dashboard] - setShouldRefresh = false");
      dispatch(setShouldRefresh(false));
    });
}

export default History;

