import React from 'react'
import { useLottie } from "lottie-react";
import paw from '../../static/json/paw.json'

const Loader = () => {
  const options = {
    animationData: paw,
    loop: true,
  }

  const { View } = useLottie(options);

  return <>
    <div style={{ width: 200, height: 200 }}>
      {View}
    </div>
  </>;
}

export default Loader