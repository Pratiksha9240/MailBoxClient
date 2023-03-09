import { useSelector } from "react-redux";
import "./Notification.css";

const Notification = () => {
  const ui = useSelector((state) => state.ui);

  return (
    <div
      style={{
        backgroundColor: `${ui.status === "ok" ? "green" : "red"}`,
        color: "white",
        textAlign: "center",
      }}
    >
      {ui.message}
    </div>
  );
};

export default Notification;
