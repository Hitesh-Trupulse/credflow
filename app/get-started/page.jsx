import GetStartedClient from "./GetStartedClient";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
