import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";

export const Scan = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  //const [isValid, setIsValid] = useState(false);
  const { ref } = useZxing({
    onResult(result) {
      if (result.getText().length !== 8) {
        setResult("無効なUIDです。");
      } else {
        //setResult(result.getText());
        (async() => {
          //const a = await checkUID(result);
          navigate('/temp', {state: { UID: result } });
        })();
      }
    },
  });
  /*
  const checkUID = () => {
    fetch("url")
      .then(res => res.json())
      .then(
        (result) => {
          setIsValid(true);
        },
        (error) => {
          /* TODO: error handling 
        }
      )
  }
  */
  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
}