// https://raw.githubusercontent.com/octokit/types.ts/master/src/generated/Endpoints.ts
export type ReposListCommitsResponseDataItemParentsItem = { url: string; sha: string };
export type ReposListCommitsResponseDataItemCommitter = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};
export type ReposListCommitsResponseDataItemAuthor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};
export type ReposListCommitsResponseDataItemCommitVerification = {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
};
export type ReposListCommitsResponseDataItemCommitTree = { url: string; sha: string };
export type ReposListCommitsResponseDataItemCommitCommitter = {
  name: string;
  email: string;
  date: string;
};
export type ReposListCommitsResponseDataItemCommitAuthor = {
  name: string;
  email: string;
  date: string;
};
export type ReposListCommitsResponseDataItemCommit = {
  url: string;
  author: ReposListCommitsResponseDataItemCommitAuthor;
  committer: ReposListCommitsResponseDataItemCommitCommitter;
  message: string;
  tree: ReposListCommitsResponseDataItemCommitTree;
  comment_count: number;
  verification: ReposListCommitsResponseDataItemCommitVerification;
};
export type ReposListCommitsResponseDataItem = {
  url: string;
  sha: string;
  node_id: string;
  html_url: string;
  comments_url: string;
  commit: ReposListCommitsResponseDataItemCommit;
  author: ReposListCommitsResponseDataItemAuthor;
  committer: ReposListCommitsResponseDataItemCommitter;
  parents: Array<ReposListCommitsResponseDataItemParentsItem>;
};
export type ReposListCommitsResponseData = Array<ReposListCommitsResponseDataItem>;
