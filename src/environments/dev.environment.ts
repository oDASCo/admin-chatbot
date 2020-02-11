import {AppModel, baseUrl} from '../app/app.model';

export const environment: AppModel = {
  api: {
    auth: {
      login: {
        url: `${baseUrl}/authentication`
      },
      logout: {
        url: `${baseUrl}/authentication/logout`
      },
      register: {
        url: `${baseUrl}/registration`,
        users: {
          url: `${baseUrl}/registration/users`
        },
        adminApprove: {
          url: `${baseUrl}/registration/activation/admin`
        },
        activateEmail: {
          url: `${baseUrl}/registration/activation/`
        }
      },
      changePassword: {
        url: `${baseUrl}/registration/user`
      }
    },
    intent: {
      url: `/intent`
    },
    entity: {
      url: `/entity`
    },
    reports: {
      url: `/conversation`
    },
    chatbot: {
      url: `${baseUrl}/chatbot/user`,
      create: {
        url: `${baseUrl}/chatbot`
      }
    }
  },
  production: false
};
