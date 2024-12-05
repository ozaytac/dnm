import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cauchyPDF = (x, konumParametresi, olcekParametresi) => {
  return 1 / (Math.PI * olcekParametresi * (1 + Math.pow((x - konumParametresi) / olcekParametresi, 2)));
};

const cauchyCDF = (x, konumParametresi, olcekParametresi) => {
  return 0.5 + (1 / Math.PI) * Math.atan((x - konumParametresi) / olcekParametresi);
};

const CauchyDagilimGorsellestiricisi = () => {
  const [konumParametresi, setKonumParametresi] = useState(0);
  const [olcekParametresi, setOlcekParametresi] = useState(1);
  const [pdfVerileri, setPDFVerileri] = useState([]);
  const [cdfVerileri, setCDFVerileri] = useState([]);

  useEffect(() => {
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

    veriOlustur();
  }, [konumParametresi, olcekParametresi]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
        <h2 className="text-xl font-bold text-blue-800 text-center">
          Sınıf Adı: İST631 - Kuramsal İstatistik Dersi Uygulama Ödevi
        </h2>
        <h3 className="text-lg text-blue-700 text-center mt-2">
          Ara Sınav Ödevi: Cauchy Dağılımı Görselleştiricisi
        </h3>
        <div className="text-center mt-2 text-blue-600">
          <p>Öğretim Üyesi: Doç. Dr. Ayten Yiğiter</p>
          <p>Öğrenci: N23235557 - Mustafa Özaytaç</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">Konum Parametresi (x0)</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={konumParametresi}
              onChange={(e) => setKonumParametresi(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">Değer: {konumParametresi.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">Ölçek Parametresi</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={olcekParametresi}
              onChange={(e) => setOlcekParametresi(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">Değer: {olcekParametresi.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">Olasılık Yoğunluk Fonksiyonu (PDF)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pdfVerileri}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pdf" stroke="#8884d8" dot={false} name="Olasılık Yoğunluğu" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">Kümülatif Dağılım Fonksiyonu (CDF)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cdfVerileri}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cdf" stroke="#82ca9d" dot={false} name="Kümülatif Olasılık" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Cauchy Dağılımı Hakkında</h3>
        <div className="space-y-4">
          <p>Cauchy dağılımı, ağır kuyruklu bir olasılık dağılımıdır. İki parametre ile tanımlanır:
          konum parametresi (x0) ve ölçek parametresi. Bu dağılım, genellikle fizik ve 
          mühendislik alanlarında rezonans olaylarını modellemek için kullanılır.</p>
          
          <h4 className="text-lg font-semibold">Önemli Özellikler:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Simetrik bir dağılımdır</li>
            <li>Ortalama ve varyans tanımsızdır</li>
            <li>Ağır kuyruklu bir olasılık dağılımıdır</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CauchyDagilimGorsellestiricisi;
