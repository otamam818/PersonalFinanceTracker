import ReceiptContent from "./ReceiptContent";
import GreenCard from "./../common/GreenCard";
import EmptyContent from "../common/EmptyContent";
import LoadingAnimation from "../common/LoadingAnimation";

import { makeState } from "../../../utils";
import { useSelector, useDispatch } from 'react-redux';

import "./style.scss";
import {invoke} from "@tauri-apps/api";

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
      <GreenCard >
        <HistoryContent
          contents={contents}
        />
      </GreenCard>
    </div>
  )
}

function HistoryContent ( { contents } ) {
  let dataMap = useSelector(state => state.userData.data);
  const dispatch = useDispatch();
  if (dataMap.receipts === null) {
    return <EmptyContent />
  }
  let shouldRefresh
    = contents.receiptContent.get.length !==
      Object.keys(dataMap.receipts).length;
  if (shouldRefresh) {
    updateContents(contents, dataMap, dispatch);
    return <LoadingAnimation />
  }
  console.info("Loading ReceiptContent history");
  return <ReceiptContent data={contents.receiptContent} />
}

function updateContents(contents, dataMap) {
  if (dataMap.receipts === null) {
    console.info("Empty dataMap receipt");
    return;
  }
  let receiptKeys = Object.keys(dataMap.receipts);
  receiptKeys.map(async key => {
    let newReceiptContent
      = await invoke("get_receipt_history", {key, dataMap});
    contents
      .receiptContent
      .set(contents
        .receiptContent
        .get
        .concat(newReceiptContent)
      );
  });
}

export default History;

