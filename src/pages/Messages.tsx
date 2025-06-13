
import React, { useState } from 'react';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const Messages = () => {
  const { conversations, loading } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { messages, sendMessage } = useMessages(selectedConversationId);
  const { user, userType } = useAuth();

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await sendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    }
  };

  const getConversationTitle = (conversation: any) => {
    if (userType === 'artist') {
      return conversation.wall_owner?.Name || 'Propriétaire';
    } else {
      return conversation.artist?.name || 'Artiste';
    }
  };

  const getConversationImage = (conversation: any) => {
    if (userType === 'artist') {
      return null; // Pas d'image pour les propriétaires pour l'instant
    } else {
      return conversation.artist?.profile_image_url;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Gérez vos conversations avec {userType === 'artist' ? 'les propriétaires' : 'les artistes'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des conversations */}
        <div className={`lg:col-span-1 ${selectedConversationId ? 'hidden lg:block' : 'block'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune conversation</p>
                  <p className="text-sm">Contactez {userType === 'artist' ? 'un propriétaire' : 'un artiste'} pour commencer</p>
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversationId(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversationId === conversation.id ? 'bg-purple-50 border-r-4 border-purple-500' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getConversationImage(conversation)} />
                          <AvatarFallback>
                            {getConversationTitle(conversation).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{getConversationTitle(conversation)}</h3>
                            {conversation.unread_count! > 0 && (
                              <Badge variant="destructive" className="ml-2">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                          {conversation.last_message && (
                            <>
                              <p className="text-sm text-gray-600 truncate">
                                {conversation.last_message.content}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDistanceToNow(new Date(conversation.last_message.created_at), {
                                  addSuffix: true,
                                  locale: fr
                                })}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Zone de chat */}
        <div className={`lg:col-span-2 ${selectedConversationId ? 'block' : 'hidden lg:block'}`}>
          <Card className="h-[600px] flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversationId(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getConversationImage(selectedConversation)} />
                      <AvatarFallback>
                        {getConversationTitle(selectedConversation).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{getConversationTitle(selectedConversation)}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user?.id ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {formatDistanceToNow(new Date(message.created_at), {
                            addSuffix: true,
                            locale: fr
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Sélectionnez une conversation</p>
                  <p className="text-sm">Choisissez une conversation pour commencer à discuter</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
