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
          const isValid = await checkUID(result);
          if (isValid) {
            navigate(`/temp/${result}`, { state: { isValid: true } });
          } else {
            navigate(`/`, { state: { isValid: false} });
          }
        })();
      }
    },
  });
  const checkUID = (challengeUID) => {
    fetch(process.env.REACT_APP_API_URL, {
      method: "GET",
      uid: challengeUID,
    })
      .then(res => res.json())
      .then(
        (data) => {
          //setIsValid(true);
          console.log(data);
          return true
        }
      )
      .catch((err) => {
        console.log(err);
        return false;
        }
      )
  };
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