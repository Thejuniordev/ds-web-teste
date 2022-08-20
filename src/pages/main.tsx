import React from "react";
import Button from "../components/DS/Button";

export const Main = () => {

  return (
    <div className="main">
      <Button color={"default"} disabled={false} size="small">Send</Button>
      <Button color={"default"} disabled={false} size="medium">Send</Button>
      <Button color={"default"} disabled={true} size="small">Send</Button>
    </div>
  );
}

export default Main;
