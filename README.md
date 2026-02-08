# FinOps-Tool
# user guide to create arn role
How to Create an IAM Role (ARN) to Grant Read-Only Access
✅ METHOD 1: Create Role WITHOUT JSON (Easiest & Recommended)
Step 1️⃣ Open IAM

1. Login to AWS Console
2. Go to IAM
3. Click Roles
4. Click Create role

Step 2️⃣ Select Trusted Entity

1. Choose Another AWS account
2. Enter Our AWS Account ID:
   895183717403
   
3. Check Require external ID
4. Enter External ID:
   ex :- finops-8f3a91c67

5. Click Next

📌 This allows our system to securely assume this role.

Step 3️⃣ Attach Permissions (Read-Only)

Search and select:
  ✅ ReadOnlyAccess

Step 4️⃣ Name the Role

Role name:
   FinOpsReadOnlyRole
   
Click Create role

Step 5️⃣ Share Role ARN with Us

Open the role you just created

Copy the Role ARN

Example:
  arn:aws:iam::123456789012:role/FinOpsReadOnlyRole

📤 Send this ARN to us — setup is complete 🎉


✅ METHOD 2: Create Role WITH JSON (Advanced / Copy-Paste)

Use this if:
You are comfortable with IAM
Or following automation / infra guides


Part A️ Create Role + Trust Policy (JSON)
Step 1️⃣ Go to IAM → Roles → Create role

Choose Custom trust policy

Step 2️⃣ Paste this Trust Policy JSON
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

Click Next

Part B️ Attach Permissions Policy

AWS Managed Policy (Easy)

Attach:
✅ ReadOnlyAccess

C️ Name the Role

Role name:
   FinOpsReadOnlyRole

Click Create role

Final Step️ Share Role ARN
Copy and share the Role ARN





























