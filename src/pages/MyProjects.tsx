import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAuthComplete } from '@/hooks/useAuthComplete';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle, Palette, MapPin } from 'lucide-react';

const MyProjects = () => {
  const { proposals, projects, loading, updateProposalStatus, updateProjectStatus } = useProjects();
  const { userType } = useAuthComplete();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

      {userType === 'owner' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Project Proposals</h2>
          {proposals.map(proposal => (
            <Card key={proposal.id} className="mb-4">
              <CardHeader>
                <CardTitle>{proposal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Description: {proposal.description}</p>
                <p>Budget Proposed: {proposal.budget_proposed}</p>
                <p>Artist: {proposal.artist?.name}</p>
                <Badge>{proposal.status}</Badge>
                {proposal.status === 'pending' && (
                  <div>
                    <Button onClick={() => updateProposalStatus(proposal.id, 'accepted')}>Accept</Button>
                    <Button onClick={() => updateProposalStatus(proposal.id, 'rejected')}>Reject</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Current Projects</h2>
        {projects.map(project => (
          <Card key={project.id} className="mb-4">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description: {project.description}</p>
              <p>Budget: {project.budget}</p>
              <p>Artist: {project.artist?.name}</p>
              <Badge>{project.status}</Badge>
              {project.status === 'in_progress' && (
                <Button onClick={() => updateProjectStatus(project.id, 'completed')}>Mark as Completed</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
