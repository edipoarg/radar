import { useEffect, useState, Children, cloneElement } from "react";
import DEBUG from "debug";
const debug = DEBUG("Loader");

export default function Loader({ urls, children }) {
  const [data] = useState(urls);
  const [loaded, setLoaded] = useState(0);
  const count = Object.keys(urls).length;

  useEffect(() => {
    setLoaded(0);
  }, Object.values(urls));

  debug(`${loaded}/${count}`);
  if (loaded >= count) {
    return Children.map(children, (child) => cloneElement(child, data));
  }

  return `Loading... ${loaded}/${count}`;
}

export async function loader(urls) {
  const data = {};
  for (let [k, u] of Object.entries(urls)) {
    await fetch(u).then(async (r) => {
      data[k] = await r.json();
    });
  }
  return data;
}
