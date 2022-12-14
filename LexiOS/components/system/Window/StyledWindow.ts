import { m as motion } from "framer-motion";
import styled from "styled-components";

type StyledWindowProps = {
  $backgroundColor?: string;
  $isForeground: boolean;
};

const StyledWindow = styled(motion.section)<StyledWindowProps>`
  background: var(--F_Background);
  border-radius: .5rem;
  contain: strict;
  height: 100%;
  box-shadow: ${({ $isForeground, theme }) =>
    `${$isForeground
        ? 'var(--F_Outline_Focus)'
        : 'var(--F_Outline)'}`};
  width: 100%;
  header + * {
    height: ${({ theme }) =>
      `calc(100% - ${theme.sizes.titleBar.height}px) !important`};
  }
`;

export default StyledWindow;
