'use client';
import { User } from "@/@types/user";
import { Option } from "@/utils/options";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchUser = async (gender: Option[], status: Option[]): Promise<User[]> => {
  console.log('test')
  const response = await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  const filtered = data.filter((user: User) => {
    const genderMatch = gender.length === 0 || gender.some(g => g.value === user.gender);
    const statusMatch = status.length === 0 || status.some(s => s.value === user.status);
    return genderMatch && statusMatch;
  });
  return filtered;
};


export default function useUserFilter(initialData: User[] = []) {
  const [selectedGender, setSelectedGender] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option[]>([]);
  const [enableQuery, setEnableQuery] = useState(false);

  const setFilter = (gender: Option[], status: Option[]) => {
    setEnableQuery(true);
    setSelectedGender(gender);
    setSelectedStatus(status);
  }

  const {
    data: users = [],
    isLoading,
    isFetching
  } = useQuery(
    {
      queryKey: ['users', selectedGender, selectedStatus],
      initialData,
      queryFn: () => fetchUser(selectedGender, selectedStatus),
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      enabled: enableQuery,
    }
  );

  return {
    users,
    isLoading,
    isFetching,
    setFilter,
  };
}