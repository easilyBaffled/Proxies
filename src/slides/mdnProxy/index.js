import React from "react";
import { Slide } from "spectacle";
import preloader from "spectacle/lib/utils/preloader";

import proxyScroll from "./proxyScroll.mov";

preloader({
  proxyScroll
});

export default (
  <Slide className={"fullScreen"}>
    <video
      className="fullScreen background"
      name="MDN Proxy Docs"
      src={proxyScroll}
      autoPlay
    />
  </Slide>
);
