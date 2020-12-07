/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect } from "@open-wc/testing";
import "../loading-layer";

describe("LoadingLayer", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <loading-layer></loading-layer>
      `
    );
    const base = el.shadowRoot.querySelector(".loading-layer");

    expect(base).not.to.be.null;
    expect(el).dom.to.equalSnapshot();
  });
});
