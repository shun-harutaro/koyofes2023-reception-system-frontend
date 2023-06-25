/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react"
import { useNavigate, Link } from "react-router-dom";
import { useZxing } from "react-zxing";
import { Alert, Button } from "@mui/material";

export const Scan = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const { ref } = useZxing({
    onResult(result) {
      console.log(result);
      if (result.getText().length !== 8) {
        setIsError(true);
      } else {
        setIsError(false);
        const UID = result.getText();
        checkUID(UID);
      }
    },
    //paused: result === 'ok',
  });
  
  const checkUID = async(scanedUID) => {
    /** @type {boolean} */
    const isValid = await fetchUid(scanedUID);
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
    <div>
     { isError && <Alert severity="error">無効なQRコードです！</Alert> }
    </div>
    <div css={videoWrapper} >
      <video ref={ref} css={videoStyle} />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        ホームに戻る
      </Button>
    </div>
    </>
  );
}

const videoWrapper = css`
  height: 100%;
`

const videoStyle = css`
  margin: 5px;
  max-height: 80vh;
`