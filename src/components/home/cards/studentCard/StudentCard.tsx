import styled from "@emotion/styled";
import DefaultBox from "@src/components/common/defaultBox";
import React from "react";

const StudentCard = () => {
  return (
    <>
      <DefaultBox width={1224} height={100}>
        <StudentBox>
          <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAACcnJzR0dHg4ODGxsa2trZlZWW+vr4aGhoFBQXDw8Pv7+/l5eWlpaVTU1Otra2EhISNjY17e3v19fWenp5tbW0PDw+ysrKBgYHa2tpPT09ISEg2Njbz8/OQkJBcXFwrKysmJiZra2s/Pz/sVkTKAAACwklEQVR4nO3abVuqMACAYTCVOiKgCApq2sv//41HNjDFMcclKq3n/lJhNh7BjSjHAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANB/k9l8nk2fvRd3kMdZFueHTwbuwcuzd+cOXouwiWN74ci5XpjGcZz6D9uv7hgXFg+7Q92PCty3Zu5rxzuuMA2iM3LITgt1HlD4Whty/bPVksJJbchQbG1XmOsG0BeOu2xRqxe2O4ZT8ZyJbgBRGPtTtUWnMUqiMJxVskRsNS0ci8K5bgBROOt0n9sRhVF9q2mhJwo/dAP0ozCobzUsfC9Pbd0lwe8unJ1NT2rB1fP4zm4pnB7np1HzAHKmmQ5V8vduIrRuKdwWD6YisXlO1K4WD1gsbilM5SwTFh82jQP0o/B0Ll0UxgaFWTnJyHN13zRAPwrTKJCi8irl+OZqLpRnZ3ZsWDcMIB79CJU2mvdvZ2rXNI6zNCr0xXuwPDll7Jv68rQfc+nR0rAwkd9RLfVr+aWyox/r4ekxNDhLo/JV2B5n0LB8SnI5p/aj0EsGUiJnGqd5plmMsuoV2J9sjquN6aQW2Y9C8+vS1c8hDi6fIZ3n9KOwxXpYZYT1W4yLr+qh89s2ojBb+GoPuKhpWxjJPtUCMvQUh/DKb8BepzFKra9pXPdz3nTbwh9sLy7g9IVpVx3NWhcO9XfA/frR1Rd+3Rxw1U2/PZkI3H/NenkMf53aarHIxyvHwkJvsJtnsbf+LL74diwsPPPp2F54uDa1u3ATO3YV5rP5wW43SILV5KVa62wqVGsq1K7eP8rVJ997JsJH3HEzLVzqy2qFI8MX5Bl/Yf27hYa7nPzeQuWd60vlLvursYnVA/7EZlxoD/sLX8L9fl2EWVt4ZH9h9L3ZbLX/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADY4z8oJyW3zWFXGwAAAABJRU5ErkJggg==' />
          <User>
            <p>최민준</p>
            <p>3학년 3반 19번</p>
          </User>
          <Count style={{ gridColumn: "4 / 5" }}>1400</Count>
          <Count>8400</Count>
          <Count>1.4</Count>
          <Count>8.4</Count>
        </StudentBox>
      </DefaultBox>
    </>
  );
};

export default StudentCard;

const StudentBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(8, 1fr);
  place-items: center;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const User = styled.div`
  p:nth-of-type(1) {
    font-size: 18px;
    color: ${({ theme }) => theme.color.black};
  }
  p:nth-of-type(2) {
    font-size: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const Count = styled.p`
  font-size: 20px;
  font-weight: 500;
`;
