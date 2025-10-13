import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getNoteById, updateNote } from "../../../api/notes";
import Button from "../../../ui/Button";

const NotePage = () => {
  const navigate = useNavigate();
  const noteId = useParams<{ noteId: string }>().noteId || "";
  const note = useMemo(() => getNoteById(noteId), [noteId]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [noteId, note?.title, note?.content]);

  if (!note) {
    return <div className="p-4">Note not found</div>;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd, value } = textarea;
      const newValue =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);
      setContent(newValue);

      // Restore caret position after render
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (el) {
          el.selectionStart = el.selectionEnd = selectionStart + 1;
        }
      });
    }
  };

  const handleSave = async () => {
    if (!noteId) return;
    setSaving(true);
    try {
      updateNote(noteId, { name: title, content });
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-white w-full">
      {/* Back button for mobile */}
      {
        <div className="lg:hidden p-4">
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      }

      {/* Header */}

      <h3
        className="sticky top-0 z-10 border-b border-(--divider) 
        bg-main-bg backdrop-blur 
        px-4 py-3 flex justify-between gap-4 items-center"
      >
        <div className="flex items-center w-full">
          <span className="text-preset-4">Title - </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note name..."
            className="flex-1
            w-full text-preset-3 mx-2
            outline-none border-none
            focus:outline-none focus:ring-0
            focus:border-none shadow-none
            bg-(--main-bg)"
          />
        </div>
        <Button
          onClick={handleSave}
          variant="primary"
          width="100px"
          height="41px"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </h3>

      {/* Content area */}
      <main className="flex-1 min-h-0">
        <textarea
          value={content}
          ref={textareaRef}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="
            w-full h-full min-h-dvh
            p-4 md:p-6
            outline-none 
            border-0 focus:ring-0
            resize-none
            whitespace-pre-wrap
            text-preset-5
            overflow-y-auto
          "
          onKeyDown={handleKeyDown}
        />
      </main>
    </div>
  );
};

export default NotePage;
