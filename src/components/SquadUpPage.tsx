
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, Clock, UserPlus, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface GroupRental {
  id: string;
  title: string;
  description: string;
  max_participants: number;
  cost_per_person: number;
  start_date: string;
  end_date: string;
  status: string;
  organizer_id: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
  rental_items: {
    title: string;
    image_urls: string[];
    category: string;
  };
  group_rental_participants: Array<{
    participant_id: string;
    payment_status: string;
    profiles: {
      full_name: string;
    };
  }>;
}

const SquadUpPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    max_participants: '',
    cost_per_person: '',
    start_date: '',
    end_date: '',
    item_id: ''
  });

  // Fetch group rentals
  const { data: groupRentals = [], isLoading } = useQuery({
    queryKey: ['group-rentals', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('group_rentals')
        .select(`
          *,
          profiles!group_rentals_organizer_id_fkey (full_name),
          rental_items (title, image_urls, category),
          group_rental_participants (
            participant_id,
            payment_status,
            profiles!group_rental_participants_participant_id_fkey (full_name)
          )
        `)
        .in('status', ['open', 'full'])
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GroupRental[];
    }
  });

  // Join group rental mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupRentalId: string) => {
      const { error } = await supabase
        .from('group_rental_participants')
        .insert([{
          group_rental_id: groupRentalId,
          participant_id: user?.id
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-rentals'] });
    }
  });

  const handleJoinGroup = (groupRentalId: string) => {
    joinGroupMutation.mutate(groupRentalId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading Squad Up groups...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Squad Up - Group Rentals</h1>
          <p className="text-gray-600">Split costs and rent expensive items together!</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Users className="w-4 h-4 mr-2" />
          Create Squad
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search group rentals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Group Rentals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groupRentals.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No active squads</h3>
            <p className="text-gray-500">Create the first group rental!</p>
          </div>
        ) : (
          groupRentals.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                  <Badge className={getStatusColor(group.status)}>
                    {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {group.rental_items && (
                  <div className="flex items-center gap-3">
                    {group.rental_items.image_urls?.[0] && (
                      <img
                        src={group.rental_items.image_urls[0]}
                        alt={group.rental_items.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">{group.rental_items.title}</p>
                      <p className="text-xs text-gray-500">{group.rental_items.category}</p>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 text-sm">{group.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Participants
                    </span>
                    <span>
                      {group.group_rental_participants.length}/{group.max_participants}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Cost per person
                    </span>
                    <span className="font-semibold">₹{group.cost_per_person}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Duration
                    </span>
                    <span>
                      {new Date(group.start_date).toLocaleDateString()} - {new Date(group.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Organized by {group.profiles?.full_name}</p>
                  
                  {group.group_rental_participants.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {group.group_rental_participants.map((participant, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {participant.profiles.full_name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {group.status === 'open' && group.organizer_id !== user?.id && (
                  <Button
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={joinGroupMutation.isPending}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {joinGroupMutation.isPending ? 'Joining...' : 'Join Squad'}
                  </Button>
                )}

                {group.status === 'full' && (
                  <Button disabled className="w-full" size="sm">
                    Squad Full
                  </Button>
                )}

                {group.organizer_id === user?.id && (
                  <Badge className="w-full justify-center bg-blue-100 text-blue-800">
                    Your Squad
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SquadUpPage;
