"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import Swal from 'sweetalert2'; 
import { getbranch } from '@/Api/Branchesapi';
import { mileage } from "../../Api/MilageClaimapi";

const FormsComponent = () => {
    // States
    const [rows, setRows] = useState([
        { id: 1, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 2, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
        { id: 3, date: '', purpose: '', start: '', end: '', comments: '', miles: '' },
    ]);

    const [rate, setRate] = useState(0);
    const [totalMiles, setTotalMiles] = useState(0);
    const [branchList, setBranchList] = useState([]); 
    const [selectedBranch, setSelectedBranch] = useState(""); 
    
    const [ratesFromProfile, setRatesFromProfile] = useState({ general: 0, social: 0 });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData) {
            setProfile(userData);
            setFirstName(userData.name || "");
            setLastName(userData.last_name || "");
            
            // --- BRANCH LOCK LOGIC ---
            // Profile se branch ID lekar state mein set kar rahe hain
            if (userData.branch?.id) {
                setSelectedBranch(userData.branch.id.toString());
            }

            setRatesFromProfile({
                general: parseFloat(userData.branch?.general_rate) || 0,
                social: parseFloat(userData.branch?.social_rate) || 0
            });
        }

        const fetchBranches = async () => {
            try {
                const branchRes = await getbranch();
                const branches = branchRes?.info || branchRes?.data || [];
                setBranchList(branches);
            } catch (err) {
                console.error("Error fetching branches", err);
            }
        };
        fetchBranches();
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

    const validateForm = () => {
        let newErrors = {};
        if (!firstName) newErrors.firstName = true;
        if (!lastName) newErrors.lastName = true;
        if (!dateFrom) newErrors.dateFrom = true;
        if (!dateTo) newErrors.dateTo = true;
        if (!selectedBranch) newErrors.branch = true;
        if (!rate || rate === 0) newErrors.rate = true;

        const from = new Date(dateFrom);
        const to = new Date(dateTo);

        // Date Range logic
        if (dateFrom && dateTo && from > to) {
            Swal.fire({ icon: 'warning', title: 'Date Range Error', text: 'Date From cannot be greater than Date To', confirmButtonColor: '#004a99' });
            return false;
        }

        // --- TABLE DATE VALIDATION LOGIC ---
        const filledRows = rows.filter(row => row.date !== "");
        for (let i = 0; i < filledRows.length; i++) {
            const rowDate = new Date(filledRows[i].date);
            if (rowDate < from || rowDate > to) {
                Swal.fire({ 
                    icon: 'error', 
                    title: 'Invalid Row Date', 
                    text: `Date in row ${i + 1} must be between ${dateFrom} and ${dateTo}`,
                    confirmButtonColor: '#d33' 
                });
                return false;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const filledRows = rows.filter(row => row.date && row.purpose && row.miles);
        if (filledRows.length === 0) {
            Swal.fire({ icon: 'info', title: 'Empty Form', text: 'Please fill at least one row with details and miles.', confirmButtonColor: '#004a99' });
            return;
        }

        try {
            Swal.fire({ title: 'Submitting...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

            const payload = {
                user_id: profile?.id,
                first_name: firstName,
                last_name: lastName,
                branch_id: selectedBranch, 
                rate_per_mile: rate,
                total_miles: totalMiles,
                total_amount: Number((totalMiles * rate).toFixed(2)),
                date_from: dateFrom,
                date_to: dateTo,
                is_submit: 1,
                items: filledRows.map(row => ({
                    date: row.date,
                    business_purpose: row.purpose,
                    start_post_code: row.start,
                    end_post_code: row.end,
                    comments: row.comments,
                    miles: parseFloat(row.miles) || 0
                }))
            };

            await mileage(payload);
            Swal.fire({ icon: 'success', title: 'Submitted!', text: 'Your claim has been recorded successfully.', confirmButtonColor: '#00b341' });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Server connection error.";
            Swal.fire({ icon: 'error', title: 'Oops...', text: errorMessage, confirmButtonColor: '#d33' });
        }
    };

    const getInputStyle = (isError) => ({
        borderRadius: '8px', 
        padding: '12px',
        border: isError ? '2px solid #ff4d4d' : '1px solid #dee2e6',
        transition: '0.3s border'
    });

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
                    {/* Name Section */}
                    <div className="row mb-4">
                        <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Full Name <span className="text-danger">*</span></label>
                        <div className="col-md-6 mb-2">
                            <input type="text" className="form-control" placeholder="First name" value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                style={getInputStyle(errors.firstName)} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Surname" value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                style={getInputStyle(errors.lastName)} />
                        </div>
                    </div>

                    {/* Trip & Rate Section */}
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Trip Type <span className="text-danger">*</span></label>
                            <select 
                                className="form-control" 
                                style={getInputStyle(errors.rate)}
                                onChange={(e) => {
                                    setRate(parseFloat(e.target.value) || 0);
                                    setErrors({...errors, rate: false});
                                }}
                                defaultValue=""
                            >
                                <option value="">Select Trip Type</option>
                                <option value={ratesFromProfile.general}>General Mileage</option>
                                <option value={ratesFromProfile.social}>Social Media</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Rate Per Mile (£)</label>
                            <input type="text" className="form-control bg-light" value={rate} readOnly style={{ borderRadius: '8px', padding: '12px' }} />
                        </div>
                    </div>

                    {/* Branch Section (Locked) */}
                    <div className="mb-4">
                        <label className="fw-bold mb-2" style={{ color: '#004a99' }}>
                            Branch: (Auto-selected based on your profile)
                        </label>
                        <div className="d-flex flex-wrap gap-3 p-3 bg-light rounded" style={{ border: '1px solid #dee2e6' }}>
                            {branchList.map((branch) => {
                                const isUserBranch = selectedBranch.toString() === branch.id.toString();
                                return (
                                    <div className="form-check" key={branch.id}>
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="branch" 
                                            id={`br-${branch.id}`} 
                                            value={branch.id} 
                                            checked={isUserBranch}
                                            disabled={!isUserBranch} // --- LOCK LOGIC: Disable if not user's branch ---
                                            onChange={(e) => setSelectedBranch(e.target.value)} 
                                        />
                                        <label className={`form-check-label ms-1 ${isUserBranch ? 'fw-bold text-dark' : 'text-muted'}`} htmlFor={`br-${branch.id}`}>
                                            {branch.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Date Range Section */}
                    <div className="row mb-5">
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date From <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" value={dateFrom} 
                                onChange={(e) => {setDateFrom(e.target.value); setErrors({...errors, dateFrom: false})}} 
                                style={getInputStyle(errors.dateFrom)} />
                        </div>
                        <div className="col-md-6">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Date To <span className="text-danger">*</span></label>
                            <input type="date" className="form-control" value={dateTo} 
                                onChange={(e) => {setDateTo(e.target.value); setErrors({...errors, dateTo: false})}} 
                                style={getInputStyle(errors.dateTo)} />
                        </div>
                    </div>

                    {/* Table Section */}
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
                                            <button type="button" onClick={() => removeRow(row.id)} style={{ border: 'none', background: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '18px' }}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-2 mb-4">
                        <button type="button" onClick={addRow} style={{ background: '#004a99', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 15px', fontSize: '13px' }}>+ Add Row</button>
                    </div>

                    {/* Summary Section */}
                    <div className="d-flex row">
                        <div className="mt-3 col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Miles:</label>
                            <input type="text" className="form-control bg-light" value={totalMiles} disabled style={{ borderRadius: '8px', padding: '12px' }} />
                        </div>
                        <div className="mt-3 col-md-4">
                            <label className="fw-bold mb-2" style={{ color: '#004a99' }}>Total Mileage (£):</label>
                            <input type="text" className="form-control bg-light" value={(totalMiles * rate).toFixed(2)} disabled style={{ borderRadius: '8px', padding: '12px' }} />
                        </div>
                    </div>

                    {/* Declaration Section */}
                    <div className="mt-5 p-3" style={{ border: '1px dashed #004a99', borderRadius: '10px', backgroundColor: '#f9fbff' }}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="policyAgreement" required style={{ cursor: 'pointer' }} />
                            <label className="form-check-label ms-2" htmlFor="policyAgreement" style={{ color: '#002b5c', fontSize: '14px', cursor: 'pointer' }}>
                                I confirm that the mileage claimed is business-related. <span className="text-danger">*</span>
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