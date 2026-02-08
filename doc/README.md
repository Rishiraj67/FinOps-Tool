# FinOps Tool – Customer Quick Start (1-Page)

Get started with the FinOps Tool in **5–10 minutes** by creating a secure, **read-only AWS IAM role**.

---

## 🔍 What This Does

This setup allows the FinOps Tool to:
- Analyze AWS **cost & usage**
- Provide **optimization insights**
- Access data in **read-only mode**

✅ No changes to your AWS resources  
✅ No access keys required  
✅ Access can be revoked anytime

---

## 🧩 What You Need

- AWS account access
- Permission to create IAM roles
- External ID (provided by FinOps Tool)

---

## 🚀 Quick Setup (Recommended)

### Step 1: Open IAM

1. Log in to the **AWS Management Console**
2. Go to **IAM → Roles**
3. Click **Create role**

---

### Step 2: Choose Trusted Entity

- Select **Another AWS account**
- Enter **FinOps Tool AWS Account ID**:


- Enable **Require external ID**
- Enter **External ID**:


Click **Next**

---

### Step 3: Attach Permissions

- Search and select:


Click **Next**

---

### Step 4: Name the Role

**Role name:**


Click **Create role**

---

### Step 5: Share Role ARN

1. Open the role you created
2. Copy the **Role ARN**

**Example:**


📤 Share this ARN with the FinOps Tool team

---

## ✅ Done!

Once the ARN is shared:
- Data ingestion starts automatically
- No further action required from your side

---

## 🔒 Security Summary

- 🔍 Read-only access
- 🔑 Uses STS AssumeRole
- 🆔 Protected with External ID
- ❌ No credentials stored
- ♻️ Revoke anytime by deleting the role

---

## ❓ Need Help?

If you face any issues during setup:
- Contact your FinOps Tool administrator
- Or reach out to our support team

---

🎉 **That’s it — you’re onboarded!**  
Start optimizing your AWS costs with confidence.
