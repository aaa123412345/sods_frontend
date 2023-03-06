import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./snake.css";

function Snake() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/BuildUnity.loader.js",
    dataUrl: "build/BuildUnity.data.unityweb",
    frameworkUrl: "build/BuildUnity.framework.js.unityweb",
    codeUrl: "build/BuildUnity.wasm.unityweb",
  });

  return <Unity unityProvider={unityProvider}  className="snake"/>;
}

export default Snake;
