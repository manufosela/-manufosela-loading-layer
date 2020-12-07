import { LitElement, html } from "lit-element";
import { wcNameStyles } from "./loading-layer-style";

/**
 * `loading-layer`
 * LoadingLayer
 *
 * @customElement loading-layer
 * @litElement
 * @demo demo/index.html
 */

export class LoadingLayer extends LitElement {
  static get is() {
    return "loading-layer";
  }

  static get properties() {
    return {
      /**
       * Image Loading
       * @property
       * @type { String }
       */
      imageLoading: { 
        type: String,
        attribute: 'image-loading',
      },
      /**
       * Size Image Loading
       * @property
       * @type { Number }
       */
      imageSize: { 
        type: Number,
        attribute: 'image-size',
      },
      /**
       * On Load Start
       * @property
       * @type { Boolean }
       */
      onLoadStart: { 
        type: Boolean,
        attribute: 'on-loadstart',
      },
      /**
       * Frecuency
       * @property
       * @type { Number }
       */
      frecuency: { 
        type: Number,
      },
      /**
       * Timeout
       * @property
       * @type { Number }
       */
      timeout: { 
        type: Number,
      },
    };
  }

  static get styles() {
    return [wcNameStyles];
  }

  constructor() {
    super();
    this.loadLayerId = `LoadLayer-${Date.now()}`;
    this.loadLayerBlackedId = this.loadLayerId.replace('-', '-blacked-');
    this.onLoadStart = false;

    this.imageSize = '100';
    this.frecuency = '2'; // revolutions by seconds
    this.period = 1 / this.frecuency;
    this.timeout = '0'; // seconds. 0 there is not timeout


    this.contentStyle = '';
    this.contentHTML = '';

    this.imageLoading = null;
    this.defaultImageLoading = () => `
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="${this.imageSize}" height="${this.imageSize}" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="${this.period}s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    `;

    document.addEventListener('loading-layer_show', this.show.bind(this));
    document.addEventListener('loading-layer_hide', this.hide.bind(this));
  }  

  updated() {
    this.period = 1 / this.frecuency;
    this.imageLoading = this.imageLoading || this.defaultImageLoading();
    this.LoadingLayerHTML.innerHTML = `<div style="width:${this.imageSize}px; height:${this.imageSize}px" class="loader loader--style1">${this.imageLoading}</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.imageLoading = this.imageLoading || this.defaultImageLoading();
    this.injectStyles();
    this.createLoadingLayer();
    this.bodyBlackedout.style.height = document.documentElement.clientHeight;
    this.LoadingLayerHTML.style.top = `calc(${window.scrollY}px + 50%)`;
    this.injectLoadingLayerElements();
    if (this.onLoadStart) {
      this.show();
    }
  }

  createLoadingLayer() {
    this.LoadingLayerHTML = document.createElement('div');
    this.LoadingLayerHTML.id = this.loadLayerId;
    this.LoadingLayerHTML.classList.add('loading-layer');
    this.LoadingLayerHTML.innerHTML = this.imageLoading;
    this.bodyBlackedout = document.createElement('div');
    this.bodyBlackedout.id = this.loadLayerBlackedId;
    this.bodyBlackedout.classList.add('loading-layer-blackedout');
  }

  injectStyles() {
    let style = document.getElementById('LoadLayerContentStyles');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('id', 'LoadLayerContentStyles');
      style.setAttribute('type', 'text/css');
      style.innerHTML = wcNameStyles;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  injectLoadingLayerElements() {
    if (!document.getElementById(this.loadLayerId)) {
      document.body.appendChild(this.bodyBlackedout);
      document.body.appendChild(this.LoadingLayerHTML);
    }
  }

  hide() {
    document.getElementById(this.loadLayerId).classList.remove('loading-layer-visible');
    document.getElementById(this.loadLayerBlackedId).classList.remove('loading-layer-blackedout-visible');
  }

  show() {
    if (this.timeout > 0) {
      setTimeout(this.hide.bind(this), this.timeout * 1000);
    }
    document.getElementById(this.loadLayerId).classList.add('loading-layer-visible');
    document.getElementById(this.loadLayerBlackedId).classList.add('loading-layer-blackedout-visible');
  }
}