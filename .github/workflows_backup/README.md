# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment to Oracle Cloud Infrastructure.

## Available Workflows

### 1. `deploy-production.yml` - Full Oracle Cloud Integration
- Uses Oracle Container Registry (OCIR)
- Requires extensive OCI configuration
- Full OCI CLI integration
- More complex setup but more integrated with Oracle services

### 2. `deploy-production-simple.yml` - Simplified Deployment (Recommended)
- Uses GitHub Container Registry (GHCR)
- Simpler setup - only requires SSH access to Oracle instance
- Uses GitHub's built-in container registry
- Easier to maintain and debug

## Quick Setup (Recommended: Simple Workflow)

1. **Disable the full workflow** (rename or delete `deploy-production.yml`)
2. **Set up these GitHub repository secrets**:
   - `OCI_INSTANCE_IP` - Your Oracle Cloud instance public IP
   - `OCI_SSH_USER` - SSH username (usually `ubuntu` or `opc`)
   - `OCI_SSH_PRIVATE_KEY` - Your SSH private key content
   - `AIRTABLE_API_KEY` - Your Airtable API key
   - `AIRTABLE_BASE_ID` - Your Airtable base ID
   - `AIRTABLE_TABLE_NAME` - Your Airtable table name
   - `AIRTABLE_VIEW_ID` - Your Airtable view ID
   - `SESSION_SECRET` - Express session secret

3. **Ensure Docker is installed on your Oracle instance**:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER
   ```

4. **Configure Oracle Cloud security list** to allow port 80 (HTTP)

## Deployment Process

1. **Push to production branch**:
   ```bash
   git checkout production
   git merge main
   git push origin production
   ```

2. **Monitor deployment** in GitHub Actions tab

3. **Access your application** at `http://{your-oracle-instance-ip}`

## Troubleshooting

- Check GitHub Actions logs for detailed error messages
- SSH into your Oracle instance and check container status:
  ```bash
  sudo docker ps
  sudo docker logs zuhause-prod
  ```
- Ensure security list allows HTTP traffic on port 80

## Manual Deployment

If needed, you can manually deploy using:
```bash
# On your Oracle instance
docker pull ghcr.io/{your-username}/zuhausev3.0/zuhause:production
docker stop zuhause-prod && docker rm zuhause-prod
docker run -d --name zuhause-prod --restart unless-stopped -p 80:3000 --env-file .env ghcr.io/{your-username}/zuhausev3.0/zuhause:production
```