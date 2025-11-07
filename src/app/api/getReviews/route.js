import { fetchGoogleReviews } from "@/lib/reviews";

export async function GET() {
  try {
    const data = await fetchGoogleReviews();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
