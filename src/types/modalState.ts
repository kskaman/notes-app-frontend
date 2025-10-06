export type ModalState =
  | { type: "delete"; id: string }
  | { type: "archive"; id: string }
  | { type: "unarchive"; id: string }
  | { type: null; id?: undefined };
