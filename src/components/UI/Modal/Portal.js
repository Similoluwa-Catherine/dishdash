import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


const Portal = ({ children, el = "div" }) => {
    const [container] = useState(document.createElement(el));
    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return createPortal(children, container);
};

export default Portal;