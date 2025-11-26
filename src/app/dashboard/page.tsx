'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const styles = `
:root {
  --bg-body: #ffffff;
  --bg-sidebar-left: #ffffff;
  --bg-sidebar-right: #fafafa;
  --bg-hover: #f5f5f5;
  --bg-selected: #f0f0f0;
  --border-color: #e5e5e5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-muted: #999999;
  --accent-color: #000000;
  --accent-highlight: #e0e0e0;
  
  --font-serif: "Georgia", "Times New Roman", serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  --sidebar-left-width: 240px;
  --sidebar-right-width: 300px;
  --header-height: 60px;
}

.rltr-dashboard {
  font-family: var(--font-sans);
  color: var(--text-primary);
  background-color: var(--bg-body);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.rltr-dashboard h1, 
.rltr-dashboard h2, 
.rltr-dashboard h3 {
  font-family: var(--font-serif);
  font-weight: normal;
  margin: 0;
}

.rltr-dashboard p {
  margin: 0;
  line-height: 1.5;
}

.rltr-topbar {
  height: var(--header-height);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-lg);
  background-color: var(--bg-body);
  flex-shrink: 0;
  z-index: 10;
}

.rltr-brand {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.5px;
}

.rltr-topbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.rltr-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs);
  color: var(--text-secondary);
}

.rltr-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ddd;
}

.rltr-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.rltr-sidebar-left {
  width: var(--sidebar-left-width);
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-sidebar-left);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg) 0;
  flex-shrink: 0;
}

.rltr-nav-section-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  padding: 0 var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.rltr-nav-item {
  display: block;
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
}

.rltr-nav-item:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.rltr-nav-item.active {
  background-color: var(--bg-selected);
  color: var(--text-primary);
  font-weight: 600;
}

.rltr-nav-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: var(--spacing-md) var(--spacing-lg);
}

.rltr-main-content {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
  background-color: var(--bg-body);
}

.rltr-page-header {
  margin-bottom: var(--spacing-xl);
}

.rltr-page-title {
  font-size: 32px;
  margin-bottom: var(--spacing-xs);
}

.rltr-page-description {
  color: var(--text-secondary);
  font-size: 16px;
}

.rltr-search-container {
  margin-bottom: var(--spacing-xl);
  display: flex;
  gap: var(--spacing-sm);
  max-width: 800px;
}

.rltr-search-input {
  flex: 1;
  padding: var(--spacing-md);
  font-size: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: var(--font-sans);
}

.rltr-search-input:focus {
  outline: none;
  border-color: var(--text-primary);
}

.rltr-btn {
  padding: 0 var(--spacing-lg);
  background-color: var(--text-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.rltr-btn:hover {
  opacity: 0.9;
}

.rltr-section-title {
  font-size: 18px;
  margin-bottom: var(--spacing-md);
  font-family: var(--font-serif);
}

.rltr-property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.rltr-card {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: var(--spacing-md);
  background-color: white;
  transition: box-shadow 0.2s;
}

.rltr-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.rltr-card-header {
  margin-bottom: var(--spacing-sm);
}

.rltr-card-price {
  font-size: 18px;
  font-weight: 600;
}

.rltr-card-address {
  color: var(--text-secondary);
  font-size: 14px;
}

.rltr-card-details {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  font-size: 13px;
  color: var(--text-secondary);
}

.rltr-ai-tag {
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin-bottom: var(--spacing-md);
}

.rltr-card-actions {
  display: flex;
  gap: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-sm);
}

.rltr-text-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: var(--text-primary);
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s;
}

.rltr-text-btn:hover {
  text-decoration-color: var(--text-primary);
}

.rltr-contract-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  height: calc(100% - 100px);
}

.rltr-panel {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background: white;
}

.rltr-panel-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 14px;
}

.rltr-panel-content {
  padding: var(--spacing-md);
  overflow-y: auto;
  flex: 1;
}

.rltr-contract-text {
  font-family: var(--font-serif);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary);
}

.rltr-highlight {
  background-color: #fff9c4;
  padding: 2px 0;
}

.rltr-checklist-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  font-size: 14px;
}

.rltr-status-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
}

.rltr-status-icon.completed {
  background-color: var(--text-primary);
  border-color: var(--text-primary);
}

