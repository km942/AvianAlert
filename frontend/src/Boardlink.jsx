import React, { useEffect, useState } from 'react';

const JobBoardsFlow = ({ width = '100%', height = '550px' }) => {
  // State for tracking job rows and animated dots
  const [rows, setRows] = useState([]);
  const [dots, setDots] = useState({});
  const [gmailDots, setGmailDots] = useState({});
  const maxRows = 6; // Maximum rows to show at once
  
  // Job boards with their colors and icons (using simplified SVG icons)
  const jobBoards = [
    { 
      id: 1, 
      name: 'Indeed', 
      color: '#2164f3', 
      icon: (
        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
        </svg>
      )
    },
    { 
      id: 2, 
      name: 'LinkedIn', 
      color: '#0077b5', 
      icon: (
        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
          <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
        </svg>
      )
    },
    { 
      id: 3, 
      name: 'Glassdoor', 
      color: '#0caa41', 
      icon: (
        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
          <path d="M12,3L2,12H5V20H19V12H22L12,3M12,8.5C14.34,8.5 16.46,9.43 18,10.94L16.8,12.12C15.58,10.91 13.88,10.17 12,10.17C10.12,10.17 8.42,10.91 7.2,12.12L6,10.94C7.54,9.43 9.66,8.5 12,8.5Z" />
        </svg>
      )
    },
    { 
      id: 4, 
      name: 'Workday', 
      color: '#e16d6d', 
      icon: (
        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
          <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z" />
        </svg>
      )
    },
    { 
      id: 5, 
      name: 'Handshake', 
      color: '#cf5630', 
      icon: (
        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
          <path d="M21.3,10.08A3,3 0 0,0 19,9H14.44L14.72,7.73A3,3 0 0,0 12,4.44C11.74,4.44 11.5,4.59 11.35,4.8L6.17,11H3A2,2 0 0,0 1,13V16C1,17.11 1.9,18 3,18H6.17L11.35,24.2C11.5,24.41 11.74,24.56 12,24.56A3,3 0 0,0 14.72,21.27L14.44,20H19A3,3 0 0,0 21.3,18.92L22.84,12.68C22.95,12.25 22.92,11.78 22.76,11.38C22.6,10.97 22.31,10.64 21.94,10.42L21.3,10.08Z" />
        </svg>
      )
    }
  ];

  // Generate a random job application row
  const generateRow = () => {
    const companies = ['Amazon', 'Google', 'Apple', 'Netflix', 'Meta', 'Shopify', 'Microsoft', 'Adobe', 'Salesforce', 'IBM'];
    const roles = ['Frontend Engineer', 'UI/UX Designer', 'Full Stack Developer', 
                   'React Native Developer', 'DevOps Engineer', 'Product Manager', 'Data Scientist'];
    const statuses = ['Applied', 'Screening', 'Interview', 'Final Round', 'Offer', 'Rejected'];
    
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Get today's date and subtract a random number of days (0-14)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // Random source (one of the job boards)
    const sourceIndex = Math.floor(Math.random() * jobBoards.length);
    const source = jobBoards[sourceIndex];
    
    return {
      id: Date.now() + Math.random(),
      company: randomCompany,
      role: randomRole,
      status: randomStatus,
      date: formattedDate,
      source: source.id,
      sourceColor: source.color,
      sourceName: source.name,
      entering: true
    };
  };

  // Animate a dot from source to Gmail to the center
  const animateDot = (sourceId) => {
    // First animate from source to Gmail
    setDots(prev => ({
      ...prev,
      [sourceId]: true
    }));

    // After a delay, animate from Gmail to Joblink
    setTimeout(() => {
      setDots(prev => ({
        ...prev,
        [sourceId]: false
      }));
      
      setGmailDots(prev => ({
        ...prev,
        [sourceId]: true
      }));
      
      // Remove the Gmail dot after animation completes
      setTimeout(() => {
        setGmailDots(prev => ({
          ...prev,
          [sourceId]: false
        }));
      }, 600);
    }, 600);
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
    }, 2000); // Add a new row every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-4 border border-gray-200 overflow-hidden"
      style={{ width, height }}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016a11.955 11.955 0 01-8.618 3.004c-5.256 0-9.649-3.36-11.318-8.016l-1.682 7.816 4.392-3.796" />
          </svg>
          Job Application Flow
        </h3>
        
        <div className="relative flex-grow flex flex-col">
          {/* Job Boards Sources - Top row */}
          <div className="flex justify-around mb-4">
            {jobBoards.map((board) => (
              <div key={board.id} className="flex flex-col items-center relative">
                <div 
                  className="flex items-center rounded-full px-2 py-1 text-white font-medium text-xs shadow-md transform transition-transform hover:scale-105"
                  style={{ backgroundColor: board.color }}
                >
                  {board.icon}
                  <span className="hidden sm:inline">{board.name}</span>
                </div>
                <div className="h-8 w-0.5 mt-1" style={{ backgroundColor: board.color, position: 'relative' }}>
                  {dots[board.id] && (
                    <div 
                      className="absolute w-2 h-2 rounded-full left-1/2 transform -translate-x-1/2 dot-animation"
                      style={{ backgroundColor: board.color }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gmail - Middle */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg shadow-md p-2 flex items-center border border-gray-200 mb-1">
                <svg className="w-5 h-5 text-red-500 mr-1" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20,18H18V9.25L12,13L6,9.25V18H4V6H5.2L12,10.25L18.8,6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
                <span className="font-medium text-gray-800 text-sm">Gmail</span>
              </div>
              <div className="h-8 w-0.5 bg-blue-600 relative">
                {Object.entries(gmailDots).map(([id, visible]) => 
                  visible && (
                    <div 
                      key={id}
                      className="absolute w-2 h-2 rounded-full left-1/2 transform -translate-x-1/2 dot-animation"
                      style={{ backgroundColor: jobBoards.find(b => b.id === Number(id))?.color || '#3b82f6' }}
                    ></div>
                  )
                )}
              </div>
            </div>
          </div>
          
          {/* Joblink Dashboard - Bottom */}
          <div className="flex-grow bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            {/* Dashboard header */}
            <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-md w-6 h-6 flex items-center justify-center mr-2 text-white font-bold text-xs">JL</div>
                <span className="font-bold text-sm">Joblink Dashboard</span>
              </div>
              <div className="flex space-x-2">
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-md">Live Data</span>
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M16.5,11.5L14,14H17V16H13.17L10.67,18.5L9.24,17.07L11.74,14.57L9.24,12.07L10.67,10.64L13.17,13.14L16.15,10.16L17.57,11.58Z" />
                </svg>
              </div>
            </div>
            
            {/* Table header */}
            <div className="bg-gray-50 px-3 py-1 border-b text-xs font-medium text-gray-500 grid grid-cols-12 gap-1">
              <div className="col-span-1">Source</div>
              <div className="col-span-3">Company</div>
              <div className="col-span-4">Role</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Status</div>
            </div>
            
            {/* Data rows container with fixed height */}
            <div className="overflow-y-auto" >
              {rows.map((row, index) => {   
                // Determine status color classes
                let statusClass = "bg-blue-100 text-blue-800";
                if (row.status === 'Applied') statusClass = "bg-gray-100 text-gray-800";
                if (row.status === 'Screening') statusClass = "bg-yellow-100 text-yellow-800";
                if (row.status === 'Interview') statusClass = "bg-green-100 text-green-800";
                if (row.status === 'Final Round') statusClass = "bg-purple-100 text-purple-800";
                if (row.status === 'Offer') statusClass = "bg-indigo-100 text-indigo-800";
                if (row.status === 'Rejected') statusClass = "bg-red-100 text-red-800";
                
                return (
                  <div 
                    key={row.id}
                    className={`grid grid-cols-12 gap-1 px-3 py-2 text-xs border-b hover:bg-blue-50 transition-all duration-500 ${row.entering ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                  >
                    <div className="col-span-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: row.sourceColor }}>
                        <span className="text-xs text-white font-bold">{row.sourceName.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="col-span-3 font-medium truncate">{row.company}</div>
                    <div className="col-span-4 truncate">{row.role}</div>
                    <div className="col-span-2 text-gray-500">{row.date}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>{row.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for dot animations */}
      <style jsx>{`
        .dot-animation {
          animation: moveDown 0.6s linear;
        }
        
        @keyframes moveDown {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default JobBoardsFlow;