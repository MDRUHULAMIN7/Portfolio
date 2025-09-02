import { getResume } from "@/queries/avatar";
import UpdateResumeModal from "./UpdateResumeModal";

export default async function UpdateResume() {
  const data = await getResume();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Current Resume</h1>

      {data?.resume ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Resume Preview</h2>
          <iframe
            src={data.resume.replace("/view", "/preview")}
            width="100%"
            height="600px"
            className="border rounded"
          ></iframe>
        </div>
      ) : (
        <p>No resume found.</p>
      )}

      <UpdateResumeModal initialResume={data?.resume || ""} />
    </div>
  );
}
