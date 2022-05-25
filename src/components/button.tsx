import React from 'react';

interface Tprops {
  IonClick?: () => void;
  text: string;
  className: string;
}

export default function Button({ text, IonClick, className }: Tprops) {
  return (
    <>
      <button
        className={className}
        onClick={() => {
          if (IonClick) IonClick();
        }}
      >
        {text}
      </button>
    </>
  );
}
