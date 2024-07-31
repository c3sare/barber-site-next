import styled from "styled-components";

type Props = {};

export const StyledColumnDiv = styled.div<Props>(
  () => `
    width: 100%;

    @media (max-width: 1119px) {
        width: 100%;
    }

    @media (max-width: 1023px) {
        width: 100%;
    }

    @media (max-width: 767px) {
        width: 100%;
    }

    @media (max-width: 479px) {
        width: 100%;
    }
`
);
