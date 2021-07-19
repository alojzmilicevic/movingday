import { apiAction } from "./middleware/store/actions.middleware";
import { DATABASE_URL } from "./constants.api";

export const postNotes = data => apiAction({
  url: DATABASE_URL,
  method: 'PUT',
  data,
})