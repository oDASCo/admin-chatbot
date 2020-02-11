import {AppModel, baseUrl} from '../app/app.model';

export const environment: AppModel = {
  api: {
    auth: {
      login: {
        url: 'backend/api/authentication'
      },
      logout: {
        url: 'backend/api/authentication/logout'
      },
      register: {
        url: 'backend/api/registration',
        users: {
          url: 'backend/api/registration/users'
        },
        adminApprove: {
          url: 'backend/api/registration/activation/admin'
        },
        activateEmail: {
          url: 'backend/api/registration/activation/'
        }
      },
      changePassword: {
        url: 'backend/api/registration/user'
      }
    },
    intent: {
      url: '/intent'
    },
    entity: {
      url: '/entity'
    },
    reports: {
      url: '/conversation'
    },
    chatbot: {
      url: `${baseUrl}/chatbot/user`,
      create: {
        url: `${baseUrl}/chatbot`
      }
    }
  },
  production: true
};
