/**
 * this page consist of genesys mock responses
 */
const CUSTOMER_ATTRIBUTES = {
  'context._genesys_OS': 'Mac OS X',
  'context.veVisitorId': 'e79c7a90-ee22-7fdb-d4cc-0ea4db65d4d3',
  'context.email': 'development@videoengager.com',
  'context._genesys_browser': 'Chrome',
  'context._genesys_referrer': '',
  'context.nickname': 'videoengager.github.io',
  'context._genesys_source': 'web',
  'context.firstName': 'videoengager.github.io',
  'context.nickName': 'Jonny',
  'context.lastName': 'Smith',
  'context.subject': 'product questions',
  'context._genesys_url': 'https://videoengager.github.io/examples/single-button-genesys-demo.html?debug=dev',
  'context._genesys_pageTitle': 'Single Button Genesys Demo'
};
const genesys = {
  userResponse: {
    organization: {
      id: 'ORGANIZATION_ID'
    },
    name: 'Slav',
    division: {
      name: 'Home'
    },
    email: 'slav@videoengager.com',
    username: 'slav@videoengager.com'
  },
  conversationSummary: {
    id: 'AGENT_USER_ID',
    conversationSummary: {
      chat: {
        contactCenter: {
          active: 0,
          acw: 1
        }
      }
    }
  },
  purecloud: {
    presenceDefinition: {
      id: 'PRESENCE_ID',
      systemPresence: 'On Queue'
    }
  },
  channels: {
    connectUri: 'ws://localhost'
  },
  getChannels: {
    entities: [
      {
        id: 'streaming-CHANNEL-ID',
        connectUri: 'ws://localhost'
      }
    ]
  },
  subscriptions: [{
    entities: [
      {
        id: 'v2.users.AGENT_USER_ID.conversationsummary'
      },
      {
        id: 'v2.users.AGENT_USER_ID.conversations.chats'
      }
    ]
  },
  {
    entities: [
      {
        id: 'v2.users.AGENT_USER_ID.conversationsummary'
      },
      {
        id: 'v2.conversations.chats.CONVERSATION_ID.messages'
      },
      {
        id: 'v2.users.AGENT_USER_ID.conversations.chats'
      }
    ]
  }, {
    entities: [
      {
        id: 'v2.users.AGENT_USER_ID.conversations.chats'
      },
      {
        id: 'v2.conversations.chats.CONVERSATION_ID.messages'
      },
      {
        id: 'v2.users.AGENT_USER_ID.conversationsummary'
      },
      {
        id: 'v2.users.AGENT_USER_ID.conversations.calls'
      }
    ]
  }
  ],
  calls: [{ entities: [] }],
  chats: [
    { entities: [] },
    {
      entities: [
        {
          id: 'CHAT_ID',
          participants: [
            {
              id: 'CUSTOMER_CHAT_PARTICIPANT_ID',
              name: 'videoengager.github.io',
              purpose: 'customer',
              state: 'connected',
              attributes: CUSTOMER_ATTRIBUTES
            },
            {
              id: 'AGENT_CHAT_PARTICIPANT_ID',
              purpose: 'agent',
              state: 'connected',
              user: {
                id: 'AGENT_USER_ID'
              },
              attributes: {
              }
            }
          ]
        }
      ]
    }],
  messages: {
    entities: [
      {
        id: 'MESSAGE_ID',
        conversation: {
          id: 'CONVERSATION_ID'
        },
        sender: {
          id: 'CUSTOMER_CHAT_ID'
        },
        body: '{"interactionId":"CUSTOM_INTERACTION_ID"}',
        bodyType: 'standard'
      }
    ]
  },
  conversations: [
    {
      entities: []
    },
    {
      entities: [
        {
          id: 'CONVERSATION_ID',
          participants: [
            {
              id: 'CUSTOMER_PARTICIPANT_ID',
              name: 'videoengager.github.io',
              purpose: 'customer',
              wrapupRequired: false,
              attributes: CUSTOMER_ATTRIBUTES,
              chats: [
                {
                  state: 'connected',
                  id: 'CUSTOMER_CHAT_ID'
                }
              ]
            },
            {
              id: 'AGENT_PARTICIPANT_ID',
              userId: 'AGENT_USER_ID',
              purpose: 'agent',
              wrapupRequired: true,
              attributes: {
              },
              chats: [
                {
                  state: 'connected',
                  id: 'AGENT_CHAT_ID'
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  conversationChat: {
    id: 'CONVERSATION_ID',
    participants: [
      {
        id: 'CUSTOMER_PARTICIPANT_ID',
        name: 'videoengager.github.io',
        purpose: 'customer',
        state: 'connected',
        attributes: CUSTOMER_ATTRIBUTES
      },
      {
        id: 'AGENT_PARTICIPANT_ID',
        purpose: 'agent',
        state: 'connected',
        user: {
          id: 'AGENT_USER_ID'
        },
        attributes: {}
      }
    ]
  },
  participants: {},
  incomingVoiceAccepted: {
    topicName: 'v2.users.AGENT_USER_ID.conversations.calls',
    eventBody: {
      id: 'conversation_call_ID',
      participants: [
        {
          purpose: 'ivr',
          state: 'terminated'
        },
        {
          purpose: 'acd',
          state: 'disconnected'
        },
        {
          id: 'CUSTOMER_PARTICIPANT_ID',
          address: 'tel:+905394826532',
          purpose: 'customer',
          state: 'connected',
          queue: {
            id: 'queueId'
          }
        },
        {
          id: 'AGENT_PARTICIPANT_ID',
          address: 'agent_address',
          purpose: 'agent',
          state: 'connected',
          user: {
            id: 'AGENT_USER_ID'
          },
          queue: {
            id: 'queueId'
          },
          script: {
            id: 'scriptId'
          }
        }
      ]
    }
  },
  conversationsMessages: {
    id: 'CONVERSATION_ID',
    selfUri: '/api/v2/conversations/messages/CONVERSATION_ID'
  },
  communicationsMessages: {
    id: 'COMMUNICATION_ID',
    fromAddress: '+16283333759',
    toAddress: '+905394826532',
    direction: 'outbound',
    messengerType: 'sms',
    textBody: '',
    status: 'queued',
    createdBy: {
      id: 'AGENT_USER_ID',
      selfUri: '/api/v2/users/AGENT_USER_ID'
    },
    conversationId: 'CONVERSATION_ID',
    selfUri: '/api/v2/conversations/messages/CONVERSATION_ID/messages/COMMUNICATION_ID'
  },
  conversationsGet: {
    id: 'CONVERSATION_ID',
    participants: [
      {
        id: 'AGENT_PARTICIPANT_ID',
        userUri: '/api/v2/users/AGENT_USER_ID',
        userId: 'AGENT_USER_ID',
        queueId: 'queueId',
        queueName: 'Support',
        purpose: 'agent',
        wrapupRequired: true,
        wrapupPrompt: 'timeout',
        messages: [
          {
            state: 'connected',
            id: 'COMMUNICATION_ID',
            direction: 'outbound',
            type: 'sms',
            recipientCountry: 'TR',
            recipientType: 'mobile',
            peerId: '0d191f12-5fa2-4e41-acb2-5a84762c60b8',
            toAddress: {
              addressNormalized: '+905394826532'
            },
            fromAddress: {
              addressNormalized: '+16283333759'
            }
          }
        ]
      },
      {
        id: 'CUSTOMER_PARTICIPANT_ID',
        purpose: 'customer',
        messages: [
          {
            state: 'connected',
            id: '0d191f12-5fa2-4e41-acb2-5a84762c60b8',
            direction: 'outbound',
            peerId: 'COMMUNICATION_ID',
            toAddress: {
              addressNormalized: '+16283333759'
            },
            fromAddress: {
              addressNormalized: '+905394826532'
            }
          }
        ]
      }
    ],
    selfUri: '/api/v2/conversations/CONVERSATION_ID'
  }
};

module.exports = genesys;
