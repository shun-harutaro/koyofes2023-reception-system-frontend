import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";

export const Scan = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  //const [isValid, setIsValid] = useState(false);
  const { ref } = useZxing({
    onResult(result) {
      console.log(result);
      if (result.getText().length !== 8) {
        setResult("無効なUIDです。");
      } else {
        setResult('ok');
        const UID = result.getText();
        checkUID(UID);
      }
    },
    paused: result === 'ok',
  });
  
  async function checkUID(scanedUID) {
    const isValid = await fetchUid(scanedUID);
    console.log(isValid);
    if (isValid) {
      navigate(`/temp/${scanedUID}`, { state: { isValid: true } });
    } else {
      navigate(`/`, { state: {isValid: false} });
    }
  }

  const fetchUid = async (challengeUID) => {
    const url = process.env.REACT_APP_API_URL+`/users/${challengeUID}`;
    const res = await fetch(url, {method: "GET"});
    const json = await res.json();
    console.log("result: " + JSON.stringify(json));
    return true;
  }

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