export type Project = {
  id: number;
  name: string;
  createdBy: string;
}

export type Query = {
  projects: Project[];
}


