#!/bin/bash
set -e

# === LOAD CONFIG FROM .env ===
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found. Please create one with your config."
  exit 1
fi

# Construct image references dynamically in script
FRONTEND_IMAGE=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$FRONTEND_REPO
BACKEND_IMAGE=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$BACKEND_REPO

# ====== Function: Create ECR repo if it doesn't exist ======
create_ecr_repo_if_missing() {
  REPO_NAME=$1
  if aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$REGION" > /dev/null 2>&1; then
    echo "ECR repository '$REPO_NAME' already exists."
  else
    echo "Creating ECR repository '$REPO_NAME'..."
    aws ecr create-repository --repository-name "$REPO_NAME" --region "$REGION" > /dev/null
    echo "Created ECR repository '$REPO_NAME'."
  fi
}

# ==== AUTH ====
echo "Logging into Amazon ECR..."
aws ecr get-login-password --region $REGION \
  | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com


# ====== 2. Create ECR Repos if Needed ======
create_ecr_repo_if_missing $FRONTEND_REPO
create_ecr_repo_if_missing $BACKEND_REPO


# ====== 3. Build images using Docker Compose ======
echo "Building Docker images for frontend and backend..."
docker-compose build


# ====== Build and Push Images ======
echo "Building and pushing frontend image for linux/amd64..."
docker buildx build --platform linux/amd64 \
  -t $FRONTEND_IMAGE:$TAG ./frontend --push

echo "Building and pushing backend image for linux/amd64..."
docker buildx build --platform linux/amd64 \
  -t $BACKEND_IMAGE:$TAG ./backend --push

echo "All done! Both images have been pushed to ECR."