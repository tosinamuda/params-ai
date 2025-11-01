import { Decoration, DecorationSet, EditorView, MatchDecorator, ViewPlugin, ViewUpdate } from "@codemirror/view";
import Mustache from "mustache";
import { PlaceholderWidget } from "../widget";

export class EditorHelper {

  static createPlaceholderMatcher(): MatchDecorator {
    return new MatchDecorator({
      regexp: /{{([^}]+)}}/g,
      decoration: (match) =>
        Decoration.replace({
          widget: new PlaceholderWidget(match[1]),
        }),
    });
  }

  static createPlaceholderPlugin(placeholderMatcher: MatchDecorator) {
    return ViewPlugin.fromClass(
      class {
        placeholders: DecorationSet;
        constructor(view: EditorView) {
          this.placeholders = placeholderMatcher.createDeco(view);
        }
        update(update: ViewUpdate) {
          this.placeholders = placeholderMatcher.updateDeco(
            update,
            this.placeholders
          );
        }
      },
      {
        decorations: (instance) => instance.placeholders,
        provide: (plugin) =>
          EditorView.atomicRanges.of((view) => {
            return view.plugin(plugin)?.placeholders || Decoration.none;
          }),
      }
    );
  }


  static createPlaceholder() {
    return this.createPlaceholderPlugin(this.createPlaceholderMatcher())
  }

  static parseText(text: string): string[] | null {
    try {
      return Mustache.parse(text)
        .filter((token) => token[0] === "name" && token[1])
        .map((token) => token[1]);
    }
    catch (error) {
      console.error(error);
      return null;
    }

  }

}

