import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function Dashboard() {
  

  return (
    
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <h1>Dashboard</h1>

        <button
          onClick={() => window.history.back()}
          className="btn btn-secondary"
        >
          Voltar
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {/* Cards */}
        <div style={cardStyle}>
          <section>
            <h3>Mensagens totais</h3>
            <p style={valueStyle}>{messages.length}</p>
          </section>

          <section>
            <h3>Tempo de resposta da API</h3>
            <p style={valueStyle}>{apiResponseTime} s</p>
          </section>

          <section>
            <h3>Erros totais</h3>
            <p style={valueStyle}>{errorCount}</p>
          </section>
        </div>

        {/* Gráfico */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
          <BarChart
            width={500}
            height={300}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
  minWidth: "200px",
  background: "#fff",
  padding: "15px"
};

const valueStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  margin: 0
};

export default Dashboard;