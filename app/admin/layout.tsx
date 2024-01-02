export default function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
