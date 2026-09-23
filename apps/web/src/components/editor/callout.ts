import {
  mergeAttributes,
  Node,
} from "@tiptap/core";

import {
  findWrapping,
} from "@tiptap/pm/transform";

export type CalloutType =
  | "note"
  | "important"
  | "warning"
  | "tip";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (
        type?: CalloutType
      ) => ReturnType;

      toggleCallout: (
        type?: CalloutType
      ) => ReturnType;

      setCalloutType: (
        type: CalloutType
      ) => ReturnType;
    };
  }
}

export const Callout = Node.create({
  name: "callout",

  group: "block",

  content: "block+",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      type: {
        default: "note" as CalloutType,

        parseHTML: (element) => {
          const type =
            element.getAttribute(
              "data-callout"
            );

          if (
            type === "important" ||
            type === "warning" ||
            type === "tip"
          ) {
            return type;
          }

          return "note";
        },

        renderHTML: (attributes) => ({
          "data-callout":
            attributes.type,

          "data-callout-type":
            attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "aside[data-callout]",
      },
    ];
  },

  renderHTML({
    HTMLAttributes,
  }) {
    return [
      "aside",
      mergeAttributes(
        HTMLAttributes,
        {
          class:
            "mediverse-callout",
        }
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setCallout:
        (
          type: CalloutType = "note"
        ) =>
        ({
          state,
          dispatch,
        }) => {
          const {
            selection,
            schema,
          } = state;

          const {
            $from,
            $to,
          } = selection;

          const range =
            $from.blockRange($to);

          if (!range) {
            return false;
          }

          const calloutType =
            schema.nodes.callout;

          if (!calloutType) {
            return false;
          }

          const wrapping =
            findWrapping(
              range,
              calloutType,
              {
                type,
              }
            );

          if (!wrapping) {
            return false;
          }

          if (dispatch) {
            dispatch(
              state.tr
                .wrap(
                  range,
                  wrapping
                )
                .scrollIntoView()
            );
          }

          return true;
        },

      toggleCallout:
        (
          type: CalloutType = "note"
        ) =>
        ({
          state,
          dispatch,
        }) => {
          const {
            selection,
            schema,
          } = state;

          const {
            $from,
            $to,
          } = selection;

          const range =
            $from.blockRange($to);

          if (!range) {
            return false;
          }

          const calloutType =
            schema.nodes.callout;

          if (!calloutType) {
            return false;
          }

          const wrapping =
            findWrapping(
              range,
              calloutType,
              {
                type,
              }
            );

          if (!wrapping) {
            return false;
          }

          if (dispatch) {
            dispatch(
              state.tr
                .wrap(
                  range,
                  wrapping
                )
                .scrollIntoView()
            );
          }

          return true;
        },

      setCalloutType:
        (
          type: CalloutType
        ) =>
        ({
          state,
          dispatch,
        }) => {
          const {
            selection,
          } = state;

          let calloutDepth =
            -1;

          for (
            let depth =
              selection.$from.depth;
            depth > 0;
            depth--
          ) {
            if (
              selection.$from
                .node(depth)
                .type.name ===
              this.name
            ) {
              calloutDepth =
                depth;
              break;
            }
          }

          if (
            calloutDepth === -1
          ) {
            return false;
          }

          const calloutPos =
            selection.$from.before(
              calloutDepth
            );

          const calloutNode =
            selection.$from.node(
              calloutDepth
            );

          if (dispatch) {
            dispatch(
              state.tr
                .setNodeMarkup(
                  calloutPos,
                  calloutNode.type,
                  {
                    ...calloutNode.attrs,
                    type,
                  }
                )
                .scrollIntoView()
            );
          }

          return true;
        },
    };
  },
});