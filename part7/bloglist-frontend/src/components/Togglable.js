import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => (prev = !prev));
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="py-4 w-fit mx-auto">
      <div style={{ display: visible ? "none" : "" }}>
        <button
          onClick={toggleVisibility}
          className="px-6 py-2 text-white bg-cyan-500 rounded-xl"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        <button
          onClick={toggleVisibility}
          className="px-6 py-2 text-white bg-cyan-500 rounded-xl mx-20"
        >
                    Close
        </button>
        {props.children}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
