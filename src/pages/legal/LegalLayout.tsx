import { Header } from "../../components/headerPage/Header.tsx";

export default function LegalLayout({
  title,
  parent,
  children,
}: {
  title: string;
  parent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header title={title} showButton={parent} />
      <main className="px-8 py-10 pb-20 max-w-2xl mx-auto">
        <div className="prose prose-sm">{children}</div>
      </main>
    </div>
  );
}

export const LegalSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <section className="mb-8">
    <h2 className="text-[11px] font-black text-black uppercase tracking-[0.2em] mb-3">
      {title}
    </h2>
    <p className="text-[13px] leading-relaxed text-gray-600 font-medium text-justify">
      {content}
    </p>
  </section>
);
