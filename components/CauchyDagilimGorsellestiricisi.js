import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Cauchy dağılımının Probability Density Function (PDF) hesaplama fonksiyonu
const cauchyPDF = (x, konum, olcek) => {
    return 1 / (Math.PI * olcek * (1 + Math.pow((x - konum) / olcek, 2)));
};

// Cauchy dağılımının Cumulative Distribution Function (CDF) hesaplama fonksiyonu
const cauchyCDF = (x, konum, olcek) => {
    return 0.5 + (1 / Math.PI) * Math.atan((x - konum) / olcek);
};

// Cauchy dağılımından rastgele örnekleme fonksiyonu
const cauchyOrnek = (konum, olcek) => {
    const rastgeleUniform = Math.random();
    return konum + olcek * Math.tan(Math.PI * (rastgeleUniform - 0.5));
};

// Örneklem ortalamalarını hesaplama fonksiyonu
const orneklemOrtalamalariOlustur = (orneklemBuyuklugu, tekrarSayisi, konum, olcek) => {
    const ortalamalar = [];
    for (let i = 0; i < tekrarSayisi; i++) {
        const orneklem = Array.from({ length: orneklemBuyuklugu }, () =>
            cauchyOrnek(konum, olcek)
        );
        const ortalama = orneklem.reduce((toplam, deger) => toplam + deger, 0) / orneklemBuyuklugu;
        ortalamalar.push(ortalama);
    }
    return ortalamalar;
};

const Home = () => {
    const [orneklemBuyuklugu, setOrneklemBuyuklugu] = useState(10);
    const [tekrarSayisi, setTekrarSayisi] = useState(100);
    const [ortalamalar, setOrtalamalar] = useState([]);
    const [pdfData, setPdfData] = useState([]);
    const [cdfData, setCdfData] = useState([]);

    const veriUret = () => {
        const yeniOrtalamalar = orneklemOrtalamalariOlustur(orneklemBuyuklugu, tekrarSayisi, 0, 1);
        setOrtalamalar(yeniOrtalamalar);
    };

    const pdfCdfHesapla = () => {
        const xValues = Array.from({ length: 100 }, (_, i) => -10 + i * 0.2);
        const pdfResults = xValues.map((x) => ({ x, y: cauchyPDF(x, 0, 1) }));
        const cdfResults = xValues.map((x) => ({ x, y: cauchyCDF(x, 0, 1) }));
        setPdfData(pdfResults);
        setCdfData(cdfResults);
    };

    return (
        <div>
            <h1>Cauchy Dağılımı Görselleştirme ve Merkezi Limit Teoremi</h1>
            <div>
                <button onClick={pdfCdfHesapla}>PDF ve CDF Hesapla</button>
                <h2>Probability Density Function (PDF)</h2>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer>
                        <LineChart data={pdfData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <h2>Cumulative Distribution Function (CDF)</h2>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer>
                        <LineChart data={cdfData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="y" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h2>Merkezi Limit Teoremi Gösterimi</h2>
                <div>
                    <label>Örneklem Büyüklüğü:</label>
                    <input
                        type="number"
                        value={orneklemBuyuklugu}
                        onChange={(e) => setOrneklemBuyuklugu(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Tekrar Sayısı:</label>
                    <input
                        type="number"
                        value={tekrarSayisi}
                        onChange={(e) => setTekrarSayisi(Number(e.target.value))}
                    />
                </div>
                <button onClick={veriUret}>Veri Üret</button>
                <div style={{ height: '400px', width: '100%' }}>
                    <ResponsiveContainer>
                        <LineChart
                            data={ortalamalar.map((ortalama, index) => ({ x: index, ortalama }))}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ortalama" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Home;
