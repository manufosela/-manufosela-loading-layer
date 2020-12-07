import { css } from 'lit-element';

export const wcNameStyles = css`
  .loading-layer {
    background-color: transparent;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 45px;
    opacity: 0;
    pointer-events: none;
    transition: all 300ms ease-in-out;
    z-index: 1011;
  }

  .loading-layer-visible {
    opacity: 1;
    pointer-events: auto; 
  }

  .loading-layer-blackedout {
    position: absolute;
    z-index: 1010;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    display: none; 
  }

  .loading-layer-blackedout-visible { display: block; }

  .loader{
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
  }

  svg path, svg rect {
    fill: #ff6700;
  }
`;
