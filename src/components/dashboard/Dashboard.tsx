'use client';

import React, { useState } from 'react';
import './dashboard.css';

// --- Types ---
type NavItem = 
  | 'Dashboard' 
  | 'Search Agent' 
  | 'Contract Agent' 
  | 'Workflow Agent' 
  | 'Clients' 
  | 'Deals' 
  | 'Tasks' 
  | 'Calendar'
  | 'Settings'
  | 'Log Out';

interface WorkflowNodeData {
  id: string;
  title: string;
  desc: string;
}

interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNodeData[];
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface Contract {
  id: string;
  clientName: string;
  title: string;
  status: 'Draft' | 'Sent' | 'Signed';
  lastUpdated: string;
  content: React.ReactNode;
  checklist: ChecklistItem[];
}

interface Property {
  id: number;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  daysOnMarket: number;
  matchScore: number;
  aiTag: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Lead' | 'Past';
  lastContact: string;
}

interface Deal {
  id: string;
  title: string;
  value: string;
  stage: 'New' | 'Negotiation' | 'Under Contract' | 'Closed';
  clientName: string;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: 'Meeting' | 'Showing' | 'Deadline';
}

// --- Components ---

// --- Components ---

interface TopBarProps {
  onToggleChat: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleChat }) => {
  return (
    <header className="rltr-topbar">
      <div className="rltr-brand">RLTR</div>
      <div className="rltr-topbar-right">
        <button className="rltr-icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="rltr-icon-btn" aria-label="AI Assistant" onClick={onToggleChat}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </button>
        <button className="rltr-icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <div className="rltr-avatar"></div>
      </div>
    </header>
  );
};

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onNavigate }) => {
  const mainNavItems: NavItem[] = [
    'Dashboard',
    'Search Agent',
    'Contract Agent',
    'Workflow Agent',
    'Clients',
    'Deals',
    'Tasks',
    'Calendar',
  ];

  const bottomNavItems: NavItem[] = ['Settings', 'Log Out'];

  return (
    <nav className="rltr-sidebar-left">
      <div className="rltr-nav-section-title">Navigation</div>
      {mainNavItems.map((item) => (
        <a
          key={item}
          className={`rltr-nav-item ${activeItem === item ? 'active' : ''}`}
          onClick={() => onNavigate(item)}
        >
          {item}
        </a>
      ))}
      <div className="rltr-nav-divider"></div>
      {bottomNavItems.map((item) => (
        <a
          key={item}
          className={`rltr-nav-item ${activeItem === item ? 'active' : ''}`}
          onClick={() => onNavigate(item)}
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

const SearchAgentView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allProperties: Property[] = [
    { id: 1, price: '$895,000', address: '1234 Coast Hwy, Encinitas, CA', beds: 3, baths: 2, sqft: '1,450', daysOnMarket: 4, matchScore: 85, aiTag: 'Best match for Sarah K. (85%)' },
    { id: 2, price: '$1,250,000', address: '567 Neptune Ave, Encinitas, CA', beds: 4, baths: 3, sqft: '2,100', daysOnMarket: 12, matchScore: 82, aiTag: 'High rental potential' },
    { id: 3, price: '$750,000', address: '890 Vulcan Ave, Encinitas, CA', beds: 2, baths: 2, sqft: '1,100', daysOnMarket: 2, matchScore: 78, aiTag: 'Under market value' },
    { id: 4, price: '$925,000', address: '432 2nd St, Encinitas, CA', beds: 3, baths: 2.5, sqft: '1,600', daysOnMarket: 8, matchScore: 75, aiTag: 'Great school district' },
    { id: 5, price: '$1,100,000', address: '765 Hygeia Ave, Encinitas, CA', beds: 4, baths: 3, sqft: '1,950', daysOnMarket: 15, matchScore: 70, aiTag: 'Large lot size' },
    { id: 6, price: '$825,000', address: '321 Hermes Ave, Encinitas, CA', beds: 3, baths: 2, sqft: '1,350', daysOnMarket: 6, matchScore: 65, aiTag: 'Fixer upper opportunity' },
  ];

  const filteredProperties = allProperties.filter(p => 
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.aiTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.price.includes(searchQuery)
  );

  return (
    <div>
      <div className="rltr-search-container">
        <input 
          type="text" 
          className="rltr-search-input" 
          placeholder="Find 3-bed homes under $900K in Encinitas with rental potential…" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="rltr-btn">Search</button>
      </div>
      
      <h3 className="rltr-section-title">Results ({filteredProperties.length})</h3>
      
      <div className="rltr-property-grid">
        {filteredProperties.map((p) => (
          <div key={p.id} className="rltr-card">
            <div className="rltr-card-header">
              <div className="rltr-card-price">{p.price}</div>
              <div className="rltr-card-address">{p.address}</div>
            </div>
            <div className="rltr-card-details">
              <span>{p.beds} bds</span>
              <span>{p.baths} ba</span>
              <span>{p.sqft} sqft</span>
              <span>{p.daysOnMarket} days on mkt</span>
            </div>
            <div className="rltr-ai-tag">{p.aiTag}</div>
            <div className="rltr-card-actions">
              <button className="rltr-text-btn">Add to tour</button>
              <button className="rltr-text-btn">Send summary</button>
              <button className="rltr-text-btn">Start offer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContractAgentView: React.FC = () => {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  
  const contracts: Contract[] = [
    {
      id: '1',
      clientName: 'Sarah Klein',
      title: 'Purchase Agreement - 1234 Coast Hwy',
      status: 'Draft',
      lastUpdated: '2 hours ago',
      content: (
        <div className="rltr-contract-text">
          <p><strong>CALIFORNIA RESIDENTIAL PURCHASE AGREEMENT</strong></p>
          <br />
          <p>
            This Agreement is made on November 20, 2025, by and between <span className="rltr-highlight">Sarah Klein</span> (Buyer) and <span className="rltr-highlight">Robert Smith</span> (Seller).
          </p>
          <br />
          <p>
            1. PROPERTY: The real property to be acquired is described as 1234 Coast Hwy, Encinitas, CA 92024.
          </p>
          <br />
          <p>
            2. PURCHASE PRICE: The purchase price shall be <span className="rltr-highlight">$895,000.00</span>.
          </p>
          <br />
          <p>
            3. CLOSE OF ESCROW: Close of escrow shall occur on or before December 20, 2025.
          </p>
        </div>
      ),
      checklist: [
        { id: 1, text: 'Property details', completed: true },
        { id: 2, text: 'Buyer details', completed: true },
        { id: 3, text: 'Disclosures', completed: false },
        { id: 4, text: 'Signature', completed: false },
      ]
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      title: 'Listing Agreement - 567 Neptune Ave',
      status: 'Sent',
      lastUpdated: '1 day ago',
      content: (
        <div className="rltr-contract-text">
          <p><strong>RESIDENTIAL LISTING AGREEMENT</strong></p>
          <br />
          <p>
            This Agreement is entered into by <span className="rltr-highlight">Michael Chen</span> (Seller) and RLTR Brokerage.
          </p>
          <br />
          <p>
            1. EXCLUSIVE RIGHT TO SELL: Seller hereby employs and grants Broker the exclusive and irrevocable right to sell or exchange the real property described as 567 Neptune Ave.
          </p>
          <br />
          <p>
            2. LISTING PRICE: The listing price shall be <span className="rltr-highlight">$1,250,000.00</span>.
          </p>
        </div>
      ),
      checklist: [
        { id: 1, text: 'Listing terms', completed: true },
        { id: 2, text: 'Commission rate', completed: true },
        { id: 3, text: 'Seller signature', completed: false },
        { id: 4, text: 'MLS entry', completed: false },
      ]
    },
    {
      id: '3',
      clientName: 'Emily Davis',
      title: 'Counter Offer No. 1',
      status: 'Signed',
      lastUpdated: '3 days ago',
      content: (
        <div className="rltr-contract-text">
          <p><strong>SELLER COUNTER OFFER No. 1</strong></p>
          <br />
          <p>
            This is a counter offer to the Purchase Agreement dated Nov 15, 2025.
          </p>
          <br />
          <p>
            1. PRICE: The purchase price shall be increased to <span className="rltr-highlight">$760,000.00</span>.
          </p>
          <br />
          <p>
            2. ALL OTHER TERMS: All other terms and conditions of the Purchase Agreement remain unchanged.
          </p>
        </div>
      ),
      checklist: [
        { id: 1, text: 'Price adjustment', completed: true },
        { id: 2, text: 'Buyer signature', completed: true },
        { id: 3, text: 'Seller signature', completed: true },
        { id: 4, text: 'Escrow opened', completed: true },
      ]
    }
  ];

  const [activeChecklist, setActiveChecklist] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  // Initialize checklist when a contract is selected
  React.useEffect(() => {
    if (selectedContractId) {
      const contract = contracts.find(c => c.id === selectedContractId);
      if (contract) {
        setActiveChecklist(contract.checklist);
      }
    }
  }, [selectedContractId]);

  const toggleItem = (id: number) => {
    setActiveChecklist(activeChecklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newItemText,
      completed: false
    };
    setActiveChecklist([...activeChecklist, newItem]);
    setNewItemText('');
  };

  const selectedContract = contracts.find(c => c.id === selectedContractId);

  if (!selectedContract) {
    return (
      <div>
        <div className="rltr-search-container" style={{ maxWidth: '100%' }}>
          <input 
            type="text" 
            className="rltr-search-input" 
            placeholder="Search contracts..." 
          />
        </div>
        
        <div className="rltr-contract-grid">
          {contracts.map(contract => (
            <div 
              key={contract.id} 
              className="rltr-contract-card"
              onClick={() => setSelectedContractId(contract.id)}
            >
              <div className="rltr-contract-card-header">
                <div className="rltr-client-name">{contract.clientName}</div>
                <div className={`rltr-status-badge ${contract.status.toLowerCase()}`}>
                  {contract.status}
                </div>
              </div>
              <div className="rltr-contract-title">{contract.title}</div>
              <div className="rltr-contract-meta">Last updated {contract.lastUpdated}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <button className="rltr-back-btn" onClick={() => setSelectedContractId(null)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Contracts
      </button>

      <div className="rltr-contract-layout">
        <div className="rltr-panel">
          <div className="rltr-panel-header">{selectedContract.title}</div>
          <div className="rltr-panel-content">
            {selectedContract.content}
          </div>
        </div>
        
        <div className="rltr-panel">
          <div className="rltr-panel-header">Checklist</div>
          <div className="rltr-panel-content">
            {activeChecklist.map(item => (
              <div 
                key={item.id} 
                className="rltr-checklist-item" 
                onClick={() => toggleItem(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`rltr-status-icon ${item.completed ? 'completed' : ''}`}></div>
                <span style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-muted)' : 'inherit' }}>
                  {item.text}
                </span>
              </div>
            ))}
            <div className="rltr-checklist-add">
              <input 
                type="text" 
                className="rltr-input" 
                placeholder="Add item..." 
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
              <button className="rltr-btn" style={{ padding: '0 12px' }} onClick={handleAddItem}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowAgentView: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'New Lead Sequence',
      nodes: [
        { id: '1', title: 'Trigger: New lead', desc: 'Source: Website form' },
        { id: '2', title: 'Send intro email', desc: 'Template: Welcome' },
        { id: '3', title: 'Wait 2 days', desc: 'Delay' },
        { id: '4', title: 'If no response', desc: 'Action: Send SMS' },
      ]
    },
    {
      id: '2',
      name: 'Contract Follow-up',
      nodes: [
        { id: '1', title: 'Trigger: Contract Sent', desc: 'Source: DocuSign' },
        { id: '2', title: 'Wait 24 hours', desc: 'Check signature status' },
        { id: '3', title: 'If not signed', desc: 'Send reminder email' },
      ]
    }
  ]);
  
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('1');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId) || workflows[0];

  const handleAddWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: 'Untitled Workflow',
      nodes: [
        { id: '1', title: 'Trigger: Start', desc: 'Manual trigger' }
      ]
    };
    setWorkflows([...workflows, newWorkflow]);
    setActiveWorkflowId(newWorkflow.id);
    setSelectedNodeId(null);
  };

  const handleAddNode = () => {
    const newNode = {
      id: Date.now().toString(),
      title: 'New Step',
      desc: 'Description'
    };
    
    setWorkflows(workflows.map(w => {
      if (w.id === activeWorkflowId) {
        return { ...w, nodes: [...w.nodes, newNode] };
      }
      return w;
    }));
    setSelectedNodeId(newNode.id);
  };

  const handleDeleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflows(workflows.map(w => {
      if (w.id === activeWorkflowId) {
        return { ...w, nodes: w.nodes.filter(n => n.id !== id) };
      }
      return w;
    }));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleUpdateNode = (id: string, field: 'title' | 'desc', value: string) => {
    setWorkflows(workflows.map(w => {
      if (w.id === activeWorkflowId) {
        return {
          ...w,
          nodes: w.nodes.map(n => n.id === id ? { ...n, [field]: value } : n)
        };
      }
      return w;
    }));
  };

  const selectedNode = activeWorkflow.nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="rltr-workflow-view">
      <div className="rltr-workflow-list">
        <div className="rltr-workflow-list-header">
          <span className="rltr-workflow-list-title">Workflows</span>
          <button className="rltr-add-workflow-btn" onClick={handleAddWorkflow} title="New Workflow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        {workflows.map(w => (
          <div 
            key={w.id} 
            className={`rltr-workflow-item ${activeWorkflowId === w.id ? 'active' : ''}`}
            onClick={() => { setActiveWorkflowId(w.id); setSelectedNodeId(null); }}
          >
            {w.name}
          </div>
        ))}
      </div>

      <div className="rltr-workflow-canvas">
        <div className="rltr-workflow-diagram">
          {activeWorkflow.nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div 
                className={`rltr-node ${selectedNodeId === node.id ? 'selected' : ''}`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <div className="rltr-node-title">{node.title}</div>
                <div className="rltr-node-desc">{node.desc}</div>
                <button 
                  className="rltr-delete-btn"
                  onClick={(e) => handleDeleteNode(node.id, e)}
                  title="Remove step"
                >
                  ×
                </button>
              </div>
              {index < activeWorkflow.nodes.length - 1 && <div className="rltr-connector"></div>}
            </React.Fragment>
          ))}
          <div className="rltr-connector"></div>
          <button className="rltr-add-step-btn" onClick={handleAddNode} title="Add step">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {selectedNode ? (
          <div className="rltr-edit-card">
            <h3 className="rltr-section-title" style={{ fontSize: '16px' }}>Edit Step</h3>
            <div className="rltr-form-group">
              <label className="rltr-label">Title</label>
              <input 
                type="text" 
                className="rltr-input" 
                value={selectedNode.title}
                onChange={(e) => handleUpdateNode(selectedNode.id, 'title', e.target.value)}
              />
            </div>
            <div className="rltr-form-group">
              <label className="rltr-label">Description</label>
              <input 
                type="text" 
                className="rltr-input" 
                value={selectedNode.desc}
                onChange={(e) => handleUpdateNode(selectedNode.id, 'desc', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="rltr-stats-card">
            <h3 className="rltr-section-title" style={{ fontSize: '16px', marginBottom: '24px' }}>{activeWorkflow.name} Performance</h3>
            
            <div className="rltr-stats-grid">
              <div className="rltr-stat-item">
                <div className="rltr-stat-value">{Math.floor(Math.random() * 50) + 10}</div>
                <div className="rltr-stat-label">Active Leads</div>
              </div>
              <div className="rltr-stat-item">
                <div className="rltr-stat-value">{Math.floor(Math.random() * 5) + 1}d</div>
                <div className="rltr-stat-label">Avg Completion</div>
              </div>
              <div className="rltr-stat-item">
                <div className="rltr-stat-value">92%</div>
                <div className="rltr-stat-label">Success Rate</div>
              </div>
            </div>

            <div className="rltr-stat-suggestion">
              <div className="rltr-stat-label">AI Suggestion</div>
              <div className="rltr-suggestion-text">Review drop-off rate at step 3</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RightPanelProps {
  activeItem: NavItem;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeItem }) => {
  const getContent = () => {
    switch (activeItem) {
      case 'Search Agent':
        return {
          suggestions: ['Check Encinitas Highlands', 'Look for ADU potential', 'Filter by school district'],
          matches: ['1234 Coast Hwy (85%)', '567 Neptune Ave (82%)', '890 Vulcan Ave (78%)'],
          nextSteps: ['Schedule tour for 1234 Coast Hwy', 'Email Sarah K. about new listings']
        };
      case 'Contract Agent':
        return {
          suggestions: ['Verify contingency dates', 'Check HOA addendum', 'Review seller credits'],
          matches: ['Standard CA RPA', 'Local Area Disclosures'],
          nextSteps: ['Send for e-signature', 'Notify escrow officer']
        };
      case 'Workflow Agent':
        return {
          suggestions: ['A/B test email subject', 'Shorten delay to 1 day', 'Add phone call task'],
          matches: ['High intent leads', 'Cold leads'],
          nextSteps: ['Review performance report', 'Update SMS template']
        };
      default:
        return {
          suggestions: ['Review daily tasks', 'Check new messages'],
          matches: [],
          nextSteps: ['Clear inbox', 'Update CRM']
        };
    }
  };

  const content = getContent();

  return (
    <aside className="rltr-sidebar-right">
      <div className="rltr-ai-title">AI Assistant</div>
      
      <div className="rltr-ai-section">
        <div className="rltr-ai-section-title">Suggestions</div>
        <ul className="rltr-ai-list">
          {content.suggestions.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div className="rltr-ai-section">
        <div className="rltr-ai-section-title">Relevant Context</div>
        <ul className="rltr-ai-list">
          {content.matches.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div className="rltr-ai-section">
        <div className="rltr-ai-section-title">Next Steps</div>
        <ul className="rltr-ai-list">
          {content.nextSteps.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </aside>
  );
};

const DashboardHomeView: React.FC = () => {
  return (
    <div>
      <div className="rltr-dashboard-grid">
        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Active Deals</span>
            <span className="rltr-metric-trend positive">↑ 12%</span>
          </div>
          <div className="rltr-metric-value">$4.2M</div>
          <div className="rltr-metric-sub">3 closings this month</div>
        </div>
        
        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Pipeline Value</span>
            <span className="rltr-metric-trend positive">↑ 5%</span>
          </div>
          <div className="rltr-metric-value">$12.8M</div>
          <div className="rltr-metric-sub">8 active opportunities</div>
        </div>

        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Client Engagement</span>
            <span className="rltr-metric-trend negative">↓ 2%</span>
          </div>
          <div className="rltr-metric-value">85%</div>
          <div className="rltr-metric-sub">Avg. response rate</div>
        </div>

        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Tasks Due</span>
            <span className="rltr-metric-trend">Today</span>
          </div>
          <div className="rltr-metric-value">12</div>
          <div className="rltr-metric-sub">4 high priority</div>
        </div>
      </div>

      <div className="rltr-activity-feed">
        <h3 className="rltr-section-title">Recent Activity</h3>
        <div className="rltr-activity-item">
          <div className="rltr-activity-time">10:42 AM</div>
          <div className="rltr-activity-content">
            <strong>Sarah Klein</strong> viewed 1234 Coast Hwy listing for the 3rd time.
          </div>
        </div>
        <div className="rltr-activity-item">
          <div className="rltr-activity-time">09:15 AM</div>
          <div className="rltr-activity-content">
            Contract for <strong>567 Neptune Ave</strong> was signed by Michael Chen.
          </div>
        </div>
        <div className="rltr-activity-item">
          <div className="rltr-activity-time">Yesterday</div>
          <div className="rltr-activity-content">
            New lead <strong>James Wilson</strong> matched with "North County Coastal" workflow.
          </div>
        </div>
        <div className="rltr-activity-item">
          <div className="rltr-activity-time">Yesterday</div>
          <div className="rltr-activity-content">
            <strong>Workflow Agent</strong> sent automated follow-up to 24 cold leads.
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientsView: React.FC = () => {
  const clients: Client[] = [
    { id: '1', name: 'Sarah Klein', email: 'sarah.k@example.com', phone: '(555) 123-4567', status: 'Active', lastContact: '2 hours ago' },
    { id: '2', name: 'Michael Chen', email: 'm.chen@example.com', phone: '(555) 987-6543', status: 'Active', lastContact: '1 day ago' },
    { id: '3', name: 'James Wilson', email: 'j.wilson@example.com', phone: '(555) 456-7890', status: 'Lead', lastContact: 'Yesterday' },
    { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', phone: '(555) 789-0123', status: 'Past', lastContact: '3 days ago' },
    { id: '5', name: 'Robert Smith', email: 'r.smith@example.com', phone: '(555) 321-6549', status: 'Active', lastContact: '5 days ago' },
  ];

  return (
    <div>
      <div className="rltr-search-container">
        <input type="text" className="rltr-search-input" placeholder="Search clients..." />
        <button className="rltr-btn">Add Client</button>
      </div>
      
      <table className="rltr-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Last Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td><strong>{client.name}</strong></td>
              <td>
                <div>{client.email}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{client.phone}</div>
              </td>
              <td>
                <span className={`rltr-status-badge ${client.status.toLowerCase() === 'active' ? 'sent' : client.status === 'Lead' ? 'draft' : 'signed'}`}>
                  {client.status}
                </span>
              </td>
              <td>{client.lastContact}</td>
              <td>
                <button className="rltr-text-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DealsView: React.FC = () => {
  const deals: Deal[] = [
    { id: '1', title: '1234 Coast Hwy', value: '$895,000', stage: 'Under Contract', clientName: 'Sarah Klein' },
    { id: '2', title: '567 Neptune Ave', value: '$1,250,000', stage: 'Negotiation', clientName: 'Michael Chen' },
    { id: '3', title: '890 Vulcan Ave', value: '$750,000', stage: 'New', clientName: 'James Wilson' },
    { id: '4', title: '432 2nd St', value: '$925,000', stage: 'Closed', clientName: 'Emily Davis' },
  ];

  const stages = ['New', 'Negotiation', 'Under Contract', 'Closed'];

  return (
    <div className="rltr-kanban-board">
      {stages.map(stage => (
        <div key={stage} className="rltr-kanban-column">
          <div className="rltr-kanban-header">
            {stage}
            <span>{deals.filter(d => d.stage === stage).length}</span>
          </div>
          {deals.filter(d => d.stage === stage).map(deal => (
            <div key={deal.id} className="rltr-kanban-card">
              <div className="rltr-deal-title">{deal.title}</div>
              <div className="rltr-deal-value">{deal.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>{deal.clientName}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Call Sarah about inspection', dueDate: 'Today', priority: 'High', completed: false },
    { id: '2', title: 'Send disclosure packet to Michael', dueDate: 'Today', priority: 'High', completed: false },
    { id: '3', title: 'Follow up with James (Lead)', dueDate: 'Tomorrow', priority: 'Medium', completed: false },
    { id: '4', title: 'Schedule photography for 890 Vulcan', dueDate: 'Fri, Nov 24', priority: 'Medium', completed: true },
    { id: '5', title: 'Update CRM contacts', dueDate: 'Next Week', priority: 'Low', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="rltr-task-list">
      {tasks.map(task => (
        <div key={task.id} className="rltr-task-item" style={{ opacity: task.completed ? 0.6 : 1 }}>
          <input 
            type="checkbox" 
            className="rltr-task-checkbox" 
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <div className="rltr-task-content">
            <div className="rltr-task-title" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </div>
            <div className="rltr-task-meta">
              <span style={{ color: task.priority === 'High' ? '#ef4444' : 'inherit' }}>{task.priority} Priority</span> • Due {task.dueDate}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CalendarView: React.FC = () => {
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock calendar days
  const events: CalendarEvent[] = [
    { id: '1', title: 'Inspection: 1234 Coast', date: '20', time: '10:00 AM', type: 'Meeting' },
    { id: '2', title: 'Closing: 432 2nd St', date: '24', time: '2:00 PM', type: 'Deadline' },
    { id: '3', title: 'Showing: 567 Neptune', date: '22', time: '11:30 AM', type: 'Showing' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
        <h3 className="rltr-section-title" style={{ margin: 0 }}>November 2025</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="rltr-btn" style={{ padding: '4px 12px' }}>&lt;</button>
          <button className="rltr-btn" style={{ padding: '4px 12px' }}>&gt;</button>
        </div>
      </div>
      <div className="rltr-calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="rltr-calendar-day" style={{ height: 'auto', minHeight: 'auto', textAlign: 'center', fontWeight: 600, background: '#f9fafb' }}>
            {d}
          </div>
        ))}
        {days.map(day => {
          const dayEvents = events.filter(e => e.date === day.toString());
          return (
            <div key={day} className="rltr-calendar-day">
              <div className="rltr-calendar-day-header">{day <= 30 ? day : ''}</div>
              {day <= 30 && dayEvents.map(event => (
                <div key={event.id} className="rltr-calendar-event">
                  {event.time} {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SettingsView: React.FC = () => {
  return (
    <div className="rltr-settings-form">
      <div className="rltr-settings-section">
        <div className="rltr-settings-title">Profile</div>
        <div className="rltr-form-group">
          <label className="rltr-label">Full Name</label>
          <input type="text" className="rltr-input" defaultValue="Alex Realtor" />
        </div>
        <div className="rltr-form-group">
          <label className="rltr-label">Email</label>
          <input type="email" className="rltr-input" defaultValue="alex@rltr.com" />
        </div>
      </div>
      
      <div className="rltr-settings-section">
        <div className="rltr-settings-title">Notifications</div>
        <div className="rltr-task-item" style={{ border: 'none', padding: '8px 0' }}>
          <input type="checkbox" className="rltr-task-checkbox" defaultChecked />
          <div className="rltr-task-content">
            <div className="rltr-task-title">Email notifications for new leads</div>
          </div>
        </div>
        <div className="rltr-task-item" style={{ border: 'none', padding: '8px 0' }}>
          <input type="checkbox" className="rltr-task-checkbox" defaultChecked />
          <div className="rltr-task-content">
            <div className="rltr-task-title">Daily digest summary</div>
          </div>
        </div>
      </div>

      <button className="rltr-btn">Save Changes</button>
    </div>
  );
};

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  suggestions?: string[];
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: NavItem;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose, activeItem }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Generate context-aware initial message
  React.useEffect(() => {
    let initialText = '';
    let suggestions: string[] = [];

    switch (activeItem) {
      case 'Search Agent':
        initialText = "I can help you find properties or analyze market trends. What are you looking for?";
        suggestions = ['Check Encinitas Highlands', 'Look for ADU potential', 'Filter by school district'];
        break;
      case 'Contract Agent':
        initialText = "I'm reviewing your active contracts. Need help with compliance or drafting?";
        suggestions = ['Verify contingency dates', 'Check HOA addendum', 'Review seller credits'];
        break;
      case 'Workflow Agent':
        initialText = "Your workflows are running. I can help optimize them or create new automations.";
        suggestions = ['A/B test email subject', 'Shorten delay to 1 day', 'Add phone call task'];
        break;
      default:
        initialText = "Hello! I'm your AI assistant. How can I help you manage your business today?";
        suggestions = ['Review daily tasks', 'Check new messages', 'Update CRM'];
    }

    setMessages([{
      id: 'init',
      role: 'ai',
      text: initialText,
      suggestions
    }]);
  }, [activeItem]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "I've processed that request. Is there anything else you need help with?",
        suggestions: ['Show related properties', 'Draft email response']
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <aside className={`rltr-chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="rltr-chat-header">
        <div className="rltr-chat-title">
          <div className="rltr-chat-status"></div>
          AI Assistant
        </div>
        <button className="rltr-chat-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="rltr-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`rltr-chat-message ${msg.role}`}>
            <div className="rltr-chat-bubble">
              {msg.text}
              {msg.suggestions && (
                <div className="rltr-chat-suggestions">
                  {msg.suggestions.map((s, i) => (
                    <button 
                      key={i} 
                      className="rltr-chat-suggestion-btn"
                      onClick={() => {
                        setInputValue(s);
                        // Optional: auto-send
                      }}
                    >
                      {s}
                      <span className="rltr-chat-suggestion-arrow">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="rltr-chat-timestamp">Just now</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="rltr-chat-input-area">
        <textarea 
          className="rltr-chat-input" 
          placeholder="Ask anything..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
        />
        <button className="rltr-chat-send" onClick={handleSend}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </aside>
  );
};

// --- Main App Component ---

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavItem>('Dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <DashboardHomeView />;
      case 'Search Agent':
        return <SearchAgentView />;
      case 'Contract Agent':
        return <ContractAgentView />;
      case 'Workflow Agent':
        return <WorkflowAgentView />;
      case 'Clients':
        return <ClientsView />;
      case 'Deals':
        return <DealsView />;
      case 'Tasks':
        return <TasksView />;
      case 'Calendar':
        return <CalendarView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
            Select an agent to get started
          </div>
        );
    }
  };

  const getHeaderInfo = () => {
    switch (activeItem) {
      case 'Search Agent':
        return { title: 'Search Agent', desc: 'Semantic property search and buyer matching.' };
      case 'Contract Agent':
        return { title: 'Contract Agent', desc: 'Generate and manage contracts and compliance.' };
      case 'Workflow Agent':
        return { title: 'Workflow Agent', desc: 'Automate real estate workflows end-to-end.' };
      case 'Clients':
        return { title: 'Clients', desc: 'Manage and communicate with clients.' };
      case 'Deals':
        return { title: 'Deals', desc: 'Track and manage property deals.' };
      case 'Tasks':
        return { title: 'Tasks', desc: 'Organize and prioritize your tasks.' };
      case 'Calendar':
        return { title: 'Calendar', desc: 'View and manage your schedule.' };
      case 'Settings':
        return { title: 'Settings', desc: 'Customize your preferences and account.' };
      default:
        return { title: activeItem, desc: 'Manage your real estate business.' };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="rltr-dashboard">
      <TopBar onToggleChat={() => setIsChatOpen(!isChatOpen)} />
      <div className="rltr-layout">
        <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
        
        <main className="rltr-main-content">
          <div className="rltr-page-header">
            <h1 className="rltr-page-title">{headerInfo.title}</h1>
            <p className="rltr-page-description">{headerInfo.desc}</p>
          </div>
          {renderContent()}
        </main>

        <ChatSidebar 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          activeItem={activeItem} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
