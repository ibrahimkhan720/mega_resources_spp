// "use client"

// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic'; 
// import { getpoints } from '@/Api/PointRuleapi';
// import { getbranch } from '@/Api/Branchesapi';
// import  { mileage } from "../../Api/MilageClaimapi"
 
// const FormsComponent = () => {
//     const [rows, setRows] = useState([
//         { id: 1, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
//         { id: 2, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
//         { id: 3, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
//         { id: 4, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
//         { id: 5, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
//     ]);

//     const [rate, setRate] = useState(0);
//     const [totalMiles, setTotalMiles] = useState(0);
//     const [branchList, setBranchList] = useState([]); 
//     const [selectedBranch, setSelectedBranch] = useState(""); 
//     const [loadingBranches, setLoadingBranches] = useState(true);
    
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [dateFrom, setDateFrom] = useState("");
//     const [dateTo, setDateTo] = useState("");
//     const [userId, setUserId] = useState(null);

//     const [profile, setProfile] = useState(null);

//     const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const payload = {
//             user_id: profile?.id,
//             firstName: firstName,
//             lastName: lastName,
//             // branch_id: selectedBranch,
//             branch: selectedBranch,
//             rate_per_mile: rate,
//             total_miles: totalMiles,
//             total_amount: (totalMiles * rate).toFixed(2),
//             dateFrom: dateFrom,
//             dateTo: dateTo,

//             items: rows.map(row => ({
//                 date: row.date,
//                 purpose: row.purpose,
//                 start_postcode: row.start,
//                 end_postcode: row.end,
//                 comments: row.comments,
//                 miles: parseFloat(row.miles) || 0
//             }))
//         };

//         console.log("Sending Data:", payload);

//         const res = await mileage(payload);

//         alert("Mileage submitted successfully ✅");

//     } catch (error) {
//         console.error(error);
//         alert("Error submitting mileage ❌");
//     }
// };

//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem('user_data'));
//         if (userData) {
//             setProfile(userData);
//             if (userData.branch.id) {
//                 setSelectedBranch(userData.branch.id);
//             }
//         }

//         const fetchInitialData = async () => {
//             try {
//                 const pointRes = await getpoints();
//                 const dataArray = pointRes?.info || pointRes?.data?.info;
//                 if (dataArray && Array.isArray(dataArray)) {
//                     const mileagePoint = dataArray.find(p => p.key === 'rate_per_mile');
//                     if (mileagePoint) {
//                         const val = parseFloat(mileagePoint.value);
//                         setRate(isNaN(val) ? 0 : val);
//                     }
//                 }

//                 const branchRes = await getbranch();
//                 const branches = branchRes?.info || branchRes?.data || [];
//                 setBranchList(branches);
//                 setLoadingBranches(false);
//             } catch (err) {
//                 console.error("Data Fetch Error:", err);
//                 setLoadingBranches(false);
//             }
//         };

//         fetchInitialData();
//     }, []);

//     const addRow = () => {
//         const nextId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
//         setRows([...rows, { id: nextId, date: '', purpose: '', start: '', end: '', comments: '', miles: '' }]);
//     };

//     const removeRow = (id) => {
//         if (rows.length > 1) {
//             const filtered = rows.filter(row => row.id !== id);
//             setRows(filtered);
//             const total = filtered.reduce((sum, row) => sum + (parseFloat(row.miles) || 0), 0);
//             setTotalMiles(total);
//         }
//     };

//     const handleInputChange = (index, field, value) => {
//         const updatedRows = [...rows];
//         updatedRows[index][field] = value;
//         setRows(updatedRows);
//         const total = updatedRows.reduce((sum, row) => sum + (parseFloat(row.miles) || 0), 0);
//         setTotalMiles(total);
//     };

