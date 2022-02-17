import styled from "@emotion/styled";

export const Wrapper = styled.label<{
  width: number;
  heigth: number;
  isFold: boolean;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => heigth}px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border: 1px solid
    ${props =>
      props.isFold ? props.theme.color.main : props.theme.color.normal_gray};
  border-radius: 12px;
  display: flex;
  padding: 12px 0 12px 16px;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  position: relative;

  > .arrowButton {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
  }
`;
export const Selected = styled.div<{
  isDefaultValue: boolean;
}>`
  width: calc(100% - 28px);
  height: 100%;
  color: ${props =>
    props.isDefaultValue
      ? props.theme.color.black
      : props.theme.color.normal_gray};
`;

export const Options = styled.ul<{
  width: string;
}>`
  width: ${({ width }) => width}px;
  position: absolute;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  background-color: ${({ theme }) => theme.color.white};
  margin-top: 12px;
  > .eachOption {
    width: 100%;
    list-style: none;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.color.normal_gray};
    :hover {
      color: ${({ theme }) => theme.color.main};
    }
    :last-child {
      border-bottom: none;
    }
  }
`;