.rltr-workflow-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.rltr-workflow-diagram {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  overflow-x: auto;
  padding: var(--spacing-md) 0;
}

.rltr-node {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-md);
  min-width: 180px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rltr-node:hover {
  border-color: var(--text-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.rltr-node.selected {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 1px var(--text-primary), 0 4px 12px rgba(0,0,0,0.05);
}

.rltr-delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.rltr-node:hover .rltr-delete-btn {
  opacity: 1;
}

.rltr-delete-btn:hover {
  background-color: #fee2e2;
  color: #ef4444;
}

.rltr-add-step-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px dashed var(--border-color);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.rltr-add-step-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
  background-color: var(--bg-hover);
  transform: scale(1.05);
}

.rltr-edit-card {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: var(--spacing-lg);
  background-color: white;
  margin-top: var(--spacing-lg);
  max-width: 400px;
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.rltr-form-group {
  margin-bottom: var(--spacing-md);
}

.rltr-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rltr-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 14px;
  transition: border-color 0.2s;
}

.rltr-input:focus {
  outline: none;
  border-color: var(--text-primary);
}

.rltr-workflow-view {
  display: flex;
  height: 100%;
  gap: var(--spacing-xl);
}

.rltr-workflow-list {
  width: 220px;
  border-right: 1px solid var(--border-color);
  padding-right: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.rltr-workflow-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-sm);
}

.rltr-workflow-list-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.rltr-workflow-item {
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rltr-workflow-item:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.rltr-workflow-item.active {
  background-color: var(--bg-selected);
  color: var(--text-primary);
  font-weight: 500;
}

.rltr-workflow-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  min-width: 0;
}

.rltr-add-workflow-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.rltr-add-workflow-btn:hover {
  background-color: var(--bg-hover);
}

.rltr-connector {
  height: 1px;
  width: 40px;
  background-color: var(--border-color);
  flex-shrink: 0;
}

.rltr-stats-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-xl);
  background-color: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.rltr-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
}

.rltr-stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rltr-stat-value {
  font-size: 36px;
  font-weight: 400;
  font-family: var(--font-serif);
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -1px;
}

.rltr-stat-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  font-weight: 600;
}

.rltr-stat-suggestion {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rltr-suggestion-text {
  font-size: 16px;
  color: var(--text-primary);
  line-height: 1.5;
}

.rltr-sidebar-right {
  width: var(--sidebar-right-width);
  border-left: 1px solid var(--border-color);
  background-color: var(--bg-sidebar-right);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg) 0;
  flex-shrink: 0;
}

.rltr-user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.rltr-user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ddd;
}

.rltr-user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rltr-user-name {
  font-size: 16px;
  font-weight: 500;
}

.rltr-user-email {
  font-size: 14px;
  color: var(--text-secondary);
}

.rltr-user-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.rltr-user-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}

.rltr-user-stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.rltr-user-stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rltr-activity-feed {
  flex: 1;
  overflow-y: auto;
  padding-top: var(--spacing-md);
}

.rltr-activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.rltr-activity-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--text-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rltr-activity-content {
  flex: 1;
}

.rltr-activity-timestamp {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: auto;
}

.rltr-activity-description {
  font-size: 14px;
  color: var(--text-primary);
}

.rltr-activity-link {
  color: var(--text-primary);
  text-decoration: underline;
  font-weight: 500;
}

.rltr-activity-link:hover {
  text-decoration: none;
}

