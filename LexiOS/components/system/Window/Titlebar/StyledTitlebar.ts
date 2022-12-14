import type { DefaultTheme } from "styled-components";
import styled from "styled-components";

type StyledTitlebarProps = {
  $foreground: boolean;
};

const styledBorder = ({
  $foreground,
  theme,
}: StyledTitlebarProps & { theme: DefaultTheme }): string =>
  $foreground
    ? ``
    : ``;

const StyledTitlebar = styled.header<StyledTitlebarProps>`
  background-color: ${({ $foreground, theme }) =>
    $foreground
      ? 'var(--F_Background)'
      : 'var(--F_Surface_0)'};
  border-bottom: ${styledBorder};
  border-radius: .5rem .5rem 0 0;
  display: flex;
  height: ${({ theme }) => theme.sizes.titleBar.height}px;
  position: relative;
  top: 0;
  z-index: 2;

  h1 {
    color: ${({ $foreground, theme }) =>
      $foreground
        ? theme.colors.titleBar.text
        : theme.colors.titleBar.textInactive};
    display: flex;
    flex-grow: 1;
    font-size: ${({ theme }) => theme.sizes.titleBar.fontSize};
    font-weight: 400;
    min-width: 0;

    figure {
      align-items: center;
      display: flex;
      margin-left: .5rem;
      min-width: inherit;
      position: relative;
      top: -1px;

      picture {
        height: ${({ theme }) => theme.sizes.titleBar.iconSize};
        margin-right: ${({ theme }) => theme.sizes.titleBar.iconMarginRight};
        width: ${({ theme }) => theme.sizes.titleBar.iconSize};
      }

      figcaption {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  nav {
    display: flex;

    button {
      border-left: ${styledBorder};
      box-sizing: content-box;
      display: flex;
      place-content: center;
      place-items: center;
      align-items: center;
      width: ${({ theme }) => theme.sizes.titleBar.buttonWidth};
    cursor: pointer;

      img {
        filter: invert(.5);
        cursor: pointer;

        * {
          
        color: ${({ $foreground, theme }) =>
          $foreground
            ? 'var(--F_Font_Color_Label)'
            : 'var(--F_Font_Color_Disabled)'};
        }
        
        margin: 0 1px 2px 0;
        width: ${({ theme }) => theme.sizes.titleBar.buttonIconWidth};
      }

      &.minimize {
        svg {
          margin-bottom: 1px;
          margin-right: 0;
        }
      }

      &:hover {
        background-color: ${({ theme }) =>
          theme.colors.titleBar.backgroundHover};

        img {
          filter: invert(.9);
        }

        &.close {
          background-color: var(--F_Surface_1);
          transition: background-color 0.25s ease;
        }
      }

      &:active {
        background-color: rgb(51, 51, 51);

        &.close {
          background-color: rgb(139, 10, 20);
        }
      }

      &:disabled {
        svg {
          fill: ${({ $foreground }) =>
            $foreground ? "rgb(50, 50, 50)" : "rgb(60, 60, 60)"};
        }

        &:hover {
          background-color: inherit;
        }
      }
    }
  }
`;

export default StyledTitlebar;
