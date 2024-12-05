import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

// Existing Cauchy functions
const cauchyPDF = (x, konumParametresi, olcekParametresi) => {
  return 1 / (Math.PI * olcekParametresi * (1 + Math.pow((x - konumParametresi) / olcekParametresi, 2)));
};

const cauchyCDF = (x, konumParametresi, olcekParametresi) => {
  return 0.5 + (1 / Math.PI) * Math.atan((x - konumParametresi) / olcekParametresi);
};

// Cauchy random number generator using inverse transform sampling
const generateCauchyRandom = (konum, olcek) => {
  const u = Math.random();
  return konum + olcek * Math.tan(Math.PI * (u - 0.5));
};

// Generate sample means
const generateSampleMeans = (sampleSize, numSamples, konum, olcek) => {
  const means = [];
  for (let i = 0; i < numSamples; i++) {
    let sum = 0;
    for (let j = 0; j < sampleSize; j++) {
      sum += generateCauchyRandom(konum, olcek);
    }
    const mean = sum / sampleSize;
    means.push({
      x: mean,
      y: i / numSamples // for vertical spread in scatter plot
    });
  }
  return means;
};

const CauchyDagilimGorsellestiricisi = () => {
  const [konumParametresi, setKonumParametresi] = useState(0);
  const [olcekParametresi, setOlcekParametresi] = useState(1);
  const [pdfVerileri, setPDFVerileri] = useState([]);
  const [cdfVerileri, setCDFVerileri] = useState([]);
  const [orneklemVerileri, setOrneklemVerileri] = useState([]);
  const [orneklemBoyutu, setOrneklemBoyutu] = useState(30);

  useEffect(() => {
    // Existing data generation
    const veriOlustur = () => {
      const veriler = [];
      for (let x = -20; x <= 20; x += 0.2) {
        veriler.push({
          x: Number(x.toFixed(2)),
          pdf: cauchyPDF(x, konumParametresi, olcekParametresi),
          cdf: cauchyCDF(x, konumParametresi, olcekParametresi)
        });
      }
      setPDFVerileri(veriler);
      setCDFVerileri(veriler);
    };

    // Generate sample means
    const orneklemOlustur = () => {
      const orneklemler = generateSampleMeans(orneklemBoyutu, 1000, konumParametresi, olcekParametresi);
      setOrneklemVerileri(orneklemler);
    };

    veriOlustur();
    orneklemOlustur();
  }, [konumParametresi, olcekParametresi, orneklemBoyutu]);

  // ... [previous header and parameter controls stay the same] ...

  return (
    <div className="container mx-auto p-4">
      {/* ... [previous header section remains the same] ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* ... [previous parameter controls remain the same] ... */}
        
        {/* Add sample size control */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:col-span-2">
          <h3 className="text-lg font-bold mb-4">Örneklem Boyutu (n)</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={orneklemBoyutu}
              onChange={(e) => setOrneklemBoyutu(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">Değer: {orneklemBoyutu}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* ... [previous PDF and CDF plots remain the same] ... */}
      </div>

      {/* Sample Means Plot */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <h3 className="text-lg font-bold mb-4">Örneklem Ortalamaları Dağılımı</h3>
        <p className="text-sm mb-4">
          Her nokta {orneklemBoyutu} büyüklüğünde bir örneklemin ortalamasını gösterir. 
          Merkezi Limit Teoremi'nin aksine, örneklem boyutu artsa bile ortalamalar normal dağılıma yakınsamaz.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Örneklem Ortalaması"
              domain={['auto', 'auto']}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Frekans"
              domain={[0, 1]}
              hide
            />
            <Tooltip 
              cursor={{strokeDasharray: '3 3'}}
              content={({payload}) => {
                if (payload && payload.length > 0) {
                  return (
                    <div className="bg-white p-2 border">
                      <p>Ortalama: {payload[0].payload.x.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              data={orneklemVerileri} 
              fill="#8884d8"
              shape="circle"
              name="Örneklem Ortalaması"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Updated Information Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Cauchy Dağılımı ve Merkezi Limit Teoremi</h3>
        <div className="space-y-4">
          <p>
            Cauchy dağılımı, Merkezi Limit Teoremi'nin çalışmadığı nadir örneklerden biridir. 
            Örneklem boyutu ne kadar büyük olursa olsun, örneklem ortalamalarının dağılımı 
            normal dağılıma yakınsamaz ve orijinal Cauchy dağılımıyla aynı dağılıma sahip olur.
          </p>
          
          <h4 className="text-lg font-semibold">Önemli Gözlemler:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Örneklem ortalamaları da Cauchy dağılımına sahiptir</li>
            <li>Örneklem boyutu artırıldığında bile dağılım şekli değişmez</li>
            <li>Bu özellik, Cauchy dağılımının momentlerinin tanımsız olmasından kaynaklanır</li>
            <li>Her örneklemde çok büyük veya çok küçük değerler görülme olasılığı yüksektir</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CauchyDagilimGorsellestiricisi;
