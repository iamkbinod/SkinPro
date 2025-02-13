import { useState } from 'react';
import { auth } from '../firebase/auth';
import { signOut } from 'firebase/auth';

const recommendations = {
  blemish: ['Salicylic Acid Cleanser', 'Niacinamide Serum', 'Clay Mask'],
  redness: ['Aloe Vera Gel', 'Centella Asiatica Serum', 'Green Tea Toner'],
  darkSpots: ['Vitamin C Serum', 'Retinol Cream', 'AHA/BHA Exfoliator']
};

export default function Dashboard() {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);  // Control visibility of analysis

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        // Simulate API call delay
        setTimeout(() => {
          setAnalysis({
            skinTone: Math.floor(Math.random() * 255),
            blemishCount: Math.floor(Math.random() * 1000),
            redness: Math.floor(Math.random() * 255),
            darkSpots: Math.floor(Math.random() * 5000)
          });
          setLoading(false);
          setIsAnalysisVisible(true);  // Show analysis when data is ready
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCloseAnalysis = () => {
    setIsAnalysisVisible(false);  // Hide analysis section
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-blend-overlay relative" 
      style={{ 
        backgroundImage: 'url(/src/assets/images/logo.jpg)', 
        backgroundPosition: 'center 26%' // Shift the background image 10% towards the top
      }}
    >
      <nav className="bg-white shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Styled SkinPro logo with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide
  text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text drop-shadow-xl brightness-110">
  SkinPro
</h1>


          <button
            onClick={handleLogout}
            className="py-2 px-4 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Added "Glow with Confidence" Text with new line for Confidence */}
      <h2 className="absolute left-1/2 transform -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide 
  text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text drop-shadow-xl brightness-110 z-0"
  style={{
    position: 'absolute',
    left: '10%',
    top: '50%',
    transform: 'translateY(-50%)'
  }}>
  "Glow with<br />
  <span className="block pl-8"> Confidence"</span>
</h2>

      <div className="max-w-7xl mx-auto px-4 py-8 z-10 relative">
        {/* Image Upload Section */}
        {!isAnalysisVisible ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <label className="block">
              <span className="sr-only">Upload skin image</span>
              <input
                type="file"
                onChange={handleUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="image/*"
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-x-8 bg-white rounded-lg shadow p-6 mb-8">
            {/* Image Section */}
            <div className="relative w-full md:w-1/3">
              <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
              <img src={image} alt="Skin analysis" className="rounded-lg max-w-full h-auto" />
            </div>

            {/* Analysis Results Section with Close Button */}
            <div className="w-full md:w-2/3 relative">
              <button
                onClick={handleCloseAnalysis}
                className="absolute top-[-16px] right-[-4px] text-4xl text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between border-b pb-2">
                  <span>Skin Tone Value:</span>
                  <span className="font-medium">{analysis.skinTone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Blemish Count:</span>
                  <span className="font-medium">{analysis.blemishCount}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Redness Level:</span>
                  <span className="font-medium">{analysis.redness}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Dark Spots:</span>
                  <span className="font-medium">{analysis.darkSpots}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(recommendations).map(([category, products]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 capitalize">{category} Care</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {products.map((product, i) => (
                        <li key={i} className="text-sm text-gray-700">{product}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-800 font-bold">Analyzing your skin...</p>
          </div>
        )}
      </div>
    </div>
  );
}
