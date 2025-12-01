import { CSSResultGroup, html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ref, Ref } from 'lit/directives/ref.js';
import { CardWideConfig } from '../config/schema/types';
import messageStyle from '../scss/message.scss';
import './icon.js';

type AdvancedCameraCardProgressIndicatorSize = 'tiny' | 'small' | 'medium' | 'large';

export function renderProgressIndicator(options?: {
  message?: string;
  cardWideConfig?: CardWideConfig | null;
  componentRef?: Ref<HTMLElement>;
  classes?: ClassInfo;
  size?: AdvancedCameraCardProgressIndicatorSize;
}): TemplateResult {
  return html`
    <camera-card-ha-progress-indicator
      class="${classMap(options?.classes ?? {})}"
      .size=${options?.size}
      ${options?.componentRef ? ref(options.componentRef) : ''}
      .message=${options?.message || ''}
      .animated=${options?.cardWideConfig?.performance?.features
        .animated_progress_indicator ?? true}
    >
    </camera-card-ha-progress-indicator>
  `;
}

@customElement('camera-card-ha-progress-indicator')
export class AdvancedCameraCardProgressIndicator extends LitElement {
  @property({ attribute: false })
  public message: string = '';

  @property({ attribute: false })
  public animated = false;

  @property({ attribute: false })
  public size: AdvancedCameraCardProgressIndicatorSize = 'large';

  protected render(): TemplateResult {
    return html` <div class="message vertical">
      ${this.animated
        ? html`<ha-spinner indeterminate size="${this.size}"> </ha-spinner>`
        : html`<camera-card-ha-icon
            .icon=${{ icon: 'mdi:timer-sand' }}
          ></camera-card-ha-icon>`}
      ${this.message ? html`<span>${this.message}</span>` : html``}
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return unsafeCSS(messageStyle);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'camera-card-ha-progress-indicator': AdvancedCameraCardProgressIndicator;
  }
}
