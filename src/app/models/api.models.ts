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
  statistics: Statistics;
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
  status: string;
  test_status: TestSummary;
}

export interface BuildInfo {
  result: Info[];
}
