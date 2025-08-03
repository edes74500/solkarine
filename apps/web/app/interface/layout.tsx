import ContentWidthWrapper from "@/components/ContentWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentWidthWrapper>
      <div>{children}</div>
    </ContentWidthWrapper>
  );
}
