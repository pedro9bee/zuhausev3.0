# Oracle Cloud Deployment Setup

This document describes how to set up the GitHub repository secrets required for automated deployment to Oracle Cloud Infrastructure.

## Required GitHub Repository Secrets

Navigate to your GitHub repository → Settings → Secrets and variables → Actions, then add the following secrets:

### Oracle Cloud Infrastructure (OCI) Secrets

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `OCI_USER_OCID` | Your OCI user OCID | OCI Console → Profile → User Settings |
| `OCI_KEY_FINGERPRINT` | Fingerprint of your API signing key | Generated when creating API key |
| `OCI_TENANCY_OCID` | Your OCI tenancy OCID | OCI Console → Administration → Tenancy Details |
| `OCI_PRIVATE_KEY` | Your OCI API private key | The private key file content (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`) |
| `OCI_COMPARTMENT_ID` | Target compartment OCID | OCI Console → Identity → Compartments |

### Oracle Container Registry (OCIR) Secrets

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `OCI_AUTH_TOKEN` | Auth token for OCIR | OCI Console → Profile → Auth tokens → Generate token |
| `OCI_TENANCY_NAMESPACE` | Your tenancy namespace | OCI Console → Administration → Tenancy Details |
| `OCI_USERNAME` | Your OCI username | Usually your email address |

### Compute Instance Secrets

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `OCI_INSTANCE_IP` | Public IP of your compute instance | OCI Console → Compute → Instances → Instance Details |
| `OCI_SSH_PRIVATE_KEY` | SSH private key for instance access | Your SSH private key content |
| `OCI_SSH_USER` | SSH username for the instance | Usually `ubuntu` or `opc` |

### Application Environment Secrets

| Secret Name | Description | Current Value |
|-------------|-------------|---------------|
| `AIRTABLE_API_KEY` | Airtable API key | `patCZbzi2bpaeKD48.3bb4e7c8ef23f96664ce804bba7b64f31271d7791d924f7036977194047d7b5b` |
| `AIRTABLE_BASE_ID` | Airtable base ID | `appS414MmGicN13sS` |
| `AIRTABLE_TABLE_NAME` | Airtable table name | `Zuhause` |
| `AIRTABLE_VIEW_ID` | Airtable view ID | `viwo9TI6aiyks1N7x` |
| `SESSION_SECRET` | Express session secret | `b4f2e2d4c1dcd77e958a13e833c31c1aa320d177d1fc1b7a0f4e3a50c36f1cfa` |

## Setup Instructions

### 1. Create OCI API Key

1. Go to OCI Console → Profile → API Keys
2. Click "Add API Key"
3. Generate a new key pair or upload your public key
4. Copy the fingerprint and download/save the private key
5. Add the private key content to `OCI_PRIVATE_KEY` secret

### 2. Generate Auth Token

1. Go to OCI Console → Profile → Auth tokens
2. Click "Generate token"
3. Provide a description (e.g., "GitHub Actions OCIR")
4. Copy the token and add it to `OCI_AUTH_TOKEN` secret

### 3. Set Up Compute Instance

1. Create an OCI compute instance if you don't have one
2. Ensure Docker is installed on the instance:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER
   ```
3. Configure security list to allow HTTP traffic (port 80)
4. Note the public IP address

### 4. SSH Key Setup

1. Generate SSH key pair if needed:
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/oci_key
   ```
2. Add public key to the compute instance
3. Add private key content to `OCI_SSH_PRIVATE_KEY` secret

## Deployment Trigger

The deployment will trigger automatically when you push to the `production` branch:

```bash
git checkout production
git merge main
git push origin production
```

Or manually trigger via GitHub Actions interface.

## Container Registry

Images will be pushed to:
```
iad.ocir.io/{tenancy-namespace}/zuhause:latest
iad.ocir.io/{tenancy-namespace}/zuhause:{commit-sha}
```

## Monitoring

After deployment, the application will be available at:
```
http://{OCI_INSTANCE_IP}
```

The container runs on port 3000 internally but is exposed on port 80.

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Check OCI credentials and auth token
2. **SSH Connection Failed**: Verify SSH key and instance IP
3. **Container Registry Push Failed**: Check OCIR auth token and namespace
4. **Health Check Failed**: Verify security list allows port 80 traffic

### Debugging

Check deployment logs in GitHub Actions, and SSH into the instance to check container status:

```bash
sudo docker ps
sudo docker logs zuhause-prod
```