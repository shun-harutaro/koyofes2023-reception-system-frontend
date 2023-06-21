import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";

export const Scan = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      console.log(result);
      if (false/*result.getText().length !== 8*/) {
        setResult("無効なUIDです。");
      } else {
        setResult('ok');
        const UID = result.getText();
        checkUID(UID);
      }
    },
    paused: result === 'ok',
  });
  
  const checkUID = async(scanedUID) => {
    const isValid = await fetchUid(scanedUID);
    console.log({isValid});
    if (isValid) {
      navigate(`/temp/${scanedUID}`, { state: { isValid: true } });
    } else {
      navigate(`/`, { state: { isValid: false } });
    }
  }

  const fetchUid = async (challengeUID) => {
    const url = process.env.REACT_APP_API_URL+`/users/${challengeUID}`;
    try {
      const res = await fetch(url, {method: "GET"});
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const json = await res.json();
      console.log("result: " + JSON.stringify(json));
      return true;
    } catch (err) {
      console.error("Error: " + err);
      return false;
    }
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