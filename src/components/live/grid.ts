import {
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
  unsafeCSS,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CameraManager } from '../../camera-manager/manager.js';
import { MicrophoneState } from '../../card-controller/types.js';
import { ViewManagerEpoch } from '../../card-controller/view/types.js';
import { MediaGridSelected } from '../../components-lib/media-grid-controller.js';
import { LiveConfig } from '../../config/schema/live.js';
import { CardWideConfig } from '../../config/schema/types.js';
import { HomeAssistant } from '../../ha/types.js';
import liveGridStyle from '../../scss/live-grid.scss';
import './carousel.js';

@customElement('camera-card-ha-live-grid')
export class AdvancedCameraCardLiveGrid extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property({ attribute: false })
  public viewManagerEpoch?: ViewManagerEpoch;

  @property({ attribute: false })
  public liveConfig?: LiveConfig;

  @property({ attribute: false })
  public cardWideConfig?: CardWideConfig;

  @property({ attribute: false })
  public cameraManager?: CameraManager;

  @property({ attribute: false })
  public microphoneState?: MicrophoneState;

  @property({ attribute: false })
  public triggeredCameraIDs?: Set<string>;

  protected _renderCarousel(cameraID?: string): TemplateResult {
    const view = this.viewManagerEpoch?.manager.getView();
    const triggeredCameraID = cameraID ?? view?.camera;

    return html`
      <camera-card-ha-live-carousel
        grid-id=${ifDefined(cameraID)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${cameraID}
        .liveConfig=${this.liveConfig}
        .cardWideConfig=${this.cardWideConfig}
        .cameraManager=${this.cameraManager}
        .microphoneState=${this.microphoneState}
        ?triggered=${triggeredCameraID &&
        !!this.triggeredCameraIDs?.has(triggeredCameraID)}
      >
      </camera-card-ha-live-carousel>
    `;
  }

  protected _gridSelectCamera(cameraID: string): void {
    this.viewManagerEpoch?.manager.setViewByParameters({
      params: {
        camera: cameraID,
      },
    });
  }

  protected _needsGrid(): boolean {
    const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
    const view = this.viewManagerEpoch?.manager.getView();
    return (
      !!view?.isGrid() &&
      !!view?.supportsMultipleDisplayModes() &&
      !!cameraIDs &&
      cameraIDs.size > 1
    );
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('viewManagerEpoch') && this._needsGrid()) {
      import('../media-grid.js');
    }
  }

  protected render(): TemplateResult | void {
    const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
    if (!cameraIDs?.size || !this._needsGrid()) {
      return this._renderCarousel();
    }

    return html`
      <camera-card-ha-media-grid
        .selected=${this.viewManagerEpoch?.manager.getView()?.camera}
        .displayConfig=${this.liveConfig?.display}
        @advanced-camera-card:media-grid:selected=${(
          ev: CustomEvent<MediaGridSelected>,
        ) => this._gridSelectCamera(ev.detail.selected)}
      >
        ${[...cameraIDs].map((cameraID) => this._renderCarousel(cameraID))}
      </camera-card-ha-media-grid>
    `;
  }

  static get styles(): CSSResultGroup {
    return unsafeCSS(liveGridStyle);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'camera-card-ha-live-grid': AdvancedCameraCardLiveGrid;
  }
}
