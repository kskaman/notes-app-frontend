import type { Note as NoteType } from "../../../types/note";

const Note = ({ note }: { note: NoteType }) => {
  return <div>{note.content}</div>;
};

export default Note;