.rltr-contract-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.rltr-contract-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-lg);
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.rltr-contract-card:hover {
  border-color: var(--text-secondary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transform: translateY(-2px);
}

.rltr-contract-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.rltr-client-name {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.rltr-contract-title {
  font-size: 13px;
  color: var(--text-secondary);
}

.rltr-status-badge {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.rltr-status-badge.draft {
  background-color: #f3f4f6;
  color: #4b5563;
}

.rltr-status-badge.sent {
  background-color: #fff7ed;
  color: #c2410c;
}

.rltr-status-badge.signed {
  background-color: #ecfdf5;
  color: #047857;
}

.rltr-contract-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: auto;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.rltr-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  margin-bottom: var(--spacing-lg);
  padding: 0;
}

.rltr-back-btn:hover {
  color: var(--text-primary);
}

.rltr-checklist-add {
  margin-top: var(--spacing-md);
  display: flex;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 1px dashed var(--border-color);
}

.rltr-checklist-add .rltr-input {
  font-size: 13px;
  padding: 6px 10px;
}

.rltr-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.rltr-metric-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.rltr-metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rltr-metric-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  font-weight: 600;
}

.rltr-metric-trend {
  font-size: 12px;
  font-weight: 500;
}

.rltr-metric-trend.positive {
  color: #047857;
}

.rltr-metric-trend.negative {
  color: #c2410c;
}

.rltr-metric-value {
  font-family: var(--font-serif);
  font-size: 32px;
  color: var(--text-primary);
  line-height: 1.2;
}

.rltr-metric-sub {
  font-size: 13px;
  color: var(--text-secondary);
}

.rltr-activity-feed {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-xl);
}

.rltr-activity-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-color);
}

.rltr-activity-item:last-child {
  border-bottom: none;
}

.rltr-activity-time {
  font-size: 12px;
  color: var(--text-muted);
  width: 80px;
  flex-shrink: 0;
}

.rltr-activity-content {
  font-size: 14px;
  color: var(--text-primary);
}

.rltr-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.rltr-table th {
  text-align: left;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rltr-table td {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.rltr-table tr:last-child td {
  border-bottom: none;
}

.rltr-table tr:hover td {
  background-color: var(--bg-hover);
}

.rltr-kanban-board {
  display: flex;
  gap: var(--spacing-lg);
  overflow-x: auto;
  padding-bottom: var(--spacing-lg);
}

.rltr-kanban-column {
  flex: 1;
  min-width: 280px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: var(--spacing-md);
}

.rltr-kanban-header {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  display: flex;
  justify-content: space-between;
}

.rltr-kanban-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  cursor: pointer;
}

.rltr-kanban-card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.rltr-deal-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.rltr-deal-value {
  font-size: 13px;
  color: var(--text-secondary);
}

.rltr-task-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.rltr-task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.rltr-task-checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
}

.rltr-task-content {
  flex: 1;
}

.rltr-task-title {
  font-size: 14px;
  font-weight: 500;
}

.rltr-task-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.rltr-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--border-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.rltr-calendar-day {
  background-color: white;
  min-height: 120px;
  padding: var(--spacing-sm);
  font-size: 13px;
}

.rltr-calendar-day-header {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  text-align: right;
}

.rltr-calendar-event {
  background-color: #f3f4f6;
  border-left: 3px solid var(--text-primary);
  padding: 4px 6px;
  font-size: 11px;
  border-radius: 2px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rltr-settings-form {
  max-width: 600px;
}

.rltr-settings-section {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
}

.rltr-settings-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.rltr-chat-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  border-left: 1px solid var(--border-color);
  box-shadow: -4px 0 24px rgba(0,0,0,0.08);
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.rltr-chat-sidebar.open {
  right: 0;
}

.rltr-chat-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 60px;
}

.rltr-chat-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rltr-chat-status {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}

.rltr-chat-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 4px;
}

.rltr-chat-close:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.rltr-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  background: #f9fafb;
}

.rltr-chat-message {
  max-width: 90%;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
}

.rltr-chat-message.ai {
  align-self: flex-start;
}

.rltr-chat-message.user {
  align-self: flex-end;
}

.rltr-chat-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.rltr-chat-message.ai .rltr-chat-bubble {
  background: white;
  border: 1px solid var(--border-color);
  border-top-left-radius: 2px;
}

.rltr-chat-message.user .rltr-chat-bubble {
  background: var(--text-primary);
  color: white;
  border-top-right-radius: 2px;
}

.rltr-chat-timestamp {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
  margin-left: 4px;
}

.rltr-chat-input-area {
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  background: white;
  display: flex;
  gap: var(--spacing-sm);
  align-items: flex-end;
}

.rltr-chat-input {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  resize: none;
  min-height: 42px;
  max-height: 120px;
  font-family: inherit;
}

.rltr-chat-input:focus {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
}

.rltr-chat-send {
  background: var(--text-primary);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
}

.rltr-chat-send:hover {
  opacity: 0.9;
}

