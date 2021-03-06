export interface Executions {
  total: string;
  passed: string;
  failed: string;
  skipped: string;
}

export interface Statistics {
  executions: Executions;
}

export interface TestSummary {
  status: string;
  id: string;
  statistics: Executions;
}

export interface Info {
  rid: string;
  build_date: string;
  chart_location: string;
  author: string;
  build_number: string;
  type: string;
  commit_id: string;
  commit_msg: string;
  build_status: string;
  tag_name: string;
  test_status: TestSummary;
  project_name: string;
  repo_name: string;
}

export interface BuildInfo {
  result: Info[];
}

export interface AutoSuggest {
  key: string;
  value: string;
  display_key: string;
}

export interface Filter {
  key: string;
  value: string;
}

export interface Release {
  id: string;
  releaseName: string;
  releaseTag: string;
  requirementFreeze: Date;
  featureFreeze: Date;
  codeFreeze: Date;
  releaseDate: Date;
  releaseNote: string;
  requirementDocument: string;
  phase: string;
  released: boolean;
  associatedProjects: string[];
}

export interface KeyValueHolder {
  key: string;
  value: string;
}

export interface User {
  name: string;
  profile_img: string;
  jira_id: string;
  token_present: boolean;
  created_date: string;
}
