type SiteLayoutProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function SiteLayout({
  children,
  header,
  footer,
}: SiteLayoutProps) {
  return (
    <>
      {header}
      <main className="w-full">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      {footer}
    </>
  );
}
