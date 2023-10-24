"use client";

import { usePathname } from "next/navigation";

const ApplicantIdPage = () => {
  const pathname = usePathname();
  const applicantId = pathname.split("").at(-1);
  console.log(applicantId);

  return (
    <>
      <div>{applicantId}</div>
    </>
  );
};

export default ApplicantIdPage;
