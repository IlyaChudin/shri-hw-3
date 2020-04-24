export interface ConfigurationModel {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

export type ConfigurationInput = Omit<ConfigurationModel, "id">;

export interface BuildListQuery {
  offset?: number;
  limit?: number;
}

export enum BuildStatus {
  Waiting,
  InProgress,
  Success,
  Fail,
  Canceled
}

export interface BuildModel {
  id: string;
  configurationId: string;
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

export interface QueueBuildInput {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}

export type BuildRequestResultModel = Pick<BuildModel, "id" | "buildNumber" | "status">;

export type BuildList = BuildModel[] | undefined;
