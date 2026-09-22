"use client";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
  onInsertImage: () => void;
};

type ToolbarButtonProps = {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({
  label,
  title,
  active = false,
  disabled = false,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={onClick}
      className={[
        "inline-flex h-9 min-w-9 items-center justify-center",
        "rounded-lg border px-2.5",
        "text-xs font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",

        active
          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700",

        disabled
          ? "cursor-not-allowed opacity-40"
          : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div className="mx-1 h-6 w-px bg-slate-200" />
  );
}

export function Toolbar({
  editor,
  onInsertImage,
}: Props) {
  if (!editor) return null;

  const isInsideTable =
    editor.isActive("table");

  const isInsideCallout =
    editor.isActive("callout");

  const canMergeCells = editor
    .can()
    .chain()
    .focus()
    .mergeCells()
    .run();

  const canSplitCell = editor
    .can()
    .chain()
    .focus()
    .splitCell()
    .run();

  const canAddRowBefore = editor
    .can()
    .chain()
    .focus()
    .addRowBefore()
    .run();

  const canAddRowAfter = editor
    .can()
    .chain()
    .focus()
    .addRowAfter()
    .run();

  const canDeleteRow = editor
    .can()
    .chain()
    .focus()
    .deleteRow()
    .run();

  const canAddColumnBefore = editor
    .can()
    .chain()
    .focus()
    .addColumnBefore()
    .run();

  const canAddColumnAfter = editor
    .can()
    .chain()
    .focus()
    .addColumnAfter()
    .run();

  const canDeleteColumn = editor
    .can()
    .chain()
    .focus()
    .deleteColumn()
    .run();

  const canDeleteTable = editor
    .can()
    .chain()
    .focus()
    .deleteTable()
    .run();

  return (
    <div className="border-b border-slate-200 bg-slate-50/80 px-3 py-3">
      <div className="flex flex-wrap items-center gap-1.5">

        {/* TEXT */}
        <div className="mr-1 flex items-center gap-1">
          <ToolbarButton
            label="B"
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
          />

          <ToolbarButton
            label="I"
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
          />

          <ToolbarButton
            label="U"
            title="Underline"
            active={editor.isActive("underline")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
          />

          <ToolbarButton
            label="H"
            title="Highlight"
            active={editor.isActive("highlight")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight()
                .run()
            }
          />

          <ToolbarButton
            label="x²"
            title="Superscript"
            active={editor.isActive("superscript")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .unsetSubscript()
                .toggleSuperscript()
                .run()
            }
          />

          <ToolbarButton
            label="x₂"
            title="Subscript"
            active={editor.isActive("subscript")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .unsetSuperscript()
                .toggleSubscript()
                .run()
            }
          />
        </div>

        <Divider />

        {/* HEADINGS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="H1"
            title="Heading 1"
            active={editor.isActive("heading", {
              level: 1,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 1,
                })
                .run()
            }
          />

          <ToolbarButton
            label="H2"
            title="Heading 2"
            active={editor.isActive("heading", {
              level: 2,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          />

          <ToolbarButton
            label="H3"
            title="Heading 3"
            active={editor.isActive("heading", {
              level: 3,
            })}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
          />
        </div>

        <Divider />

        {/* LISTS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="• List"
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          />

          <ToolbarButton
            label="1. List"
            title="Ordered list"
            active={editor.isActive("orderedList")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          />
        </div>

        <Divider />

        {/* BLOCKS */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="Quote"
            title="Blockquote"
            active={editor.isActive("blockquote")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
          />

          <ToolbarButton
            label="Code"
            title="Code block"
            active={editor.isActive("codeBlock")}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
          />

          <ToolbarButton
            label="—"
            title="Horizontal rule"
            onClick={() =>
              editor
                .chain()
                .focus()
                .setHorizontalRule()
                .run()
            }
          />
        </div>

        <Divider />

        {/* CALLOUT */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="Note"
            title={
              isInsideCallout
                ? "Change callout to Note"
                : "Create Note callout"
            }
            active={editor.isActive("callout", {
              type: "note",
            })}
            onClick={() => {
              if (editor.isActive("callout")) {
                editor
                  .chain()
                  .focus()
                  .setCalloutType("note")
                  .run();

                return;
              }

              editor
                .chain()
                .focus()
                .setCallout("note")
                .run();
            }}
          />

          <ToolbarButton
            label="Important"
            title={
              isInsideCallout
                ? "Change callout to Important"
                : "Create Important callout"
            }
            active={editor.isActive("callout", {
              type: "important",
            })}
            onClick={() => {
              if (editor.isActive("callout")) {
                editor
                  .chain()
                  .focus()
                  .setCalloutType("important")
                  .run();

                return;
              }

              editor
                .chain()
                .focus()
                .setCallout("important")
                .run();
            }}
          />

          <ToolbarButton
            label="Warning"
            title={
              isInsideCallout
                ? "Change callout to Warning"
                : "Create Warning callout"
            }
            active={editor.isActive("callout", {
              type: "warning",
            })}
            onClick={() => {
              if (editor.isActive("callout")) {
                editor
                  .chain()
                  .focus()
                  .setCalloutType("warning")
                  .run();

                return;
              }

              editor
                .chain()
                .focus()
                .setCallout("warning")
                .run();
            }}
          />

          <ToolbarButton
            label="Tip"
            title={
              isInsideCallout
                ? "Change callout to Tip"
                : "Create Tip callout"
            }
            active={editor.isActive("callout", {
              type: "tip",
            })}
            onClick={() => {
              if (editor.isActive("callout")) {
                editor
                  .chain()
                  .focus()
                  .setCalloutType("tip")
                  .run();

                return;
              }

              editor
                .chain()
                .focus()
                .setCallout("tip")
                .run();
            }}
          />
        </div>

        <Divider />

        {/* MEDIA */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="Image"
            title="Insert image"
            onClick={onInsertImage}
          />
        </div>

        <Divider />

        {/* TABLE */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="Table"
            title="Insert 3 × 3 table"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: true,
                })
                .run()
            }
          />
        </div>

        {/* TABLE CONTROLS */}
        {isInsideTable && (
          <>
            <Divider />

            <div className="flex items-center gap-1">
              <ToolbarButton
                label="+ Row"
                title="Add row after"
                disabled={!canAddRowAfter}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .addRowAfter()
                    .run()
                }
              />

              <ToolbarButton
                label="− Row"
                title="Delete current row"
                disabled={!canDeleteRow}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .deleteRow()
                    .run()
                }
              />

              <ToolbarButton
                label="+ Col"
                title="Add column after"
                disabled={!canAddColumnAfter}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .addColumnAfter()
                    .run()
                }
              />

              <ToolbarButton
                label="− Col"
                title="Delete current column"
                disabled={!canDeleteColumn}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .deleteColumn()
                    .run()
                }
              />
            </div>

            <div className="flex items-center gap-1">
              <ToolbarButton
                label="↑ Row"
                title="Add row before"
                disabled={!canAddRowBefore}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .addRowBefore()
                    .run()
                }
              />

              <ToolbarButton
                label="← Col"
                title="Add column before"
                disabled={!canAddColumnBefore}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .addColumnBefore()
                    .run()
                }
              />
            </div>

            <div className="flex items-center gap-1">
              <ToolbarButton
                label="Merge"
                title="Merge selected cells"
                disabled={!canMergeCells}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .mergeCells()
                    .run()
                }
              />

              <ToolbarButton
                label="Split"
                title="Split merged cell"
                disabled={!canSplitCell}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .splitCell()
                    .run()
                }
              />

              <ToolbarButton
                label="Header"
                title="Toggle header row"
                active={editor.isActive(
                  "tableHeader"
                )}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHeaderRow()
                    .run()
                }
              />

              <ToolbarButton
                label="Delete Table"
                title="Delete table"
                disabled={!canDeleteTable}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .deleteTable()
                    .run()
                }
              />
            </div>
          </>
        )}

        <Divider />

        {/* HISTORY */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            label="↶"
            title="Undo"
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .undo()
                .run()
            }
          />

          <ToolbarButton
            label="↷"
            title="Redo"
            disabled={
              !editor
                .can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .redo()
                .run()
            }
          />
        </div>

        <Divider />

        {/* CLEAR */}
        <ToolbarButton
          label="Clear"
          title="Clear formatting"
          onClick={() =>
            editor
              .chain()
              .focus()
              .unsetAllMarks()
              .clearNodes()
              .run()
          }
        />
      </div>
    </div>
  );
}