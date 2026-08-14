import PayersClient from "./PayersClient";

export const metadata = {
  alternates: {
    canonical: "https://www.credflow.ai/payers",
  },
};

export default function PayersPage() {
  return <PayersClient />;
}
