function ReceiptContent({ data }) {
  const {date, items, store, time} = data.get[0];
  console.log({date, items, store, time});

  return (
    <div>
      Hello ReceiptContent
    </div>
  )
}

export default ReceiptContent;

