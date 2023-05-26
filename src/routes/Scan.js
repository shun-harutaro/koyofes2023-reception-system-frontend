import React, { useState } from "react";
import { useZxing } from "react-zxing";

export const Scan = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      if (result.getText().length !== 8) {
        setResult("無効なUIDです。");
      } else {
        setResult(result.getText());
      }
    },
  });
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