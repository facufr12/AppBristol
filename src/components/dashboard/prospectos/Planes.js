import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Planes = () => {
  const sheetNames = [
    'BM500Prestadores',
    'BM400Prestadores',
    'BM200Prestadores',
    'BM180Prestadores'
  ]; // Nombres de las hojas
  const [allData, setAllData] = useState({}); // Almacena los datos de cada hoja
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://script.google.com/macros/s/AKfycbzTqNjaxf8N55ZAhSuIPUgBVt-90wtJ3tT4-OhdEKtljfJfw0POZiBdd-UFeRFx0Uc4UQ/exec";
      const newData = {};

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Cargar los datos de cada hoja en allData
        sheetNames.forEach((sheetName) => {
          if (data[sheetName]) {
            newData[sheetName] = data[sheetName];
          } else {
            console.warn(`Hoja '${sheetName}' no encontrada en los datos.`);
          }
        });

        setAllData(newData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Object.keys(allData).length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div className="container mt-3">
      <Accordion defaultActiveKey="0">
        {Object.entries(allData).map(([sheetName, sheetData], sheetIndex) => (
          <Accordion.Item eventKey={String(sheetIndex)} key={sheetName}>
            <Accordion.Header>
              <h1>{sheetName}</h1>
            </Accordion.Header>
            <Accordion.Body>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{sheetName}</Card.Title>
                  <Accordion defaultActiveKey="0">
                    {sheetData.length > 0 && Object.keys(sheetData[0]).map((header, colIndex) => (
                      <Accordion.Item eventKey={String(colIndex)} key={header}>
                        <Accordion.Header>{header}</Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {sheetData.map((row, rowIndex) => (
                              <li key={rowIndex}>{row[header]}</li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Planes;
