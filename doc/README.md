# FinOps Tool

A secure and read-only FinOps platform that helps you **understand, control, and optimize AWS cloud costs** without sharing credentials or allowing write access.

---

## 1. What Is FinOps Tool?

The **FinOps Tool** connects to your AWS account in a **secure, read-only** manner to:

* Analyze AWS **cost & usage**
* Identify **wasted or under-utilized resources**
* Provide **optimization and savings insights**
* Improve **cost visibility and accountability**

🔒 The tool **cannot create, modify, or delete** any AWS resources.

---

## 2. How Access Works (Simple Explanation)

Instead of sharing AWS access keys, we use **AWS best practices**:

1. You create an **IAM Role** in *your* AWS account
2. You allow our AWS account to **assume that role**
3. Access is limited to **read-only permissions**
4. Authentication happens via **temporary credentials (STS)**

This method is:

* More secure than access keys
* Auditable
* Easy to revoke at any time

---

## 3. Security & Compliance Model

| Feature        | Description                                 |
| -------------- | ------------------------------------------- |
| Access Type    | Read-only                                   |
| Authentication | AWS STS AssumeRole                          |
| External ID    | Required (prevents confused-deputy attacks) |
| Credentials    | Temporary, auto-rotated                     |
| Revocation     | Delete role or trust relationship           |

✅ Follows AWS Well-Architected & Security best practices
✅ Suitable for enterprise and compliance reviews

---

## 4. What Data We Can Access

### ✅ Allowed (Read-Only)

* AWS Cost & Usage metadata
* EC2, RDS, S3, Lambda configuration
* Tags, regions, instance sizes
* Billing reports and metrics

### ❌ Not Allowed

* Creating or deleting resources
* Modifying infrastructure
* Accessing application data
* Writing to S3 or databases

---

## 5. What You Need Before Setup

* AWS account access
* Permission to create IAM roles
* External ID provided by FinOps Tool

---

## 6. AWS IAM Role Setup (Step-by-Step)

This setup takes **5–10 minutes**.

---

## Method 1: Create Role Without JSON (Recommended)

### Step 1: Open IAM

1. Log in to **AWS Management Console**
2. Go to **IAM → Roles**
3. Click **Create role**

---

### Step 2: Configure Trusted Entity

1. Select **Another AWS account**
2. Enter **FinOps Tool AWS Account ID**:

```
895183717403
```

3. Enable **Require external ID**
4. Enter **External ID**:

```
finops-8f3a91c67
```

5. Click **Next**

📌 This allows only our system to assume the role securely.

---

### Step 3: Attach Permissions

Search and select the AWS managed policy:

```
ReadOnlyAccess
```

Click **Next**

---

### Step 4: Name the Role

**Role name:**

```
FinOpsReadOnlyRole
```

(Optional description):

```
Read-only access for FinOps cost and usage analysis
```

Click **Create role**

---

### Step 5: Share Role ARN

1. Open the role you created
2. Copy the **Role ARN**

Example:

```
arn:aws:iam::123456789012:role/FinOpsReadOnlyRole
```

📤 Share this ARN with the FinOps Tool team

---

## 7. Alternative Setup: JSON Trust Policy (Advanced)

Use this if you follow **IaC or automation** workflows.

### Trust Policy JSON

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
```

Attach the **ReadOnlyAccess** policy and name the role:

```
FinOpsReadOnlyRole
```

---

## 8. After You Share the ARN

Once we receive the ARN:

* Secure access is established
* Cost ingestion starts automatically
* No further action required from your side

---

## 9. How to Revoke Access

You are always in control.

To revoke access:

* Delete the IAM role, **or**
* Remove the trust relationship

Access is revoked immediately.

---

## 10. Common Questions

### ❓ Can you modify my AWS resources?

No. Access is **strictly read-only**.

### ❓ Do I need to rotate keys?

No keys are used.

### ❓ Is this AWS-approved?

Yes. This is the **recommended AWS cross-account access pattern**.

### ❓ Can auditors review this?

Yes. IAM role permissions are fully auditable.

---

## 11. Future Roadmap

* Terraform & CloudFormation templates
* Multi-cloud (Azure, GCP)
* Budget alerts & anomaly detection
* Cost allocation by team and project

---

## 12. Support

If you need help during setup or verification:

* Contact your FinOps Tool administrator
* Or reach out to our support team

---

## ✅ Setup Complete

Once the IAM Role ARN is shared, the FinOps Tool begins working automatically.

**You stay secure. You stay in control. You save costs.** 🚀