//     return (
//         <div className="container-fluid py-4" style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'sans-serif' }}>
//             <div className="mb-3" style={{ paddingLeft: '8%' }}>
//                 <Link href="/" style={{ color: '#002b5c', textDecoration: 'none', fontSize: '14px' }}>
//                     ← Back to Dashboard
//                 </Link>
//             </div>

//             <div className="card shadow-sm mx-auto border-0" style={{ maxWidth: '1200px', borderRadius: '20px', padding: '40px', width: '90%' }}>
//                 <h2 className="fw-bold mb-3" style={{ color: '#004a99' }}>Mileage Tracking and Reimbursement Form</h2>
                
//                 <form  onSubmit={handleSubmit}>
//                     <div className="row mb-4">
//                         <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Full Name <span className="text-danger">*</span></label>
//                         <div className="col-md-6 mb-2">
//                             <input 
//                                 type="text" 
//                                 className="form-control" 
//                                 placeholder="First name" 
//                                 defaultValue={profile?.name || ""} 
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 style={{ borderRadius: '8px', padding: '12px' }} 
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <input 
//                                 type="text" 
//                                 className="form-control" 
//                                 placeholder="Surname" 
//                                 defaultValue={profile?.last_name || ""} 
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 style={{ borderRadius: '8px', padding: '12px' }} 
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-4 col-md-4">
//                         <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Rate Per Mile (£{rate}) <span className="text-danger">*</span></label>
//                         <input type="text" className="form-control bg-light" value={rate || ""} readOnly style={{ borderRadius: '8px', padding: '12px' }} />
//                     </div>

//                     <div className="mb-4">
//                         <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Branch: <span className="text-danger">*</span></label>
//                         {loadingBranches ? (
//                             <p className="text-muted small">Loading branches...</p>
//                         ) : (
//                             branchList.length > 0 ? (
//                                 branchList.map((branch) => (
//                                     <div className="form-check mb-2" key={branch.id || branch.name}>
//                                         <input 
//                                             className="form-check-input" 
//                                             type="radio" 
//                                             name="branch" 
//                                             id={`${branch.id}`} 
//                                             value={branch.name}
//                                             checked={selectedBranch === branch.id}
//                                             onChange={(e) => setSelectedBranch(e.target.value)}
//                                         />
//                                         <label className="form-check-label ms-2" htmlFor={`branch-${branch.id}`} style={{ color: '#004a99', cursor: 'pointer' }}>
//                                             {branch.name}
//                                         </label>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-danger small">No branches found.</p>
//                             )
//                         )}
//                     </div>

//                     <div className="row mb-5">
//                         <div className="col-md-6 mb-3">
//                             <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date From <span className="text-danger">*</span></label>
//                             <input type="date" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
//                         </div>
//                         <div className="col-md-6">
//                             <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date To <span className="text-danger">*</span></label>
//                             <input type="date" className="form-control" style={{ borderRadius: '8px', padding: '12px' }} />
//                         </div>
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-sm" style={{ border: '1px solid #e0e0e0', borderCollapse: 'collapse' }}>
//                             <thead style={{ backgroundColor: '#ffffff' }}>
//                                 <tr style={{ color: '#004a99', fontSize: '14px' }}>
//                                     <th className="p-2 border" style={{ width: '50px' }}></th>
//                                     <th className="p-2 border text-center">Date</th>
//                                     <th className="p-2 border text-center">Business Purpose</th>
//                                     <th className="p-2 border text-center">Start Post Code</th>
//                                     <th className="p-2 border text-center">End Post Code</th>
//                                     <th className="p-2 border text-center">Comments</th>
//                                     <th className="p-2 border text-center">Miles</th>
//                                     <th className="p-2 border text-center" style={{ width: '40px' }}></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {rows.map((row, index) => (
//                                     <tr key={row.id}>
//                                         <td className="p-2 border text-center" style={{ color: '#004a99', backgroundColor: '#fcfcfc' }}>{index + 1}</td>
//                                         <td className="p-0 border"><input type="text" className="table-input" onChange={(e) => handleInputChange(index, 'date', e.target.value)} /></td>
//                                         <td className="p-0 border"><input type="text" className="table-input" onChange={(e) => handleInputChange(index, 'purpose', e.target.value)} /></td>
//                                         <td className="p-0 border"><input type="text" className="table-input" onChange={(e) => handleInputChange(index, 'start', e.target.value)} /></td>
//                                         <td className="p-0 border"><input type="text" className="table-input" onChange={(e) => handleInputChange(index, 'end', e.target.value)} /></td>
//                                         <td className="p-0 border"><input type="text" className="table-input" onChange={(e) => handleInputChange(index, 'comments', e.target.value)} /></td>
//                                         <td className="p-0 border">
//                                             <input type="number" className="table-input" value={row.miles} onChange={(e) => handleInputChange(index, 'miles', e.target.value)} />
//                                         </td>
//                                         <td className="p-2 border text-center">
//                                             <button type="button" onClick={() => removeRow(row.id)} style={{ border: 'none', background: 'none', color: '#ff4d4d', cursor: 'pointer' }}>×</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="mt-2 mb-4">
//                         <button type="button" onClick={addRow} style={{ background: '#004a99', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 15px', fontSize: '13px' }}>
//                             + Add Row
//                         </button>
//                     </div>

