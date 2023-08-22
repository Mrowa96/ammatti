export type ResumeData = {
  personalDetails: {
    name: string;
    email: string;
    phone?: string;
    website?: string;
    socials?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  experiences: {
    company: {
      name: string;
      websiteUrl?: string;
    };
    dateFrom: Date;
    dateTo?: Date;
    role: string;
    content: string;
  }[];
  education: {
    school: string;
    dateFrom: Date;
    dateTo: Date;
  }[];
  skills: {
    advanced: string[];
    good: string[];
    average: string[];
  };
  languages: {
    name: string;
    level: string;
  }[];
  hobbies: string[];
};
