import MessageTable from "./MessageTable";

export default function TablePage() {
  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <MessageTable />
      </div>
    </main>
  );
}