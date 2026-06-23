import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { CreditCard, Plus, ArrowUpRight, ArrowDownRight, Trash2, X, DollarSign } from 'lucide-react';
import './AdminTransactions.css';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('income'); // 'income' or 'expense'
  
  // Form State
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const openModal = (type) => {
    setTransactionType(type);
    setAmount('');
    setNote('');
    setIsModalOpen(true);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !note.trim()) return;

    setPosting(true);
    try {
      await addDoc(collection(db, 'transactions'), {
        type: transactionType,
        amount: Number(amount),
        note: note.trim(),
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Failed to save transaction");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete");
    }
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="admin-transactions-container">
      {/* Header & Stats */}
      <div className="transactions-header-panel">
        <div className="transactions-title-area">
          <h2>Transaction History</h2>
          <p>Track your income and expenses.</p>
        </div>
        
        <div className="transactions-actions">
          <button className="btn-income" onClick={() => openModal('income')}>
            <ArrowUpRight size={18} /> Add Income
          </button>
          <button className="btn-expense" onClick={() => openModal('expense')}>
            <ArrowDownRight size={18} /> Add Expense
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="transactions-summary">
        <div className="summary-card income-card">
          <div className="summary-icon"><ArrowUpRight size={24} /></div>
          <div className="summary-details">
            <span>Total Income</span>
            <h3>₹{totalIncome.toLocaleString('en-IN')}</h3>
          </div>
        </div>
        <div className="summary-card expense-card">
          <div className="summary-icon"><ArrowDownRight size={24} /></div>
          <div className="summary-details">
            <span>Total Expense</span>
            <h3>₹{totalExpense.toLocaleString('en-IN')}</h3>
          </div>
        </div>
        <div className="summary-card balance-card">
          <div className="summary-icon"><DollarSign size={24} /></div>
          <div className="summary-details">
            <span>Net Balance</span>
            <h3>₹{balance.toLocaleString('en-IN')}</h3>
          </div>
        </div>
      </div>

      {/* Transactions Sheet */}
      <div className="transactions-sheet">
        {loading ? (
          <div className="loading-state">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="empty-state">
            <CreditCard size={48} color="#cbd5e1" />
            <p>No transactions recorded yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Note</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      }) : 'Just now'}
                    </td>
                    <td>
                      <span className={`type-badge ${item.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </td>
                    <td className="note-cell">{item.note}</td>
                    <td style={{ fontWeight: '600', color: item.type === 'income' ? '#10b981' : '#ef4444' }}>
                      {item.type === 'income' ? '+' : '-'} ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(item.id)}
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record {transactionType === 'income' ? 'Income' : 'Expense'}</h3>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePost}>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Note / Description</label>
                <textarea 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="E.g., Student Fee, Electricity Bill..."
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button 
                  type="submit" 
                  className={`btn-submit ${transactionType === 'income' ? 'bg-green' : 'bg-red'}`} 
                  disabled={posting}
                >
                  {posting ? 'Saving...' : `Save ${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
