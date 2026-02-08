# FinOps Tool

A secure FinOps platform to analyze, optimize, and monitor your AWS cloud costs using **read-only, cross-account access**.

---

## 🚀 Overview

The **FinOps Tool** helps organizations gain visibility into their AWS spending by securely collecting billing and infrastructure metadata.  
It follows AWS best practices by using **STS AssumeRole** with **external ID**, ensuring **zero write access** and **no long-term credentials**.

---

## 🔐 Security Model

- 🔍 **Read-only access only**
- 🔑 Uses **IAM Role + STS AssumeRole**
- 🆔 Protected with **External ID**
- ❌ No access keys shared
- ♻️ Access can be revoked anytime

---

## 📋 Prerequisites

Before onboarding, ensure you have:

- An AWS account
- Permission to create IAM roles
- External ID provided by the FinOps Tool

---

## 🛠️ AWS IAM Role Setup

To enable secure access, create an IAM role in your AWS account and share its **ARN** with us.

---

## ✅ Method 1: Create Role Without JSON  
**(Recommended – Simple & Fast)**

### Step 1: Open IAM

1. Log in to the **AWS Management Console**
2. Navigate to **IAM**
3. Click **Roles**
4. Click **Create role**

---

### Step 2: Select Trusted Entity

1. Choose **Another AWS account**
2. Enter **Our AWS Account ID**: `895183717403`
3. Enable **Require external ID**
4. Enter **External ID**: `finops-8f3a91c67`
5. Click **Next**

> 📌 This allows our system to securely assume the role.

---

### Step 3: Attach Permissions

Search and select: `ReadOnlyAccess`

Click **Next**

---

### Step 4: Name the Role

**Role name:** `FinOpsReadOnlyRole`

Click **Create role**

---

### Step 5: Share Role ARN

1. Open the role you created
2. Copy the **Role ARN**

**Example:** `arn:aws:iam::123456789012:role/FinOpsReadOnlyRole`

📤 Share this ARN with us — onboarding is complete 🎉

---

## ✅ Method 2: Create Role With JSON  
**(Advanced / Automation-Friendly)**

### Part A: Create Role + Trust Policy

1. Go to **IAM → Roles → Create role**
2. Select **Custom trust policy**
3. Paste the following JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::895183717403:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "finops-8f3a91c2"
        }
      }
    }
  ]
}