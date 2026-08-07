import { headers } from "next/headers";
import { getVisitorCountry } from "@/lib/consentRegions";

/**
 * Returns the visitor's country from Amplify/CloudFront headers.
 * Used as a client-side geo check so the cookie banner stays correct
 * even if SSR HTML was served without a country header.
 */
export async function GET() {
  const headersList = await headers();
  const country = getVisitorCountry(headersList);

  return Response.json(
    { country },
    {
      headers: {
        // Never cache by country across users
        "Cache-Control": "private, no-store",
      },
    }
  );
}
