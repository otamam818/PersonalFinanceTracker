import { makeState } from "../../../utils";
import { useSelector, useDispatch } from 'react-redux';
import ReceiptContent from "./ReceiptContent";

import "./style.scss";
import {invoke} from "@tauri-apps/api";

function History() {
  const receiptContent = makeState([])
  const itemContent = makeState([]);
  const categoryContent = makeState([]);

  // Determines whether the contents should keep refreshing or not
  const shouldRefresh = makeState(true);
  const contents = {
    receiptContent,
    itemContent,
    categoryContent,
    shouldRefresh
  };

  return (
    <div className="dashboard-history">
      <HistoryContent
        shouldRefresh={shouldRefresh}
        contents={contents}
      />
    </div>
  )
}

function HistoryContent ( { contents } ) {
  let dataMap = useSelector(state => state.userData.data);
  let shouldRefresh = contents.shouldRefresh.get;
  if (shouldRefresh) {
    updateContents(contents, dataMap);
    return <span className="loading">Loading...</span>
  }
  return <ReceiptContent data={contents.receiptContent} />
}

function updateContents(contents, dataMap) {
  if (dataMap.receipts === null) {
    console.log("Reached here");
    return;
  }
  let receiptKeys = Object.keys(dataMap.receipts);
  console.log({receiptKeys, contents});
  let newKeys = receiptKeys.map(async key => {
    let newReceiptContent
      = await invoke("get_receipt_history", {key, dataMap});
    contents
      .receiptContent
      .set(contents
        .receiptContent
        .get
        .concat(newReceiptContent)
      );
    return newReceiptContent;
  });
  console.log({newKeys});
  contents.shouldRefresh.set(false);
  
  // contents.receiptContent.set(receiptContents);
}

export default History;

