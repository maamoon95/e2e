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
  subscriptions: {
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
  },
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
  conversations: {
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
  },
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
  participants: {}
};

module.exports = genesys;
