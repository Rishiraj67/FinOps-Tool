# FinOps Tool – IAM Role Setup Guide

This guide explains how to create an **AWS IAM Role (ARN)** that grants **read-only access** to your AWS account so the **FinOps Tool** can securely analyze usage and cost data.

---

## 🔐 Purpose

The IAM Role allows our FinOps platform to:

- Securely assume access using **AWS STS**
- Collect **read-only** billing and infrastructure metadata
- **Never modify** your AWS resources

---

## 📌 Prerequisites

- AWS account with permission to create IAM roles
- External ID provided by the FinOps Tool

---

## ✅ Method 1: Create Role **Without JSON**
**(Recommended – Easiest & Safest)**

---

### Step 1: Open IAM

1. Log in to the **AWS Management Console**
2. Navigate to **IAM**
3. Click **Roles**
4. Click **Create role**

---

### Step 2: Select Trusted Entity

1. Choose **Another AWS account**
2. Enter **Our AWS Account ID**:
