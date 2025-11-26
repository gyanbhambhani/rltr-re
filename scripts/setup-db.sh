#!/bin/bash

# RLTR Database Setup Script
# This script helps you set up the database for local development

set -e

echo "🚀 RLTR Database Setup"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    
    # Check if Homebrew is available (macOS)
    if command -v brew &> /dev/null; then
        echo "📦 Installing Supabase CLI via Homebrew..."
        set +e  # Temporarily disable exit on error for installation
        brew install supabase/tap/supabase
        set -e  # Re-enable exit on error
        
        # Verify installation
        if ! command -v supabase &> /dev/null; then
            echo "❌ Installation failed. Please install manually:"
            echo "   brew install supabase/tap/supabase"
            exit 1
        fi
        echo "✓ Supabase CLI installed"
    else
        echo "Please install Supabase CLI:"
        echo "  macOS: brew install supabase/tap/supabase"
        echo "  Other: https://github.com/supabase/cli#install-the-cli"
        exit 1
    fi
    echo ""
fi

echo "✓ Supabase CLI found"
echo ""

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running."
    echo ""
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Initialize Supabase if not already initialized
if [ ! -f "supabase/config.toml" ]; then
    echo "📦 Initializing Supabase..."
    supabase init
    echo "✓ Supabase initialized"
else
    echo "✓ Supabase already initialized"
fi

echo ""

# Start Supabase
echo "🐳 Starting Supabase (this uses Docker)..."
supabase start

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Your local Supabase credentials:"
supabase status
echo ""
echo "💡 Add these to your .env.local file:"
echo "   NEXT_PUBLIC_SUPABASE_URL=<API URL from above>"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from above>"
echo ""
echo "🚀 Now run: npm run dev"

