import { useParams } from "react-router";
import { getCollectionNameById } from "../api/collections";

export const useCollectionId = () => {
  const { collection } = useParams<{ collection: string }>();
  if (!collection) {
    return { c_type: null, c_id: null };
  }

  const c = collection.split("_");
  const c_name = getCollectionNameById(c[1]);

  return { c_type: c[0], c_id: c[1], c_name };
};
