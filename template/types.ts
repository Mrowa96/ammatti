export type ResumeData = {
  personalDetails: {
    name: string;
  };
  experiences: {
    company: {
      name: string;
      websiteUrl?: string;
    };
    dateFrom: Date;
    dateTo: Date;
    role: string;
    content: string;
  }[];
  education: {
    school: string;
    dateFrom: Date;
    dateTo: Date;
  }[];
};
