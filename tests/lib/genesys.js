/**
 * this page consist of genesys mock responses
 */
const genesys = {
  organization: {
    id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
    name: 'Slav',
    division: {
      id: '35292247-e132-4dd3-b46a-8058cdd518f4',
      name: 'Home',
      selfUri: '/api/v2/authorization/divisions/35292247-e132-4dd3-b46a-8058cdd518f4'
    },
    chat: {
      jabberId: '5b997222da40c814b82f854e@videoengager.orgspan.com'
    },
    email: 'slav@videoengager.com',
    primaryContactInfo: [
      {
        address: 'slav@videoengager.com',
        mediaType: 'EMAIL',
        type: 'PRIMARY'
      }
    ],
    addresses: [
      {
        address: 'slav@videoengager.com',
        mediaType: 'EMAIL',
        type: 'WORK'
      }
    ],
    state: 'active',
    username: 'slav@videoengager.com',
    images: [
      {
        resolution: 'x48',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/745247c5/c18d/48bb/a7b8/4ae93fb02459.jpg'
      },
      {
        resolution: 'x96',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/061b03c2/5da0/4bc5/b0a0/50afe948edcf.jpg'
      },
      {
        resolution: 'x128',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/4f12dd8f/557a/44fe/8033/e7da697363d9.jpg'
      },
      {
        resolution: 'x200',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/22313a3b/ba49/49fa/9b1c/86bcac6d4121.jpg'
      },
      {
        resolution: 'x300',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/dc1d2c59/d7e0/431c/bc48/a38b4eb0e9b3.jpg'
      },
      {
        resolution: 'x400',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/851178de/d598/4674/a788/e1935609057a.jpg'
      }
    ],
    version: 302,
    acdAutoAnswer: false,
    organization: {
      id: '327d10eb-0826-42cd-89b1-353ec67d33f8',
      name: 'videoEngager',
      defaultLanguage: 'en',
      defaultCountryCode: 'US',
      thirdPartyOrgName: 'videoengager',
      domain: 'videoEngager',
      version: 7,
      state: 'active',
      defaultSiteId: '24c5dfdf-a6c9-4814-a50c-3ae79d3eefc8',
      thirdPartyOrgId: '9949',
      deletable: true,
      voicemailEnabled: false,
      productPlatform: 'Unknown',
      selfUri: '/api/v2/organizations/me',
      features: {
        chat: true,
        contactCenter: true,
        directory: true,
        informalPhotos: true,
        purecloud: true,
        purecloudVoice: true,
        realtimeCIC: false,
        unifiedCommunications: true,
        hipaa: false,
        pci: false,
        xmppFederation: false
      }
    },
    selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
  },
  conversationSummary: {
    id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
    name: 'Slav',
    division: {
      id: '35292247-e132-4dd3-b46a-8058cdd518f4',
      name: 'Home',
      selfUri: '/api/v2/authorization/divisions/35292247-e132-4dd3-b46a-8058cdd518f4'
    },
    chat: {
      jabberId: '5b997222da40c814b82f854e@videoengager.orgspan.com'
    },
    email: 'slav@videoengager.com',
    primaryContactInfo: [
      {
        address: 'slav@videoengager.com',
        mediaType: 'EMAIL',
        type: 'PRIMARY'
      }
    ],
    addresses: [
      {
        address: 'slav@videoengager.com',
        mediaType: 'EMAIL',
        type: 'WORK'
      }
    ],
    state: 'active',
    username: 'slav@videoengager.com',
    images: [
      {
        resolution: 'x48',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/745247c5/c18d/48bb/a7b8/4ae93fb02459.jpg'
      },
      {
        resolution: 'x96',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/061b03c2/5da0/4bc5/b0a0/50afe948edcf.jpg'
      },
      {
        resolution: 'x128',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/4f12dd8f/557a/44fe/8033/e7da697363d9.jpg'
      },
      {
        resolution: 'x200',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/22313a3b/ba49/49fa/9b1c/86bcac6d4121.jpg'
      },
      {
        resolution: 'x300',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/dc1d2c59/d7e0/431c/bc48/a38b4eb0e9b3.jpg'
      },
      {
        resolution: 'x400',
        imageUri: 'https://prod-apse2-inin-directory-service-profile.s3-ap-southeast-2.amazonaws.com/851178de/d598/4674/a788/e1935609057a.jpg'
      }
    ],
    version: 302,
    conversationSummary: {
      call: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      },
      callback: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      },
      email: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      },
      message: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      },
      chat: {
        contactCenter: {
          active: 0,
          acw: 1
        },
        enterprise: {
          active: 0
        }
      },
      socialExpression: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      },
      video: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0
        }
      }
    },
    acdAutoAnswer: false,
    selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
  },
  purecloud: {
    source: 'PURECLOUD',
    presenceDefinition: {
      id: 'e08eaf1b-ee47-4fa9-a231-1200e284798f',
      systemPresence: 'On Queue',
      selfUri: '/api/v2/presencedefinitions/e08eaf1b-ee47-4fa9-a231-1200e284798f'
    },
    message: 'luba luba dub dub',
    modifiedDate: '2022-03-07T08:15:03.625Z',
    selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8/presences'
  },
  channels: {
    connectUri: 'wss://streaming.mypurecloud.com.au/channels/streaming-4-h0ghbrbgoj6p1s60th821d9278',
    id: 'streaming-4-h0ghbrbgoj6p1s60th821d9278',
    expires: '2022-03-09T15:49:13.525Z'
  },
  getChannels: {
    entities: [
      {
        connectUri: 'ws://test',
        id: 'streaming-4-f1j9e2r0kt18jgc1rnrrf3c58d',
        expires: '2022-03-09T15:49:05.169Z'
      }
    ]
  },
  subscriptions: {
    entities: [
      {
        id: 'v2.users.3ce84f47-4e65-4756-a815-67a2b32e58b8.conversationsummary'
      },
      {
        id: 'v2.conversations.chats.1c1a063b-45bf-4719-9127-7bca923118c1.messages'
      },
      {
        id: 'v2.users.3ce84f47-4e65-4756-a815-67a2b32e58b8.conversations.chats'
      }
    ]
  },
  chats: [
    { entities: [] },
    {
      entities: [
        {
          id: '12204f43-5ecd-4ab5-b9a0-e07579229221',
          participants: [
            {
              id: '380859ea-f193-4907-990c-b0781ea09d9f',
              name: 'videoengager.github.io',
              startTime: '2022-03-09T06:19:26.371Z',
              connectedTime: '2022-03-09T06:19:26.384Z',
              purpose: 'customer',
              state: 'connected',
              held: false,
              wrapupRequired: false,
              queue: {
                id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              attributes: {
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
                'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                'context.subject': 'product questions',
                'context._genesys_url': 'https://videoengager.github.io/examples/single-button-genesys-demo.html?debug=dev',
                'context._genesys_pageTitle': 'Single Button Genesys Demo'
              },
              provider: 'PureCloud Webchat v2'
            },
            {
              id: '37ab4c66-ea52-4719-974f-11ec89a39e28',
              name: 'video',
              startTime: '2022-03-09T06:19:26.373Z',
              connectedTime: '2022-03-09T06:19:26.428Z',
              endTime: '2022-03-09T06:19:33.476Z',
              purpose: 'acd',
              state: 'disconnected',
              disconnectType: 'transfer',
              held: false,
              wrapupRequired: false,
              queue: {
                id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              attributes: {
                'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              provider: 'PureCloud Webchat v2',
              conversationRoutingData: {
                queue: {
                  id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                  selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
                },
                priority: 2,
                skills: [

                ],
                scoredAgents: [

                ]
              }
            },
            {
              id: 'efffd14f-fde7-4909-96b0-9e06bb6b9d87',
              startTime: '2022-03-09T06:19:26.521Z',
              connectedTime: '2022-03-09T06:19:33.478Z',
              purpose: 'agent',
              state: 'connected',
              held: false,
              wrapupRequired: true,
              wrapupPrompt: 'timeout',
              user: {
                id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
                selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
              },
              queue: {
                id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              attributes: {

              },
              wrapupTimeoutMs: 120000,
              alertingTimeoutMs: 30000,
              provider: 'PureCloud Webchat v2',
              conversationRoutingData: {
                priority: 0,
                skills: [

                ],
                scoredAgents: [

                ]
              }
            }
          ],
          otherMediaUris: [

          ],
          selfUri: '/api/v2/conversations/chats/12204f43-5ecd-4ab5-b9a0-e07579229221'
        }
      ],
      pageSize: 1,
      pageNumber: 1,
      total: 1,
      firstUri: '/api/v2/conversations/chats?pageSize=1&pageNumber=1',
      selfUri: '/api/v2/conversations/chats?pageSize=1&pageNumber=1',
      lastUri: '/api/v2/conversations/chats?pageSize=1&pageNumber=1',
      pageCount: 1
    }],
  messages: {
    pageSize: 100,
    entities: [
      {
        id: '0c394ab0-2f55-48d5-9bde-166a317b186d',
        conversation: {
          id: '1c1a063b-45bf-4719-9127-7bca923118c1',
          selfUri: '/api/v2/conversations/1c1a063b-45bf-4719-9127-7bca923118c1'
        },
        sender: {
          id: 'd3942b5e-a6ed-4ab5-9291-236659eebd11'
        },
        body: '{"interactionId":"b1ee754f-0ea8-68f6-b39f-aef6a0482bf8"}',
        bodyType: 'standard',
        timestamp: '2022-03-08T15:47:49.114Z',
        selfUri: '/api/v2/conversations/chats/1c1a063b-45bf-4719-9127-7bca923118c1/messages/0c394ab0-2f55-48d5-9bde-166a317b186d'
      }
    ]
  },
  conversations: {
    entities: [
      {
        id: '1c1a063b-45bf-4719-9127-7bca923118c1',
        startTime: '2022-03-08T15:47:47.417Z',
        participants: [
          {
            id: 'd97d3759-d3fb-4b05-9271-77a2fc2efb09',
            startTime: '2022-03-08T15:47:47.417Z',
            connectedTime: '2022-03-08T15:47:47.417Z',
            name: 'videoengager.github.io',
            queueId: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            purpose: 'customer',
            wrapupRequired: false,
            attributes: {
              'context._genesys_OS': 'Mac OS X',
              'context.veVisitorId': 'b1ee754f-0ea8-68f6-b39f-aef6a0482bf8',
              'context.email': 'development@videoengager.com',
              'context._genesys_browser': 'Chrome',
              'context._genesys_referrer': '',
              'context.nickname': 'videoengager.github.io',
              'context._genesys_source': 'web',
              'context.firstName': 'videoengager.github.io',
              'context.nickName': 'Jonny',
              'context.lastName': 'Smith',
              'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da',
              'context.subject': 'product questions',
              'context._genesys_url': 'https://videoengager.github.io/examples/single-button-genesys-demo.html?debug=dev',
              'context._genesys_pageTitle': 'Single Button Genesys Demo'
            },
            chats: [
              {
                state: 'connected',
                id: 'd3942b5e-a6ed-4ab5-9291-236659eebd11',
                segments: [

                ],
                held: false,
                connectedTime: '2022-03-08T15:47:47.432Z',
                provider: 'PureCloud Webchat v2',
                afterCallWorkRequired: false
              }
            ]
          },
          {
            id: '450c4e18-dd32-4b3f-a229-6d10fe0c064a',
            startTime: '2022-03-08T15:47:47.418Z',
            endTime: '2022-03-08T15:49:04.272Z',
            connectedTime: '2022-03-08T15:47:47.418Z',
            name: 'video',
            queueId: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            purpose: 'acd',
            wrapupRequired: false,
            conversationRoutingData: {
              queue: {
                id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              priority: 2,
              skills: [

              ],
              scoredAgents: [

              ]
            },
            attributes: {
              'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da'
            },
            chats: [
              {
                state: 'disconnected',
                id: '1a5dee39-83ab-4af7-8869-91b7a031ea00',
                segments: [

                ],
                held: false,
                disconnectType: 'transfer',
                connectedTime: '2022-03-08T15:47:47.484Z',
                disconnectedTime: '2022-03-08T15:49:04.272Z',
                provider: 'PureCloud Webchat v2',
                afterCallWorkRequired: false
              }
            ]
          },
          {
            id: 'a47f27c1-3091-4bfe-a59d-d963df268043',
            startTime: '2022-03-08T15:47:47.597Z',
            endTime: '2022-03-08T15:48:17.797Z',
            userUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8',
            userId: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
            queueId: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            purpose: 'agent',
            wrapupRequired: false,
            wrapupPrompt: 'timeout',
            wrapupTimeoutMs: 120000,
            conversationRoutingData: {
              priority: 0,
              skills: [

              ],
              scoredAgents: [

              ]
            },
            alertingTimeoutMs: 30000,
            attributes: {

            },
            chats: [
              {
                state: 'disconnected',
                id: '2ebedf46-dc06-4fd0-8d0a-947bbe9f68da',
                segments: [

                ],
                held: false,
                disconnectType: 'system',
                startAlertingTime: '2022-03-08T15:47:47.620Z',
                disconnectedTime: '2022-03-08T15:48:17.797Z',
                provider: 'PureCloud Webchat v2',
                afterCallWorkRequired: false
              }
            ]
          },
          {
            id: '9bdd231e-22cd-495b-9185-4ed2bea2821f',
            startTime: '2022-03-08T15:48:27.922Z',
            endTime: '2022-03-08T15:48:58.144Z',
            userUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8',
            userId: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
            queueId: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            purpose: 'agent',
            wrapupRequired: false,
            wrapupPrompt: 'timeout',
            wrapupTimeoutMs: 120000,
            conversationRoutingData: {
              priority: 0,
              skills: [

              ],
              scoredAgents: [

              ]
            },
            alertingTimeoutMs: 30000,
            attributes: {

            },
            chats: [
              {
                state: 'disconnected',
                id: '41a12739-2efa-43ca-8fa6-e4acae1dd275',
                segments: [

                ],
                held: false,
                disconnectType: 'system',
                startAlertingTime: '2022-03-08T15:48:28.006Z',
                disconnectedTime: '2022-03-08T15:48:58.144Z',
                provider: 'PureCloud Webchat v2',
                afterCallWorkRequired: false
              }
            ]
          },
          {
            id: 'd36875ce-1bb6-4ad7-8ff9-5af8e727bd88',
            startTime: '2022-03-08T15:49:01.053Z',
            connectedTime: '2022-03-08T15:49:04.274Z',
            userUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8',
            userId: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
            queueId: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            purpose: 'agent',
            wrapupRequired: true,
            wrapupPrompt: 'timeout',
            wrapupTimeoutMs: 120000,
            conversationRoutingData: {
              priority: 0,
              skills: [

              ],
              scoredAgents: [

              ]
            },
            alertingTimeoutMs: 30000,
            attributes: {

            },
            chats: [
              {
                state: 'connected',
                id: '493dbc53-e342-4454-9b9b-7df471597d4b',
                segments: [

                ],
                held: false,
                startAlertingTime: '2022-03-08T15:49:01.092Z',
                connectedTime: '2022-03-08T15:49:04.274Z',
                provider: 'PureCloud Webchat v2',
                afterCallWorkRequired: false
              }
            ]
          }
        ],
        recordingState: 'NONE',
        divisions: [
          {
            division: {
              id: '35292247-e132-4dd3-b46a-8058cdd518f4',
              selfUri: '/api/v2/authorization/divisions/35292247-e132-4dd3-b46a-8058cdd518f4'
            },
            entities: [
              {
                id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
                selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
              },
              {
                id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
                selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
              }
            ]
          }
        ],
        selfUri: '/api/v2/conversations/1c1a063b-45bf-4719-9127-7bca923118c1'
      }
    ],
    pageSize: 1,
    pageNumber: 1,
    total: 1,
    firstUri: '/api/v2/conversations?pageSize=1&pageNumber=1',
    selfUri: '/api/v2/conversations?pageSize=1&pageNumber=1',
    lastUri: '/api/v2/conversations?pageSize=1&pageNumber=1',
    pageCount: 1
  },
  conversationChat: {
    id: '1c1a063b-45bf-4719-9127-7bca923118c1',
    participants: [
      {
        id: 'd97d3759-d3fb-4b05-9271-77a2fc2efb09',
        name: 'videoengager.github.io',
        startTime: '2022-03-08T15:47:47.417Z',
        connectedTime: '2022-03-08T15:47:47.432Z',
        purpose: 'customer',
        state: 'connected',
        held: false,
        wrapupRequired: false,
        queue: {
          id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        attributes: {
          'context._genesys_OS': 'Mac OS X',
          'context.veVisitorId': 'b1ee754f-0ea8-68f6-b39f-aef6a0482bf8',
          'context.email': 'development@videoengager.com',
          'context._genesys_browser': 'Chrome',
          'context._genesys_referrer': '',
          'context.nickname': 'videoengager.github.io',
          'context._genesys_source': 'web',
          'context.firstName': 'videoengager.github.io',
          'context.nickName': 'Jonny',
          'context.lastName': 'Smith',
          'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          'context.subject': 'product questions',
          'context._genesys_url': 'https://videoengager.github.io/examples/single-button-genesys-demo.html?debug=dev',
          'context._genesys_pageTitle': 'Single Button Genesys Demo'
        },
        provider: 'PureCloud Webchat v2'
      },
      {
        id: '450c4e18-dd32-4b3f-a229-6d10fe0c064a',
        name: 'video',
        startTime: '2022-03-08T15:47:47.418Z',
        connectedTime: '2022-03-08T15:47:47.484Z',
        endTime: '2022-03-08T15:49:04.272Z',
        purpose: 'acd',
        state: 'disconnected',
        disconnectType: 'transfer',
        held: false,
        wrapupRequired: false,
        queue: {
          id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        attributes: {
          'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        provider: 'PureCloud Webchat v2',
        conversationRoutingData: {
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          priority: 2,
          skills: [

          ],
          scoredAgents: [

          ]
        }
      },
      {
        id: 'a47f27c1-3091-4bfe-a59d-d963df268043',
        startTime: '2022-03-08T15:47:47.597Z',
        endTime: '2022-03-08T15:48:17.797Z',
        purpose: 'agent',
        state: 'disconnected',
        disconnectType: 'system',
        held: false,
        wrapupRequired: false,
        wrapupPrompt: 'timeout',
        user: {
          id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
          selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
        },
        queue: {
          id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        attributes: {

        },
        wrapupTimeoutMs: 120000,
        alertingTimeoutMs: 30000,
        provider: 'PureCloud Webchat v2',
        conversationRoutingData: {
          priority: 0,
          skills: [

          ],
          scoredAgents: [

          ]
        }
      },
      {
        id: '9bdd231e-22cd-495b-9185-4ed2bea2821f',
        startTime: '2022-03-08T15:48:27.922Z',
        endTime: '2022-03-08T15:48:58.144Z',
        purpose: 'agent',
        state: 'disconnected',
        disconnectType: 'system',
        held: false,
        wrapupRequired: false,
        wrapupPrompt: 'timeout',
        user: {
          id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
          selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
        },
        queue: {
          id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        attributes: {

        },
        wrapupTimeoutMs: 120000,
        alertingTimeoutMs: 30000,
        provider: 'PureCloud Webchat v2',
        conversationRoutingData: {
          priority: 0,
          skills: [

          ],
          scoredAgents: [

          ]
        }
      },
      {
        id: 'd36875ce-1bb6-4ad7-8ff9-5af8e727bd88',
        startTime: '2022-03-08T15:49:01.053Z',
        connectedTime: '2022-03-08T15:49:04.274Z',
        purpose: 'agent',
        state: 'connected',
        held: false,
        wrapupRequired: true,
        wrapupPrompt: 'timeout',
        user: {
          id: '3ce84f47-4e65-4756-a815-67a2b32e58b8',
          selfUri: '/api/v2/users/3ce84f47-4e65-4756-a815-67a2b32e58b8'
        },
        queue: {
          id: '3c6f420a-26cc-4b59-84f8-3c94011d39da',
          selfUri: '/api/v2/routing/queues/3c6f420a-26cc-4b59-84f8-3c94011d39da'
        },
        attributes: {

        },
        wrapupTimeoutMs: 120000,
        alertingTimeoutMs: 30000,
        provider: 'PureCloud Webchat v2',
        conversationRoutingData: {
          priority: 0,
          skills: [

          ],
          scoredAgents: [

          ]
        }
      }
    ],
    otherMediaUris: [

    ],
    selfUri: '/api/v2/conversations/chats/1c1a063b-45bf-4719-9127-7bca923118c1'
  },
  participants: {},
  wsMessages: [{
    topicName: 'v2.conversations.chats.1c1a063b-45bf-4719-9127-7bca923118c1.messages',
    version: '2',
    eventBody: {
      id: '35fda6fe-539c-474b-8b9b-6d6e342a9660',
      conversation: {
        id: '1c1a063b-45bf-4719-9127-7bca923118c1'
      },
      sender: {
        id: '493dbc53-e342-4454-9b9b-7df471597d4b'
      },
      body: '',
      bodyType: 'member-leave',
      timestamp: '2022-03-08T15:50:29.605Z'
    },
    metadata: {
      CorrelationId: '47230970-fbf8-4bc1-a3d5-1d938e81b421',
      type: 'message'
    }
  }, {
    topicName: 'v2.users.3ce84f47-4e65-4756-a815-67a2b32e58b8.conversations.chats',
    version: '2',
    eventBody: {
      participants: [
        {
          id: 'd97d3759-d3fb-4b05-9271-77a2fc2efb09',
          name: 'videoengager.github.io',
          connectedTime: '2022-03-08T15:47:47.432Z',
          purpose: 'customer',
          state: 'connected',
          held: false,
          wrapupRequired: false,
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          attributes: {
            'context._genesys_OS': 'Mac OS X',
            'context.veVisitorId': 'b1ee754f-0ea8-68f6-b39f-aef6a0482bf8',
            'context.email': 'development@videoengager.com',
            'context._genesys_browser': 'Chrome',
            'context._genesys_referrer': '',
            'context.nickname': 'videoengager.github.io',
            'context._genesys_source': 'web',
            'context.firstName': 'videoengager.github.io',
            'context.nickName': 'Jonny',
            'context.lastName': 'Smith',
            'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da',
            'context.subject': 'product questions',
            'context._genesys_url': 'https://videoengager.github.io/examples/single-button-genesys-demo.html?debug=dev',
            'context._genesys_pageTitle': 'Single Button Genesys Demo'
          },
          provider: 'PureCloud Webchat v2'
        },
        {
          id: '450c4e18-dd32-4b3f-a229-6d10fe0c064a',
          name: 'video',
          connectedTime: '2022-03-08T15:47:47.484Z',
          endTime: '2022-03-08T15:49:04.272Z',
          purpose: 'acd',
          state: 'disconnected',
          disconnectType: 'transfer',
          held: false,
          wrapupRequired: false,
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          attributes: {
            'ivr.DistributionGroup': '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          provider: 'PureCloud Webchat v2',
          conversationRoutingData: {
            queue: {
              id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
            },
            language: {

            },
            priority: 2
          }
        },
        {
          id: 'a47f27c1-3091-4bfe-a59d-d963df268043',
          endTime: '2022-03-08T15:48:17.797Z',
          purpose: 'agent',
          state: 'disconnected',
          disconnectType: 'system',
          held: false,
          wrapupRequired: false,
          wrapupPrompt: 'timeout',
          user: {
            id: '3ce84f47-4e65-4756-a815-67a2b32e58b8'
          },
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          attributes: {

          },
          wrapupTimeoutMs: 120000,
          alertingTimeoutMs: 30000,
          provider: 'PureCloud Webchat v2',
          conversationRoutingData: {
            queue: {

            },
            language: {

            },
            priority: 0
          }
        },
        {
          id: '9bdd231e-22cd-495b-9185-4ed2bea2821f',
          endTime: '2022-03-08T15:48:58.144Z',
          purpose: 'agent',
          state: 'disconnected',
          disconnectType: 'system',
          held: false,
          wrapupRequired: false,
          wrapupPrompt: 'timeout',
          user: {
            id: '3ce84f47-4e65-4756-a815-67a2b32e58b8'
          },
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          attributes: {

          },
          wrapupTimeoutMs: 120000,
          alertingTimeoutMs: 30000,
          provider: 'PureCloud Webchat v2',
          conversationRoutingData: {
            queue: {

            },
            language: {

            },
            priority: 0
          }
        },
        {
          id: 'd36875ce-1bb6-4ad7-8ff9-5af8e727bd88',
          connectedTime: '2022-03-08T15:49:04.274Z',
          endTime: '2022-03-08T15:50:29.611Z',
          purpose: 'agent',
          state: 'disconnected',
          disconnectType: 'client',
          held: false,
          wrapupRequired: true,
          wrapupPrompt: 'timeout',
          user: {
            id: '3ce84f47-4e65-4756-a815-67a2b32e58b8'
          },
          queue: {
            id: '3c6f420a-26cc-4b59-84f8-3c94011d39da'
          },
          attributes: {

          },
          wrapupTimeoutMs: 120000,
          alertingTimeoutMs: 30000,
          provider: 'PureCloud Webchat v2',
          conversationRoutingData: {
            queue: {

            },
            language: {

            },
            priority: 0
          },
          startAcwTime: '2022-03-08T15:50:29.611Z'
        }
      ],
      id: '1c1a063b-45bf-4719-9127-7bca923118c1'
    },
    metadata: {
      CorrelationId: '47230970-fbf8-4bc1-a3d5-1d938e81b421'
    }
  },
  {
    topicName: 'v2.users.3ce84f47-4e65-4756-a815-67a2b32e58b8.conversationsummary',
    version: '2',
    eventBody: {
      call: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      callback: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      email: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      message: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      chat: {
        contactCenter: {
          active: 0,
          acw: 1
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      socialExpression: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      },
      video: {
        contactCenter: {
          active: 0,
          acw: 0
        },
        enterprise: {
          active: 0,
          acw: 0
        }
      }
    },
    metadata: {
      CorrelationId: '47230970-fbf8-4bc1-a3d5-1d938e81b421'
    }
  }]
};

module.exports = genesys;
