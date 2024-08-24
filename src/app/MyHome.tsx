"use client"
import { useGetPropertyQuery } from "@/Redux/Features/property/Property-api-slice";
import Loading from "./loading";

export default function MyHome() {

  const { data, error, isLoading } = useGetPropertyQuery("4707 Wurzbach Rd, San Antonio, TX 78238");

  if (isLoading) return <p className="mt-96">Loading...</p>;
  if (error) return <p className="mt-96">Error: {JSON.stringify(error)}</p>;

  return <div className="mt-96">{JSON.stringify(data)}</div>;
}
