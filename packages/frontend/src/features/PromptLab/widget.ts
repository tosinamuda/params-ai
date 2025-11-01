import { WidgetType } from "@codemirror/view";

export class PlaceholderWidget extends WidgetType {
  constructor(readonly content: string | HTMLElement) {
    super();
    this.content = content;
  }

  toDOM() {
    const wrap = document.createElement('mark');
    wrap.className = 'mustache__placeholder ';
    wrap.style.pointerEvents = 'none';


    if (typeof this.content === 'string') {
      wrap.textContent = this.content;
    } else {
      wrap.appendChild(this.content);
    }

    return wrap;
  }

  ignoreEvent() {
    return true;
  }
}

/**
 * 
 * border: 1px solid blue; border-radius: 4px; padding: 0px 3px; background: lightblue;
 */