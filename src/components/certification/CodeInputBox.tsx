import styled from "@emotion/styled";
import React, { MutableRefObject } from "react";

interface Props {
  inputRef: MutableRefObject<HTMLInputElement[] | null[]>;
}

const CodeInputBox: React.FC<Props> = ({ inputRef }) => {
  const isAlpa = /^[A-Za-z0-9]$/;

  const onKeyDownNextChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1 && isAlpa.test(e.key)) {
      if (e.currentTarget.nextElementSibling instanceof HTMLInputElement) {
        e.currentTarget.nextElementSibling.focus();
      }
    }
    if (
      e.key === "Backspace" &&
      e.currentTarget.value.length === 0 &&
      e.currentTarget.previousElementSibling instanceof HTMLInputElement
    ) {
      {
        e.currentTarget.previousElementSibling.focus();
      }
    }
  };

  return (
    <InputArea>
      {inputRef.current.map((_, i) => (
        <input
          type='text'
          key={i}
          ref={elem => (inputRef.current[i] = elem)}
          maxLength={1}
          onKeyDown={onKeyDownNextChange}
        />
      ))}
    </InputArea>
  );
};

const InputArea = styled.div`
  display: flex;
  gap: 18px;
  > input {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    text-align: center;
    color: ${({ theme }) => theme.color.black};
    font-size: 22px;
  }
`;

export default CodeInputBox;