//                     <div className="row">
//                         <div className="mt-3 col-md-4">
//                             <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Miles:</label>
//                             <input type="text" className="form-control bg-light" value={totalMiles} disabled style={{ borderRadius: '8px', padding: '12px' }} />
//                         </div>
//                         <div className="mt-3 col-md-4">
//                             <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Mileage in £ :</label>
//                             <input type="text" className="form-control bg-light" value={(totalMiles * rate).toFixed(2)} disabled style={{ borderRadius: '8px', padding: '12px' }} />
//                         </div>
//                     </div>

//                     <div className="mt-5 p-3" style={{ border: '1px dashed #004a99', borderRadius: '10px', backgroundColor: '#f9fbff' }}>
//                         <div className="form-check">
//                             <input className="form-check-input" type="checkbox" id="policyAgreement" required style={{ cursor: 'pointer' }} />
//                             <label className="form-check-label ms-2" htmlFor="policyAgreement" style={{ color: '#002b5c', fontSize: '14px', cursor: 'pointer' }}>
//                                 I confirm that the mileage claimed above was incurred for business purposes and is in accordance with the company's reimbursement policy. <span className="text-danger">*</span>
//                             </label>
//                         </div>
//                     </div>

//                     <div className="d-flex justify-content-center mt-5">
//                         <button type="submit" className="btn btn-success px-5 py-2" style={{ borderRadius: '8px', backgroundColor: '#00b341', border: 'none', fontWeight: 'bold' }}>Submit Claim</button>
//                     </div>
//                 </form>
//             </div>
            
//             <style jsx>{`
//                 .table-input { width: 100%; border: none; padding: 8px; outline: none; background: transparent; }
//                 .table-input:focus { background-color: #f8f9fa; }
//             `}</style>
//         </div>
//     );
// };

// const Forms = dynamic(() => Promise.resolve(FormsComponent), { ssr: false });
// export default Forms;
"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import { getpoints } from '@/Api/PointRuleapi';
import { getbranch } from '@/Api/Branchesapi';
import { mileage } from "../../Api/MilageClaimapi";

