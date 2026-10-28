import { getPayload } from "payload";
import config from "@/payload.config";
import AboutClient from "./AboutClient";

// sprache: Kürzel aus der Adresse, damit Payload Titel und Text in dieser Sprache liefert
export default async function About({ sprache }) {

  const payload = await getPayload({config});

  const{docs: [about],} = await payload.find({
    collection: "about",
    locale: sprache,
  });

  if (!about) {
    return <div>No About Data Found</div>;
  }

  return <AboutClient about={about} sprache={sprache} />;
}
