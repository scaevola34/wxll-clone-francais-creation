
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const ArtistCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <div className="relative">
      <Skeleton className="h-48 w-full" />
      <div className="absolute top-2 right-2">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
  </Card>
);

export const WallCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader className="text-center">
        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
        <Skeleton className="h-8 w-48 mx-auto mt-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-6 w-24 mx-auto mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex justify-between pt-4 border-t">
          <div className="text-center">
            <Skeleton className="h-6 w-8 mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto mt-1" />
          </div>
          <div className="text-center">
            <Skeleton className="h-6 w-8 mx-auto" />
            <Skeleton className="h-3 w-20 mx-auto mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const GridSkeleton: React.FC<{ count?: number; type?: 'artist' | 'wall' }> = ({ 
  count = 6, 
  type = 'artist' 
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i}>
        {type === 'artist' ? <ArtistCardSkeleton /> : <WallCardSkeleton />}
      </div>
    ))}
  </div>
);

export const ProposalSkeleton: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="h-6 w-20 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-16" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </CardContent>
  </Card>
);
