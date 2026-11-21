import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дизайн-система",
  robots: { index: false, follow: false },
};

// The product UI is Ukrainian; the rest of the template is still English.
export default function DesignSystemLayout({ children }: LayoutProps<"/design-system">) {
  return (
    <div lang="uk" className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