const FormsComponent = () => {
    const [rows, setRows] = useState([
        { id: 1, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 2, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 3, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 4, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 5, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
    ]);

    const [rate, setRate] = useState(0);
    const [totalMiles, setTotalMiles] = useState(0);
    const [branchList, setBranchList] = useState([]); 
    const [selectedBranch, setSelectedBranch] = useState(""); 
    const [loadingBranches, setLoadingBranches] = useState(true);
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [profile, setProfile] = useState(null);

    // Initial Data Load
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData) {
            setProfile(userData);
            setFirstName(userData.name || "");
            setLastName(userData.last_name || "");
            if (userData.branch?.id) {
                setSelectedBranch(userData.branch.id);
            }
        }

        const fetchInitialData = async () => {
            try {
                const pointRes = await getpoints();
                const dataArray = pointRes?.info || pointRes?.data?.info;
                if (dataArray && Array.isArray(dataArray)) {
                    const mileagePoint = dataArray.find(p => p.key === 'rate_per_mile');
                    if (mileagePoint) {
                        setRate(parseFloat(mileagePoint.value) || 0);
                    }
                }

                const branchRes = await getbranch();
                setBranchList(branchRes?.info || branchRes?.data || []);
                setLoadingBranches(false);
            } catch (err) {
                setLoadingBranches(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
        const total = updatedRows.reduce((sum, row) => sum + (parseFloat(row.miles) || 0), 0);
        setTotalMiles(total);
    };

    const addRow = () => {
        const nextId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
        setRows([...rows, { id: nextId, date: '', purpose: '', start: '', end: '', comments: '', miles: '' }]);
    };

    const removeRow = (id) => {
        if (rows.length > 1) {
            const filtered = rows.filter(row => row.id !== id);
            setRows(filtered);
            setTotalMiles(filtered.reduce((sum, row) => sum + (parseFloat(row.miles) || 0), 0));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                staff_id: profile?.id,
                first_name: firstName,
                last_name: lastName,
                branch: selectedBranch,
                rate_per_mile: rate,
                total_miles: totalMiles,
                total_amount: (totalMiles * rate).toFixed(2),
                date_from: dateFrom,
                date_to: dateTo,
                is_submit: 1,
                items: rows.filter(r => r.miles > 0 || r.date !== "").map(row => ({
                    date: row.date,
                    purpose: row.purpose,
                    start_postcode: row.start,
                    end_postcode: row.end,
                    comments: row.comments,
                    miles: parseFloat(row.miles) || 0
                }))
            };

            await mileage(payload);
            alert("Mileage submitted successfully ✅");
        } catch (error) {
            alert("Error submitting mileage ❌");
        }
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div className="mb-3" style={{ paddingLeft: '8%' }}>
                <Link href="/" style={{ color: '#002b5c', textDecoration: 'none', fontSize: '14px' }}>
                    ← Back to Dashboard
                </Link>
            </div>

            <div className="card shadow-sm mx-auto border-0" style={{ maxWidth: '1200px', borderRadius: '20px', padding: '40px', width: '90%' }}>
                <h2 className="fw-bold mb-3" style={{ color: '#004a99' }}>Mileage Tracking and Reimbursement Form</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Full Name <span className="text-danger">*</span></label>
                        <div className="col-md-6 mb-2">
                            <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ borderRadius: '8px', padding: '12px' }} required />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Surname" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ borderRadius: '8px', padding: '12px' }} required />
                        </div>
                    </div>

                    <div className="mb-4 col-md-4">
                        <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Rate Per Mile (£{rate}) <span className="text-danger">*</span></label>
                        <input type="text" className="form-control bg-light" value={rate} readOnly style={{ borderRadius: '8px', padding: '12px' }} />
                    </div>

                    <div className="mb-4">
                        <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Branch: <span className="text-danger">*</span></label>
                        <div className="flex-wrap gap-3">
                        {loadingBranches ? <p className="small">Loading...</p> : branchList.map((branch) => (
                            <div className="form-check" key={branch.id}>
                                <input className="form-check-input" type="radio" name="branch" value={branch.name} checked={selectedBranch === branch.name} onChange={(e) => setSelectedBranch(e.target.value)} id={`br-${branch.id}`} />
                                <label className="form-check-label ms-1" htmlFor={`br-${branch.id}`}>{branch.name}</label>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date From <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} style={{ borderRadius: '8px', padding: '12px' }} required />
                        </div>
                        <div className="col-md-6">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date To <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" value={dateTo} onChange={(e)=>setDateTo(e.target.value)} style={{ borderRadius: '8px', padding: '12px' }} required />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm" style={{ border: '1px solid #e0e0e0', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#ffffff' }}>
                                <tr style={{ color: '#004a99', fontSize: '14px' }}>
                                    <th className="p-2 border" style={{ width: '50px' }}></th>
                                    <th className="p-2 border text-center">Date</th>
                                    <th className="p-2 border text-center">Business Purpose</th>
                                    <th className="p-2 border text-center">Start Post Code</th>
                                    <th className="p-2 border text-center">End Post Code</th>
                                    <th className="p-2 border text-center">Comments</th>
                                    <th className="p-2 border text-center">Miles</th>
                                    <th className="p-2 border text-center" style={{ width: '40px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={row.id}>
                                        <td className="p-2 border text-center" style={{ color: '#004a99', backgroundColor: '#fcfcfc' }}>{index + 1}</td>
                                        <td className="p-0 border"><input type="date" className="table-input" value={row.date} onChange={(e) => handleInputChange(index, 'date', e.target.value)} /></td>
                                        <td className="p-0 border"><input type="text" className="table-input" value={row.purpose} onChange={(e) => handleInputChange(index, 'purpose', e.target.value)} /></td>
                                        <td className="p-0 border"><input type="text" className="table-input" value={row.start} onChange={(e) => handleInputChange(index, 'start', e.target.value)} /></td>
                                        <td className="p-0 border"><input type="text" className="table-input" value={row.end} onChange={(e) => handleInputChange(index, 'end', e.target.value)} /></td>
                                        <td className="p-0 border"><input type="text" className="table-input" value={row.comments} onChange={(e) => handleInputChange(index, 'comments', e.target.value)} /></td>
                                        <td className="p-0 border"><input type="number" className="table-input" value={row.miles} onChange={(e) => handleInputChange(index, 'miles', e.target.value)} /></td>
                                        <td className="p-2 border text-center">
                                            <button type="button" onClick={() => removeRow(row.id)} style={{ border: 'none', background: 'none', color: '#ff4d4d', cursor: 'pointer' }}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-2 mb-4">
                        <button type="button" onClick={addRow} style={{ background: '#004a99', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 15px', fontSize: '13px' }}>
                            + Add Row
                        </button>
                    </div>

                    <div className="row">
                        <div className="mt-3 col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Miles:</label>
                            <input type="text" className="form-control bg-light" value={totalMiles} disabled style={{ borderRadius: '8px', padding: '12px' }} />
                        </div>
                        <div className="mt-3 col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Mileage in £ :</label>
                            <input type="text" className="form-control bg-light" value={(totalMiles * rate).toFixed(2)} disabled style={{ borderRadius: '8px', padding: '12px' }} />
                        </div>
                    </div>

                    <div className="mt-5 p-3" style={{ border: '1px dashed #004a99', borderRadius: '10px', backgroundColor: '#f9fbff' }}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="policyAgreement" required />
                            <label className="form-check-label ms-2" htmlFor="policyAgreement" style={{ color: '#002b5c', fontSize: '14px' }}>
                                I confirm that the mileage claimed above was incurred for business purposes. <span className="text-danger">*</span>
                            </label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="btn btn-success px-5 py-2" style={{ borderRadius: '8px', backgroundColor: '#00b341', border: 'none', fontWeight: 'bold' }}>Submit Claim</button>
                    </div>
                </form>
            </div>
            
            <style jsx>{`
                .table-input { width: 100%; border: none; padding: 8px; outline: none; background: transparent; }
                .table-input:focus { background-color: #f8f9fa; }
            `}</style>
        </div>
    );
};

const Forms = dynamic(() => Promise.resolve(FormsComponent), { ssr: false });
export default Forms;