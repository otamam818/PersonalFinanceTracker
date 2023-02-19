function ItemMode( { currMode } ) {
  const valMap = {
    '+' : '-',
    '-' : '+'
  };

  return (
    <div
      className="options--button"
      onClick={() => {
        currMode.set(valMap[currMode.get]);
      }}
    >
      {currMode.get}
    </div>
  );
}

export default ItemMode;
