import React from "react";
import react, { FC, useState } from "react";

type inputType = {
  grade: number;
  Class: number;
};

const MakeClass: FC = () => {
  const [input, setInput] = useState<inputType>({
    grade: 0,
    Class: 0,
  });

  const { grade, Class } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const data = { grade: grade, class: Class };

  return (
    <div>
      <div>grade:{input.grade}</div>
      <div>class:{input.Class}</div>
      <input
        name='grade'
        placeholder='grade'
        type='number'
        onChange={onChange}
      />
      <input
        name='Class'
        placeholder='class'
        type='number'
        onChange={onChange}
      />
    </div>
  );
};

export default MakeClass;
