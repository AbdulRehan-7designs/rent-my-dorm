
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Plus, Calendar, IndianRupee, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  profiles: {
    full_name: string;
  };
  rental_items: {
    title: string;
    image_urls: string[];
  } | null;
  group_rental_participants: {
    participant_id: string;
    payment_status: string;
  }[];
}

const SquadUpPage = () => {
  const [groupRentals, setGroupRentals] = useState<GroupRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    max_participants: 4,
    cost_per_person: 0,
    start_date: '',
    end_date: ''
  });

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchGroupRentals();
  }, []);

  const fetchGroupRentals = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('group_rentals')
      .select(`
        *,
        profiles!group_rentals_organizer_id_fkey (
          full_name
        ),
        rental_items (
          title,
          image_urls
        ),
        group_rental_participants (
          participant_id,
          payment_status
        )
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching group rentals",
        description: error.message,
        variant: "destructive"
      });
    } else {
      // Transform the data to handle potential null profiles
      const transformedData = (data || []).map(item => ({
        ...item,
        profiles: item.profiles || { full_name: 'Unknown User' }
      }));
      setGroupRentals(transformedData);
    }
    
    setLoading(false);
  };

  const createGroupRental = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('group_rentals')
      .insert({
        ...formData,
        organizer_id: user.id
      });

    if (error) {
      toast({
        title: "Error creating group rental",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Group rental created",
        description: "Your group rental has been created successfully"
      });
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        max_participants: 4,
        cost_per_person: 0,
        start_date: '',
        end_date: ''
      });
      fetchGroupRentals();
    }
  };

  const joinGroupRental = async (groupRentalId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('group_rental_participants')
      .insert({
        group_rental_id: groupRentalId,
        participant_id: user.id
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already joined",
          description: "You've already joined this group rental"
        });
      } else {
        toast({
          title: "Error joining group",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Joined successfully",
        description: "You've joined the group rental!"
      });
      fetchGroupRentals();
    }
  };

  const getCurrentParticipants = (groupRental: GroupRental) => {
    return groupRental.group_rental_participants?.length || 0;
  };

  const isUserParticipant = (groupRental: GroupRental) => {
    return groupRental.group_rental_participants?.some(
      p => p.participant_id === user?.id
    ) || false;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Squad Up</h1>
          <p className="text-gray-600">Join group rentals and split costs with friends</p>
        </div>
        
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group Rental
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Group Rental</CardTitle>
            <CardDescription>
              Start a group rental and invite others to join
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Study Room Projector for Finals"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe what you're renting and any requirements"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max_participants">Max Participants</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({...formData, max_participants: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <Label htmlFor="cost_per_person">Cost per Person (₹)</Label>
                <Input
                  id="cost_per_person"
                  type="number"
                  min="0"
                  value={formData.cost_per_person}
                  onChange={(e) => setFormData({...formData, cost_per_person: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={createGroupRental}>Create Group Rental</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Group Rentals List */}
      {loading ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {groupRentals.map((rental) => (
            <Card key={rental.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{rental.title}</h3>
                    <p className="text-gray-600 mb-3">{rental.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{getCurrentParticipants(rental)}/{rental.max_participants} joined</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>₹{rental.cost_per_person}/person</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(rental.start_date).toLocaleDateString()} - {new Date(rental.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Organized by {rental.profiles.full_name}
                      </Badge>
                      
                      <Badge 
                        variant={getCurrentParticipants(rental) < rental.max_participants ? "default" : "secondary"}
                      >
                        {getCurrentParticipants(rental) < rental.max_participants ? "Open" : "Full"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {rental.rental_items && (
                      <div className="mb-4">
                        {rental.rental_items.image_urls?.[0] && (
                          <img 
                            src={rental.rental_items.image_urls[0]} 
                            alt={rental.rental_items.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}
                    
                    {user?.id !== rental.organizer_id && (
                      <Button
                        onClick={() => joinGroupRental(rental.id)}
                        disabled={
                          getCurrentParticipants(rental) >= rental.max_participants ||
                          isUserParticipant(rental)
                        }
                        size="sm"
                      >
                        {isUserParticipant(rental) ? "Joined" : "Join Group"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {groupRentals.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No group rentals yet</h3>
                <p className="text-gray-600 mb-4">
                  Be the first to create a group rental and save money by sharing costs!
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  Create First Group Rental
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SquadUpPage;
