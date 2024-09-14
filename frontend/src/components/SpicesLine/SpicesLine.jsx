import "./SpicesLine.css"
import spices1 from "./spices1.png";
import spices2 from "./spices2.png";
import spices3 from "./spices3.png";

const SpicesLine = () => {
  return (
    <div className="spices">
        <img src={spices1} alt="spices1" />
        <img src={spices2} alt="spices2" />
        <img src={spices3} alt="spices3" />
    </div>
  );
};

export default SpicesLine;