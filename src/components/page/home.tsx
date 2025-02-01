'use client';
import { User } from "@/@types/user"
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import AutoCompleteComponent from "../autoCompleteComponent";
import { Option } from "@/utils/options";
import useUserFilter from "@/hooks/useUserFilter";

interface HomeProps {
  users: User[];
}

export default function HomePage({ users }: HomeProps) {
  const [selectedGender, setSelectedGender] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option[]>([]);

  const { setFilter, users: usersData } = useUserFilter(users);

  return (
    <div>
      <AutoCompleteComponent
        options={[{label: 'male', value: 'male'}, {label:'female', value: 'female'} ]}
        selectedOptions={selectedGender}
        setSelectedOptions={setSelectedGender}
      />
      <AutoCompleteComponent
        options={[{label: 'active', value: 'active'}, {label:'inactive', value: 'inactive'} ]}
        selectedOptions={selectedStatus}
        setSelectedOptions={setSelectedStatus}
      />
      <Button onClick={() => setFilter(selectedGender, selectedStatus)}>Filter</Button>
      {
        usersData.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
          </div>
        ))
      }
    </div>
  )
}