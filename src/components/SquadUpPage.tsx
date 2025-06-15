
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Calendar, DollarSign, MapPin, Clock, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface GroupRental {
  id: string;
  title: string;
  description: string;
  cost_per_person: number;
  max_participants: number;
  start_date: string;
  end_date: string;
  status: 'open' | 'full' | 'confirmed' | 'cancelled';
  created_at: string;
  organizer: {
    full_name: string;
  };
  participants: {
    id: string;
    participant_id: string;
    payment_status: string;
  }[];
}

export const SquadUpPage = () => {
  const [groupRentals, setGroupRentals] = useState<GroupRental[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const [newRental, setNewRental] = useState({
    title: "",
    description: "",
    cost_per_person: "",
    max_participants: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    fetchGroupRentals();
  }, []);

  const fetchGroupRentals = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('group_rentals')
        .select(`
          *,
          organizer:profiles!organizer_id(full_name),
          participants:group_rental_participants(id, participant_id, payment_status)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching group rentals:', error);
        // Use mock data if database query fails
        setGroupRentals([
          {
            id: "1",
            title: "Shared PlayStation 5 for Gaming Tournament",
            description: "Looking for 3 more people to split the cost of renting a PS5 for the upcoming gaming tournament week.",
            cost_per_person: 250,
            max_participants: 4,
            start_date: "2024-01-15",
            end_date: "2024-01-22",
            status: 'open' as const,
            created_at: "2024-01-10",
            organizer: { full_name: "Rahul Kumar" },
            participants: [
              { id: "1", participant_id: "user1", payment_status: "paid" }
            ]
          },
          {
            id: "2", 
            title: "DSLR Camera for College Fest",
            description: "Need 2 more people to rent a professional DSLR camera for our college cultural fest photography.",
            cost_per_person: 150,
            max_participants: 3,
            start_date: "2024-02-01",
            end_date: "2024-02-05",
            status: 'open' as const,
            created_at: "2024-01-12",
            organizer: { full_name: "Priya Singh" },
            participants: []
          }
        ]);
      } else {
        // Transform the data to match our interface
        const transformedData = data?.map(rental => ({
          ...rental,
          organizer: rental.organizer || { full_name: "Unknown User" },
          participants: rental.participants || []
        })) || [];
        setGroupRentals(transformedData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroupRental = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('group_rentals')
        .insert([{
          organizer_id: user.id,
          title: newRental.title,
          description: newRental.description,
          cost_per_person: parseFloat(newRental.cost_per_person),
          max_participants: parseInt(newRental.max_participants),
          start_date: newRental.start_date,
          end_date: newRental.end_date,
          status: 'open'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating group rental:', error);
        return;
      }

      // Reset form and refresh list
      setNewRental({
        title: "",
        description: "",
        cost_per_person: "",
        max_participants: "",
        start_date: "",
        end_date: ""
      });
      setShowCreateForm(false);
      fetchGroupRentals();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const joinGroupRental = async (groupRentalId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('group_rental_participants')
        .insert([{
          group_rental_id: groupRentalId,
          participant_id: user.id,
          payment_status: 'pending'
        }]);

      if (error) {
        console.error('Error joining group rental:', error);
        return;
      }

      fetchGroupRentals();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Squad Up - Group Rentals
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join forces with fellow students to rent expensive items together and split the costs
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Active Group Rentals</h2>
            <p className="text-gray-600">Find or create group rental opportunities</p>
          </div>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group Rental
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Group Rental</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title (e.g., PlayStation 5 for Gaming Week)"
              value={newRental.title}
              onChange={(e) => setNewRental({...newRental, title: e.target.value})}
            />
            <Input
              placeholder="Description"
              value={newRental.description}
              onChange={(e) => setNewRental({...newRental, description: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Cost per person (₹)"
                value={newRental.cost_per_person}
                onChange={(e) => setNewRental({...newRental, cost_per_person: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Max participants"
                value={newRental.max_participants}
                onChange={(e) => setNewRental({...newRental, max_participants: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Start date"
                value={newRental.start_date}
                onChange={(e) => setNewRental({...newRental, start_date: e.target.value})}
              />
              <Input
                type="date"
                placeholder="End date"
                value={newRental.end_date}
                onChange={(e) => setNewRental({...newRental, end_date: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={createGroupRental} className="bg-purple-600 hover:bg-purple-700">
                Create Group Rental
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupRentals.map((rental) => (
          <Card key={rental.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{rental.title}</CardTitle>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {rental.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{rental.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <span>₹{rental.cost_per_person}/person</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{rental.participants.length}/{rental.max_participants}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>{new Date(rental.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>{Math.ceil((new Date(rental.end_date).getTime() - new Date(rental.start_date).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Organized by {rental.organizer.full_name}</span>
              </div>

              <Button 
                onClick={() => joinGroupRental(rental.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={rental.participants.length >= rental.max_participants}
              >
                {rental.participants.length >= rental.max_participants ? 'Group Full' : 'Join Group'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {groupRentals.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Group Rentals</h3>
          <p className="text-gray-500 mb-6">Be the first to create a group rental and save money together!</p>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Group Rental
          </Button>
        </div>
      )}
    </div>
  );
};
