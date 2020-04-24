export interface Configuration {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

export interface BuildListQuery {
  offset: number;
  limit: number;
}

export enum BuildStatus {
  Waiting,
  InProgress,
  Success,
  Fail,
  Canceled
}

export interface Build {
  id: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: BuildStatus;
  start?: Date;
  duration?: number;
}

export interface PostBranchBody {
  branchName: string;
}

export interface RequestBuild {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}
