import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### orders

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| id          | int8        | number | true     |
| created_at  | timestamptz | string | true     |
| name        | text        | string | false    |
| status      | text        | string | false    |
| destination | text        | string | false    |

### chat_messages

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| thread_id  | text        | string | true     |
| user_id    | uuid        | string | false    |
| message    | text        | string | true     |
| created_at | timestamptz | string | true     |

### tasks

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| content    | text        | string | true     |
| status     | text        | string | false    |
| created_at | timestamptz | string | true     |
| user_id    | uuid        | string | false    |

### profiles

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| updated_at | timestamptz | string | false    |
| username   | text        | string | false    |
| full_name  | text        | string | false    |
| avatar_url | text        | string | false    |
| website    | text        | string | false    |

### animals

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| created_at | timestamptz | string | true     |
| name       | text        | string | false    |
| species    | text        | string | false    |
| image_url  | text        | string | false    |

*/

// Orders
export const useOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: () => fromSupabase(supabase.from('orders').select('*'))
});

export const useOrder = (id) => useQuery({
    queryKey: ['orders', id],
    queryFn: () => fromSupabase(supabase.from('orders').select('*').eq('id', id).single())
});

export const useAddOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newOrder) => fromSupabase(supabase.from('orders').insert([newOrder])),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('orders').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('orders').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

// Chat Messages
export const useChatMessages = () => useQuery({
    queryKey: ['chat_messages'],
    queryFn: () => fromSupabase(supabase.from('chat_messages').select('*'))
});

export const useChatMessage = (id) => useQuery({
    queryKey: ['chat_messages', id],
    queryFn: () => fromSupabase(supabase.from('chat_messages').select('*').eq('id', id).single())
});

export const useAddChatMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('chat_messages').insert([newMessage])),
        onSuccess: () => {
            queryClient.invalidateQueries('chat_messages');
        },
    });
};

export const useUpdateChatMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('chat_messages').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('chat_messages');
        },
    });
};

export const useDeleteChatMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('chat_messages').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('chat_messages');
        },
    });
};

// Tasks
export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*'))
});

export const useTask = (id) => useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*').eq('id', id).single())
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('tasks').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

// Profiles
export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*'))
});

export const useProfile = (id) => useQuery({
    queryKey: ['profiles', id],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*').eq('id', id).single())
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('profiles').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('profiles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

// Animals
export const useAnimals = () => useQuery({
    queryKey: ['animals'],
    queryFn: () => fromSupabase(supabase.from('animals').select('*'))
});

export const useAnimal = (id) => useQuery({
    queryKey: ['animals', id],
    queryFn: () => fromSupabase(supabase.from('animals').select('*').eq('id', id).single())
});

export const useAddAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAnimal) => fromSupabase(supabase.from('animals').insert([newAnimal])),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};

export const useUpdateAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('animals').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};

export const useDeleteAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('animals').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};