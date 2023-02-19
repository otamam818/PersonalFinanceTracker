import TickBox from "./TickBox";

function Options ( { optionData }) {
  console.log({optionData});
  return optionData.map((value, index) =>
    <TickBox
      key={index}
      value={value}
    />);
}

export default Options;
