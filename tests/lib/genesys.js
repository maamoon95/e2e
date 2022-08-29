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
    id: "AGENT_USER_ID",
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
  userResponseWithAuth: {
    id: "AGENT_USER_ID",
    name: 'Slav',
    division: {
      name: 'Home'
    },
    email: 'slav@videoengager.com',
    username: 'slav@videoengager.com',
    authorization: {
      permissions: [
        'integration:smartVideoApps:view'
      ],
      roles: [
        {
          name: 'SmartVideo Agent'
        }
      ],
      permissionPolicies: [
        {
          domain: 'integration',
          entityName: 'smartVideoApps',
          allowConditions: false,
          actionSet: [
            'view'
          ]
        }
      ]
    },
    organization: {
      id: 'ORGANIZATION_ID'
    }
  },
  userResponseWithLang: {
    id: 'AGENT_USER_ID',
    name: 'Slav',
    division: {
      name: 'Home'
    },
    email: '',
    username: '',
    languages: [],
    acdAutoAnswer: false,
    languagePreference: 'en-us',
    organization: {
      id: 'ORGANIZATION_ID'
    }
  },
  userToken: {
    organization: {
      id: 'ORGANIZATION_ID',
      name: 'videoengager'
    },
    homeOrganization: {
      id: 'ORGANIZATION_ID'
    },
    authorizedScope: [
      'everything'
    ],
    OAuthClient: {
      id: 'OAUTH_ID',
      name: 'OAUTH_NAME',
      organization: {
        id: 'ORGANIZATION_ID'
      }
    }
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
  }],
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
  callbackConversation: {
      "id": "ffff-ffff-ffff-ffff",
      "startTime": "2022-07-04T10:56:34.973Z",
      "participants": [{
          "id": "21853533-2343-476a-bcc7-2c602b5876eb",
          "startTime": "2022-07-04T10:56:34.973Z",
          "connectedTime": "2022-07-04T11:00:01.092Z",
          "name": "VideoCall from mustafa ",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "customer",
          "wrapupRequired": false,
          "attributes": {
              "pcEnvironment": "mypurecloud.de",
              "number": "+905394826532",
              "domainUrl": "https://staging.leadsecure.com/",
              "veUrl": "https://staging.leadsecure.com/ve/VFetzc",
              "email": "mustafa@videoengamer.com"
          },
          "calls": [],
          "callbacks": [{
              "state": "connected",
              "id": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "segments": [{
                  "startTime": "2022-07-04T10:56:34.973Z",
                  "endTime": "2022-07-04T11:00:01.092Z",
                  "type": "Scheduled",
                  "howEnded": "Interact"
              }, {
                  "startTime": "2022-07-04T11:00:01.092Z",
                  "type": "Interact",
                  "howEnded": "Disconnect"
              }],
              "direction": "outbound",
              "held": false,
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "connectedTime": "2022-07-04T11:00:01.092Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "scheduled"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "c3e9babb-03d2-4b4e-ba44-b7c427d0a27f",
          "startTime": "2022-07-04T10:56:34.974Z",
          "connectedTime": "2022-07-04T11:00:01.092Z",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "acd",
          "wrapupRequired": false,
          "conversationRoutingData": {
              "queue": {
                  "id": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
                  "selfUri": "/api/v2/routing/queues/0e185c02-aca1-4a72-82ea-2e78684e2c89"
              },
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "attributes": {
              "pcEnvironment": "mypurecloud.de",
              "number": "+905394826532",
              "domainUrl": "https://staging.leadsecure.com/",
              "veUrl": "https://staging.leadsecure.com/ve/VFetzc",
              "email": "mustafa@videoengamer.com"
          },
          "calls": [],
          "callbacks": [{
              "state": "connected",
              "id": "06b385f5-e4fa-411a-8087-435baa956e79",
              "segments": [{
                  "startTime": "2022-07-04T10:56:34.974Z",
                  "endTime": "2022-07-04T11:00:01.092Z",
                  "type": "Scheduled",
                  "howEnded": "Interact"
              }, {
                  "startTime": "2022-07-04T11:00:01.092Z",
                  "type": "Interact",
                  "howEnded": "Disconnect"
              }],
              "direction": "outbound",
              "held": false,
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "connectedTime": "2022-07-04T11:00:01.092Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "scheduled"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "852e7ba0-7c56-4c51-9d4c-a4ce084ddee2",
          "startTime": "2022-07-04T11:00:01.295Z",
          "endTime": "2022-07-04T11:00:31.431Z",
          "name": "Slav Hadjidimitrov",
          "userUri": "/api/v2/users/AGENT_USER_ID",
          "userId": "AGENT_USER_ID",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "agent",
          "wrapupRequired": false,
          "wrapupPrompt": "optional",
          "conversationRoutingData": {
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "alertingTimeoutMs": 30000,
          "attributes": {},
          "calls": [],
          "callbacks": [{
              "state": "disconnected",
              "id": "b03de59d-9f5f-401d-beab-20237dbcda69",
              "segments": [{
                  "startTime": "2022-07-04T11:00:01.295Z",
                  "endTime": "2022-07-04T11:00:31.431Z",
                  "type": "Alert",
                  "howEnded": "Disconnect",
                  "disconnectType": "system"
              }],
              "direction": "outbound",
              "held": false,
              "disconnectType": "system",
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "startAlertingTime": "2022-07-04T11:00:01.325Z",
              "disconnectedTime": "2022-07-04T11:00:31.431Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "alerting"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "042414fb-4fc8-4e25-a7d6-933834380185",
          "startTime": "2022-07-04T12:08:44.449Z",
          "endTime": "2022-07-04T12:09:14.588Z",
          "name": "Slav Hadjidimitrov",
          "userUri": "/api/v2/users/AGENT_USER_ID",
          "userId": "AGENT_USER_ID",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "agent",
          "wrapupRequired": false,
          "wrapupPrompt": "optional",
          "conversationRoutingData": {
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "alertingTimeoutMs": 30000,
          "attributes": {},
          "calls": [],
          "callbacks": [{
              "state": "disconnected",
              "id": "b3e0df1c-b947-4013-be6c-4b08f6ff3d95",
              "segments": [{
                  "startTime": "2022-07-04T12:08:44.449Z",
                  "endTime": "2022-07-04T12:09:14.588Z",
                  "type": "Alert",
                  "howEnded": "Disconnect",
                  "disconnectType": "system"
              }],
              "direction": "outbound",
              "held": false,
              "disconnectType": "system",
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "startAlertingTime": "2022-07-04T12:08:44.465Z",
              "disconnectedTime": "2022-07-04T12:09:14.588Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "alerting"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "6e7257d8-f2b8-41ed-82c2-a386c2a5d2ad",
          "startTime": "2022-07-04T12:10:34.447Z",
          "endTime": "2022-07-04T12:11:04.554Z",
          "name": "Slav Hadjidimitrov",
          "userUri": "/api/v2/users/AGENT_USER_ID",
          "userId": "AGENT_USER_ID",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "agent",
          "wrapupRequired": false,
          "wrapupPrompt": "optional",
          "conversationRoutingData": {
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "alertingTimeoutMs": 30000,
          "attributes": {},
          "calls": [],
          "callbacks": [{
              "state": "disconnected",
              "id": "e624987c-0100-4704-9475-0e6f141b8805",
              "segments": [{
                  "startTime": "2022-07-04T12:10:34.447Z",
                  "endTime": "2022-07-04T12:11:04.554Z",
                  "type": "Alert",
                  "howEnded": "Disconnect",
                  "disconnectType": "system"
              }],
              "direction": "outbound",
              "held": false,
              "disconnectType": "system",
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "startAlertingTime": "2022-07-04T12:10:34.456Z",
              "disconnectedTime": "2022-07-04T12:11:04.554Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "alerting"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "8990e1b5-c1b7-4587-bb4f-9ef1c8a8797a",
          "startTime": "2022-07-04T12:11:04.911Z",
          "endTime": "2022-07-04T12:11:35.039Z",
          "name": "Slav Hadjidimitrov",
          "userUri": "/api/v2/users/AGENT_USER_ID",
          "userId": "AGENT_USER_ID",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "agent",
          "wrapupRequired": false,
          "wrapupPrompt": "optional",
          "conversationRoutingData": {
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "alertingTimeoutMs": 30000,
          "attributes": {},
          "calls": [],
          "callbacks": [{
              "state": "disconnected",
              "id": "7118316d-888e-423d-a2dc-6a7873a2e327",
              "segments": [{
                  "startTime": "2022-07-04T12:11:04.911Z",
                  "type": "Alert",
                  "howEnded": "Disconnect"
              }],
              "direction": "outbound",
              "held": false,
              "disconnectType": "system",
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "startAlertingTime": "2022-07-04T12:11:04.927Z",
              "disconnectedTime": "2022-07-04T12:11:35.039Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "alerting"
          }],
          "chats": [],
          "cobrowsesessions": [],
          "emails": [],
          "messages": [],
          "screenshares": [],
          "socialExpressions": [],
          "videos": []
      }, {
          "id": "72239233-9cf5-4809-b663-d4f324b08c33",
          "startTime": "2022-07-04T12:11:35.376Z",
          "name": "Slav Hadjidimitrov",
          "userUri": "/api/v2/users/AGENT_USER_ID",
          "userId": "AGENT_USER_ID",
          "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
          "queueName": "Callback_Queue",
          "purpose": "agent",
          "wrapupRequired": false,
          "wrapupPrompt": "optional",
          "conversationRoutingData": {
              "priority": 0,
              "skills": [],
              "scoredAgents": []
          },
          "alertingTimeoutMs": 30000,
          "attributes": {},
          "callbacks": [{
              "state": "alerting",
              "id": "802e7979-f20b-443d-a5d5-577a5ca0bf18",
              "segments": [],
              "held": false,
              "callbackNumbers": ["+905394826532"],
              "callbackUserName": "VideoCall from mustafa ",
              "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
              "externalCampaign": false,
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "startAlertingTime": "2022-07-04T12:11:35.412Z",
              "callbackScheduledTime": "2022-07-04T11:00:00Z",
              "provider": "PureCloud Callback",
              "peerId": "ac4a4973-965f-437a-b63d-73e5ea2413e7",
              "afterCallWorkRequired": false,
              "callerId": "+905394826532",
              "callerIdName": "mustafa ",
              "initialState": "alerting"
          }]
      }],
      "recordingState": "NONE",
      "divisions": [{
          "division": {
              "id": "5a1eaef9-cee0-4d74-bb65-f66862227bea",
              "selfUri": "/api/v2/authorization/divisions/5a1eaef9-cee0-4d74-bb65-f66862227bea"
          },
          "entities": [{
              "id": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
              "selfUri": "/api/v2/routing/queues/0e185c02-aca1-4a72-82ea-2e78684e2c89"
          }, {
              "id": "AGENT_USER_ID",
              "selfUri": "/api/v2/users/AGENT_USER_ID"
          }]
      }],
      "selfUri": "/api/v2/conversations/dc119522-79c5-4729-a131-05a4ca44a12f"
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
  callBackConnectMsgAnotherID: {
    "topicName": "v2.users.AGENT_USER_ID.conversations",
    "version": "2",
    "eventBody": {
      "id": "ffff-ffff-ffff-f00d",
      "participants": [{
        "id": "9a0231a0-8882-41bb-9b2c-d2f275736270",
        "connectedTime": "2022-07-04T20:04:12.131Z",
        "name": "VideoCall from Slav Hajdidimitrov",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "customer",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "connected",
          "initialState": "scheduled",
          "id": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "held": false,
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.131Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "a5d47ef7-3e85-4c2b-81cb-13590bdaa184",
        "connectedTime": "2022-07-04T20:04:12.132Z",
        "endTime": "2022-07-04T20:07:20.528Z",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "acd",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "conversationRoutingData": {
          "queue": {
            "id": "0e185c02-aca1-4a72-82ea-2e78684e2c89"
          },
          "language": {},
          "priority": 0
        },
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "disconnected",
          "initialState": "scheduled",
          "id": "83d66254-d366-4486-82a3-f42d6eb40f7f",
          "held": false,
          "disconnectType": "transfer",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.132Z",
          "disconnectedTime": "2022-07-04T20:07:20.528Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "d7230894-5770-4bb2-b41d-b2765e5cd5b0",
        "endTime": "2022-07-04T20:04:35.306Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "e762f484-1ddb-4626-8880-ff029c13b0ad",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:04:35.306Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "e8750fcf-9785-48b4-9214-d79a275cbc66",
        "endTime": "2022-07-04T20:05:05.831Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "58053931-7122-4d24-ae9d-c1f9eefa137f",
          "held": false,
          "disconnectType": "system",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:05:05.831Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "5151853c-ca28-48da-bdcd-f15c46f0712e",
        "connectedTime": "2022-07-04T20:07:20.528Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": true,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "startAcwTime": "2022-07-04T20:08:25.397Z",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "connected",
          "initialState": "alerting",
          "id": "19c34168-ccb5-45d5-a9d9-a89caf74e586",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:07:20.528Z",
          "disconnectedTime": "2022-07-04T20:08:25.397Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWork": {
            "state": "pending",
            "startTime": "2022-07-04T20:08:25.397Z"
          },
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }],
      "recordingState": "none"
    },
    "metadata": {
      "CorrelationId": "2074b130-f0a0-4722-9063-cdbac74c0aee"
    }
  }, 
    callBackConnectMsg: {
    "topicName": "v2.users.AGENT_USER_ID.conversations",
    "version": "2",
    "eventBody": {
      "id": "ffff-ffff-ffff-ffff",
      "participants": [{
        "id": "9a0231a0-8882-41bb-9b2c-d2f275736270",
        "connectedTime": "2022-07-04T20:04:12.131Z",
        "name": "VideoCall from Slav Hajdidimitrov",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "customer",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "connected",
          "initialState": "scheduled",
          "id": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "held": false,
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.131Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "a5d47ef7-3e85-4c2b-81cb-13590bdaa184",
        "connectedTime": "2022-07-04T20:04:12.132Z",
        "endTime": "2022-07-04T20:07:20.528Z",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "acd",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "conversationRoutingData": {
          "queue": {
            "id": "0e185c02-aca1-4a72-82ea-2e78684e2c89"
          },
          "language": {},
          "priority": 0
        },
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "disconnected",
          "initialState": "scheduled",
          "id": "83d66254-d366-4486-82a3-f42d6eb40f7f",
          "held": false,
          "disconnectType": "transfer",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.132Z",
          "disconnectedTime": "2022-07-04T20:07:20.528Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "d7230894-5770-4bb2-b41d-b2765e5cd5b0",
        "endTime": "2022-07-04T20:04:35.306Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "e762f484-1ddb-4626-8880-ff029c13b0ad",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:04:35.306Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "e8750fcf-9785-48b4-9214-d79a275cbc66",
        "endTime": "2022-07-04T20:05:05.831Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "58053931-7122-4d24-ae9d-c1f9eefa137f",
          "held": false,
          "disconnectType": "system",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:05:05.831Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "5151853c-ca28-48da-bdcd-f15c46f0712e",
        "connectedTime": "2022-07-04T20:07:20.528Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": true,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "startAcwTime": "2022-07-04T20:08:25.397Z",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "connected",
          "initialState": "alerting",
          "id": "19c34168-ccb5-45d5-a9d9-a89caf74e586",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:07:20.528Z",
          "disconnectedTime": "2022-07-04T20:08:25.397Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWork": {
            "state": "pending",
            "startTime": "2022-07-04T20:08:25.397Z"
          },
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }],
      "recordingState": "none"
    },
    "metadata": {
      "CorrelationId": "2074b130-f0a0-4722-9063-cdbac74c0aee"
    }
  }, 
  callBackDisconnectMsg: {
    "topicName": "v2.users.AGENT_USER_ID.conversations",
    "version": "2",
    "eventBody": {
      "id": "ffff-ffff-ffff-ffff",
      "participants": [{
        "id": "9a0231a0-8882-41bb-9b2c-d2f275736270",
        "connectedTime": "2022-07-04T20:04:12.131Z",
        "name": "VideoCall from Slav Hajdidimitrov",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "customer",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "connected",
          "initialState": "scheduled",
          "id": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "held": false,
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.131Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "a5d47ef7-3e85-4c2b-81cb-13590bdaa184",
        "connectedTime": "2022-07-04T20:04:12.132Z",
        "endTime": "2022-07-04T20:07:20.528Z",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "acd",
        "wrapupRequired": false,
        "wrapupExpected": false,
        "conversationRoutingData": {
          "queue": {
            "id": "0e185c02-aca1-4a72-82ea-2e78684e2c89"
          },
          "language": {},
          "priority": 0
        },
        "attributes": {
          "pcEnvironment": "mypurecloud.de",
          "number": "",
          "domainUrl": "https://staging.leadsecure.com/",
          "veUrl": "https://staging.leadsecure.com/ve/BxQ00v"
        },
        "callbacks": [{
          "state": "disconnected",
          "initialState": "scheduled",
          "id": "83d66254-d366-4486-82a3-f42d6eb40f7f",
          "held": false,
          "disconnectType": "transfer",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:04:12.132Z",
          "disconnectedTime": "2022-07-04T20:07:20.528Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "d7230894-5770-4bb2-b41d-b2765e5cd5b0",
        "endTime": "2022-07-04T20:04:35.306Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "e762f484-1ddb-4626-8880-ff029c13b0ad",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:04:35.306Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "e8750fcf-9785-48b4-9214-d79a275cbc66",
        "endTime": "2022-07-04T20:05:05.831Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": false,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "58053931-7122-4d24-ae9d-c1f9eefa137f",
          "held": false,
          "disconnectType": "system",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "disconnectedTime": "2022-07-04T20:05:05.831Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }, {
        "id": "5151853c-ca28-48da-bdcd-f15c46f0712e",
        "connectedTime": "2022-07-04T20:07:20.528Z",
        "endTime": "2022-07-04T20:08:25.397Z",
        "userId": "AGENT_USER_ID",
        "queueId": "0e185c02-aca1-4a72-82ea-2e78684e2c89",
        "purpose": "agent",
        "wrapupRequired": true,
        "wrapupExpected": true,
        "wrapupPrompt": "optional",
        "startAcwTime": "2022-07-04T20:08:25.397Z",
        "conversationRoutingData": {
          "queue": {},
          "language": {},
          "priority": 0
        },
        "alertingTimeoutMs": 30000,
        "attributes": {},
        "callbacks": [{
          "state": "disconnected",
          "initialState": "alerting",
          "id": "19c34168-ccb5-45d5-a9d9-a89caf74e586",
          "held": false,
          "disconnectType": "client",
          "callbackNumbers": [""],
          "callbackUserName": "VideoCall from Slav Hajdidimitrov",
          "scriptId": "04427bf2-44e4-465d-af8d-24c9cc41e0d2",
          "peerId": "4abc9472-61cc-402a-83e3-28015dd7f30f",
          "externalCampaign": false,
          "skipEnabled": true,
          "provider": "PureCloud Callback",
          "timeoutSeconds": 0,
          "connectedTime": "2022-07-04T20:07:20.528Z",
          "disconnectedTime": "2022-07-04T20:08:25.397Z",
          "callbackScheduledTime": "2022-07-04T20:03:12.235Z",
          "afterCallWork": {
            "state": "pending",
            "startTime": "2022-07-04T20:08:25.397Z"
          },
          "afterCallWorkRequired": false,
          "callerIdName": "Slav Hajdidimitrov",
          "additionalProperties": {}
        }],
        "additionalProperties": {}
      }],
      "recordingState": "none"
    },
    "metadata": {
      "CorrelationId": "2074b130-f0a0-4722-9063-cdbac74c0aee"
    }
  },
  participants: {}
};

module.exports = genesys;
