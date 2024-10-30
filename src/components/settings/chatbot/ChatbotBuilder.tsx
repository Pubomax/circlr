import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, MessageSquare, Bot, Save } from 'lucide-react';

interface FlowNode {
  id: string;
  type: 'message' | 'input' | 'condition' | 'action';
  content: string;
  options?: string[];
  next?: string[];
}

const initialNodes: FlowNode[] = [
  {
    id: '1',
    type: 'message',
    content: 'Welcome! How can I help you today?',
    options: ['Support', 'Sales', 'Other'],
    next: ['2', '3', '4'],
  },
  {
    id: '2',
    type: 'message',
    content: 'What kind of support do you need?',
    options: ['Technical', 'Account', 'Billing'],
  },
  {
    id: '3',
    type: 'input',
    content: "I'll connect you with our sales team. What's your company name?",
  },
  {
    id: '4',
    type: 'message',
    content: 'Let me connect you with our customer service team.',
  },
];

export function ChatbotBuilder() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const addNode = (type: FlowNode['type']) => {
    const newNode: FlowNode = {
      id: String(nodes.length + 1),
      type,
      content: '',
      options: type === 'message' ? [''] : undefined,
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode.id);
  };

  const updateNode = (id: string, updates: Partial<FlowNode>) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setSelectedNode(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Chatbot Builder</h3>
          <p className="text-sm text-gray-500">
            Design your chatbot's conversation flow
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <MessageSquare className="h-4 w-4" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            <Save className="h-4 w-4" />
            Save Flow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => addNode('message')}
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Add Message
            </button>
            <button
              onClick={() => addNode('input')}
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Add Input
            </button>
          </div>

          <div className="space-y-4">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`rounded-lg border p-4 ${
                  selectedNode === node.id
                    ? 'border-blue-500 ring-1 ring-blue-500'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedNode(node.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {node.type === 'message' ? 'Message' : 'User Input'}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNode(node.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      value={node.content}
                      onChange={(e) => updateNode(node.id, { content: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  {node.type === 'message' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      <div className="mt-2 space-y-2">
                        {node.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(node.options || [])];
                                newOptions[index] = e.target.value;
                                updateNode(node.id, { options: newOptions });
                              }}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Enter option"
                            />
                            <button
                              onClick={() => {
                                const newOptions = node.options?.filter((_, i) => i !== index);
                                updateNode(node.id, { options: newOptions });
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newOptions = [...(node.options || []), ''];
                            updateNode(node.id, { options: newOptions });
                          }}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Option
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPreview && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex h-[600px] flex-col rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h4 className="text-center text-sm font-medium text-gray-900">
                  Chatbot Preview
                </h4>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {nodes.map((node) => (
                  <div key={node.id} className="mb-4">
                    <div className="flex items-start space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 p-1">
                        <Bot className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="rounded-lg bg-blue-50 p-3">
                        <p className="text-sm text-gray-900">{node.content}</p>
                      </div>
                    </div>
                    {node.options && (
                      <div className="ml-10 mt-2 space-y-2">
                        {node.options.map((option, index) => (
                          <button
                            key={index}
                            className="block rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}