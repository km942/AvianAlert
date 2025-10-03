import React, { useEffect, useState } from 'react';

const DataFlowSimulation = () => {
  const [rows, setRows] = useState([]);
  const [dots, setDots] = useState({});
  const maxRows = 8; // Maximum rows to show at once
  
  // Generate a random job application row
  const generateRow = () => {
    const companies = ['Salesforce', 'Adobe Cloud', 'Microsoft', 'Paypal', 'Grammarly', 'Evernote'];
    const roles = ['Senior Frontend Developer', 'UX Engineer', 'Full Stack Developer', 
                   'React Developer', 'Frontend Engineer', 'UI Developer', 'Software Engineer II'];
    const statuses = ['Interview', 'Waiting', 'QA', 'Rejected', 'Offer'];
    
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Get today's date and subtract a random number of days (0-10)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 10));
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    return {
      id: Date.now() + Math.random(),
      company: randomCompany,
      role: randomRole,
      status: randomStatus,
      date: formattedDate,
      source: Math.floor(Math.random() * 6) + 1, // Random source 1-6
      entering: true
    };
  };

  // Animate a dot from source to the center
  const animateDot = (sourceId) => {
    setDots(prev => ({
      ...prev,
      [sourceId]: true
    }));

    // Remove the dot after animation completes
    setTimeout(() => {
      setDots(prev => ({
        ...prev,
        [sourceId]: false
      }));
    }, 1000); // Match this with the CSS animation duration
  };

  // Add new rows periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newRow = generateRow();
      
      // Animate a dot from the chosen source
      animateDot(newRow.source);
      
      setRows(prevRows => {
        // Mark the entering status as false for all rows
        const updatedRows = prevRows.map(row => ({ ...row, entering: false }));
        
        // Keep only the most recent rows up to maxRows
        return [...updatedRows, newRow].slice(-maxRows);
      });
    }, 1500); // Add a new row every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 max-w-5xl mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Application Activity</h3>
      
      <div className="relative w-full aspect-video mb-4">
        {/* Source 1 (Top Left) */}
        <div className="absolute top-0 left-1/4 flex flex-col items-center">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Source 1</div>
          <div className="h-16 w-0.5 bg-blue-500 relative">
            {dots[1] && (
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-1/2 transform -translate-x-1/2 dot-animation"></div>
            )}
          </div>
        </div>
        
        {/* Source 2 (Top Right) */}
        <div className="absolute top-0 right-1/4 flex flex-col items-center">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">Source 2</div>
          <div className="h-16 w-0.5 bg-green-500 relative">
            {dots[2] && (
              <div className="absolute w-3 h-3 bg-green-500 rounded-full left-1/2 transform -translate-x-1/2 dot-animation"></div>
            )}
          </div>
        </div>
        
        {/* Source 3 (Left) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">Source 3</div>
          <div className="w-16 h-0.5 bg-red-500 relative">
            {dots[3] && (
              <div className="absolute w-3 h-3 bg-red-500 rounded-full top-1/2 transform -translate-y-1/2 dot-animation-horizontal"></div>
            )}
          </div>
        </div>
        
        {/* Source 4 (Right) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center flex-row-reverse">
          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Source 4</div>
          <div className="w-16 h-0.5 bg-purple-500 relative">
            {dots[4] && (
              <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-1/2 transform -translate-y-1/2 dot-animation-horizontal-reverse"></div>
            )}
          </div>
        </div>
        
        {/* Source 5 (Bottom Left) */}
        <div className="absolute bottom-0 left-1/4 flex flex-col-reverse items-center">
          <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded">Source 5</div>
          <div className="h-16 w-0.5 bg-amber-500 relative">
            {dots[5] && (
              <div className="absolute w-3 h-3 bg-amber-500 rounded-full left-1/2 transform -translate-x-1/2 dot-animation-reverse"></div>
            )}
          </div>
        </div>
        
        {/* Source 6 (Bottom Right) */}
        <div className="absolute bottom-0 right-1/4 flex flex-col-reverse items-center">
          <div className="bg-teal-500 text-white text-xs px-2 py-1 rounded">Source 6</div>
          <div className="h-16 w-0.5 bg-teal-500 relative">
            {dots[6] && (
              <div className="absolute w-3 h-3 bg-teal-500 rounded-full left-1/2 transform -translate-x-1/2 dot-animation-reverse"></div>
            )}
          </div>
        </div>
        
        {/* Central white box for data */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="bg-gray-50 text-xs font-medium text-gray-500 p-2 border-b">
              <div className="grid grid-cols-4 gap-2">
                <div>Company</div>
                <div>Role</div>
                <div>Date</div>
                <div>Status</div>
              </div>
            </div>
            
            {/* Simulated data rows */}
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 p-1">
                {rows.map((row, index) => {
                  // Determine status color classes
                  let statusClass = "bg-gray-100 text-gray-800";
                  if (row.status === 'Interview') statusClass = "bg-green-100 text-green-800";
                  if (row.status === 'Waiting') statusClass = "bg-gray-100 text-gray-800";
                  if (row.status === 'QA') statusClass = "bg-yellow-100 text-yellow-800";
                  if (row.status === 'Rejected') statusClass = "bg-red-100 text-red-800";
                  if (row.status === 'Offer') statusClass = "bg-blue-100 text-blue-800";
                  
                  // Determine source color for left border
                  let sourceColor = "border-l-gray-300";
                  if (row.source === 1) sourceColor = "border-l-blue-500";
                  if (row.source === 2) sourceColor = "border-l-green-500";
                  if (row.source === 3) sourceColor = "border-l-red-500";
                  if (row.source === 4) sourceColor = "border-l-purple-500";
                  if (row.source === 5) sourceColor = "border-l-amber-500";
                  if (row.source === 6) sourceColor = "border-l-teal-500";
                  
                  return (
                    <div 
                      key={row.id}
                      className={`grid grid-cols-4 gap-2 p-2 text-xs border-b border-l-2 ${sourceColor} mb-1 transition-all duration-500 ${row.entering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                    >
                      <div className="font-medium truncate">{row.company}</div>
                      <div className="truncate">{row.role}</div>
                      <div className="text-gray-500">{row.date}</div>
                      <div>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusClass}`}>{row.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for dot animations */}
      <style jsx>{`
        .dot-animation {
          animation: moveDown 1s linear;
        }
        
        .dot-animation-reverse {
          animation: moveUp 1s linear;
        }
        
        .dot-animation-horizontal {
          animation: moveRight 1s linear;
        }
        
        .dot-animation-horizontal-reverse {
          animation: moveLeft 1s linear;
        }
        
        @keyframes moveDown {
          0% { top: 0; }
          100% { top: 100%; }
        }
        
        @keyframes moveUp {
          0% { bottom: 0; }
          100% { bottom: 100%; }
        }
        
        @keyframes moveRight {
          0% { left: 0; }
          100% { left: 100%; }
        }
        
        @keyframes moveLeft {
          0% { right: 0; }
          100% { right: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DataFlowSimulation;