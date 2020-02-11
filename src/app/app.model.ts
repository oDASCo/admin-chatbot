export interface AppModel {
  api: {
    auth: {
      login: {
        url: string;
      },
      logout: {
        url: string;
      },
      register: {
        url: string;
        users: {
          url: string;
        },
        adminApprove: {
          url: string;
        },
        activateEmail: {
          url: string;
        }
      },
      changePassword: {
        url: string;
      }
    },
    intent: {
      url: string;
    },
    entity: {
      url: string;
    },
    reports: {
      url: string;
    },
    chatbot: {
      url: string;
      create: {
        url: string;
      }
    }
  };
  production: boolean;
}

export const baseUrl = 'backend/api';
