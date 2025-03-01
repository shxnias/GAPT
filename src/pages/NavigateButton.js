import { useNavigate } from "react-router-dom";

const NavigateButton = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    window.scrollTo(0, 0); 
  };

  return (
    <button className="navigate-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default NavigateButton;
