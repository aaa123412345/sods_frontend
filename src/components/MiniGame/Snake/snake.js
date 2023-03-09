import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./snake.css";

function Snake() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "minigame/snake/Build/BuildUnity.loader.js",
    dataUrl: "minigame/snake/Build/BuildUnity.data.unityweb",
    frameworkUrl: "minigame/snake/Build/BuildUnity.framework.js.unityweb",
    codeUrl: "minigame/snake/Build/BuildUnity.wasm.unityweb",
  });

  return <Unity unityProvider={unityProvider}  className="snake"/>;
}

export default Snake;
