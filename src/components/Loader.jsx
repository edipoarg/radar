import {useEffect, useState, Children, cloneElement } from 'react';
import DEBUG from 'debug';
const debug = DEBUG('Loader');

export default function Loader({urls, children }) {
    const [data, setData] = useState(urls)
    const [loaded, setLoaded ] = useState(0);
    const count = Object.keys(urls).length;

    useEffect(() => {
        setLoaded(0);
        Object.entries(urls).map(([k, u]) => fetch(u)
            .then(async r => {
                debug(`got ${u}`, r);
                setData({
                    ...data,
                    [k]: await r.json()
                })
                setLoaded(loaded => loaded + 1);

            }))
    }, Object.values(urls))

    debug(`${loaded}/${count}`)
    if (loaded >= count) {
        return (Children.map(children, child =>
            cloneElement(child, data)))
    }

    return `Loading... ${loaded}/${count}`
}
