import CreateUrlModal from "@/components/dashboard/create-url-modal";
import UrlList from "@/components/dashboard/url-list";

export default async function DashboardPage() {
  return (
    <div className="w-full">
      <div className="px-4 sm:px-8 lg:px-20 mt-8 flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl md:text-2xl font-semibold">My shortened URLs</h2>

        <CreateUrlModal />
      </div>

      <div className="divider mx-20"></div>

      <UrlList />
    </div>
  );
}
