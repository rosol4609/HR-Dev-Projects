import AddMessageForm from "./AddMessageForm";

export default function FormPage() {
  return (
    <main className="flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <AddMessageForm />
      </div>
    </main>
  );
}