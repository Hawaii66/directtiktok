import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Link href="/video">Video</Link>
      <Link href="/script">Script</Link>
    </div>
  );
}

export default page;
