/**
 * @param {IL10n} l10n
 */
class Tour {
  instance = window.driver.js.driver({
    showProgress: true,
  });

  constructor(l10n) {
    this.l10n = l10n;
    this.instance.setConfig({
      onDestroyStarted: () => {
        if (!this.instance.hasNextStep()) {
          this.instance.destroy();
          return;
        }
        this.instance.moveNext();
      },
      onCloseClick: () => {
        this.instance.destroy();
      },
    });
  }

  async show() {
    const toobarTitle = await this.l10n.get("pdfjs-tour-toolbar-step-title");
    const paginatorTitle = await this.l10n.get(
      "pdfjs-tour-paginator-step-title"
    );
    const toolbarDescription = await this.buildToolbarDescription();
    const paginatorDescription = await this.l10n.get("pdfjs-tour-paginator");

    this.instance.setSteps([
      {
        element: "#toolbarViewer",
        popover: {
          title: toobarTitle,
          description: toolbarDescription,
        },
      },
      {
        element: ".paginationContainer",
        popover: {
          title: paginatorTitle,
          description: paginatorDescription,
        },
      },
    ]);
    this.instance.drive();
  }

  async buildToolbarDescription() {
    return `
    <div class="tour-container">
      <div><p id="sidebarToggle" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-sidebar")}</p></div>
      <div><p id="viewFind" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-search")}</p></div>
      <div><p id="zoomOut" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-zoom-out")}</p></div>
      <div><p id="zoomIn" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-zoom-in")}</p></div>
      <div><p id="viewerFullscreen" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-fullscreen")}</p></div>
      <div><p id="editorFreeText" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-freetext")}</p></div>
      <div><p id="editorInk" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-ink")}</p></div>
      <div><p id="editorStamp" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-stamp")}</p></div>
      <div><p id="secondaryToolbarToggle" class='icon'>:</p><p>${await this.l10n.get("pdfjs-tour-tools")}</p></div>
      <div><p>${await this.l10n.get("pdfjs-tour-more-info")}</p></div>
    </div>`;
  }
}

export { Tour };
