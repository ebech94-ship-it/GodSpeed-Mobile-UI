import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../src/firebase/config";
import { LOCATIONS } from "../src/data/locations";

const email = process.env.GODSPEED_ADMIN_EMAIL;
const password = process.env.GODSPEED_ADMIN_PASSWORD;

async function seedLocations() {
  if (!email || !password) {
    throw new Error(
      "Missing GODSPEED_ADMIN_EMAIL or GODSPEED_ADMIN_PASSWORD."
    );
  }

  await signInWithEmailAndPassword(auth, email, password);

  for (const location of LOCATIONS) {
    await setDoc(doc(db, "locations", location.id), {
      ...location,
      active: location.active ?? true,
    });
  }

  console.log(`Seeded ${LOCATIONS.length} locations.`);
}

seedLocations().catch((error) => {
  console.error(error);
  process.exit(1);
});