import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "jobs-api/speechmatics-asr-rest-api",
    },
    {
      type: "category",
      label: "Jobs",
      items: [
        {
          type: "doc",
          id: "jobs-api/create-a-new-job",
          label: "Create a new job.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "jobs-api/list-all-jobs",
          label: "List all jobs.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-job-details-including-progress-and-any-error-reports",
          label: "Get job details, including progress and any error reports.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/delete-a-job-and-remove-all-associated-resources",
          label: "Delete a job and remove all associated resources.",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "jobs-api/get-the-transcript-for-a-transcription-job",
          label: "Get the transcript for a transcription job.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-the-aligned-text-file-for-an-alignment-job",
          label: "Get the aligned text file for an alignment job.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-the-usage-statistics",
          label: "Get the usage statistics.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "jobs-api/get-the-data-file-used-as-input-to-a-job",
          label: "Get the data file used as input to a job.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-the-text-file-used-as-input-to-an-alignment-job",
          label: "Get the text file used as input to an alignment job.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-the-log-file-for-a-job",
          label: "Get the log file for a job.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "jobs-api/get-signed-urls-for-data-files-associated-to-the-job",
          label: "Get signed urls for data files associated to the job.",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
