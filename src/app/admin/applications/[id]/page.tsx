import Link from "next/link";

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink px-6 md:px-12 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="font-display text-[22px] font-black text-terra tracking-[-0.02em] no-underline">
          First<em className="text-white not-italic font-display italic">hand</em>
        </Link>
        <span className="px-4 py-[7px] rounded-md text-xs font-semibold bg-terra text-white">Admin</span>
      </nav>
      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-10">
        <Link href="/admin/applications" className="text-sm text-terra no-underline hover:underline mb-6 inline-block">
          &larr; Back to Applications
        </Link>
        <h1 className="font-display text-2xl font-black mb-4">Application {params.id}</h1>
        <p className="text-sm text-gray">
          Individual application detail view. This page will display the full application with AI screening results
          when connected to the database.
        </p>
        {/* TODO: Fetch application by ID from database and display full review interface */}
      </div>
    </div>
  );
}
