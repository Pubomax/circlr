import React from 'react';
import { Filter, MessageSquare } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { ConversationList } from './ConversationList';
import { ConversationView } from './ConversationView';

export function CommunicationsPage() {
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-9rem)] gap-6">
      <div className="w-96 flex-shrink-0 space-y-6">
        <PageHeader
          title="Communications"
          actions={[
            {
              label: 'New Message',
              icon: MessageSquare,
              variant: 'primary',
              onClick: () => console.log('New message clicked'),
            },
          ]}
        />

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-4 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <ConversationList
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </div>

      <div className="flex-1 rounded-lg bg-white shadow">
        {selectedConversation ? (
          <ConversationView conversationId={selectedConversation} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a conversation from the list to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}