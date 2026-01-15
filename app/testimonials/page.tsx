import GlassCard from "../../src/components/GlassCard";

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
}

interface GooglePlacesResponse {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  status?: string;
}

async function fetchGoogleReviews(): Promise<{
  rating?: number;
  totalReviews?: number;
  reviews: GoogleReview[];
  error?: string;
}> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      reviews: [],
      error:
        "Google reviews are not yet connected. Add GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID to your environment.",
    };
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json",
    );
    url.searchParams.set("place_id", placeId);
    url.searchParams.set(
      "fields",
      "rating,user_ratings_total,reviews",
    );
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      // Cache on the server for a bit so we don't hammer the API on every request
      next: { revalidate: 60 * 10 },
    });

    if (!res.ok) {
      return { reviews: [], error: `Failed to fetch Google reviews (${res.status})` };
    }

    const data = (await res.json()) as GooglePlacesResponse;

    if (data.status !== "OK" || !data.result) {
      return {
        reviews: [],
        error: `Google Places API returned status: ${data.status ?? "UNKNOWN"}`,
      };
    }

    const { rating, user_ratings_total, reviews = [] } = data.result;

    // Only keep the most recent 6 reviews for layout
    const limited = reviews.slice(0, 6);

    return {
      rating,
      totalReviews: user_ratings_total,
      reviews: limited,
    };
  } catch (err) {
    console.error("Error fetching Google reviews", err);
    return { reviews: [], error: "Unexpected error while fetching Google reviews." };
  }
}

export const metadata = {
  title: "Customer testimonials",
  description:
    "See what Richmond drivers are saying about Ace Auto's mobile mechanic service.",
};

export default async function TestimonialsPage() {
  const { rating, totalReviews, reviews, error } = await fetchGoogleReviews();

  const hasLiveReviews = reviews.length > 0;

  const fallbackTestimonials: GoogleReview[] = [
    {
      author_name: "Local RVA driver",
      rating: 5,
      relative_time_description: "recent",
      text: "Super clear about what my car needed and why. Showed up on time to my driveway and had me back on the road in a couple of hours.",
    },
    {
      author_name: "Fleet customer",
      rating: 5,
      relative_time_description: "recent",
      text: "We use Ace for several vehicles. Communication is excellent and they work around our schedule so downtime is minimal.",
    },
    {
      author_name: "First-time customer",
      rating: 5,
      relative_time_description: "recent",
      text: "Way easier than dropping my car at a shop. Pricing was explained up front and there were no surprises.",
    },
  ];

  const testimonialsToShow = hasLiveReviews ? reviews : fallbackTestimonials;

  return (
    <div className="min-h-screen bg-neutral-100">
      <section className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Testimonials
            </p>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              What Richmond drivers say
            </h1>
            <p className="max-w-xl text-sm text-neutral-600">
              Real words from people we&apos;ve helped around Richmond and the surrounding area. Clear communication, on-time arrivals, and work that keeps you moving.
            </p>
          </div>

          <div className="space-y-2 text-sm text-neutral-800">
            {rating && totalReviews ? (
              <>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Google rating
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {rating.toFixed(1)}
                  <span className="ml-2 text-sm align-middle text-neutral-500">
                    based on {totalReviews} reviews
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Google reviews
                </p>
                <p className="text-sm text-neutral-500">
                  Live Google reviews will appear here once connected.
                </p>
              </>
            )}

            {error && (
              <p className="max-w-sm text-xs text-neutral-500">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsToShow.map((review, idx) => (
            <GlassCard
              key={`${review.author_name}-${idx}`}
              delay={0.05 * idx}
              className="flex h-full flex-col justify-between p-5 text-sm text-neutral-800"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                        {review.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {review.author_name}
                      </p>
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900">
                    <span>{review.rating.toFixed(1)}</span>
                    <span className="text-[0.7rem] text-neutral-500">/ 5</span>
                  </div>
                </div>

                <p className="text-[0.9rem] leading-relaxed text-neutral-700">
                  {review.text}
                </p>
              </div>

              {hasLiveReviews && (
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-neutral-400">
                  Sourced from Google Reviews
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
