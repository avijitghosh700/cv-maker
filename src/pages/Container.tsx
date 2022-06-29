export const Container = ({ children }: Record<string, JSX.Element>) => {
  return (
    <main className="main py-4">
      <div className="container custom-width h-100">
        {children}
      </div>
    </main>
  );
};