.rltr-chat-suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.rltr-chat-suggestion-btn {
  background: #f3f4f6;
  border: 1px solid transparent;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: left;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rltr-chat-suggestion-btn:hover {
  background: white;
  border-color: var(--border-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.rltr-chat-suggestion-arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s;
}

.rltr-chat-suggestion-btn:hover .rltr-chat-suggestion-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1024px) {
  .rltr-sidebar-right {
    display: none;
  }
}
`;

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
  content: string;
  checklist: ChecklistItem[];
}

interface Property {
  id: string;
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

const SearchAgentView: React.FC<{ user: any }> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  
  React.useEffect(() => {
    if (!user) return;
    const fetchProperties = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('properties').select('*');
      if (data) {
        setProperties(data.map((p: any) => ({
          id: p.id,
          price: p.price,
          address: p.address,
          beds: p.beds,
          baths: p.baths,
          sqft: p.sqft,
          daysOnMarket: p.days_on_market,
          matchScore: p.match_score,
          aiTag: p.ai_tag
        })));
      }
    };
    fetchProperties();
  }, [user]);

  const filteredProperties = properties.filter(p => 
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

const ContractAgentView: React.FC<{ user: any }> = ({ user }) => {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);

  React.useEffect(() => {
    if (!user) return;
    const fetchContracts = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('contracts').select('*');
      if (data) {
        setContracts(data.map((c: any) => ({
          id: c.id,
          clientName: c.client_name,
          title: c.title,
          status: c.status,
          lastUpdated: new Date(c.last_updated).toLocaleDateString(),
          content: c.content,
          checklist: c.checklist || []
        })));
      }
    };
    fetchContracts();
  }, [user]);

  const [activeChecklist, setActiveChecklist] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  // Initialize checklist when a contract is selected
  React.useEffect(() => {
    if (selectedContractId) {
      const contract = contracts.find(c => c.id === selectedContractId);
      if (contract) {
        setActiveChecklist(contract.checklist || []);
      }
    }
  }, [selectedContractId, contracts]);

  const updateContractChecklist = async (contractId: string, newChecklist: ChecklistItem[]) => {
    const supabase = createClient();
    await supabase.from('contracts').update({ checklist: newChecklist }).eq('id', contractId);
    
    setContracts(contracts.map(c => c.id === contractId ? { ...c, checklist: newChecklist } : c));
  };

  const toggleItem = (id: number) => {
    if (!selectedContractId) return;
    const newChecklist = activeChecklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActiveChecklist(newChecklist);
    updateContractChecklist(selectedContractId, newChecklist);
  };

  const handleAddItem = () => {
    if (!newItemText.trim() || !selectedContractId) return;
    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newItemText,
      completed: false
    };
    const newChecklist = [...activeChecklist, newItem];
    setActiveChecklist(newChecklist);
    setNewItemText('');
    updateContractChecklist(selectedContractId, newChecklist);
  };

  const handleAddContract = async () => {
    if (!user) return;
    const newContract = {
      user_id: user.id,
      client_name: 'New Client',
      title: 'Untitled Contract',
      status: 'Draft',
      content: '<p>Contract content goes here...</p>',
      checklist: []
    };
    const supabase = createClient();
    const { data } = await supabase.from('contracts').insert(newContract).select().single();
    if (data) {
      const c: Contract = {
        id: data.id,
        clientName: data.client_name,
        title: data.title,
        status: data.status,
        lastUpdated: new Date(data.last_updated).toLocaleDateString(),
        content: data.content,
        checklist: data.checklist || []
      };
      setContracts([...contracts, c]);
      setSelectedContractId(c.id);
    }
  };

  const selectedContract = contracts.find(c => c.id === selectedContractId);

  if (!selectedContract) {
    return (
      <div>
        <div className="rltr-search-container" style={{ maxWidth: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <input 
            type="text" 
            className="rltr-search-input" 
            placeholder="Search contracts..." 
          />
          <button className="rltr-btn" onClick={handleAddContract}>New Contract</button>
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
            <div dangerouslySetInnerHTML={{ __html: selectedContract.content }} />
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

const WorkflowAgentView: React.FC<{ user: any }> = ({ user }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!user) return;
    const fetchWorkflows = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('workflows').select('*');
      if (data && data.length > 0) {
        const mapped = data.map((w: any) => ({
          id: w.id,
          name: w.name,
          nodes: w.nodes
        }));
        setWorkflows(mapped);
        setActiveWorkflowId(mapped[0].id);
      }
    };
    fetchWorkflows();
  }, [user]);

  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId) || (workflows.length > 0 ? workflows[0] : null);

  const updateWorkflowInDb = async (workflow: Workflow) => {
    const supabase = createClient();
    await supabase.from('workflows').update({ nodes: workflow.nodes, name: workflow.name }).eq('id', workflow.id);
  };

  const handleAddWorkflow = async () => {
    if (!user) return;
    const newWorkflowPayload = {
      user_id: user.id,
      name: 'Untitled Workflow',
      nodes: [{ id: '1', title: 'Trigger: Start', desc: 'Manual trigger' }]
    };
    const supabase = createClient();
    const { data } = await supabase.from('workflows').insert(newWorkflowPayload).select().single();
    
    if (data) {
      const w = { id: data.id, name: data.name, nodes: data.nodes };
      setWorkflows([...workflows, w]);
      setActiveWorkflowId(w.id);
      setSelectedNodeId(null);
    }
  };

  const handleAddNode = () => {
    if (!activeWorkflow) return;
    const newNode = {
      id: Date.now().toString(),
      title: 'New Step',
      desc: 'Description'
    };
    
    const updatedWorkflow = { ...activeWorkflow, nodes: [...activeWorkflow.nodes, newNode] };
    setWorkflows(workflows.map(w => w.id === activeWorkflowId ? updatedWorkflow : w));
    setSelectedNodeId(newNode.id);
    updateWorkflowInDb(updatedWorkflow);
  };

  const handleDeleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeWorkflow) return;
    const updatedWorkflow = { ...activeWorkflow, nodes: activeWorkflow.nodes.filter(n => n.id !== id) };
    
    setWorkflows(workflows.map(w => w.id === activeWorkflowId ? updatedWorkflow : w));
    if (selectedNodeId === id) setSelectedNodeId(null);
    updateWorkflowInDb(updatedWorkflow);
  };

  const handleUpdateNode = (id: string, field: 'title' | 'desc', value: string) => {
    if (!activeWorkflow) return;
    const updatedNodes = activeWorkflow.nodes.map(n => n.id === id ? { ...n, [field]: value } : n);
    const updatedWorkflow = { ...activeWorkflow, nodes: updatedNodes };

    setWorkflows(workflows.map(w => w.id === activeWorkflowId ? updatedWorkflow : w));
    updateWorkflowInDb(updatedWorkflow);
  };

  if (!activeWorkflow) {
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
          <div style={{ padding: '12px', color: '#999', fontSize: '14px' }}>No workflows found. Create one to get started.</div>
        </div>
        <div className="rltr-workflow-canvas"></div>
      </div>
    );
  }

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

const DashboardHomeView: React.FC<{ user: any }> = ({ user }) => {
  const [metrics, setMetrics] = useState({
    activeDealsValue: '$0M',
    activeDealsCount: 0,
    pipelineValue: '$0M',
    pipelineCount: 0,
    tasksDue: 0,
    highPriorityTasks: 0
  });

  React.useEffect(() => {
    if (!user) return;
    const fetchMetrics = async () => {
      const supabase = createClient();
      
      // Active Deals (Under Contract)
      const { data: activeDeals } = await supabase.from('deals').select('value').eq('stage', 'Under Contract');
      const activeVal = activeDeals?.reduce((sum, d) => sum + Number(d.value), 0) || 0;
      
      // Pipeline (New + Negotiation)
      const { data: pipelineDeals } = await supabase.from('deals').select('value').in('stage', ['New', 'Negotiation']);
      const pipelineVal = pipelineDeals?.reduce((sum, d) => sum + Number(d.value), 0) || 0;
      
      // Tasks
      const { data: tasks } = await supabase.from('tasks').select('*').eq('completed', false);
      const highPriority = tasks?.filter((t: any) => t.priority === 'High').length || 0;

      setMetrics({
        activeDealsValue: `$${(activeVal / 1000000).toFixed(1)}M`,
        activeDealsCount: activeDeals?.length || 0,
        pipelineValue: `$${(pipelineVal / 1000000).toFixed(1)}M`,
        pipelineCount: pipelineDeals?.length || 0,
        tasksDue: tasks?.length || 0,
        highPriorityTasks: highPriority
      });
    };
    fetchMetrics();
  }, [user]);

  return (
    <div>
      <div className="rltr-dashboard-grid">
        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Active Deals</span>
            <span className="rltr-metric-trend positive">↑ 12%</span>
          </div>
          <div className="rltr-metric-value">{metrics.activeDealsValue}</div>
          <div className="rltr-metric-sub">{metrics.activeDealsCount} closings this month</div>
        </div>
        
        <div className="rltr-metric-card">
          <div className="rltr-metric-header">
            <span className="rltr-metric-title">Pipeline Value</span>
            <span className="rltr-metric-trend positive">↑ 5%</span>
          </div>
          <div className="rltr-metric-value">{metrics.pipelineValue}</div>
          <div className="rltr-metric-sub">{metrics.pipelineCount} active opportunities</div>
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
          <div className="rltr-metric-value">{metrics.tasksDue}</div>
          <div className="rltr-metric-sub">{metrics.highPriorityTasks} high priority</div>
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

const ClientsView: React.FC<{ user: any }> = ({ user }) => {
  const [clients, setClients] = useState<Client[]>([]);

  React.useEffect(() => {
    if (!user) return;
    const fetchClients = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('clients').select('*');
      if (data) {
        setClients(data.map((c: any) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          status: c.status,
          lastContact: new Date(c.last_contact).toLocaleDateString()
        })));
      }
    };
    fetchClients();
  }, [user]);

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

const DealsView: React.FC<{ user: any }> = ({ user }) => {
  const [deals, setDeals] = useState<Deal[]>([]);

  React.useEffect(() => {
    if (!user) return;
    const fetchDeals = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('deals').select('*');
      if (data) {
        setDeals(data.map((d: any) => ({
          id: d.id,
          title: d.title,
          value: d.value ? `$${Number(d.value).toLocaleString()}` : '$0',
          stage: d.stage,
          clientName: d.client_name
        })));
      }
    };
    fetchDeals();
  }, [user]);

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

const TasksView: React.FC<{ user: any }> = ({ user }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  React.useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
      if (data) {
        setTasks(data.map((t: any) => ({
          id: t.id,
          title: t.title,
          dueDate: new Date(t.due_date).toLocaleDateString(),
          priority: t.priority,
          completed: t.completed
        })));
      }
    };
    fetchTasks();
  }, [user]);

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newCompleted = !task.completed;
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: newCompleted } : t));
    
    const supabase = createClient();
    await supabase.from('tasks').update({ completed: newCompleted }).eq('id', id);
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

const CalendarView: React.FC<{ user: any }> = ({ user }) => {
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

const SettingsView: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="rltr-settings-form">
      <div className="rltr-settings-section">
        <div className="rltr-settings-title">Profile</div>
        <div className="rltr-form-group">
          <label className="rltr-label">Full Name</label>
          <input type="text" className="rltr-input" defaultValue={user?.user_metadata?.full_name || "Alex Realtor"} />
        </div>
        <div className="rltr-form-group">
          <label className="rltr-label">Email</label>
          <input type="email" className="rltr-input" defaultValue={user?.email || "alex@rltr.com"} />
        </div>
      </div>      <div className="rltr-settings-section">
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

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState<NavItem>('Dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          Loading...
        </div>
      );
    }

    if (!user) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
          <div style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Please log in to access the dashboard.</div>
          <a href="/login" className="rltr-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '36px' }}>Log In</a>
        </div>
      );
    }

    switch (activeItem) {
      case 'Dashboard':
        return <DashboardHomeView user={user} />;
      case 'Search Agent':
        return <SearchAgentView user={user} />;
      case 'Contract Agent':
        return <ContractAgentView user={user} />;
      case 'Workflow Agent':
        return <WorkflowAgentView user={user} />;
      case 'Clients':
        return <ClientsView user={user} />;
      case 'Deals':
        return <DealsView user={user} />;
      case 'Tasks':
        return <TasksView user={user} />;
      case 'Calendar':
        return <CalendarView user={user} />;
      case 'Settings':
        return <SettingsView user={user} />;
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
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
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
    </>
  );
}
