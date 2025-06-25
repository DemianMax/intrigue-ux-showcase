import ScrollDepthLayout from "@/components/ScrollDepthLayout";

const Index = () => {
  // Dados de teste super simples
  const sections = [
    <div key="hero" style={{ height: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 40 }}>Teste Hero</h1>
    </div>,
    <div key="about" style={{ height: "100vh", background: "#dde", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 40 }}>Teste About</h1>
    </div>
  ];

  return (
    <div>
      <ScrollDepthLayout>{sections}</ScrollDepthLayout>
    </div>
  );
};

export default Index;
