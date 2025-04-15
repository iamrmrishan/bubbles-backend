export type MailConfig = {
  // Keep existing settings for backward compatibility
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;

  // Add AWS SES specific settings
  provider: 'smtp' | 'ses'; // To determine which provider to use
  accessKeyId?: string;
  secretAccessKey?: string;
  awsRegion?: string;
};
