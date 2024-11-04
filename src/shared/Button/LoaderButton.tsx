import React from 'react';
import Loader from '../Loader/Loader';

const LoaderButton = (props: any) => {
  return (
    <React.Fragment>
      <button
        onClick={props.onClick}
        disabled={props.disabled || props.isLoading}
        type={props.type}
        className={props.className}
      >

        {props.text}
        {props.isLoading ? <Loader /> : null}

      </button>
    </React.Fragment>
  );
}

export default LoaderButton


