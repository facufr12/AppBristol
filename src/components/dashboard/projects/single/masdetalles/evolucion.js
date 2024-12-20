// Importa las librerías necesarias
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

// Importa componentes personalizados
import ApexCharts from 'components/elements/charts/ApexCharts';

// Opciones del gráfico
const OverallProgressChartOptions = {
    chart: {
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '14px', // Tamaño del label
                    color: '#888',
                    offsetY: 5,
                },
                value: {
                    fontSize: '40px', // Tamaño del dato (aumentado)
                    color: '#0C662C', // Color del dato
                    fontWeight: 'bold', // Hace el texto más grueso
                    offsetY: 0,
                },
            },
            track: {
                background: '#e0e0e0', // Color de fondo de la barra
                strokeWidth: '100%', // Ancho de la barra de fondo
            },
        },
    },
    fill: {
        colors: ['#0C662C'], // Color de la barra radial
    },
    labels: [''], // Esto se puede usar para los labels en el gráfico
};

const OverallProgressChart = () => {
    const location = useLocation();
    const { prospecto } = location.state || {}; // Obtener prospecto del estado

    // Verificar si prospecto y evolucion están definidos
    console.log('Prospecto:', prospecto);

    const series = [prospecto?.evolucion ?? 0]; // Valor por defecto 0 si no existe

    return (
        <Card className="mb-4">
            <Card.Body>
                <h4 className="mb-3">Evolución</h4>
                <ApexCharts
                    options={OverallProgressChartOptions}
                    series={series}
                    type="radialBar"
                    height={350}
                />
            </Card.Body>
        </Card>
    );
};

export default OverallProgressChart;
