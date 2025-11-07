let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 1000 * 60 * 60 * 12;

export async function fetchGoogleReviews() {
  const now = Date.now();

  // ✅ 1. Utilise le cache s'il est encore valide
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    console.log("✅ Avis Google chargés depuis le cache mémoire");
    return cache.data;
  }

  // ✅ 2. Sinon, recharge depuis l’API Google
  console.log("📡 Récupération des avis depuis Google API...");
  const placeId = "ChIJ-8iOcQR3HwMRhhbI2Vv57DE";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&language=fr&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Erreur Google API : " + data.status);
  }

  // ✅ 3. Met à jour le cache en mémoire
  cache = {
    data: data.result,
    timestamp: now,
  };

  console.log("💾 Cache Google mis à jour (mémoire)");
  return data.result;
}
