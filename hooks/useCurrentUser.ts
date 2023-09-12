import fetcher from "@/lib/fetcher";
import useSWR from "swr"; // similar to react query, The first time we fetch this api current no matter where
// we use this hook it will not fetch it again if the data already exists.

const currentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default currentUser;
